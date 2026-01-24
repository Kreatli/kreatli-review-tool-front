import { useCallback, useEffect, useRef } from 'react';

import { useSession } from './useSession';
import { useSignUpModalVisibility } from './useSignUpModalVisibility';

/**
 * "Soft gate" helper: show sign-up modal after a trigger event (e.g. upload),
 * and if the modal is dismissed without signing in, reset local tool state.
 */
export function useSoftGate({
  enabled = true,
  onReset,
}: {
  enabled?: boolean;
  onReset: () => void;
}) {
  const { isSignedIn } = useSession();
  const { isSignUpModalOpen, openSignUpModal } = useSignUpModalVisibility();

  // Armed when we triggered the gate for this component.
  const isArmedRef = useRef(false);

  const triggerSoftGate = useCallback((): boolean => {
    if (!enabled) return false;
    if (isSignedIn) return false;
    isArmedRef.current = true;
    openSignUpModal();
    return true;
  }, [enabled, isSignedIn, openSignUpModal]);

  useEffect(() => {
    if (!isArmedRef.current) return;

    // If user became signed in, let them continue with whatever they uploaded.
    if (isSignedIn) {
      isArmedRef.current = false;
      return;
    }

    // Modal was closed and user is still not signed in -> reset tool state.
    if (!isSignUpModalOpen) {
      isArmedRef.current = false;
      onReset();
    }
  }, [isSignUpModalOpen, isSignedIn, onReset]);

  return {
    triggerSoftGate,
  };
}

