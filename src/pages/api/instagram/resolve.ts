import type { NextApiRequest, NextApiResponse } from 'next';

import { decodeHtmlEntities } from '../../../utils/decodeHtmlEntities';

/**
 * Instagram Reel resolution (mirror of TikTok flow):
 * 1) POST /api/graphql (shortcode_media) — works on many residential / low-friction IPs.
 * 2) HTML fetch with browser-like headers + /p/ and /reel/ variants + mobile UA.
 * 3) Recursive scan of application/json script tags + loose CDN URL patterns.
 * 4) Open Graph meta (any attribute order, entities).
 *
 * Share links may be /reel/…, /p/…, or /{username}/reel/… — we normalize by shortcode.
 */

type ResolveSource = 'graphql' | 'embedded' | 'opengraph';

type ResolveOkResponse = {
  ok: true;
  source: ResolveSource;
  videoUrl: string;
  hdVideoUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  author?: string;
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
    | 'UPSTREAM_ERROR';
  message: string;
};

const ALLOWED_HOSTS = new Set(['instagram.com', 'www.instagram.com', 'm.instagram.com']);

/** Instagram web app id (public, used by official web client). */
const DEFAULT_IG_APP_ID = '936619743392459';
/** Persisted query id for shortcode media (may need rotation via INSTAGRAM_GRAPHQL_DOC_ID). */
const DEFAULT_GRAPHQL_DOC_ID = '10015901848480474';

function json(res: NextApiResponse, status: number, body: ResolveOkResponse | ResolveErrorResponse) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8').json(body);
}

function sanitizeErrorMessage(message: string) {
  return message.replace(/https?:\/\/\S+/g, '[url]').slice(0, 240);
}

function extractShortcodeFromPath(pathname: string): string | null {
  const path = pathname.replace(/\/+$/, '') || '/';
  const m = path.match(/\/(?:reel|reels|p)\/([A-Za-z0-9_-]+)\/?$/);
  return m?.[1] ?? null;
}

function isAllowedInstagramReelUrl(
  input: string,
): { ok: true; shortcode: string; displayUrl: URL } | { ok: false; code: ResolveErrorResponse['code']; message: string } {
  let url: URL;
  try {
    url = new URL(input);
  } catch {
    return { ok: false, code: 'INVALID_URL', message: 'Enter a valid Instagram URL.' };
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    return { ok: false, code: 'INVALID_URL', message: 'Enter a valid Instagram URL.' };
  }
  const host = url.hostname.toLowerCase();
  if (!ALLOWED_HOSTS.has(host)) {
    return { ok: false, code: 'UNSUPPORTED_DOMAIN', message: 'Only Instagram links are supported.' };
  }

  const shortcode = extractShortcodeFromPath(url.pathname);
  if (!shortcode) {
    return {
      ok: false,
      code: 'UNSUPPORTED_DOMAIN',
      message: 'Use a link to a specific Reel or post (…/reel/…, …/reels/…, or …/p/…).',
    };
  }

  url.protocol = 'https:';
  return { ok: true, shortcode, displayUrl: url };
}

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit & { timeoutMs?: number } = {}) {
  const { timeoutMs = 15_000, ...rest } = init;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...rest, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function extractOpenGraph(html: string) {
  const pick = (property: string): string | undefined => {
    const patterns = [
      new RegExp(`<meta\\s+[^>]*property=["']${property}["'][^>]*content=["']([^"']+)["']`, 'i'),
      new RegExp(`<meta\\s+[^>]*content=["']([^"']+)["'][^>]*property=["']${property}["']`, 'i'),
    ];
    for (const re of patterns) {
      const m = html.match(re);
      if (m?.[1]) return decodeHtmlEntities(m[1]);
    }
    return undefined;
  };
  const title = pick('og:title') || pick('twitter:title');
  const videoUrl = pick('og:video') || pick('og:video:url') || pick('twitter:player:stream');
  const thumbnailUrl = pick('og:image') || pick('twitter:image');
  return { title, videoUrl, thumbnailUrl };
}

function decodeEscapedUrl(raw: string): string {
  try {
    return JSON.parse(`"${raw.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`) as string;
  } catch {
    return raw.replace(/\\\//g, '/').replace(/\\u0026/g, '&');
  }
}

function isMetaVideoUrl(u: string): boolean {
  try {
    const h = new URL(u).hostname.toLowerCase();
    return h.includes('cdninstagram.com') || h.includes('fbcdn.net');
  } catch {
    return false;
  }
}

type SizedUrl = { width: number; url: string };

function collectFromJsonValue(x: unknown, sized: SizedUrl[], loose: string[]): void {
  if (x === null || x === undefined) return;
  if (typeof x === 'string') {
    if (isMetaVideoUrl(x) && (/\.mp4|\/video\/|\/v\/t\d|oe=[\dA-Fa-f]+/i.test(x) || x.length > 80)) {
      loose.push(x);
    }
    return;
  }
  if (Array.isArray(x)) {
    for (const item of x) collectFromJsonValue(item, sized, loose);
    return;
  }
  if (typeof x === 'object') {
    const o = x as Record<string, unknown>;
    if (Array.isArray(o.video_versions)) {
      for (const v of o.video_versions) {
        if (v && typeof v === 'object') {
          const ver = v as { width?: unknown; url?: unknown };
          const w = typeof ver.width === 'number' ? ver.width : 0;
          const u = typeof ver.url === 'string' ? ver.url : '';
          if (u && isMetaVideoUrl(u)) sized.push({ width: w, url: u });
        }
      }
    }
    for (const k of ['video_url', 'playback_url', 'playable_url'] as const) {
      const u = o[k];
      if (typeof u === 'string' && isMetaVideoUrl(u)) loose.push(u);
    }
    for (const v of Object.values(o)) collectFromJsonValue(v, sized, loose);
  }
}

function extractFromJsonScripts(html: string): { best: SizedUrl[]; loose: string[] } {
  const sized: SizedUrl[] = [];
  const loose: string[] = [];
  const re = /<script[^>]*type=["']application\/json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const body = m[1]?.trim();
    if (!body || body.length > 2_000_000) continue;
    try {
      const data = JSON.parse(body) as unknown;
      collectFromJsonValue(data, sized, loose);
    } catch {
      // ignore invalid JSON
    }
  }
  return {
    best: sized.sort((a, b) => b.width - a.width),
    loose: Array.from(new Set(loose)),
  };
}

function extractLoosePatterns(html: string): string[] {
  const normalized = html.replace(/\\\//g, '/');
  const out = new Set<string>();
  const quotedUrlPatterns = [
    /"video_url"\s*:\s*"([^"]+)"/g,
    /"playback_url"\s*:\s*"([^"]+)"/g,
    /"playable_url"\s*:\s*"([^"]+)"/g,
    /"width"\s*:\s*\d+\s*,\s*"height"\s*:\s*\d+\s*,\s*"type"\s*:\s*\d+\s*,\s*"url"\s*:\s*"([^"]+)"/g,
  ];
  for (const re of quotedUrlPatterns) {
    let m: RegExpExecArray | null;
    re.lastIndex = 0;
    while ((m = re.exec(normalized)) !== null) {
      const url = decodeEscapedUrl(m[1]!);
      if (isMetaVideoUrl(url)) out.add(url);
    }
  }
  const cdnRe = /https:\/\/[a-z0-9.-]*(?:cdninstagram\.com|fbcdn\.net)\/[^"'\\\s<>]{20,800}/gi;
  let cm: RegExpExecArray | null;
  while ((cm = cdnRe.exec(normalized)) !== null) {
    const u = cm[0].replace(/\\$/, '');
    if (/\.mp4|\/v\/t\d/i.test(u)) out.add(u);
  }
  return Array.from(out);
}

function pickBestVideos(sized: SizedUrl[], loose: string[]): { videoUrl: string; hdVideoUrl?: string } | null {
  if (sized.length > 0) {
    const hd = sized[0]!.url;
    const sd = sized.length > 1 ? sized[sized.length - 1]!.url : hd;
    return { videoUrl: sd, hdVideoUrl: hd !== sd ? hd : undefined };
  }
  if (loose.length > 0) {
    const sorted = [...loose].sort((a, b) => b.length - a.length);
    return { videoUrl: sorted[0]! };
  }
  return null;
}

function mergeVideoCandidates(html: string): { videoUrl: string; hdVideoUrl?: string } | null {
  const fromScripts = extractFromJsonScripts(html);
  const loosePatterns = extractLoosePatterns(html);
  const allLoose = Array.from(new Set([...fromScripts.loose, ...loosePatterns]));
  return pickBestVideos(fromScripts.best, allLoose);
}

const DESKTOP_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const MOBILE_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1';

function browserHeaders(): HeadersInit {
  return {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Referer: 'https://www.instagram.com/',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'User-Agent': DESKTOP_UA,
  };
}

async function fetchHtmlForShortcode(shortcode: string): Promise<string> {
  const urls = [
    `https://www.instagram.com/reel/${shortcode}/`,
    `https://www.instagram.com/p/${shortcode}/`,
    `https://www.instagram.com/reel/${shortcode}/embed/`,
  ];
  const uas = [DESKTOP_UA, MOBILE_UA];

  let lastStatus = 0;
  for (const pageUrl of urls) {
    for (const ua of uas) {
      const res = await fetchWithTimeout(pageUrl, {
        headers: { ...browserHeaders(), 'User-Agent': ua },
        redirect: 'follow',
        timeoutMs: 15_000,
      });
      lastStatus = res.status;
      if (!res.ok) continue;
      const html = await res.text();
      if (html.length > 5000) return html;
    }
  }
  if (lastStatus) throw new Error(`Instagram responded ${lastStatus}`);
  throw new Error('Could not fetch Instagram page.');
}

type GraphqlMedia = {
  video_url?: string;
  videoUrl?: string;
  video_versions?: { width?: number; url?: string }[];
  thumbnail_src?: string;
  display_url?: string;
  edge_media_to_caption?: { edges?: { node?: { text?: string } }[] };
  owner?: { username?: string };
};

function mediaToResponse(media: GraphqlMedia, source: ResolveSource): ResolveOkResponse {
  let videoUrl = '';
  let hdVideoUrl: string | undefined;
  if (Array.isArray(media.video_versions) && media.video_versions.length > 0) {
    const sorted = [...media.video_versions]
      .filter((v) => v?.url && isMetaVideoUrl(v.url))
      .sort((a, b) => (b.width || 0) - (a.width || 0));
    if (sorted.length > 0) {
      const hd = sorted[0]!.url!;
      const sd = sorted.length > 1 ? sorted[sorted.length - 1]!.url! : hd;
      videoUrl = sd;
      hdVideoUrl = hd !== sd ? hd : undefined;
    }
  }
  const direct =
    (typeof media.video_url === 'string' && media.video_url) ||
    (typeof media.videoUrl === 'string' && media.videoUrl) ||
    '';
  if (!videoUrl && direct && isMetaVideoUrl(direct)) {
    videoUrl = direct;
  }
  if (!videoUrl) throw new Error('GraphQL returned no video URL.');

  const captionRaw = media.edge_media_to_caption?.edges?.[0]?.node?.text;
  const caption = captionRaw ? decodeHtmlEntities(captionRaw).trim() : undefined;
  const thumb = media.thumbnail_src || media.display_url;

  return {
    ok: true,
    source,
    videoUrl,
    hdVideoUrl,
    thumbnailUrl: thumb,
    title: caption ? caption.slice(0, 500) : undefined,
    author: media.owner?.username,
    watermarked: false,
  };
}

async function resolveViaGraphql(shortcode: string): Promise<ResolveOkResponse | null> {
  const docId = process.env.INSTAGRAM_GRAPHQL_DOC_ID || DEFAULT_GRAPHQL_DOC_ID;
  const appId = process.env.INSTAGRAM_IG_APP_ID || DEFAULT_IG_APP_ID;
  const lsd = 'AVqbxe3J_YA';

  const body = new URLSearchParams({
    variables: JSON.stringify({ shortcode }),
    doc_id: docId,
    lsd,
  });

  const res = await fetchWithTimeout('https://www.instagram.com/api/graphql', {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Content-Type': 'application/x-www-form-urlencoded',
      Origin: 'https://www.instagram.com',
      Referer: `https://www.instagram.com/reel/${shortcode}/`,
      'User-Agent': DESKTOP_UA,
      'X-ASBD-ID': '129477',
      'X-FB-LSD': lsd,
      'X-IG-App-ID': appId,
    },
    body,
    timeoutMs: 15_000,
  });

  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('json')) return null;

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    return null;
  }

  const media = (data as { data?: { xdt_shortcode_media?: GraphqlMedia } })?.data?.xdt_shortcode_media;
  if (!media) return null;

  try {
    return mediaToResponse(media, 'graphql');
  } catch {
    return null;
  }
}

async function resolveViaHtml(shortcode: string): Promise<ResolveOkResponse> {
  const html = await fetchHtmlForShortcode(shortcode);
  const embedded = mergeVideoCandidates(html);
  const og = extractOpenGraph(html);

  if (embedded?.videoUrl) {
    return {
      ok: true,
      source: 'embedded',
      videoUrl: embedded.videoUrl,
      hdVideoUrl: embedded.hdVideoUrl,
      thumbnailUrl: og.thumbnailUrl,
      title: og.title ? decodeHtmlEntities(og.title) : undefined,
      author: undefined,
      watermarked: false,
    };
  }

  if (og.videoUrl) {
    const v = decodeEscapedUrl(og.videoUrl);
    return {
      ok: true,
      source: 'opengraph',
      videoUrl: v,
      thumbnailUrl: og.thumbnailUrl,
      title: og.title ? decodeHtmlEntities(og.title) : undefined,
      author: undefined,
      watermarked: true,
    };
  }

  throw new Error('Could not extract a playable video URL from this Instagram link.');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResolveOkResponse | ResolveErrorResponse>,
) {
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

  const b = body as { url?: unknown };
  const urlInput = typeof b?.url === 'string' ? b.url.trim() : '';
  if (!urlInput) return json(res, 400, { ok: false, code: 'INVALID_URL', message: 'Enter an Instagram URL.' });

  const parsed = isAllowedInstagramReelUrl(urlInput);
  if (!parsed.ok) return json(res, 400, { ok: false, code: parsed.code, message: parsed.message });

  const { shortcode } = parsed;

  try {
    const gql = await resolveViaGraphql(shortcode).catch(() => null);
    if (gql) return json(res, 200, gql);

    const resolved = await resolveViaHtml(shortcode);
    return json(res, 200, resolved);
  } catch (e) {
    if ((e as Error)?.name === 'AbortError') {
      return json(res, 504, {
        ok: false,
        code: 'UPSTREAM_TIMEOUT',
        message: 'Instagram took too long to respond. Try again.',
      });
    }
    const message = sanitizeErrorMessage((e as Error)?.message || 'Could not resolve this Instagram link.');
    console.error('Instagram resolve failed:', message);
    return json(res, 502, {
      ok: false,
      code: 'RESOLVE_FAILED',
      message: 'Could not resolve this Instagram link. Try a different public Reel or post.',
    });
  }
}
