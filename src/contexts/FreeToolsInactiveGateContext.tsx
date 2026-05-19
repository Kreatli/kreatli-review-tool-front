import { addToast } from '@heroui/react';
import { createContext, ReactNode, useCallback, useContext, useMemo, useRef } from 'react';

import { FreeToolSurface } from '../data/free-tool-surface';
import { usePlansModalVisibility } from '../hooks/usePlansModalVisibility';

export type FreeToolsInactiveGateContextValue = {
  isInactiveLocked: boolean;
  openInactivePlanModal: (options?: { force?: boolean }) => void;
};

const defaultValue: FreeToolsInactiveGateContextValue = {
  isInactiveLocked: false,
  openInactivePlanModal: () => {},
};

const FreeToolsInactiveGateContext = createContext<FreeToolsInactiveGateContextValue>(defaultValue);

export function FreeToolsInactiveGateProvider({
  isInactiveLocked,
  surface,
  children,
}: {
  isInactiveLocked: boolean;
  surface: FreeToolSurface | null;
  children: ReactNode;
}) {
  const setPlansModalVisible = usePlansModalVisibility((s) => s.setIsVisible);
  const isModalVisible = usePlansModalVisibility((s) => s.isVisible);
  const hasAutoShownModalRef = useRef(false);

  const showModal = useCallback(() => {
    setPlansModalVisible(true, 'free_tool_gate');
  }, [setPlansModalVisible]);

  const openInactivePlanModal = useCallback(
    (options?: { force?: boolean }) => {
      // Explicit intent (banner or toast CTA) — always open.
      if (options?.force) {
        showModal();
        return;
      }

      // Platform previews: keep original behaviour — open modal on every blocked action.
      if (surface !== 'browser_marketing') {
        showModal();
        return;
      }

      // Modal is already visible — nothing to do.
      if (isModalVisible) return;

      // First blocked action this page load — open modal.
      if (!hasAutoShownModalRef.current) {
        hasAutoShownModalRef.current = true;
        showModal();
        return;
      }

      // Repeat blocked action after dismiss — show a toast nudge.
      // The locked banner on the page carries the explicit "Start trial" CTA.
      addToast({
        title: 'A trial or plan is needed to use this tool',
        description: 'Click "Start trial / choose plan" above to continue.',
        color: 'warning',
        variant: 'flat',
      });
    },
    [surface, isModalVisible, showModal],
  );

  const value = useMemo(
    () =>
      isInactiveLocked
        ? { isInactiveLocked: true, openInactivePlanModal }
        : defaultValue,
    [isInactiveLocked, openInactivePlanModal],
  );

  return <FreeToolsInactiveGateContext.Provider value={value}>{children}</FreeToolsInactiveGateContext.Provider>;
}

export function useFreeToolsInactiveGate() {
  return useContext(FreeToolsInactiveGateContext);
}
