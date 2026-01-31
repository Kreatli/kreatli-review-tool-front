import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { useRef } from 'react';

import { ProjectStackDto } from '../../../../services/types';
import { ManageVersionsForm, ManageVersionsFormRef } from './ManageVersionsForm';

interface Props {
  isOpen: boolean;
  projectId: string;
  stack?: ProjectStackDto;
  onClose: () => void;
}

export const ManageVersionsModal = ({ projectId, stack, isOpen, onClose }: Props) => {
  const formRef = useRef<ManageVersionsFormRef>(null);

  const handleClose = () => {
    if (formRef.current?.getIsDirty()) {
      const confirm = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirm) {
        return;
      }
    }
    onClose();
  };

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={handleClose}>
      <ModalContent>
        <ModalHeader>Manage versions</ModalHeader>
        <ModalBody className="pb-6">
          {stack && (
            <ManageVersionsForm
              formRef={formRef}
              projectId={projectId}
              stack={stack}
              onCancel={onClose}
              onSuccess={onClose}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
