import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { usePutProjectId } from '../../../services/hooks';
import { getProjectId, getProjectIdTasks } from '../../../services/services';
import { ProjectDto } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { BoardColumnsForm } from './BoardColumnsForm';

interface Props {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const BoardColumnsModal = ({ projectId, isOpen, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = usePutProjectId();
  const queryClient = useQueryClient();

  const project = queryClient.getQueryData<ProjectDto>([getProjectId.key, projectId]);

  if (!project) {
    return null;
  }

  const handleSubmit = (statuses: ProjectDto['taskStatuses']) => {
    const filteredStatuses = statuses.filter((item) => item.label);

    setIsLoading(true);

    mutate(
      {
        id: project.id,
        requestBody: { taskStatuses: filteredStatuses },
      },
      {
        onSuccess: async (data) => {
          queryClient.setQueryData([getProjectId.key, project.id], data);
          await queryClient.invalidateQueries({ queryKey: [getProjectIdTasks.key, project.id] });
          setIsLoading(false);
          addToast({ title: 'Columns were updated', color: 'success', variant: 'flat' });
          onClose();
        },
        onError: (error) => {
          setIsLoading(false);
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} portalContainer={document.body}>
      <ModalContent>
        <ModalHeader>Edit columns</ModalHeader>
        <ModalBody>
          <BoardColumnsForm statuses={project.taskStatuses} onSubmit={handleSubmit} />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-project-statuses-form"
            isLoading={isLoading}
            className="bg-foreground text-content1"
          >
            <span>Save</span>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
