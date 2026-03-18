import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';

import { usePostTaskIdUnhide } from '../../../services/hooks';
import { getProjectIdTasks, getTaskId } from '../../../services/services';
import { getErrorMessage } from '../../../utils/getErrorMessage';

interface Props {
  projectId: string;
  taskId: string;
  isVisible: boolean;
  onClose: () => void;
}

export const TaskUnhideModal = ({ projectId, taskId, isVisible, onClose }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = usePostTaskIdUnhide();

  const handleRemove = () => {
    mutate(
      { id: taskId },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: [getProjectIdTasks.key, projectId] });
          queryClient.setQueryData([getTaskId.key, taskId], data);
          onClose();
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <Modal isOpen={isVisible} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="pb-0">Unhide task</ModalHeader>
        <ModalBody className="pb-6">
          <div className="flex flex-col gap-4">
            <div className="text-medium">
              Are you sure you want to unhide this task? You won't be able to hide it again.
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="light" isDisabled={isPending} onClick={onClose}>
                Cancel
              </Button>
              <Button color="danger" variant="flat" isLoading={isPending} onClick={handleRemove}>
                <span>Unhide task</span>
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
