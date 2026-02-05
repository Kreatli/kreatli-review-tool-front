import { create } from 'zustand';

const ONBOARDING_COMPLETED_KEY = 'kreatli_onboarding_completed';

function getStoredCompleted(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(ONBOARDING_COMPLETED_KEY) === 'true';
}

export function isOnboardingCompleted(): boolean {
  return getStoredCompleted();
}

interface OnboardingStore {
  run: boolean;
  step: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 'completed';
  start: () => void;
  markProjectCreated: () => void;
  completeUpload: () => void;
  advanceToFileOpened: () => void;
  advanceStep: () => void;
  close: () => void;
  initFromProjectsCount: (count: number) => void;
  startForTesting: () => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  run: false,
  step: 0,
  start: () => set({ run: true, step: 0 }),
  markProjectCreated: () => set({ run: true, step: 1 }),
  completeUpload: () => {
    set({ run: true, step: 2 });
  },
  advanceToFileOpened: () => {
    set({ run: true, step: 3 });
  },
  advanceStep: () => {
    set((state) => {
      const step = state.step;
      if (step === 11) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
        }
        return { run: false, step: 'completed' };
      }
      if (step === 10) {
        return { step: 11 };
      }
      if (step === 9) {
        return { step: 10 };
      }
      if (typeof step === 'number' && step >= 3 && step <= 8) {
        return { step: (step + 1) as 4 | 5 | 6 | 7 | 8 | 9 };
      }
      return state;
    });
  },
  close: () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
    }
    set({ run: false, step: 'completed' });
  },
  initFromProjectsCount: (count: number) => {
    if (getStoredCompleted()) return;
    if (count === 0) {
      set({ run: true, step: 0 });
    }
  },
  startForTesting: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ONBOARDING_COMPLETED_KEY);
    }
    set({ run: true, step: 0 });
  },
}));
