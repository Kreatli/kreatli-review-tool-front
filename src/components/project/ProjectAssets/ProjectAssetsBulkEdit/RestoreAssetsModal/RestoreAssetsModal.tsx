import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { usePostProjectIdAssetsRestore } from '../../../../../services/hooks';
import { getProjectId, getProjectIdAssetsArchived } from '../../../../../services/services';
import { getErrorMessage } from '../../../../../utils/getErrorMessage';

interface Props {
  projectId: string;
  assetIds: string[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const RestoreAssetsModal = ({ projectId, assetIds, isOpen, onClose, onSuccess }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = usePostProjectIdAssetsRestore();

  const handleRestore = () => {
    if (assetIds.length === 0) {
      return;
    }

    mutate(
      { id: projectId, requestBody: { assetIds } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getProjectIdAssetsArchived.key, projectId] });
          queryClient.invalidateQueries({ queryKey: [getProjectId.key, projectId] });
          addToast({ title: 'Assets were restored', color: 'success', variant: 'flat' });
          onClose();
          onSuccess();
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Restore assets</ModalHeader>
        <ModalBody className="pb-6">
          <div className="flex flex-col gap-4">
            <div className="text-medium">
              Are you sure you want to restore {assetIds.length} asset{assetIds.length === 1 ? '' : 's'}?
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="light" isDisabled={isPending} onClick={onClose}>
                Cancel
              </Button>
              <Button className="bg-foreground text-content1" isLoading={isPending} onClick={handleRestore}>
                Restore
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
