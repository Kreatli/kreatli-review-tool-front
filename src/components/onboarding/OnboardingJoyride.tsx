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
  fileActionsMenu: '[data-onboarding="file-actions-menu"]',
  compareFiles: '[data-onboarding="compare-files"]',
  safeZones: '[data-onboarding="safe-zones"]',
  createFolders: '[data-onboarding="create-folders"]',
  projectTabs: '[data-onboarding="project-tabs"]',
  homeEdit: '[data-onboarding="home-edit"]',
  chatCompose: '[data-onboarding="chat-compose"]',
  activityFeed: '[data-onboarding="activity-feed"]',
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
  content:
    'Type here to add comments and feedback. Use @ to tag teammates so they get notified—e.g. @name. You can also pin comments to the timestamp.',
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

const STEP_8 = {
  target: ONBOARDING_SELECTORS.fileActionsMenu,
  title: 'Upload new version or share file',
  content: 'Open this menu to upload a new version, share the file, or access other file actions.',
  disableBeacon: true,
  spotlightClicks: true,
  placement: 'bottom' as const,
  journeyStep: 7 as const,
};

const STEP_9 = {
  target: ONBOARDING_SELECTORS.compareFiles,
  title: 'Compare files',
  content: 'Select another file to compare two versions side by side.',
  disableBeacon: true,
  spotlightClicks: true,
  placement: 'bottom' as const,
  journeyStep: 8 as const,
};

const STEP_10 = {
  target: ONBOARDING_SELECTORS.safeZones,
  title: 'Preview Platform Overlays',
  content: 'See how your content will look with platform UI overlays (e.g. Instagram, TikTok safe zones).',
  disableBeacon: true,
  spotlightClicks: true,
  placement: 'bottom' as const,
  journeyStep: 9 as const,
};

const STEP_11 = {
  target: ONBOARDING_SELECTORS.createFolders,
  title: 'Create folders',
  content: 'Click the arrow next to Upload to create folders and organize your project files.',
  disableBeacon: true,
  spotlightClicks: true,
  placement: 'bottom' as const,
  journeyStep: 10 as const,
};

const STEP_12 = {
  target: ONBOARDING_SELECTORS.projectTabs,
  title: 'Switch between tabs',
  content: 'Use Home, Media, Chat, and Activity to move between your project dashboard, files, conversations, and activity.',
  disableBeacon: true,
  spotlightClicks: true,
  placement: 'bottom' as const,
  journeyStep: 11 as const,
};

const STEP_13_HOME = {
  target: ONBOARDING_SELECTORS.homeEdit,
  title: 'Home',
  content:
    'Edit your project description here. Click Edit to add a brief, links, or formatting so your team knows what this project is about.',
  disableBeacon: true,
  spotlightClicks: true,
  placement: 'bottom' as const,
  journeyStep: 12 as const,
  tabStep: 'home' as const,
};

const STEP_14_CHAT = {
  target: ONBOARDING_SELECTORS.chatCompose,
  title: 'Chat',
  content:
    'Use the group chat to discuss with your team. Type a message, attach files with the paperclip, and send. Everyone in the conversation gets updates in real time.',
  disableBeacon: true,
  spotlightClicks: true,
  placement: 'top' as const,
  journeyStep: 12 as const,
  tabStep: 'chat' as const,
};

const STEP_15_ACTIVITY = {
  target: ONBOARDING_SELECTORS.activityFeed,
  title: 'Activity',
  content:
    'See what’s happening in the project. This feed shows uploads, comments, status changes, and other updates so you can stay in sync.',
  disableBeacon: true,
  spotlightClicks: true,
  placement: 'top' as const,
  journeyStep: 12 as const,
  tabStep: 'activity' as const,
};

interface Props {
  stepIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
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
                : stepIndex === 6
                  ? [STEP_7]
                  : stepIndex === 7
                    ? [STEP_8]
                    : stepIndex === 8
                      ? [STEP_9]
                      : stepIndex === 9
                        ? [STEP_10]
                        : stepIndex === 10
                          ? [STEP_11]
                          : stepIndex === 11
                            ? [STEP_12]
                            : stepIndex === 12
                              ? [STEP_13_HOME]
                              : stepIndex === 13
                                ? [STEP_14_CHAT]
                                : [STEP_15_ACTIVITY];
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
      } else if (stepIndex >= 3 && stepIndex <= 11) {
        advanceStep();
      } else if (stepIndex >= 12 && stepIndex <= 14) {
        // Tab steps: OnboardingTooltip calls markTabStepDone; do not close or advance here
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
        next: 'Done',
        skip: 'Skip Tour',
      }}
    />
  );
};
