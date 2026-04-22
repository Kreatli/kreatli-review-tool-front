/**
 * Browser-first marketing tools: after sign-in / SSO sign-up, stay on the same URL
 * instead of sending users to `/` or `/?showPlansModal=true`.
 */

const CALCULATOR_PATHNAMES = new Set(['/free-tools/cost-calculator', '/free-tools/data-transfer-calculator']);

const STANDALONE_EXACT_PATHNAMES = new Set<string>([
  '/free-tools/cost-calculator',
  '/free-tools/data-transfer-calculator',
  '/free-tools/youtube-banner-resizer',
  '/free-tools/resize-video',
  '/free-tools/video-frame-extractor',
  '/free-tools/video-compressor',
  '/free-tools/tiktok-video-downloader',
  '/free-tools/tiktok-downloader',
  '/free-tools/instagram-reel-downloader',
  '/free-tools/instagram-downloader',
  '/platform/resize-video-online',
  '/platform/compress-video-online',
  '/platform/extract-frames-from-video',
]);

export function isStandaloneMarketingToolPathname(pathname: string): boolean {
  if (STANDALONE_EXACT_PATHNAMES.has(pathname)) return true;
  if (pathname === '/safe-zone-checker' || pathname.startsWith('/safe-zone-checker/')) return true;
  return false;
}

/**
 * Validates `returnTo` from the query string: same-origin relative path only, and must be a standalone tool URL.
 */
export function getSafeReturnToParam(returnTo: string): string | null {
  if (!returnTo.startsWith('/') || returnTo.startsWith('//')) return null;
  if (returnTo.includes('://')) return null;
  const pathname = returnTo.split('?')[0].split('#')[0];
  if (!isStandaloneMarketingToolPathname(pathname)) return null;
  return returnTo;
}

/**
 * `router.replace` target after auth on a standalone tool page (or null if this is not a standalone tool).
 */
export function getStandaloneToolPostAuthReplaceUrl(
  pathname: string,
  asPath: string,
  isSubscriptionActive: boolean,
): string | null {
  if (!isStandaloneMarketingToolPathname(pathname)) return null;

  const pathNoHash = asPath.split('#')[0];

  if (isSubscriptionActive || CALCULATOR_PATHNAMES.has(pathname)) {
    return pathNoHash || pathname;
  }

  const [path, query = ''] = pathNoHash.includes('?') ? pathNoHash.split('?') : [pathNoHash, ''];
  const params = new URLSearchParams(query);
  params.set('showPlansModal', 'true');
  return `${path}?${params.toString()}`;
}

export function buildSignInHrefWithReturnTo(pathname: string, asPath: string): string {
  if (!isStandaloneMarketingToolPathname(pathname)) return '/sign-in';
  return `/sign-in?returnTo=${encodeURIComponent(asPath)}`;
}
