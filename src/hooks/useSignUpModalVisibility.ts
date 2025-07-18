import { create } from 'zustand';

export const useSignUpModalVisibility = create<{
  isSignUpModalOpen: boolean;
  setIsSignUpModalOpen: (isOpen: boolean) => void;
  openSignUpModal: () => void;
  closeSignUpModal: () => void;
}>((set) => ({
  isSignUpModalOpen: false,
  setIsSignUpModalOpen: (isSignUpModalOpen) => set({ isSignUpModalOpen }),
  openSignUpModal: () => set({ isSignUpModalOpen: true }),
  closeSignUpModal: () => set({ isSignUpModalOpen: false }),
}));
