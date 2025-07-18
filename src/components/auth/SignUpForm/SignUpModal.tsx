import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { SignUpForm } from './SignUpForm';
import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';

export const SignUpModal = () => {
  const { isSignUpModalOpen, setIsSignUpModalOpen } = useSignUpModalVisibility();

  return (
    <Modal isOpen={isSignUpModalOpen} onOpenChange={setIsSignUpModalOpen}>
      <ModalContent>
        <ModalHeader className="text-xl">Create an account to get started!</ModalHeader>
        <ModalBody>
          <SignUpForm />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};
