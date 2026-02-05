import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';

import { useOnboardingStore } from '../../hooks/useOnboarding';

export const OnboardingCompleteModal = () => {
  const showCompletionModal = useOnboardingStore((s) => s.showCompletionModal);
  const dismissCompletionModal = useOnboardingStore((s) => s.dismissCompletionModal);

  return (
    <Modal
      isOpen={showCompletionModal}
      onClose={dismissCompletionModal}
      portalContainer={typeof document !== 'undefined' ? document.body : undefined}
    >
      <ModalContent className="max-w-md">
        <ModalHeader className="flex flex-col gap-1 text-center">
          You&apos;re all set!
        </ModalHeader>
        <ModalBody className="text-center">
          <p className="text-foreground-600">
            You&apos;ve finished the tour. You can now explore the platform and start collaborating with your team.
          </p>
        </ModalBody>
        <ModalFooter className="flex justify-center">
          <Button color="primary" onPress={dismissCompletionModal} className="bg-foreground text-content1">
            Finish
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
