import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { useRouter } from 'next/router';

import { UserDto } from '../../../services/types';
import { PlansForm } from './PlansForm';

interface Props {
  user: UserDto;
  isOpen: boolean;
  onClose: () => void;
}

export const PlansModal = ({ user, isOpen, onClose }: Props) => {
  const router = useRouter();

  const handleTrialSuccess = () => {
    router.reload();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="pb-0">
          {user.subscription.hasUsedTrial ? 'Select a plan' : 'Start your free trial. No credit card required.'}
        </ModalHeader>
        <ModalBody className="py-6">
          <PlansForm user={user} onTrialSuccess={handleTrialSuccess} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
