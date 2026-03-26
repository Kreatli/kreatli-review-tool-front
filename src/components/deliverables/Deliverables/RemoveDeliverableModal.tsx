import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { useDeleteDeliverableId } from '../../../services/hooks';
import { getProjectIdDeliverables } from '../../../services/services';
import { getErrorMessage } from '../../../utils/getErrorMessage';

interface Props {
  projectId: string;
  deliverableId: string | undefined;
  isVisible: boolean;
  onClose: () => void;
}

export const RemoveDeliverableModal = ({ projectId, deliverableId, isVisible, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useDeleteDeliverableId();

  const handleRemove = () => {
    if (!deliverableId) {
      return;
    }

    setIsLoading(true);

    mutate(
      { id: deliverableId },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: [getProjectIdDeliverables.key, projectId] });
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
    <Modal isOpen={isVisible} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="pb-0">Delete deliverable</ModalHeader>
        <ModalBody className="pb-6">
          <div className="flex flex-col gap-4">
            <div className="text-medium">Are you sure you want to delete this deliverable?</div>
            <div className="flex justify-end gap-2">
              <Button variant="light" onClick={onClose}>
                Cancel
              </Button>
              <Button color="danger" variant="flat" isLoading={isLoading} onClick={handleRemove}>
                <span>Delete deliverable</span>
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
