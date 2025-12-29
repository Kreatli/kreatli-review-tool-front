import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';

interface ContactOwnerModalProps {
  type: 'storage';
  isOpen: boolean;
  onClose: () => void;
}

const DESCRIPTION = {
  storage: "The project owner doesn't have enough storage space. Please contact them to add more storage.",
};

export const ContactOwnerModal = ({ type, isOpen, onClose }: ContactOwnerModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="pb-0">Contact project owner</ModalHeader>
        <ModalBody>
          <div className="text-sm text-foreground-500">{DESCRIPTION[type]}</div>
        </ModalBody>
        <ModalFooter>
          <Button className="bg-foreground text-content1" onClick={onClose}>
            Got it
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
