import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { useDeleteProjectId } from '../../../../services/hooks';
import { getProjects, getUser } from '../../../../services/services';
import { ProjectDto } from '../../../../services/types';
import { getErrorMessage } from '../../../../utils/getErrorMessage';

interface Props {
  project?: ProjectDto;
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteProjectModal = ({ project, isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useDeleteProjectId();

  const handleDelete = () => {
    if (!project) {
      return;
    }

    mutate(
      { id: project.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getProjects.key] });
          queryClient.invalidateQueries({ queryKey: [getUser.key] });
          addToast({ title: 'The project was successfully deleted', color: 'success', variant: 'flat' });
          onClose();
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Delete project</ModalHeader>
        <ModalBody className="pb-6">
          <div className="flex flex-col gap-4">
            <div className="text-medium">
              Are you sure you want to delete <span className="font-semibold">&quot;{project?.name}&quot;</span>{' '}
              project? This action can not be undone.
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="light" isDisabled={isPending} onClick={onClose}>
                Cancel
              </Button>
              <Button color="danger" variant="flat" isLoading={isPending} onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
