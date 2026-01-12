import { addToast } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { usePostUserStartTrial, usePostUserSubscription } from '../../../services/hooks';
import { getUserId } from '../../../services/services';
import { UserDto } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Plan } from './Plan';

const PLANS = [
  {
    id: 'creator' as const,
    name: 'Creator',
    description:
      'Designed for solo creators and small teams who want to organize projects, review work, and create faster.',
    features: [
      { label: 'up to 3 members' },
      { label: '500GB Storage', tooltip: '$3 per month per additional 100GB' },
      { label: 'Unlimited projects' },
      { label: 'Unlimited external reviewers', tooltip: 'does not count toward paid seats' },
    ],
    price: 7,
  },
  {
    id: 'team' as const,
    name: 'Team',
    description:
      'Built for established teams running multiple projects with shared assets, structured reviews, and consistent workflows.',
    features: [
      { label: 'up to 10 members' },
      { label: '1TB Storage', tooltip: '$3 per month per additional 100GB' },
      { label: 'Unlimited projects' },
      { label: 'Unlimited external reviewers', tooltip: 'does not count toward paid seats' },
      { label: 'Google Drive/Dropbox Upload' },
    ],
    price: 19,
  },
  {
    id: 'enterprise' as const,
    name: 'Enterprise',
    description:
      'Tailored for enterprise organizations that need advanced controls, custom workflows, and dedicated support.',
    features: [
      { label: 'Custom members' },
      { label: 'Custom storage' },
      { label: 'Single Sign-On (SSO)' },
      { label: 'Dedicated Account Manager' },
      { label: 'Custom Integrations & Features' },
    ],
  },
];

interface Props {
  user: UserDto;
  onTrialSuccess?: () => void;
}

export const PlansForm = ({ user, onTrialSuccess }: Props) => {
  const queryClient = useQueryClient();

  const [selectedPlan, setSelectedPlan] = useState<'creator' | 'team' | 'enterprise' | null>(
    user?.subscription.plan ?? null,
  );

  const { mutate: upgradePlan, isPending: isUpgradingPlan } = usePostUserSubscription();
  const { mutate: startTrial, isPending: isStartingTrial } = usePostUserStartTrial();

  const handleUpgradePlan = (plan: 'creator' | 'team' | 'enterprise') => {
    if (!plan) return;

    if (!user.subscription.hasUsedTrial) {
      startTrial(
        { requestBody: { plan } },
        {
          onSuccess: (user: UserDto) => {
            queryClient.setQueryData([getUserId.key], user);
            onTrialSuccess?.();
          },
          onError: (error) => {
            addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
          },
        },
      );

      return;
    }

    upgradePlan(
      {
        requestBody: { plan },
      },
      {
        onSuccess: ({ url }) => {
          location.href = url;
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  const handleSelectPlan = (plan: 'creator' | 'team' | 'enterprise') => () => {
    setSelectedPlan(plan);
    handleUpgradePlan(plan);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {PLANS.map(({ id, name, description, price, features }) => (
        <Plan
          key={id}
          isSelected={selectedPlan === id}
          isLoading={isUpgradingPlan || isStartingTrial}
          isCurrent={user.subscription.plan === id && user.subscription.isActive}
          isCurrentTrial={user.subscription.plan === id && user.subscription.isTrial}
          name={name}
          isTrialAvailable={!user.subscription.hasUsedTrial}
          description={description}
          price={price}
          features={features}
          onClick={handleSelectPlan(id)}
        />
      ))}
    </div>
  );
};
