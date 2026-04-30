import type { NextApiRequest, NextApiResponse } from 'next';

import { getYouTubeInnerTube } from '../../../server/youtube-innertube';

type ResolveOkResponse = {
  ok: true;
  source: 'innertube';
  /** Stable id — pass to `/api/youtube/download` for server-side InnerTube streaming (avoids CDN 403 on raw googlevideo URLs). */
  videoId: string;
  videoUrl: string;
  hdVideoUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  author?: string;
  /** Pass to /api/youtube/download Referer—some stream tokens require the watch page URL */
  playbackReferer: string;
  /** YouTube progressive streams are not “watermarked” like TikTok; kept for client compatibility */
  watermarked: boolean;
};

type ResolveErrorResponse = {
  ok: false;
  code:
    | 'METHOD_NOT_ALLOWED'
    | 'INVALID_JSON'
    | 'INVALID_URL'
    | 'UNSUPPORTED_DOMAIN'
    | 'RESOLVE_FAILED'
    | 'UPSTREAM_TIMEOUT'
    | 'NOT_AVAILABLE';
  message: string;
};

const VIDEO_ID_RE = /^[a-zA-Z0-9_-]{11}$/;
const ALLOWED_HOST_SUFFIXES = ['youtube.com', 'youtube-nocookie.com', 'youtu.be'];

function json(res: NextApiResponse, status: number, body: ResolveOkResponse | ResolveErrorResponse) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8').json(body);
}

function sanitizeErrorMessage(message: string) {
  return message.replace(/https?:\/\/\S+/g, '[url]').slice(0, 240);
}

function isAllowedYouTubeHostname(host: string) {
  const h = host.toLowerCase();
  return ALLOWED_HOST_SUFFIXES.some((s) => h === s || h.endsWith(`.${s}`));
}

function extractVideoIdFromUrl(input: string): string | null {
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;

  const host = url.hostname.toLowerCase();
  if (!isAllowedYouTubeHostname(host)) return null;

  if (host === 'youtu.be' || host === 'www.youtu.be') {
    const id = url.pathname.replace(/^\//, '').split('/')[0]?.split('?')[0];
    return id && VIDEO_ID_RE.test(id) ? id : null;
  }

  const path = url.pathname;
  const shortsPrefix = '/shorts/';
  if (path.startsWith(shortsPrefix)) {
    const id = path.slice(shortsPrefix.length).split('/')[0]?.split('?')[0];
    return id && VIDEO_ID_RE.test(id) ? id : null;
  }

  if (path === '/watch' || path.startsWith('/watch/')) {
    const v = url.searchParams.get('v');
    return v && VIDEO_ID_RE.test(v) ? v : null;
  }

  const embedPrefix = '/embed/';
  if (path.startsWith(embedPrefix)) {
    const id = path.slice(embedPrefix.length).split('/')[0]?.split('?')[0];
    return id && VIDEO_ID_RE.test(id) ? id : null;
  }

  const livePrefix = '/live/';
  if (path.startsWith(livePrefix)) {
    const id = path.slice(livePrefix.length).split('/')[0]?.split('?')[0];
    return id && VIDEO_ID_RE.test(id) ? id : null;
  }

  return null;
}

function isAllowedYouTubeInput(
  input: string,
): { ok: true; videoId: string } | { ok: false; code: ResolveErrorResponse['code']; message: string } {
  const id = extractVideoIdFromUrl(input);
  if (id) {
    return { ok: true, videoId: id };
  }
  return { ok: false, code: 'INVALID_URL', message: 'Enter a valid YouTube or YouTube Shorts link.' };
}

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit & { timeoutMs?: number } = {}) {
  const { timeoutMs = 14_000, ...rest } = init;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...rest, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Balanced-json extraction with basic string escaping so `{`/`}` inside JSON strings don't break depth.
 */
function parseJsonObjectAt(html: string, openBraceIdx: number): Record<string, unknown> | null {
  if (html[openBraceIdx] !== '{') return null;

  let depth = 0;
  let inStr = false;
  let escape = false;
  let strQuote: '"' | "'" | null = null;

  for (let i = openBraceIdx; i < html.length; i++) {
    const c = html[i];

    if (inStr && strQuote) {
      if (escape) {
        escape = false;
        continue;
      }
      if (c === '\\') {
        escape = true;
        continue;
      }
      if (c === strQuote) {
        inStr = false;
        strQuote = null;
      }
      continue;
    }

    if ((c === '"' || c === "'") && !inStr) {
      inStr = true;
      strQuote = c as '"' | "'";
      continue;
    }

    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) {
        const slice = html.slice(openBraceIdx, i + 1);
        try {
          return JSON.parse(slice) as Record<string, unknown>;
        } catch {
          return null;
        }
      }
    }
  }

  return null;
}

function findYtInitialPlayerResponse(html: string): Record<string, unknown> | null {
  const re = /ytInitialPlayerResponse\s*=\s*\{/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    const braceIdx = match.index + match[0].length - 1;
    const parsed = parseJsonObjectAt(html, braceIdx);
    if (parsed) return parsed;
  }
  return null;
}

type LooseFormat = {
  mimeType?: string;
  url?: string;
  height?: number;
  bitrate?: number;
  qualityLabel?: string;
  signatureCipher?: string;
};

function pickProgressiveMp4(sd: Record<string, unknown>): { primary: string; secondary?: string } | null {
  const formatsRaw = sd.formats;
  const adaptiveRaw = sd.adaptiveFormats;

  const list: LooseFormat[] = [
    ...(Array.isArray(formatsRaw) ? (formatsRaw as LooseFormat[]) : []),
    ...(Array.isArray(adaptiveRaw) ? (adaptiveRaw as LooseFormat[]) : []),
  ];

  type Scored = { url: string; height: number; bitrate: number; muxed: boolean };
  const scored: Scored[] = [];

  for (const f of list) {
    if (!f.url || typeof f.url !== 'string') continue;
    if (f.signatureCipher) continue;
    if (!f.mimeType?.includes('video')) continue;
    const muxed = f.mimeType.includes('audio');

    scored.push({
      url: f.url,
      height: typeof f.height === 'number' ? f.height : 0,
      bitrate: typeof f.bitrate === 'number' ? f.bitrate : 0,
      muxed,
    });
  }

  if (scored.length === 0) return null;

  const muxedCandidates = scored.filter((s) => s.muxed);
  const pool = muxedCandidates.length > 0 ? muxedCandidates : scored;

  const sorted = [...pool].sort((a, b) => {
    const dh = b.height - a.height;
    if (dh !== 0) return dh;
    return b.bitrate - a.bitrate;
  });

  const primary = sorted[0]?.url;
  if (!primary) return null;

  const hd = sorted.find((s) => s.height >= 720 && s.url !== primary);
  return { primary, secondary: hd?.url };
}

async function resolveInnertubeWatchPage(videoId: string): Promise<Omit<ResolveOkResponse, 'ok'>> {
  const watchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;

  const res = await fetchWithTimeout(watchUrl, {
    headers: {
      Accept: 'text/html,application/xhtml+xml',
      // Desktop UA increases odds of inlined player JSON.
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    redirect: 'follow',
    timeoutMs: 14_000,
  });

  if (!res.ok) {
    throw new Error(`YouTube responded ${res.status}`);
  }

  const html = await res.text();

  const playerResponse = findYtInitialPlayerResponse(html);
  if (!playerResponse) {
    throw new Error('Could not read player data from this YouTube link.');
  }

  const ps = playerResponse.playabilityStatus as { status?: string; reason?: string } | undefined;
  if (ps?.status && ps.status !== 'OK') {
    const reason = typeof ps.reason === 'string' ? ps.reason : 'Video is not available for playback.';
    throw new Error(reason);
  }

  const vd = playerResponse.videoDetails as
    | {
        title?: string;
        author?: string;
        thumbnail?: { thumbnails?: Array<{ url?: string }> };
      }
    | undefined;

  const sd = playerResponse.streamingData as Record<string, unknown> | undefined;
  if (!sd) {
    throw new Error(
      'No direct download URL is exposed for this video. It may require sign-in or use formats we cannot unlock from a simple link paste.',
    );
  }

  const picked = pickProgressiveMp4(sd);
  if (!picked) {
    throw new Error(
      'No progressive MP4 URL found for this video. YouTube may only offer adaptive streams for this playback.',
    );
  }

  const thumbs = vd?.thumbnail?.thumbnails ?? [];
  const thumbnailUrl =
    thumbs.length > 0
      ? (thumbs[thumbs.length - 1]?.url ?? thumbs[0]?.url)?.replace(/^http:\/\//i, 'https://')
      : undefined;

  return {
    source: 'innertube',
    videoId,
    videoUrl: picked.primary,
    hdVideoUrl: picked.secondary,
    thumbnailUrl,
    title: typeof vd?.title === 'string' ? vd.title : undefined,
    author: typeof vd?.author === 'string' ? vd.author : undefined,
    watermarked: false,
    playbackReferer: watchUrl,
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResolveOkResponse | ResolveErrorResponse>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { ok: false, code: 'METHOD_NOT_ALLOWED', message: 'Use POST.' });
  }

  let body: unknown;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return json(res, 400, { ok: false, code: 'INVALID_JSON', message: 'Invalid JSON body.' });
  }

  const urlInput =
    typeof (body as { url?: unknown })?.url === 'string' ? (body as { url: string }).url.trim() : '';
  if (!urlInput) {
    return json(res, 400, { ok: false, code: 'INVALID_URL', message: 'Enter a YouTube or Shorts link.' });
  }

  const parsed = isAllowedYouTubeInput(urlInput);
  if (!parsed.ok) {
    return json(res, 400, {
      ok: false,
      code: parsed.code === 'INVALID_URL' ? 'INVALID_URL' : 'UNSUPPORTED_DOMAIN',
      message: parsed.message,
    });
  }

  try {
    void getYouTubeInnerTube().catch(() => {
      /* Warm player/session in parallel with HTML resolve so Download starts faster. */
    });
    const resolved = await resolveInnertubeWatchPage(parsed.videoId);
    return json(res, 200, { ok: true, ...resolved });
  } catch (e) {
    if ((e as Error)?.name === 'AbortError') {
      return json(res, 504, {
        ok: false,
        code: 'UPSTREAM_TIMEOUT',
        message: 'YouTube took too long to respond. Try again.',
      });
    }

    const msg = (e as Error)?.message || 'Could not resolve this YouTube link.';
    console.error('YouTube resolve failed:', sanitizeErrorMessage(msg));

    if (/not available|sign-in|age|private|premium|offline|playback/i.test(msg)) {
      return json(res, 400, {
        ok: false,
        code: 'NOT_AVAILABLE',
        message:
          sanitizeErrorMessage(msg) ||
          'This video cannot be accessed as a simple public progressive download.',
      });
    }

    return json(res, 502, {
      ok: false,
      code: 'RESOLVE_FAILED',
      message:
        'Could not resolve this YouTube link as a downloadable file. Shorts/watch URLs usually work best when shared as public videos.',
    });
  }
}
