import React from 'react';
import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { ProjectDto, ProjectStageDto } from '../../../../services/types';
import { EditProjectStagesForm } from './EditProjectStagesForm';
import { getErrorMessage } from '../../../../utils/getErrorMessage';
import { useQueryClient } from '@tanstack/react-query';
import { getProjectId, getProjects } from '../../../../services/services';
import { Http } from '../../../../services/httpRequest';

interface Props {
  project: ProjectDto | undefined;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const EditProjectStagesModal = ({ project, isOpen, onClose, onSuccess }: Props) => {
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = React.useState(false);

  if (!project) {
    return null;
  }

  const handleSubmit = async (stages: ProjectStageDto[]) => {
    if (stages.length === 0) {
      addToast({ title: 'At least one stage is required', color: 'danger', variant: 'flat' });
      return;
    }

    setIsPending(true);

    try {
      const response = await Http.putRequest(
        `/project/${project.id}/stages`,
        undefined,
        { stages },
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
        addToast({ title: 'Project stages were updated', color: 'success', variant: 'flat' });
        onSuccess?.();
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
        <ModalHeader>Edit Project Stages</ModalHeader>
        <ModalBody>
          <EditProjectStagesForm stages={project.projectStages} onSubmit={handleSubmit} />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-project-stages-form"
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

