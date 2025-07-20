import { addToast, Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { useState } from 'react';
import { UserDto } from '../../../services/types';
import { usePostUserSubscription } from '../../../services/hooks';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { useQueryClient } from '@tanstack/react-query';
import { Plan } from './Plan';

const PLANS = [
  {
    id: 'free' as const,
    name: 'Free',
    description: 'Ideal for individuals or small teams just getting started.',
    features: [
      { label: '1 project' },
      { label: '2 members' },
      {
        label: '5GB Total Upload',
        tooltip:
          "“Total upload” tracks the cumulative size of all files a user has uploaded, even if some are later deleted. This means deleted files still count toward the user's upload limit.",
      },
    ],
    price: 0,
  },
  {
    id: 'pro' as const,
    name: 'Pro',
    description: 'Perfect for small teams looking to manage multiple projects efficiently.',
    features: [
      { label: 'Up to 10 projects' },
      { label: 'Up to 5 members' },
      { label: '1TB Storage', tooltip: '$5 per month per additional 100GB' },
    ],
    price: 15,
  },
  {
    id: 'advanced' as const,
    name: 'Advanced',
    description: 'Designed for growing teams needing more extensive collaboration tools.',
    features: [
      { label: 'Unlimited projects' },
      { label: 'Unlimited members' },
      { label: '2TB Storage', tooltip: '$3 per month per additional 100GB' },
    ],
    price: 20,
  },
];

interface Props {
  user: UserDto;
  isOpen: boolean;
  onClose: () => void;
}

export const PlansModal = ({ user, isOpen, onClose }: Props) => {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'advanced'>(user.subscription.plan);

  const queryClient = useQueryClient();
  const { mutate: upgradePlan, isPending } = usePostUserSubscription();

  const handleUpgradePlan = (plan: 'free' | 'pro' | 'advanced') => {
    upgradePlan(
      {
        requestBody: {
          plan,
        },
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

  const handleSelectPlan = (plan: 'free' | 'pro' | 'advanced') => () => {
    setSelectedPlan(plan);
    handleUpgradePlan(plan);
  };

  const plans = user.subscription.plan === 'free' ? PLANS : PLANS.slice(1);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader>Select a plan</ModalHeader>
        <ModalBody className="py-6">
          <div className="flex gap-4 flex-col md:flex-row">
            {plans.map(({ id, name, description, price, features }) => (
              <Plan
                key={id}
                isSelected={selectedPlan === id}
                isLoading={isPending}
                isCurrent={user.subscription.plan === id}
                name={name}
                description={description}
                price={price}
                features={features}
                onClick={handleSelectPlan(id)}
              />
            ))}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
