/**
 * Browser-first marketing tools: after sign-in / SSO sign-up, stay on the same URL
 * instead of sending users to `/` or `/?showPlansModal=true`.
 */

const STANDALONE_EXACT_PATHNAMES = new Set<string>([
  '/free-tools/cost-calculator',
  '/free-tools/data-transfer-calculator',
  '/free-tools/youtube-banner-resizer',
  '/free-tools/resize-video',
  '/free-tools/video-frame-extractor',
  '/free-tools/video-compressor',
  '/free-tools/video-frame-rate-converter',
  '/free-tools/frame-rate-converter',
  '/free-tools/tiktok-video-downloader',
  '/free-tools/tiktok-downloader',
  '/free-tools/instagram-reel-downloader',
  '/free-tools/instagram-downloader',
  '/free-tools/facebook-reel-downloader',
  '/free-tools/youtube-shorts-downloader',
  '/free-tools/youtube-downloader',
  '/platform/resize-video-online',
  '/platform/compress-video-online',
  '/platform/video-frame-rate-converter',
  '/platform/extract-frames-from-video',
  '/platform/download-facebook-reels',
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
 *
 * Always returns the clean tool URL — the in-page gate handles the paywall when
 * the user tries to use the tool, not immediately on landing after signup.
 */
export function getStandaloneToolPostAuthReplaceUrl(pathname: string, asPath: string): string | null {
  if (!isStandaloneMarketingToolPathname(pathname)) return null;

  const pathNoHash = asPath.split('#')[0];
  return pathNoHash || pathname;
}

export function buildSignInHrefWithReturnTo(pathname: string, asPath: string): string {
  if (!isStandaloneMarketingToolPathname(pathname)) return '/sign-in';
  return `/sign-in?returnTo=${encodeURIComponent(asPath)}`;
}
