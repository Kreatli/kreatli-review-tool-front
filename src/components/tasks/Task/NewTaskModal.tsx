import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';

import { NewTaskForm } from './NewTaskForm';

interface Props {
  projectId: string;
  status?: string;
  isVisible: boolean;
  onClose: () => void;
}

export const NewTaskModal = ({ projectId, status, isVisible, onClose }: Props) => {
  return (
    <Modal size="xl" scrollBehavior="inside" isOpen={isVisible} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <div>New task</div>
        </ModalHeader>
        <ModalBody className="pb-6">
          <NewTaskForm status={status} projectId={projectId} onCancel={onClose} onSuccess={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
