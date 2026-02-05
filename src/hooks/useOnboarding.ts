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
  step: 0 | 1 | 'completed';
  start: () => void;
  markProjectCreated: () => void;
  completeUpload: () => void;
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
    if (typeof window !== 'undefined') {
      localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
    }
    set({ run: false, step: 'completed' });
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
