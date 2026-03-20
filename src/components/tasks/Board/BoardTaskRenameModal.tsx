import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';

import { BoardTaskRenameForm } from './BoardTaskRenameForm';

interface Props {
  projectId: string;
  taskId: string | undefined;
  name: string;
  isVisible: boolean;
  onClose: () => void;
}

export const BoardTaskRenameModal = ({ projectId, taskId, name, isVisible, onClose }: Props) => {
  return (
    <Modal isOpen={isVisible} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Rename task</ModalHeader>
        <ModalBody className="pb-6">
          <BoardTaskRenameForm
            projectId={projectId}
            taskId={taskId}
            name={name}
            onCancel={onClose}
            onSuccess={onClose}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
