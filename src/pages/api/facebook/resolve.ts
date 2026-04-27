import type { NextApiRequest, NextApiResponse } from 'next';

import { decodeHtmlEntities } from '../../../utils/decodeHtmlEntities';

type ResolveSource = 'embedded' | 'opengraph';

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
    | 'UPSTREAM_TIMEOUT';
  message: string;
};

const ALLOWED_HOSTS = new Set(['facebook.com', 'www.facebook.com', 'm.facebook.com', 'mbasic.facebook.com', 'fb.watch']);

function json(res: NextApiResponse, status: number, body: ResolveOkResponse | ResolveErrorResponse) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8').json(body);
}

function sanitizeErrorMessage(message: string) {
  return message.replace(/https?:\/\/\S+/g, '[url]').slice(0, 240);
}

function isAllowedFacebookUrl(
  input: string,
): { ok: true; displayUrl: URL } | { ok: false; code: ResolveErrorResponse['code']; message: string } {
  let url: URL;
  try {
    url = new URL(input);
  } catch {
    return { ok: false, code: 'INVALID_URL', message: 'Enter a valid Facebook URL.' };
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    return { ok: false, code: 'INVALID_URL', message: 'Enter a valid Facebook URL.' };
  }
  const host = url.hostname.toLowerCase();
  if (!ALLOWED_HOSTS.has(host)) {
    return { ok: false, code: 'UNSUPPORTED_DOMAIN', message: 'Only Facebook links are supported.' };
  }

  const path = url.pathname.toLowerCase();
  const isKnownShape =
    host === 'fb.watch' || path.startsWith('/reel/') || (path.startsWith('/watch') && Boolean(url.searchParams.get('v'))) || /\/videos\/\d+/.test(path);
  if (!isKnownShape) {
    return {
      ok: false,
      code: 'UNSUPPORTED_DOMAIN',
      message: 'Use a public Facebook Reel or video link (reel, watch, videos, or fb.watch).',
    };
  }

  url.protocol = 'https:';
  return { ok: true, displayUrl: url };
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

function decodeEscapedUrl(raw: string): string {
  try {
    return JSON.parse(`"${raw.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`) as string;
  } catch {
    return raw.replace(/\\\//g, '/').replace(/\\u0026/g, '&');
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

function isAllowedVideoHost(urlString: string): boolean {
  try {
    const host = new URL(urlString).hostname.toLowerCase();
    if (host === 'fbcdn.net' || host.endsWith('.fbcdn.net')) return true;
    if (host === 'facebook.com' || host.endsWith('.facebook.com')) return true;
    if (host.startsWith('scontent') && host.includes('.fbcdn.net')) return true;
    return false;
  } catch {
    return false;
  }
}

function extractEmbeddedCandidates(html: string): string[] {
  const out = new Set<string>();
  const normalized = html.replace(/\\\//g, '/');
  const patterns = [
    /"playable_url_quality_hd"\s*:\s*"([^"]+)"/g,
    /"playable_url"\s*:\s*"([^"]+)"/g,
    /"browser_native_hd_url"\s*:\s*"([^"]+)"/g,
    /"browser_native_sd_url"\s*:\s*"([^"]+)"/g,
    /"video_url"\s*:\s*"([^"]+)"/g,
  ];
  for (const re of patterns) {
    let m: RegExpExecArray | null;
    re.lastIndex = 0;
    while ((m = re.exec(normalized)) !== null) {
      const candidate = decodeEscapedUrl(m[1]!);
      if (isAllowedVideoHost(candidate)) out.add(candidate);
    }
  }
  return Array.from(out);
}

function extractPluginCandidates(html: string): string[] {
  const out = new Set<string>();
  const normalized = html.replace(/\\\//g, '/');
  const patterns = [
    /"hd_src_no_ratelimit"\s*:\s*"([^"]+)"/g,
    /"hd_src"\s*:\s*"([^"]+)"/g,
    /"sd_src_no_ratelimit"\s*:\s*"([^"]+)"/g,
    /"sd_src"\s*:\s*"([^"]+)"/g,
  ];
  for (const re of patterns) {
    let m: RegExpExecArray | null;
    re.lastIndex = 0;
    while ((m = re.exec(normalized)) !== null) {
      const candidate = decodeEscapedUrl(m[1]!);
      if (isAllowedVideoHost(candidate)) out.add(candidate);
    }
  }
  return Array.from(out);
}

function pickBestVideos(candidates: string[]): { videoUrl: string; hdVideoUrl?: string } | null {
  if (candidates.length === 0) return null;
  const sorted = [...candidates].sort((a, b) => b.length - a.length);
  const hd = sorted[0]!;
  const sd = sorted.length > 1 ? sorted[sorted.length - 1]! : hd;
  return { videoUrl: sd, hdVideoUrl: hd !== sd ? hd : undefined };
}

function buildCandidateFetchUrls(input: string): string[] {
  const out = new Set<string>();
  let url: URL;
  try {
    url = new URL(input);
  } catch {
    return [input];
  }

  const clean = new URL(url.toString());
  clean.hash = '';
  clean.searchParams.delete('fbclid');
  clean.searchParams.delete('mibextid');
  clean.searchParams.delete('__cft__');
  clean.searchParams.delete('__tn__');
  clean.protocol = 'https:';
  out.add(clean.toString());

  const path = clean.pathname.toLowerCase();
  const watchId = clean.searchParams.get('v');
  const reelId = path.match(/\/reel\/(\d+)/)?.[1] ?? path.match(/\/videos\/(\d+)/)?.[1] ?? null;

  if (watchId) {
    out.add(`https://www.facebook.com/watch/?v=${encodeURIComponent(watchId)}`);
    out.add(`https://m.facebook.com/watch/?v=${encodeURIComponent(watchId)}`);
    out.add(`https://mbasic.facebook.com/watch/?v=${encodeURIComponent(watchId)}`);
  }
  if (reelId) {
    out.add(`https://www.facebook.com/reel/${reelId}`);
    out.add(`https://m.facebook.com/reel/${reelId}`);
    out.add(`https://mbasic.facebook.com/reel/${reelId}`);
  }

  if (clean.hostname === 'fb.watch') {
    const token = clean.pathname.replace(/^\/+|\/+$/g, '');
    if (token) {
      out.add(`https://www.facebook.com/watch/?v=${encodeURIComponent(token)}`);
      out.add(`https://m.facebook.com/watch/?v=${encodeURIComponent(token)}`);
      out.add(`https://mbasic.facebook.com/watch/?v=${encodeURIComponent(token)}`);
    }
  }

  return Array.from(out);
}

async function fetchFacebookHtmlWithFallback(publicUrl: string): Promise<string> {
  const candidates = buildCandidateFetchUrls(publicUrl);
  let lastStatus = 0;
  for (const candidateUrl of candidates) {
    const res = await fetchWithTimeout(candidateUrl, {
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Referer: 'https://www.facebook.com/',
      },
      redirect: 'follow',
      timeoutMs: 15_000,
    });
    lastStatus = res.status;
    if (!res.ok) continue;
    const html = await res.text();
    if (html.length > 3000) return html;
  }
  throw new Error(`Facebook responded ${lastStatus || 0}`);
}

async function fetchFacebookPluginHtml(publicUrl: string): Promise<string> {
  const pluginUrl = new URL('https://www.facebook.com/plugins/video.php');
  pluginUrl.searchParams.set('href', publicUrl);
  pluginUrl.searchParams.set('show_text', '0');
  pluginUrl.searchParams.set('width', '560');

  const res = await fetchWithTimeout(pluginUrl.toString(), {
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      Referer: 'https://www.facebook.com/',
    },
    redirect: 'follow',
    timeoutMs: 15_000,
  });
  if (!res.ok) throw new Error(`Facebook plugin responded ${res.status}`);
  return await res.text();
}

async function resolveViaHtml(publicUrl: string): Promise<ResolveOkResponse> {
  let html: string | null = null;
  let primaryErr: Error | null = null;
  try {
    html = await fetchFacebookHtmlWithFallback(publicUrl);
  } catch (e) {
    primaryErr = e as Error;
  }

  if (html) {
    const embedded = pickBestVideos(extractEmbeddedCandidates(html));
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
      const candidate = decodeEscapedUrl(og.videoUrl);
      if (isAllowedVideoHost(candidate)) {
        return {
          ok: true,
          source: 'opengraph',
          videoUrl: candidate,
          thumbnailUrl: og.thumbnailUrl,
          title: og.title ? decodeHtmlEntities(og.title) : undefined,
          author: undefined,
          watermarked: true,
        };
      }
    }
  }

  const pluginHtml = await fetchFacebookPluginHtml(publicUrl).catch(() => null);
  const pluginCandidates = pluginHtml ? pickBestVideos(extractPluginCandidates(pluginHtml)) : null;
  if (pluginCandidates?.videoUrl) {
    return {
      ok: true,
      source: 'embedded',
      videoUrl: pluginCandidates.videoUrl,
      hdVideoUrl: pluginCandidates.hdVideoUrl,
      thumbnailUrl: html ? extractOpenGraph(html).thumbnailUrl : undefined,
      title: html ? extractOpenGraph(html).title : undefined,
      author: undefined,
      watermarked: false,
    };
  }

  if (primaryErr) throw primaryErr;
  throw new Error('Could not extract a playable video URL from this Facebook link.');
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
  if (!urlInput) return json(res, 400, { ok: false, code: 'INVALID_URL', message: 'Enter a Facebook URL.' });

  const parsed = isAllowedFacebookUrl(urlInput);
  if (!parsed.ok) return json(res, 400, { ok: false, code: parsed.code, message: parsed.message });

  try {
    const resolved = await resolveViaHtml(parsed.displayUrl.toString());
    return json(res, 200, resolved);
  } catch (e) {
    if ((e as Error)?.name === 'AbortError') {
      return json(res, 504, {
        ok: false,
        code: 'UPSTREAM_TIMEOUT',
        message: 'Facebook took too long to respond. Try again.',
      });
    }
    const message = sanitizeErrorMessage((e as Error)?.message || 'Could not resolve this Facebook link.');
    console.error('Facebook resolve failed:', message);
    return json(res, 502, {
      ok: false,
      code: 'RESOLVE_FAILED',
      message: 'Could not resolve this Facebook link. Try a different public Reel/video URL.',
    });
  }
}
