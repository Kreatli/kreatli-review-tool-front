import { Modal, ModalBody, ModalContent } from '@heroui/react';
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
        <ModalBody className="py-6">
          <h2 className="mb-3 font-sans text-2xl font-bold">
            {user.subscription.hasUsedTrial ? 'Select a plan' : 'Start your free trial. No credit card required.'}
          </h2>
          <PlansForm user={user} onTrialSuccess={handleTrialSuccess} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
