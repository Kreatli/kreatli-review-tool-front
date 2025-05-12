import { create } from 'zustand';

interface State {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useAppLoader = create<State>((set) => ({
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
