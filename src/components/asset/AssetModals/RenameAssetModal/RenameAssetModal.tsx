import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import React from 'react';

import { ProjectFileDto, ProjectFolderDto } from '../../../../services/types';
import { RenameAssetForm } from './RenameAssetForm';

interface Props {
  projectId: string;
  stackId?: string;
  asset?: ProjectFolderDto | ProjectFileDto;
  isOpen: boolean;
  onClose: () => void;
}

export const RenameAssetModal = ({ projectId, stackId, asset, isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Rename {asset?.type}</ModalHeader>
        <ModalBody className="pb-6">
          {asset && <RenameAssetForm projectId={projectId} stackId={stackId} asset={asset} onSuccess={onClose} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
