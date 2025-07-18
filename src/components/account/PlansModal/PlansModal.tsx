import {
  addToast,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
} from '@heroui/react';
import { useState } from 'react';
import { UserDto } from '../../../services/types';
import { usePostUserSubscription } from '../../../services/hooks';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { useQueryClient } from '@tanstack/react-query';
import { getUser } from '../../../services/services';
import { Plan } from './Plan';

const PLANS = [
  {
    id: 'free' as const,
    name: 'Free',
    description: 'Ideal for individuals or small teams just getting started.',
    features: ['1 project', '2 members', '5GB Total Upload'],
    price: 0,
  },
  {
    id: 'pro' as const,
    name: 'Pro',
    description: 'Perfect for small teams looking to manage multiple projects efficiently.',
    features: ['Up to 10 projects', 'Up to 5 members', '1TB Storage', '+100GB for $5'],
    price: 15,
  },
  {
    id: 'advanced' as const,
    name: 'Advanced',
    description: 'Designed for growing teams needing more extensive collaboration tools.',
    features: ['Unlimited projects', 'Unlimited members', '2TB Storage', '+100GB for $3'],
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
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>Select a plan</ModalHeader>
        <ModalBody className="pb-6">
          {/* <RadioGroup
            value={selectedPlan}
            onValueChange={(value) => setSelectedPlan(value as 'free' | 'pro' | 'advanced')}
          >
            <Radio value="free">Free</Radio>
            <Radio value="pro">Pro</Radio>
            <Radio value="advanced">Advanced</Radio>
          </RadioGroup> */}
          <div className="flex gap-4">
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
