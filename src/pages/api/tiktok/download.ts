import type { NextApiRequest, NextApiResponse } from 'next';

type ErrorResponse = { ok: false; code: 'METHOD_NOT_ALLOWED' | 'INVALID_URL' | 'UNSUPPORTED_HOST' | 'UPSTREAM_ERROR'; message: string };

function json(res: NextApiResponse, status: number, body: ErrorResponse) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8').json(body);
}

function isAllowedVideoHost(hostname: string) {
  const host = hostname.toLowerCase();

  // TikWM hosts (used by our resolver; serves mp4 bytes)
  if (host === 'tikwm.com' || host.endsWith('.tikwm.com')) return true;

  // TikTok page hosts (occasionally returned by fallback resolvers)
  if (host === 'tiktok.com' || host.endsWith('.tiktok.com')) return true;

  // TikTok CDN / video hosts.
  // Examples observed in the wild: v16m.tiktokcdn-us.com, v16m-default.tiktokcdn-us.com, *.tiktokcdn.com, *.tiktokv.com
  const cdnOk = /(^|\.)tiktokcdn[-a-z0-9]*\.com$/.test(host);
  const vOk = /(^|\.)tiktokv\.com$/.test(host);
  return cdnOk || vOk;
}

function safeFileName(input: string) {
  const base = input.replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '');
  return base || 'tiktok_video';
}

function parseBody(req: NextApiRequest): { ok: true; url: string; name: string } | { ok: false } {
  try {
    const body: any = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const url = typeof body?.url === 'string' ? body.url : '';
    const name = typeof body?.name === 'string' ? body.name : 'tiktok_video';
    return { ok: true, url, name };
  } catch {
    return { ok: false };
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return json(res, 405, { ok: false, code: 'METHOD_NOT_ALLOWED', message: 'Use GET or POST.' });
  }

  const src =
    req.method === 'GET'
      ? (typeof req.query.url === 'string' ? req.query.url : '')
      : (() => {
          const parsed = parseBody(req);
          return parsed.ok ? parsed.url : '';
        })();

  const name =
    req.method === 'GET'
      ? (typeof req.query.name === 'string' ? req.query.name : 'tiktok_video')
      : (() => {
          const parsed = parseBody(req);
          return parsed.ok ? parsed.name : 'tiktok_video';
        })();

  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return json(res, 400, { ok: false, code: 'INVALID_URL', message: 'Invalid video URL.' });
  }

  if (url.protocol !== 'https:') {
    return json(res, 400, { ok: false, code: 'INVALID_URL', message: 'Invalid video URL.' });
  }
  if (!isAllowedVideoHost(url.hostname)) {
    console.warn('TikTok download blocked unsupported host:', url.hostname);
    return json(res, 400, { ok: false, code: 'UNSUPPORTED_HOST', message: 'Unsupported video host.' });
  }

  try {
    const upstream = await fetch(url.toString(), {
      redirect: 'follow',
      headers: {
        // Some CDNs require UA; keep it simple.
        'User-Agent': 'Mozilla/5.0 (compatible; KreatliBot/1.0; +https://kreatli.com)',
      },
    });

    if (!upstream.ok || !upstream.body) {
      return json(res, 502, { ok: false, code: 'UPSTREAM_ERROR', message: 'Failed to download from upstream.' });
    }

    const filename = `${safeFileName(name)}.mp4`;
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'video/mp4');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Cache-Control', 'no-store');

    // Stream bytes to the client to avoid buffering large videos in memory.
    const reader = upstream.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) res.write(Buffer.from(value));
    }
    res.end();
  } catch (e) {
    console.error('TikTok download proxy failed:', e);
    return json(res, 502, { ok: false, code: 'UPSTREAM_ERROR', message: 'Failed to download from upstream.' });
  }
}

