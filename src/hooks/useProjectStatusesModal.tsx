import { create } from 'zustand';

interface State {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export const useProjectStatusesModal = create<State>((set) => ({
  isVisible: false,
  setIsVisible: (isVisible) => set({ isVisible }),
}));
