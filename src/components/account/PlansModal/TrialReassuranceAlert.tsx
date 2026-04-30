import { Alert } from '@heroui/react';

interface Props {
  hasUsedTrial: boolean;
}

/** Shown when the user can still start a free trial (card-at-checkout reassurance). */
export const TrialReassuranceAlert = ({ hasUsedTrial }: Props) => {
  if (hasUsedTrial) return null;

  return (
    <Alert
      color="primary"
      variant="flat"
      className="text-left"
      title={
        <span className="text-pretty font-sans text-sm font-semibold leading-snug md:text-lg">
          You are NOT paying anything right now.
        </span>
      }
    >
      <p className="text-pretty text-sm leading-relaxed md:text-base">
        Your 7-day free trial starts now. You will not be charged during the trial period, and you can cancel anytime
        before day 7 to avoid any billing.
      </p>
    </Alert>
  );
};
