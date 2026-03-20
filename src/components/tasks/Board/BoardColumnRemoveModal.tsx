import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { usePutProjectId } from '../../../services/hooks';
import { getProjectId, getProjectIdTasks } from '../../../services/services';
import { ProjectDto } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';

interface Props {
  projectId: string;
  columnId: string | undefined;
  isVisible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const BoardColumnRemoveModal = ({ projectId, columnId, isVisible, onClose, onSuccess }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = usePutProjectId();

  const handleRemove = () => {
    if (!columnId) {
      return;
    }

    const project = queryClient.getQueryData<ProjectDto>([getProjectId.key, projectId]);

    if (!project) {
      return;
    }

    setIsLoading(true);

    mutate(
      {
        id: projectId,
        requestBody: {
          taskStatuses: project.taskStatuses.filter((status) => status.value !== columnId),
        },
      },
      {
        onSuccess: async (data) => {
          queryClient.setQueryData([getProjectId.key, project.id], data);
          await queryClient.invalidateQueries({ queryKey: [getProjectIdTasks.key, projectId] });
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
    <Modal isOpen={isVisible} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="pb-0">Remove column</ModalHeader>
        <ModalBody className="pb-6">
          <div className="flex flex-col gap-4">
            <div className="text-medium">
              All tasks in this column will be moved to “Unplaced”. Do you want to proceed?
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="light" isDisabled={isLoading} onClick={onClose}>
                Cancel
              </Button>
              <Button color="danger" variant="flat" isLoading={isLoading} onClick={handleRemove}>
                <span>Remove column</span>
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
