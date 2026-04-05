import { createContext, ReactNode, useCallback, useContext, useMemo } from 'react';

import { usePlansModalVisibility } from '../hooks/usePlansModalVisibility';

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
  const setPlansModalVisible = usePlansModalVisibility((s) => s.setIsVisible);

  const openInactivePlanModal = useCallback(() => {
    setPlansModalVisible(true);
  }, [setPlansModalVisible]);

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
