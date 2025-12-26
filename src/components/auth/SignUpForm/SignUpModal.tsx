import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { SignUpForm } from './SignUpForm';
import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';

export const SignUpModal = () => {
  const { isSignUpModalOpen, setIsSignUpModalOpen } = useSignUpModalVisibility();

  return (
    <Modal 
      isOpen={isSignUpModalOpen} 
      onOpenChange={setIsSignUpModalOpen}
      size="lg"
      classNames={{
        base: "max-w-[600px]",
        wrapper: "p-4 sm:p-6",
        body: "px-4 sm:px-6 lg:px-8 py-4 sm:py-6",
        header: "px-4 sm:px-6 lg:px-8 pt-6 pb-2",
      }}
    >
      <ModalContent>
        <ModalHeader className="text-xl sm:text-2xl">
          Create an account to get started!
        </ModalHeader>
        <ModalBody>
          <SignUpForm onSuccess={() => setIsSignUpModalOpen(false)} />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};
