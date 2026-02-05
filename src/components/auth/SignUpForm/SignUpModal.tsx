import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';

import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';
import { SignUpForm } from './SignUpForm';

interface Props {
  sourceType?: 'safe-zone-checker';
}

export const SignUpModal = ({ sourceType }: Props) => {
  const { isSignUpModalOpen, setIsSignUpModalOpen } = useSignUpModalVisibility();

  return (
    <Modal isOpen={isSignUpModalOpen} onOpenChange={setIsSignUpModalOpen} aria-label="Create an account">
      <ModalContent>
        <ModalHeader className="text-xl">Create an account to get started!</ModalHeader>
        <ModalBody>
          <SignUpForm sourceType={sourceType} onSuccess={() => setIsSignUpModalOpen(false)} />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};
