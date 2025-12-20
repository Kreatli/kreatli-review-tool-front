import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { ProjectDto } from '../../../../services/types';
import { EditProjectStatusesForm } from './EditProjectStatusesForm';
import { usePutProjectId } from '../../../../services/hooks';
import { getErrorMessage } from '../../../../utils/getErrorMessage';
import { useQueryClient } from '@tanstack/react-query';
import { getProjectId } from '../../../../services/services';

interface Props {
  project: ProjectDto | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export const EditProjectStatusesModal = ({ project, isOpen, onClose }: Props) => {
  const { mutate, isPending } = usePutProjectId();
  const queryClient = useQueryClient();

  if (!project) {
    return null;
  }

  const handleSubmit = (statuses: ProjectDto['assetStatuses']) => {
    const filteredStatuses = statuses.filter((item) => item.label && item.color);

    mutate(
      {
        id: project.id,
        requestBody: { assetStatuses: filteredStatuses },
      },
      {
        onSuccess: (data) => {
          queryClient.setQueryData([getProjectId.key, project.id], data);
          addToast({ title: 'Project statuses were updated', color: 'success', variant: 'flat' });
          onClose();
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} portalContainer={document.body}>
      <ModalContent>
        <ModalHeader>Edit media statuses</ModalHeader>
        <ModalBody>
          <EditProjectStatusesForm statuses={project.assetStatuses} onSubmit={handleSubmit} />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-project-statuses-form"
            isLoading={isPending}
            className="text-content1 bg-foreground"
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
