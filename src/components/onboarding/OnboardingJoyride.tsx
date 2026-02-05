import React from 'react';
import Joyride, { CallBackProps, STATUS } from 'react-joyride';

import { useOnboardingStore } from '../../hooks/useOnboarding';
import { OnboardingTooltip } from './OnboardingTooltip';

export const ONBOARDING_SELECTORS = {
  createProject: '[data-onboarding="create-project"]',
  uploadFile: '[data-onboarding="upload-file"]',
  openFile: '[data-onboarding="open-file"]',
  drawOnFile: '#onboarding-target-draw-on-file',
  leaveComment: '#onboarding-target-leave-comment',
  assignMembers: '[data-onboarding="assign-members"]',
  setStatus: '[data-onboarding="set-status"]',
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

const STEP_3 = {
  target: ONBOARDING_SELECTORS.openFile,
  title: 'Open the file',
  content: 'Once your file has uploaded, double-click it to open it and start reviewing.',
  disableBeacon: true,
  spotlightClicks: true,
  placement: 'bottom' as const,
  journeyStep: 2 as const,
};

const STEP_4 = {
  target: ONBOARDING_SELECTORS.drawOnFile,
  title: 'Draw on file',
  content: 'Use the drawing tools to add arrows, lines, or freehand markup directly on the file.',
  disableBeacon: true,
  spotlightClicks: true,
  placement: 'top' as const,
  journeyStep: 3 as const,
};

const STEP_5 = {
  target: ONBOARDING_SELECTORS.leaveComment,
  title: 'Leave comments',
  content: 'Type here to add comments and feedback. You can mention teammates and pin comments to the file.',
  disableBeacon: true,
  spotlightClicks: true,
  placement: 'left' as const,
  journeyStep: 4 as const,
};

const STEP_6 = {
  target: ONBOARDING_SELECTORS.assignMembers,
  title: 'Assign members',
  content: 'Assign a team member to this file to clarify ownership and track who is responsible for the review.',
  disableBeacon: true,
  spotlightClicks: true,
  placement: 'bottom' as const,
  journeyStep: 5 as const,
};

const STEP_7 = {
  target: ONBOARDING_SELECTORS.setStatus,
  title: 'Set status',
  content: 'Update the status (e.g. In review, Approved) to keep everyone aligned on progress.',
  disableBeacon: true,
  spotlightClicks: true,
  placement: 'bottom' as const,
  journeyStep: 6 as const,
};

interface Props {
  stepIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  run: boolean;
}

export const OnboardingJoyride = ({ stepIndex, run }: Props) => {
  const close = useOnboardingStore((s) => s.close);
  const markProjectCreated = useOnboardingStore((s) => s.markProjectCreated);
  const advanceStep = useOnboardingStore((s) => s.advanceStep);

  const steps =
    stepIndex === 0
      ? [STEP_1]
      : stepIndex === 1
        ? [STEP_2]
        : stepIndex === 2
          ? [STEP_3]
          : stepIndex === 3
            ? [STEP_4]
            : stepIndex === 4
              ? [STEP_5]
              : stepIndex === 5
                ? [STEP_6]
                : [STEP_7];
  const index = 0;

  const handleCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.SKIPPED) {
      close();
      return;
    }
    if (status === STATUS.FINISHED) {
      if (stepIndex === 0) {
        markProjectCreated();
      } else if (stepIndex >= 3 && stepIndex <= 6) {
        advanceStep();
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
      disableOverlay
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
