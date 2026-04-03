import { create } from 'zustand';

export const useFreeToolsInactivePlanModalVisibility = create<{
  isOpen: boolean;
  openInactivePlanModal: () => void;
  closeInactivePlanModal: () => void;
}>((set) => ({
  isOpen: false,
  openInactivePlanModal: () => set({ isOpen: true }),
  closeInactivePlanModal: () => set({ isOpen: false }),
}));
