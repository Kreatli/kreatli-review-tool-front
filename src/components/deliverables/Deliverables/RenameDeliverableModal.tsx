import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';

import { RenameDeliverableForm } from './RenameDeliverableForm';

interface Props {
  projectId: string;
  deliverableId: string | undefined;
  name: string;
  isVisible: boolean;
  onClose: () => void;
}

export const RenameDeliverableModal = ({ projectId, deliverableId, name, isVisible, onClose }: Props) => {
  return (
    <Modal isOpen={isVisible} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Rename deliverable</ModalHeader>
        <ModalBody className="pb-6">
          <RenameDeliverableForm
            projectId={projectId}
            deliverableId={deliverableId}
            name={name}
            onCancel={onClose}
            onSuccess={onClose}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
