import { isStandaloneMarketingToolPathname } from '../utils/standaloneMarketingToolAuth';

/**
 * 'browser_marketing' — utility that runs fully in the browser on the marketing site
 *   (banner resizer, video compressor, downloaders, safe-zone checkers, etc.)
 *   After signup, the user stays on the current URL.
 *
 * 'platform_preview' — marketing demo of a capability that lives inside the Kreatli app
 *   (review tool previews, compare/share feature demos, etc.)
 *   After signup, the user is directed to the app (/?showPlansModal=true or /projects).
 */
export type FreeToolSurface = 'browser_marketing' | 'platform_preview';

/**
 * Returns the surface type for a free-tool page pathname, or null when the
 * page is not a gated free-tool (e.g. /free-tools index, calculators in
 * their unlocked state, unrelated pages).
 */
export function getFreeToolSurface(pathname: string): FreeToolSurface | null {
  if (isStandaloneMarketingToolPathname(pathname)) return 'browser_marketing';
  if (pathname.startsWith('/free-tools/') || pathname.startsWith('/safe-zone-checker')) return 'platform_preview';
  return null;
}

/** True when the tool maps to a real in-app capability (review, compare, share links, etc.). */
export function isAvailableInKreatliPlatform(pathname: string): boolean {
  return getFreeToolSurface(pathname) === 'platform_preview';
}
