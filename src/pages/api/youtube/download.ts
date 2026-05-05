import type { NextApiRequest, NextApiResponse } from 'next';

import { Readable } from 'node:stream';
import type { ReadableStream as WebReadableStream } from 'node:stream/web';
import { pipeline } from 'node:stream/promises';

import { getYouTubeInnerTube } from '../../../server/youtube-innertube';

type ErrorResponse = {
  ok: false;
  code:
    | 'METHOD_NOT_ALLOWED'
    | 'INVALID_URL'
    | 'INVALID_BODY'
    | 'UNSUPPORTED_HOST'
    | 'UPSTREAM_ERROR'
    | 'VIDEO_ID_REQUIRED';
  message: string;
};

function json(res: NextApiResponse, status: number, body: ErrorResponse) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8').json(body);
}

const VIDEO_ID_RE = /^[a-zA-Z0-9_-]{11}$/;

function safeFileName(input: string) {
  const base = input.replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '');
  return base || 'youtube_shorts';
}

function isAllowedVideoHost(hostname: string) {
  const host = hostname.toLowerCase();
  return host === 'googlevideo.com' || host.endsWith('.googlevideo.com');
}

function parseJsonBody(req: NextApiRequest): unknown | null {
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  return req.body;
}

type ParsedPost =
  | { mode: 'innertube'; videoId: string; name: string }
  | { mode: 'proxy'; url: string; name: string; referer?: string }
  | { mode: 'invalid' };

function parsePost(req: NextApiRequest): ParsedPost {
  const body = parseJsonBody(req);
  if (body === null || typeof body !== 'object' || body === null) return { mode: 'invalid' };
  const b = body as { videoId?: unknown; url?: unknown; name?: unknown; referer?: unknown };

  const name = typeof b.name === 'string' ? b.name : 'youtube_shorts';
  const videoId = typeof b.videoId === 'string' ? b.videoId.trim() : '';

  if (videoId && VIDEO_ID_RE.test(videoId)) {
    return { mode: 'innertube', videoId, name };
  }

  const url = typeof b.url === 'string' ? b.url : '';
  const referer = typeof b.referer === 'string' ? b.referer : undefined;
  if (url) {
    return { mode: 'proxy', url, name, referer };
  }

  return { mode: 'invalid' };
}

/** Only allow YouTube playback URLs as Referer (must not be an open proxy). */
function sanitizePlaybackReferer(raw: string | undefined): string {
  const fallback = 'https://www.youtube.com/';
  if (!raw || typeof raw !== 'string') return fallback;
  try {
    const u = new URL(raw.trim());
    if (u.protocol !== 'https:') return fallback;
    const h = u.hostname.toLowerCase();
    const onYouTube =
      h === 'youtube.com' ||
      h === 'www.youtube.com' ||
      h === 'm.youtube.com' ||
      h === 'music.youtube.com' ||
      h === 'www.youtube-nocookie.com' ||
      h === 'youtube-nocookie.com';
    if (!onYouTube) return fallback;
    const p = u.pathname;
    if (p.startsWith('/watch') || p.startsWith('/shorts/') || p.startsWith('/embed/')) {
      return `${u.origin}${u.pathname}${u.search}`;
    }
    return fallback;
  } catch {
    return fallback;
  }
}

const INNERTUBE_DOWNLOAD_STRATEGIES = [
  /* Shorts + most videos: much smaller than 1080/4K “best” while staying sharp on phones. */
  { type: 'video+audio' as const, format: 'mp4' as const, quality: '720p' },
  /* Same max resolution as “best”, prefers lower-bitrate encode (faster, smaller). */
  { type: 'video+audio' as const, format: 'mp4' as const, quality: 'bestefficiency' },
  { type: 'video+audio' as const, format: 'mp4' as const, quality: 'best' },
];

async function streamInnertubeDownload(videoId: string, name: string, res: NextApiResponse) {
  const innertube = await getYouTubeInnerTube();

  let webReadable: ReadableStream<Uint8Array> | undefined;
  let lastError: unknown;
  for (const opts of INNERTUBE_DOWNLOAD_STRATEGIES) {
    try {
      webReadable = await innertube.download(videoId, opts);
      break;
    } catch (e) {
      lastError = e;
    }
  }
  if (!webReadable) {
    throw lastError;
  }
  const filename = `${safeFileName(name)}.mp4`;
  res.status(200);
  res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Cache-Control', 'no-store');

  await pipeline(Readable.fromWeb(webReadable as WebReadableStream), res);
}

async function proxyGoogleVideo(urlStr: string, name: string, referer: string | undefined, res: NextApiResponse) {
  let url: URL;
  try {
    url = new URL(urlStr);
  } catch {
    return json(res, 400, { ok: false, code: 'INVALID_URL', message: 'Invalid video URL.' });
  }
  if (url.protocol !== 'https:' || !isAllowedVideoHost(url.hostname)) {
    console.warn('YouTube download blocked unsupported host:', url.hostname);
    return json(res, 400, { ok: false, code: 'UNSUPPORTED_HOST', message: 'Unsupported video host.' });
  }

  const playbackReferer = sanitizePlaybackReferer(referer);
  let refererOrigin = 'https://www.youtube.com';
  try {
    refererOrigin = new URL(playbackReferer).origin;
  } catch {
    /* default */
  }

  try {
    const upstreamHeaders: Record<string, string> = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      Accept: '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      Referer: playbackReferer,
      Origin: refererOrigin,
    };
    const upstream = await fetch(url.toString(), { redirect: 'follow', headers: upstreamHeaders });
    if (!upstream.ok || !upstream.body) {
      console.warn(
        'YouTube download upstream proxy failed:',
        upstream.status,
        upstream.statusText,
        url.hostname,
      );
      return json(res, 502, { ok: false, code: 'UPSTREAM_ERROR', message: 'Failed to download from upstream.' });
    }

    const filename = `${safeFileName(name)}.mp4`;
    res.status(200);
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'video/mp4');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Cache-Control', 'no-store');

    await pipeline(Readable.fromWeb(upstream.body as WebReadableStream), res);
  } catch (e) {
    console.error('YouTube download proxy failed:', e);
    return json(res, 502, { ok: false, code: 'UPSTREAM_ERROR', message: 'Failed to download from upstream.' });
  }
}

export const config = {
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: '512kb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return json(res, 405, { ok: false, code: 'METHOD_NOT_ALLOWED', message: 'Use GET or POST.' });
  }

  if (req.method === 'POST') {
    const parsed = parsePost(req);
    if (parsed.mode === 'invalid') {
      return json(res, 400, {
        ok: false,
        code: 'INVALID_BODY',
        message: 'Provide a valid videoId or googlevideo playback URL.',
      });
    }

    try {
      if (parsed.mode === 'innertube') {
        await streamInnertubeDownload(parsed.videoId, parsed.name, res);
        return;
      }
      await proxyGoogleVideo(parsed.url, parsed.name, parsed.referer, res);
      return;
    } catch (e) {
      console.error('YouTube download failed:', e);
      if (!res.headersSent) {
        return json(res, 502, {
          ok: false,
          code: 'UPSTREAM_ERROR',
          message: 'Could not fetch this video. Try again or use another public Short.',
        });
      }
      res.end();
      return;
    }
  }

  const videoId = typeof req.query.videoId === 'string' ? req.query.videoId.trim() : '';
  if (VIDEO_ID_RE.test(videoId)) {
    try {
      const name =
        typeof req.query.name === 'string' && req.query.name.trim() !== '' ? req.query.name.trim() : 'youtube_shorts';
      await streamInnertubeDownload(videoId, name, res);
    } catch (e) {
      console.error('YouTube download failed:', e);
      if (!res.headersSent) {
        return json(res, 502, {
          ok: false,
          code: 'UPSTREAM_ERROR',
          message: 'Could not fetch this video. Try again or use another public Short.',
        });
      }
      res.end();
    }
    return;
  }

  const src = typeof req.query.url === 'string' ? req.query.url : '';
  const name =
    typeof req.query.name === 'string' && req.query.name.trim() !== '' ? req.query.name.trim() : 'youtube_shorts';

  if (!src) {
    return json(res, 400, {
      ok: false,
      code: 'VIDEO_ID_REQUIRED',
      message: 'Missing url or videoId query parameter.',
    });
  }

  await proxyGoogleVideo(src, name, undefined, res);
}
