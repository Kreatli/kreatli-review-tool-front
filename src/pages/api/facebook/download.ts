import type { NextApiRequest, NextApiResponse } from 'next';

type ErrorResponse = {
  ok: false;
  code: 'METHOD_NOT_ALLOWED' | 'INVALID_URL' | 'UNSUPPORTED_HOST' | 'UPSTREAM_ERROR';
  message: string;
};

function json(res: NextApiResponse, status: number, body: ErrorResponse) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8').json(body);
}

function isAllowedVideoHost(hostname: string) {
  const host = hostname.toLowerCase();

  if (host === 'facebook.com' || host.endsWith('.facebook.com')) return true;
  if (host === 'fbcdn.net' || host.endsWith('.fbcdn.net')) return true;
  if (host.startsWith('scontent') && host.includes('.fbcdn.net')) return true;

  return false;
}

function safeFileName(input: string) {
  const base = input.replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '');
  return base || 'facebook_reel';
}

function parseBody(req: NextApiRequest): { ok: true; url: string; name: string } | { ok: false } {
  try {
    const body: unknown = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const b = body as { url?: unknown; name?: unknown };
    const url = typeof b?.url === 'string' ? b.url : '';
    const name = typeof b?.name === 'string' ? b.name : 'facebook_reel';
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
      ? (typeof req.query.name === 'string' ? req.query.name : 'facebook_reel')
      : (() => {
          const parsed = parseBody(req);
          return parsed.ok ? parsed.name : 'facebook_reel';
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
    console.warn('Facebook download blocked unsupported host:', url.hostname);
    return json(res, 400, { ok: false, code: 'UNSUPPORTED_HOST', message: 'Unsupported video host.' });
  }

  try {
    const upstream = await fetch(url.toString(), {
      redirect: 'follow',
      headers: {
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

    const reader = upstream.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) res.write(Buffer.from(value));
    }
    res.end();
  } catch (e) {
    console.error('Facebook download proxy failed:', e);
    return json(res, 502, { ok: false, code: 'UPSTREAM_ERROR', message: 'Failed to download from upstream.' });
  }
}
