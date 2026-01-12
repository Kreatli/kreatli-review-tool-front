import { create } from 'zustand';

interface State {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export const usePlansModalVisibility = create<State>((set) => ({
  isVisible: false,
  setIsVisible: (isVisible: boolean) => set({ isVisible }),
}));
