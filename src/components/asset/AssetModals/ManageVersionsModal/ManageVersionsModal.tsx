import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';

import { ProjectStackDto } from '../../../../services/types';
import { ManageVersionsForm } from './ManageVersionsForm';

interface Props {
  isOpen: boolean;
  projectId: string;
  stack?: ProjectStackDto;
  onClose: () => void;
}

export const ManageVersionsModal = ({ projectId, stack, isOpen, onClose }: Props) => {
  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Manage versions</ModalHeader>
        <ModalBody className="pb-6">
          {stack && <ManageVersionsForm projectId={projectId} stack={stack} onSuccess={onClose} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
