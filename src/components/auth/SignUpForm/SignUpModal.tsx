import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import React from 'react';

import { useSession } from '../../../hooks/useSession';
import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';
import { SignUpForm } from './SignUpForm';

interface Props {
  sourceType?: 'safe-zone-checker';
}

export const SignUpModal = ({ sourceType }: Props) => {
  const { isSignedIn } = useSession();
  const { isSignUpModalOpen, setIsSignUpModalOpen } = useSignUpModalVisibility();

  // "Sign in" in the modal links away without onOpenChange(false); Zustand can stay true.
  // Clear stale open state when the user returns signed in (e.g. returnTo from /sign-in).
  React.useEffect(() => {
    if (isSignedIn) {
      setIsSignUpModalOpen(false);
    }
  }, [isSignedIn, setIsSignUpModalOpen]);

  return (
    <Modal
      isOpen={isSignUpModalOpen && !isSignedIn}
      onOpenChange={setIsSignUpModalOpen}
      aria-label="Create an account"
    >
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
