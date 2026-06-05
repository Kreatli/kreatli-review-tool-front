import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { isAvailableInKreatliPlatform } from '../data/free-tool-surface';
import { useSession } from './useSession';

type LockReason = 'inactive_subscription';

const INACTIVE_USER_ALLOWLIST_PATHNAMES = new Set<string>([
  '/free-tools/cost-calculator',
  '/free-tools/data-transfer-calculator',
]);

export function useFreeToolsEntitlementGate() {
  const router = useRouter();
  const { isSignedIn, user } = useSession();

  return useMemo(() => {
    const pathname = router.pathname;

    // Signed-out users can access the page; soft-gate nudges handle signup where needed.
    if (!isSignedIn) {
      return {
        isLocked: false,
        lockReason: null as LockReason | null,
        isSignedIn,
        isSubscriptionActive: null as boolean | null,
        isExploreMode: false,
        continueCta: null as null | { href: string; label: string },
        upgradeCta: null as null | { href: string; label: string },
      };
    }

    const isSubscriptionActive = !!user?.subscription?.isActive;
    const hasUsedTrial = !!user?.subscription?.hasUsedTrial;

    // Signed in + active => allow, but encourage continuing in app.
    if (isSubscriptionActive) {
      return {
        isLocked: false,
        lockReason: null as LockReason | null,
        isSignedIn,
        isSubscriptionActive,
        isExploreMode: false,
        continueCta: { href: '/', label: 'Continue in Kreatli' },
        upgradeCta: null as null | { href: string; label: string },
      };
    }

    // Signed in + inactive => allow only specific exceptions (calculators).
    const isExceptionAllowed = INACTIVE_USER_ALLOWLIST_PATHNAMES.has(pathname);

    if (isExceptionAllowed) {
      return {
        isLocked: false,
        lockReason: null as LockReason | null,
        isSignedIn,
        isSubscriptionActive,
        isExploreMode: !hasUsedTrial,
        continueCta: { href: '/', label: 'Continue in Kreatli' },
        upgradeCta: { href: '/?showPlansModal=true', label: 'Start trial / choose plan' },
      };
    }

    // Exploration mode: signed in, never started a trial — unlock the tool with a soft strip.
    // The upload gate in ProjectUploadContext enforces the 2-asset limit inside the app.
    if (!hasUsedTrial) {
      const showWorkspaceCta = isAvailableInKreatliPlatform(pathname);
      return {
        isLocked: false,
        lockReason: null as LockReason | null,
        isSignedIn,
        isSubscriptionActive,
        isExploreMode: true,
        continueCta: showWorkspaceCta ? { href: '/', label: 'Open in Kreatli' } : null,
        upgradeCta: { href: '/?showPlansModal=true', label: 'Start free trial' },
      };
    }

    // Expired trial: hard lock.
    const showWorkspaceCta = isAvailableInKreatliPlatform(pathname);

    return {
      isLocked: true,
      lockReason: 'inactive_subscription' as const,
      isSignedIn,
      isSubscriptionActive,
      isExploreMode: false,
      continueCta: showWorkspaceCta ? { href: '/', label: 'Go to Projects' } : null,
      upgradeCta: { href: '/?showPlansModal=true', label: 'Start trial / choose plan' },
    };
  }, [isSignedIn, router.pathname, user?.subscription?.isActive, user?.subscription?.hasUsedTrial]);
}
