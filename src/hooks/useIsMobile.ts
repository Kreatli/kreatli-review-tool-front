import { useMediaQuery } from './useMediaQuery';

/** Breakpoint aligned with Tailwind md (768px). True when viewport width < 768px. */
const MOBILE_QUERY = '(max-width: 767px)';

export function useIsMobile(): boolean {
  return useMediaQuery(MOBILE_QUERY);
}
