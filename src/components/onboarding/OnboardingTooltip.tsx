import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import type { TooltipRenderProps } from 'react-joyride';

import { useOnboardingStore } from '../../hooks/useOnboarding';

type StepWithJourney = TooltipRenderProps['step'] & { journeyStep?: 0 | 1 };

export function OnboardingTooltip({
  backProps,
  closeProps,
  continuous,
  index,
  primaryProps,
  skipProps,
  step,
  size,
  tooltipProps,
}: TooltipRenderProps) {
  const stepCountLabel = `Step ${index + 1}/${size}`;
  const showBack = continuous && index > 0;
  const journeyStep = (step as StepWithJourney).journeyStep;

  const [showConfirm, setShowConfirm] = useState(false);

  const handleRequestSkip = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirmSkip = () => {
    // Call Joyride's original skip handler so it can
    // update its internal state and fire callbacks.
    if (skipOnClick) {
      const syntheticEvent: Pick<
        React.MouseEvent<HTMLElement>,
        'preventDefault' | 'stopPropagation'
      > = {
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
    // In controlled mode Joyride never sets FINISHED, so close and advance here
    const { close: closeTour, markProjectCreated } = useOnboardingStore.getState();
    if (journeyStep === 0) {
      markProjectCreated();
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
      className="relative flex w-[320px] flex-col rounded-medium border border-foreground-200 bg-content1 p-4 shadow-lg outline-none"
    >
      <div className="relative mb-3 flex items-start justify-between gap-2">
        {step.title && (
          <h3 className="pr-8 text-lg font-semibold text-foreground">{step.title}</h3>
        )}
        <button
          type="button"
          className="absolute right-0 top-0 rounded-full p-1 text-foreground-500 transition-colors hover:bg-foreground-100 hover:text-foreground"
          {...safeCloseProps}
          onClick={handleRequestSkip}
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
      <div className="mb-5 text-sm text-foreground-600">{step.content}</div>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          className="rounded-medium border border-transparent bg-transparent px-3 py-1 text-sm font-medium text-foreground-500 transition-colors hover:border-foreground-200 hover:bg-foreground-50"
          {...safeSkipProps}
          onClick={handleRequestSkip}
        >
          Skip Tour
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground-500">{stepCountLabel}</span>
          {showBack && (
            <button
              type="button"
              className="rounded-medium border border-transparent bg-transparent px-3 py-1 text-sm font-medium text-foreground-600 transition-colors hover:border-foreground-200 hover:bg-foreground-50"
              {...backProps}
            >
              Back
            </button>
          )}
          <button
            type="button"
            className="rounded-medium bg-foreground px-3 py-1 text-sm font-medium text-content1 shadow-sm transition-colors hover:bg-foreground-600"
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
            <div className="mx-4 w-full max-w-xs rounded-medium bg-content1 p-4 shadow-lg">
              <p className="mb-4 text-sm text-foreground">
                Are you sure you want to skip the tour?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded-medium border border-transparent bg-transparent px-3 py-1 text-sm font-medium text-foreground-600 transition-colors hover:border-foreground-200 hover:bg-foreground-50"
                  onClick={handleCancelSkip}
                >
                  Continue tour
                </button>
                <button
                  type="button"
                  className="rounded-medium bg-foreground px-3 py-1 text-sm font-medium text-content1 shadow-sm transition-colors hover:bg-foreground-600"
                  onClick={handleConfirmSkip}
                >
                  Skip tour
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
