import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';

import { BoardColumnNameForm } from './BoardColumnNameForm';

interface Props {
  projectId: string;
  columnId: string;
  name: string;
  isVisible: boolean;
  onClose: () => void;
}

export const BoardColumnNameModal = ({ projectId, columnId, name, isVisible, onClose }: Props) => {
  return (
    <Modal isOpen={isVisible} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <div>Rename column</div>
        </ModalHeader>
        <ModalBody className="pb-6">
          <BoardColumnNameForm
            projectId={projectId}
            columnId={columnId}
            name={name}
            onCancel={onClose}
            onSuccess={onClose}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
