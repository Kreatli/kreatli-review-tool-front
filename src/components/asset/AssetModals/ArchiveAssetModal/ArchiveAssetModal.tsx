import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { usePostProjectIdAssetsArchive } from '../../../../services/hooks';
import { getAssetFolderId, getProjectId, getProjectIdAssets } from '../../../../services/services';
import { ProjectFileDto, ProjectFolderDto } from '../../../../services/types';
import { getErrorMessage } from '../../../../utils/getErrorMessage';

interface Props {
  projectId: string;
  asset?: ProjectFolderDto | ProjectFileDto;
  isOpen: boolean;
  onClose: () => void;
}

export const ArchiveAssetModal = ({ projectId, asset, isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);
  const { mutate } = usePostProjectIdAssetsArchive();

  const handleArchive = () => {
    if (!asset) {
      return;
    }

    setIsLoading(true);

    mutate(
      { id: projectId, requestBody: { assetIds: [asset.id] } },
      {
        onSuccess: async ({ project, parent }) => {
          if (parent) {
            queryClient.setQueryData([getAssetFolderId.key, parent.id], parent);
          }

          queryClient.setQueryData([getProjectId.key, projectId], project);
          await queryClient.invalidateQueries({ queryKey: [getProjectIdAssets.key, projectId] });
          addToast({ title: 'This asset was deleted', color: 'success', variant: 'flat' });
          onClose();
          setIsLoading(false);
        },
        onError: (error) => {
          setIsLoading(false);
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>{asset?.type === 'folder' ? 'Delete folder' : 'Delete file'}</ModalHeader>
        <ModalBody className="pb-6">
          <div className="flex flex-col gap-4">
            <div className="text-medium">
              Are you sure you want to delete <span className="font-semibold">&quot;{asset?.name}&quot;</span>?
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="light" isDisabled={isLoading} onClick={onClose}>
                Cancel
              </Button>
              <Button color="danger" variant="flat" isLoading={isLoading} onClick={handleArchive}>
                Delete
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
