import { Modal, ModalBody, ModalContent } from '@heroui/react';

import { UserDto } from '../../../services/types';
import { PlansForm } from './PlansForm';

interface Props {
  user: UserDto;
  isOpen: boolean;
  onClose: () => void;
}

export const PlansModal = ({ user, isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="inside" aria-label="Plans and pricing">
      <ModalContent>
        <ModalBody className="py-6">
          <h2 className="font-sans text-2xl font-bold">
            {user.subscription.hasUsedTrial ? 'Select a plan' : 'Start your free trial to get started.'}
          </h2>
          <PlansForm user={user} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
