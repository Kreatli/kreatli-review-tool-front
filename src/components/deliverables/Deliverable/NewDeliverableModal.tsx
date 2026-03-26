import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';

import { NewDeliverableForm } from './NewDeliverableForm';

interface Props {
  projectId: string;
  isVisible: boolean;
  onClose: () => void;
}

export const NewDeliverableModal = ({ projectId, isVisible, onClose }: Props) => {
  return (
    <Modal size="xl" scrollBehavior="inside" isOpen={isVisible} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <div>New deliverable</div>
        </ModalHeader>
        <ModalBody className="pb-6">
          <NewDeliverableForm projectId={projectId} onCancel={onClose} onSuccess={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
