import { Modal, ModalBody, ModalContent } from '@heroui/react';

import { UserDto } from '../../../services/types';
import { PlansForm } from './PlansForm';
import { TrialReassuranceAlert } from './TrialReassuranceAlert';

interface Props {
  user: UserDto;
  isOpen: boolean;
  onClose: () => void;
}

export const PlansModal = ({ user, isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="inside" aria-label="Plans and pricing">
      <ModalContent>
        <ModalBody className="gap-3 py-4 md:gap-4 md:py-6">
          <h2 className="font-sans text-xl font-bold leading-tight md:text-2xl">
            {user.subscription.hasUsedTrial ? 'Select a plan' : 'Start your free trial to get started.'}
          </h2>
          <TrialReassuranceAlert hasUsedTrial={user.subscription.hasUsedTrial} />
          <PlansForm user={user} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
