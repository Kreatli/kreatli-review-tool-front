import { useMemo } from 'react';

import { useRouter } from 'next/router';

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
        continueCta: null as null | { href: string; label: string },
        upgradeCta: null as null | { href: string; label: string },
      };
    }

    const isSubscriptionActive = !!user?.subscription?.isActive;

    // Signed in + active => allow, but encourage continuing in app.
    if (isSubscriptionActive) {
      return {
        isLocked: false,
        lockReason: null as LockReason | null,
        isSignedIn,
        isSubscriptionActive,
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
        continueCta: { href: '/', label: 'Continue in Kreatli' },
        upgradeCta: { href: '/?showPlansModal=true', label: 'Start trial / choose plan' },
      };
    }

    return {
      isLocked: true,
      lockReason: 'inactive_subscription' as const,
      isSignedIn,
      isSubscriptionActive,
      continueCta: { href: '/', label: 'Go to Projects' },
      upgradeCta: { href: '/?showPlansModal=true', label: 'Start trial / choose plan' },
    };
  }, [isSignedIn, router.pathname, user?.subscription?.isActive]);
}

