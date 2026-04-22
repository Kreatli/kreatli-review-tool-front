import type { NextApiRequest, NextApiResponse } from 'next';

type ResolveOkResponse = {
  ok: true;
  source: 'tikwm' | 'opengraph';
  /** Best-effort: no-watermark when available */
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

const ALLOWED_HOSTS = new Set(['tiktok.com', 'www.tiktok.com', 'm.tiktok.com', 'vm.tiktok.com', 'vt.tiktok.com']);

function json(res: NextApiResponse, status: number, body: ResolveOkResponse | ResolveErrorResponse) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8').json(body);
}

function sanitizeErrorMessage(message: string) {
  // Avoid accidentally reflecting full URLs or tokens in responses.
  return message.replace(/https?:\/\/\S+/g, '[url]').slice(0, 240);
}

function isAllowedTikTokUrl(input: string): { ok: true; url: URL } | { ok: false; code: ResolveErrorResponse['code']; message: string } {
  let url: URL;
  try {
    url = new URL(input);
  } catch {
    return { ok: false, code: 'INVALID_URL', message: 'Enter a valid TikTok URL.' };
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    return { ok: false, code: 'INVALID_URL', message: 'Enter a valid TikTok URL.' };
  }
  const host = url.hostname.toLowerCase();
  const normalized = host === 'www.tiktok.com' ? 'tiktok.com' : host;
  if (!ALLOWED_HOSTS.has(normalized)) {
    return { ok: false, code: 'UNSUPPORTED_DOMAIN', message: 'Only TikTok links are supported.' };
  }
  return { ok: true, url };
}

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit & { timeoutMs?: number } = {}) {
  const { timeoutMs = 12_000, ...rest } = init;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(input, { ...rest, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timeout);
  }
}

function extractOpenGraph(html: string) {
  const get = (property: string) => {
    const re = new RegExp(`<meta\\s+property=["']${property}["']\\s+content=["']([^"']+)["']\\s*\\/?>`, 'i');
    const m = html.match(re);
    return m?.[1];
  };
  const title = get('og:title') || get('twitter:title');
  const videoUrl = get('og:video') || get('og:video:url') || get('twitter:player:stream');
  const thumbnailUrl = get('og:image') || get('twitter:image');
  return { title, videoUrl, thumbnailUrl };
}

async function resolveViaTikwm(originalUrl: string) {
  const apiUrl = new URL('https://tikwm.com/api/');
  apiUrl.searchParams.set('url', originalUrl);
  apiUrl.searchParams.set('hd', '1');

  const res = await fetchWithTimeout(apiUrl, {
    headers: {
      Accept: 'application/json',
      // Some upstreams are picky; a basic UA helps.
      'User-Agent': 'KreatliBot/1.0 (+https://kreatli.com)',
    },
    timeoutMs: 12_000,
  });

  if (!res.ok) throw new Error(`TikWM responded ${res.status}`);
  const data = (await res.json()) as any;

  // Typical: { code: 0, msg: "...", data: { play, hdplay, wmplay, title, author, cover } }
  const code = data?.code;
  if (code !== 0) {
    const msg = typeof data?.msg === 'string' ? data.msg : 'Could not resolve this TikTok link.';
    throw new Error(msg);
  }
  const d = data?.data ?? {};
  const videoUrl: string | undefined = d?.play || d?.hdplay || d?.wmplay;
  const hdVideoUrl: string | undefined = d?.hdplay;
  const thumbnailUrl: string | undefined = d?.cover || d?.origin_cover;
  const title: string | undefined = d?.title;
  const author: string | undefined = d?.author;

  if (!videoUrl) throw new Error('TikWM returned no playable video URL.');

  return {
    source: 'tikwm' as const,
    videoUrl,
    hdVideoUrl,
    thumbnailUrl,
    title,
    author,
    watermarked: false,
  };
}

async function resolveViaOpenGraph(originalUrl: string) {
  const res = await fetchWithTimeout(originalUrl, {
    headers: {
      Accept: 'text/html,application/xhtml+xml',
      'User-Agent': 'Mozilla/5.0 (compatible; KreatliBot/1.0; +https://kreatli.com)',
    },
    redirect: 'follow',
    timeoutMs: 12_000,
  });

  if (!res.ok) throw new Error(`TikTok responded ${res.status}`);
  const html = await res.text();
  const og = extractOpenGraph(html);
  if (!og.videoUrl) throw new Error('Could not extract a playable URL from this TikTok link.');

  return {
    source: 'opengraph' as const,
    videoUrl: og.videoUrl,
    thumbnailUrl: og.thumbnailUrl,
    title: og.title,
    author: undefined,
    watermarked: true,
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResolveOkResponse | ResolveErrorResponse>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { ok: false, code: 'METHOD_NOT_ALLOWED', message: 'Use POST.' });
  }

  let body: any;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return json(res, 400, { ok: false, code: 'INVALID_JSON', message: 'Invalid JSON body.' });
  }

  const urlInput = typeof body?.url === 'string' ? body.url.trim() : '';
  if (!urlInput) return json(res, 400, { ok: false, code: 'INVALID_URL', message: 'Enter a TikTok URL.' });

  const parsed = isAllowedTikTokUrl(urlInput);
  if (!parsed.ok) return json(res, 400, { ok: false, code: parsed.code, message: parsed.message });

  try {
    // Best-effort: try a no-watermark resolver first, then fallback to OpenGraph.
    const resolved = await resolveViaTikwm(parsed.url.toString()).catch(async (e) => {
      if ((e as any)?.name === 'AbortError') throw e;
      return await resolveViaOpenGraph(parsed.url.toString());
    });

    return json(res, 200, { ok: true, ...resolved });
  } catch (e) {
    if ((e as any)?.name === 'AbortError') {
      return json(res, 504, { ok: false, code: 'UPSTREAM_TIMEOUT', message: 'TikTok took too long to respond. Try again.' });
    }
    const message = sanitizeErrorMessage((e as Error)?.message || 'Could not resolve this TikTok link.');
    // Log server-side for debugging; keep client response safe.
    console.error('TikTok resolve failed:', message);
    return json(res, 502, { ok: false, code: 'RESOLVE_FAILED', message: 'Could not resolve this TikTok link. Try a different public video.' });
  }
}

