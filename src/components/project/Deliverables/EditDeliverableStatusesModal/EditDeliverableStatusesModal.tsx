import React from 'react';
import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { ProjectDto } from '../../../../services/types';
import { EditDeliverableStatusesForm } from './EditDeliverableStatusesForm';
import { Http } from '../../../../services/httpRequest';
import { getErrorMessage } from '../../../../utils/getErrorMessage';
import { useQueryClient } from '@tanstack/react-query';
import { getProjectId, getProjects } from '../../../../services/services';

interface Props {
  project: ProjectDto | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export const EditDeliverableStatusesModal = ({ project, isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = React.useState(false);

  if (!project) {
    return null;
  }

  const handleSubmit = async (statuses: Record<string, { label: string; color: string; order: number; value: string }>) => {
    setIsPending(true);

    try {
      const response = await Http.putRequest(
        `/project/${project.id}/deliverable-statuses`,
        undefined,
        { statuses },
        undefined,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response) {
        queryClient.setQueryData([getProjectId.key, project.id], response);
        queryClient.invalidateQueries({ queryKey: [getProjects.key] });
        addToast({ title: 'Deliverable statuses were updated', color: 'success', variant: 'flat' });
        onClose();
      }
    } catch (error) {
      addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} portalContainer={document.body} size="lg">
      <ModalContent>
        <ModalHeader>Edit Deliverable Statuses</ModalHeader>
        <ModalBody>
          <EditDeliverableStatusesForm statuses={project.deliverableStatuses} onSubmit={handleSubmit} />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-deliverable-statuses-form"
            isLoading={isPending}
            className="bg-foreground text-content1"
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

