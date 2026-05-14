import { create } from 'zustand';

interface State {
  isVisible: boolean;
  /** Last open source for `plans_modal_viewed` (set when opening). */
  plansModalEntry: string;
  setIsVisible: (isVisible: boolean, entry?: string) => void;
}

export const usePlansModalVisibility = create<State>((set) => ({
  isVisible: false,
  plansModalEntry: 'in_app',
  setIsVisible: (isVisible, entry) =>
    set((s) => ({
      isVisible,
      plansModalEntry: isVisible ? entry ?? 'in_app' : s.plansModalEntry,
    })),
}));
