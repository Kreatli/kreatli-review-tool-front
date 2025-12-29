import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { usePutProjectIdStatus } from '../../../../services/hooks';
import { getProjectId, getProjects } from '../../../../services/services';
import { ProjectDto } from '../../../../services/types';
import { getErrorMessage } from '../../../../utils/getErrorMessage';

interface Props {
  project?: ProjectDto;
  isOpen: boolean;
  onClose: () => void;
}

export const ArchiveProjectModal = ({ project, isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = usePutProjectIdStatus();

  const handleArchive = () => {
    if (!project) {
      return;
    }

    mutate(
      { id: project.id, requestBody: { status: 'archived' } },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: [getProjects.key] });
          queryClient.setQueryData([getProjectId.key, project.id], data);
          addToast({ title: 'The project was moved to Archived', color: 'success', variant: 'flat' });
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
        <ModalHeader>Archive project</ModalHeader>
        <ModalBody className="pb-6">
          <div className="flex flex-col gap-4">
            <div className="text-medium">
              Are you sure you want to archive <span className="font-semibold">&quot;{project?.name}&quot;</span>{' '}
              project?
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="light" isDisabled={isPending} onClick={onClose}>
                Cancel
              </Button>
              <Button color="danger" variant="flat" isLoading={isPending} onClick={handleArchive}>
                Archive
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
