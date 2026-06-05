import { createContext, ReactNode, useCallback, useContext, useMemo } from 'react';

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
  surface: _surface,
  children,
}: {
  isInactiveLocked: boolean;
  surface: FreeToolSurface | null;
  children: ReactNode;
}) {
  const setPlansModalVisible = usePlansModalVisibility((s) => s.setIsVisible);
  const isModalVisible = usePlansModalVisibility((s) => s.isVisible);

  const showModal = useCallback(() => {
    setPlansModalVisible(true, 'free_tool_gate');
  }, [setPlansModalVisible]);

  const openInactivePlanModal = useCallback(
    (_options?: { force?: boolean }) => {
      // Always open the plans modal on every blocked action — no toast fallback.
      if (isModalVisible) return;
      showModal();
    },
    [isModalVisible, showModal],
  );

  const value = useMemo(
    () => ({ isInactiveLocked, openInactivePlanModal }),
    [isInactiveLocked, openInactivePlanModal],
  );

  return <FreeToolsInactiveGateContext.Provider value={value}>{children}</FreeToolsInactiveGateContext.Provider>;
}

export function useFreeToolsInactiveGate() {
  return useContext(FreeToolsInactiveGateContext);
}
