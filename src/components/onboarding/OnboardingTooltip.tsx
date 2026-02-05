import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import type { TooltipRenderProps } from 'react-joyride';

import { useIsMobile } from '../../hooks/useIsMobile';
import { type OnboardingTabStep, useOnboardingStore } from '../../hooks/useOnboarding';

type StepWithJourney = TooltipRenderProps['step'] & {
  journeyStep?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  tabStep?: OnboardingTabStep;
};

const TOTAL_ONBOARDING_STEPS = 15;

function getDisplayStep(step: StepWithJourney): number {
  const { journeyStep, tabStep } = step;
  if (tabStep === 'home') return 13;
  if (tabStep === 'chat') return 14;
  if (tabStep === 'activity') return 15;
  if (journeyStep !== undefined) return journeyStep + 1;
  return 1;
}

export function OnboardingTooltip({
  backProps,
  closeProps,
  continuous,
  index,
  primaryProps,
  skipProps,
  step,
  size: _size,
  tooltipProps,
}: TooltipRenderProps) {
  const currentStep = getDisplayStep(step as StepWithJourney);
  const stepCountLabel = `Step ${currentStep}/${TOTAL_ONBOARDING_STEPS}`;
  const showBack = continuous && index > 0;
  const journeyStep = (step as StepWithJourney).journeyStep;
  const tabStep = (step as StepWithJourney).tabStep;
  const isMobile = useIsMobile();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleRequestSkip = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirmSkip = () => {
    // Call Joyride's original skip handler so it can
    // update its internal state and fire callbacks.
    if (skipOnClick) {
      const syntheticEvent: Pick<React.MouseEvent<HTMLElement>, 'preventDefault' | 'stopPropagation'> = {
        preventDefault() {},
        stopPropagation() {},
      };
      skipOnClick(syntheticEvent as React.MouseEvent<HTMLElement>);
    }
    setShowConfirm(false);
  };

  const handleCancelSkip = () => {
    setShowConfirm(false);
  };

  const handleDone = (event: React.MouseEvent<HTMLElement>) => {
    primaryProps.onClick?.(event);
    // Single source of truth for advancement: we handle all "Done" actions here (Joyride callback does not advance).
    const {
      close: closeTour,
      markProjectCreated,
      completeUpload,
      advanceStep,
      advanceToFileOpened,
      markTabStepDone,
    } = useOnboardingStore.getState();
    if (journeyStep === 0) {
      markProjectCreated();
    } else if (journeyStep === 1) {
      completeUpload();
    } else if (journeyStep === 2) {
      advanceToFileOpened();
    } else if (tabStep !== undefined) {
      // Tab steps (Home, Chat, Activity): mark this tab done; onboarding completes only when all three are done.
      markTabStepDone(tabStep);
    } else if (journeyStep !== undefined && journeyStep >= 3 && journeyStep <= 11) {
      advanceStep();
    } else {
      closeTour();
    }
  };

  // Strip original onClick from skip/close so we can control confirmation flow
  const { onClick: skipOnClick, ...safeSkipProps } = skipProps;
  const { onClick: _closeOnClick, ...safeCloseProps } = closeProps;

  return (
    <div
      {...tooltipProps}
      className={
        `relative flex flex-col rounded-medium border border-foreground-200 bg-content1 shadow-lg outline-none ` +
        (isMobile ? 'w-[calc(100vw-2rem)] max-w-[320px] p-3' : 'w-[320px] p-4')
      }
    >
      <div className="relative mb-3 flex items-start justify-between gap-2">
        {step.title && (
          <h3 className="pr-8 text-base font-semibold text-foreground sm:text-lg">{step.title}</h3>
        )}
        <button
          type="button"
          className="absolute right-0 top-0 touch-manipulation rounded-full p-1.5 text-foreground-500 transition-colors hover:bg-foreground-100 hover:text-foreground active:bg-foreground-100"
          {...safeCloseProps}
          onClick={handleRequestSkip}
          aria-label="Close"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <div className={`text-foreground-600 ${isMobile ? 'mb-4 text-xs sm:text-sm' : 'mb-5 text-sm'}`}>
        {step.content}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          className="touch-manipulation rounded-medium border border-transparent bg-transparent px-3 py-2 text-sm font-medium text-foreground-500 transition-colors hover:border-foreground-200 hover:bg-foreground-50 active:bg-foreground-100"
          {...safeSkipProps}
          onClick={handleRequestSkip}
        >
          Skip Tour
        </button>
        <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
          <span className="text-xs text-foreground-500 sm:text-sm">{stepCountLabel}</span>
          {showBack && (
            <button
              type="button"
              className="touch-manipulation rounded-medium border border-transparent bg-transparent px-3 py-2 text-sm font-medium text-foreground-600 transition-colors hover:border-foreground-200 hover:bg-foreground-50 active:bg-foreground-100"
              {...backProps}
            >
              Back
            </button>
          )}
          <button
            type="button"
            className="touch-manipulation rounded-medium bg-foreground px-3 py-2 text-sm font-medium text-content1 shadow-sm transition-colors hover:bg-foreground-600 active:bg-foreground-700"
            aria-label={primaryProps['aria-label']}
            data-action={primaryProps['data-action']}
            title={primaryProps.title}
            role={primaryProps.role}
            onClick={handleDone}
          >
            Done
          </button>
        </div>
      </div>
      {showConfirm &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/40">
            <div className="mx-4 w-[calc(100vw-2rem)] max-w-xs rounded-medium bg-content1 p-4 shadow-lg">
              <p className="mb-4 text-sm text-foreground">Are you sure you want to skip the tour?</p>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="touch-manipulation rounded-medium border border-transparent bg-transparent px-3 py-2 text-sm font-medium text-foreground-600 transition-colors hover:border-foreground-200 hover:bg-foreground-50 active:bg-foreground-100"
                  onClick={handleCancelSkip}
                >
                  Continue tour
                </button>
                <button
                  type="button"
                  className="touch-manipulation rounded-medium bg-foreground px-3 py-2 text-sm font-medium text-content1 shadow-sm transition-colors hover:bg-foreground-600 active:bg-foreground-700"
                  onClick={handleConfirmSkip}
                >
                  Skip tour
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
