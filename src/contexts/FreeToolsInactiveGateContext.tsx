import { createContext, ReactNode, useContext, useMemo } from 'react';

import { useFreeToolsInactivePlanModalVisibility } from '../hooks/useFreeToolsInactivePlanModalVisibility';

export type FreeToolsInactiveGateContextValue = {
  isInactiveLocked: boolean;
  openInactivePlanModal: () => void;
};

const defaultValue: FreeToolsInactiveGateContextValue = {
  isInactiveLocked: false,
  openInactivePlanModal: () => {},
};

const FreeToolsInactiveGateContext = createContext<FreeToolsInactiveGateContextValue>(defaultValue);

export function FreeToolsInactiveGateProvider({
  isInactiveLocked,
  children,
}: {
  isInactiveLocked: boolean;
  children: ReactNode;
}) {
  const openInactivePlanModal = useFreeToolsInactivePlanModalVisibility((s) => s.openInactivePlanModal);

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
