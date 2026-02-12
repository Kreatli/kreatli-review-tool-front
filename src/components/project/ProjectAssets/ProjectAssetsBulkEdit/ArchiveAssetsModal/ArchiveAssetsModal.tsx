import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { usePostProjectIdAssetsArchive } from '../../../../../services/hooks';
import { getProjectId, getProjectIdAssets } from '../../../../../services/services';
import { getErrorMessage } from '../../../../../utils/getErrorMessage';

interface Props {
  projectId: string;
  assetIds: string[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ArchiveAssetsModal = ({ projectId, assetIds, isOpen, onClose, onSuccess }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = usePostProjectIdAssetsArchive();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleArchive = () => {
    if (assetIds.length === 0) {
      return;
    }

    setIsLoading(true);

    mutate(
      { id: projectId, requestBody: { assetIds } },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: [getProjectIdAssets.key, projectId] });
          queryClient.invalidateQueries({ queryKey: [getProjectId.key, projectId] });
          addToast({ title: 'Assets were deleted', color: 'success', variant: 'flat' });
          onClose();
          onSuccess();
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
        <ModalHeader>Delete assets</ModalHeader>
        <ModalBody className="pb-6">
          <div className="flex flex-col gap-4">
            <div className="text-medium">
              Are you sure you want to delete {assetIds.length} asset{assetIds.length === 1 ? '' : 's'}?
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="light" isDisabled={isLoading} onClick={onClose}>
                Cancel
              </Button>
              <Button color="danger" variant="flat" isLoading={isLoading} onClick={handleArchive}>
                <span>Delete</span>
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
