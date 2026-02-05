import React from 'react';
import Joyride, { CallBackProps, STATUS } from 'react-joyride';

import { useOnboardingStore } from '../../hooks/useOnboarding';
import { OnboardingTooltip } from './OnboardingTooltip';

export const ONBOARDING_SELECTORS = {
  createProject: '[data-onboarding="create-project"]',
  uploadFile: '[data-onboarding="upload-file"]',
} as const;

const STEP_1 = {
  target: ONBOARDING_SELECTORS.createProject,
  title: 'Create your first project',
  content: 'Click the button to create a project and keep your files and team in one place.',
  disableBeacon: true,
  spotlightClicks: true,
  placement: 'bottom' as const,
  journeyStep: 0 as const,
};

const STEP_2 = {
  target: ONBOARDING_SELECTORS.uploadFile,
  title: 'Upload your first file',
  content: 'Add a video, image, or document. Click Upload or drag and drop files into the project.',
  disableBeacon: true,
  spotlightClicks: true,
  placement: 'bottom' as const,
  spotlightPadding: 4,
  journeyStep: 1 as const,
};

interface Props {
  stepIndex: 0 | 1;
  run: boolean;
}

export const OnboardingJoyride = ({ stepIndex, run }: Props) => {
  const close = useOnboardingStore((s) => s.close);
  const markProjectCreated = useOnboardingStore((s) => s.markProjectCreated);

  const steps = stepIndex === 0 ? [STEP_1] : [STEP_2];
  const index = 0;

  const handleCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.SKIPPED) {
      close();
      return;
    }
    if (status === STATUS.FINISHED) {
      // Done: close window, remove overlay, and advance to next step
      if (stepIndex === 0) {
        markProjectCreated();
      } else {
        close();
      }
    }
  };

  if (!run || steps.length === 0) return null;

  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={index}
      callback={handleCallback}
      continuous
      showProgress={false}
      spotlightClicks
      disableScrolling
      disableOverlayClose={false}
      tooltipComponent={OnboardingTooltip}
      styles={{
        options: {
          primaryColor: 'hsl(var(--heroui-foreground))',
          zIndex: 10000,
        },
      }}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Done',
        next: 'Next',
        skip: 'Skip Tour',
      }}
    />
  );
};
