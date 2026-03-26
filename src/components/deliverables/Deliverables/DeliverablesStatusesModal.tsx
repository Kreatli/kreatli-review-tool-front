import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';

import { useGetProjectId, usePutProjectId } from '../../../services/hooks';
import { getProjectId, getProjectIdDeliverables } from '../../../services/services';
import { ProjectDto } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { DeliverablesStatusesForm } from './DeliverablesStatusesForm';

interface Props {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DeliverablesStatusesModal = ({ projectId, isOpen, onClose }: Props) => {
  const { data: project } = useGetProjectId(projectId, { refetchOnMount: false });
  const queryClient = useQueryClient();

  const { mutate, isPending } = usePutProjectId();

  const handleSubmit = (statuses: ProjectDto['deliverableStatuses']) => {
    if (!project) {
      return;
    }

    const filteredStatuses = statuses.filter((item) => item.label);

    mutate(
      {
        id: project.id,
        requestBody: { deliverableStatuses: filteredStatuses },
      },
      {
        onSuccess: async (data) => {
          queryClient.setQueryData([getProjectId.key, project.id], data);
          queryClient.invalidateQueries({ queryKey: [getProjectIdDeliverables.key, project.id] });
          addToast({ title: 'Deliverable statuses were updated', color: 'success', variant: 'flat' });
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
        <ModalHeader>Edit deliverable statuses</ModalHeader>
        <ModalBody>
          <DeliverablesStatusesForm statuses={project?.deliverableStatuses ?? []} onSubmit={handleSubmit} />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="deliverables-statuses-form"
            isLoading={isPending}
            className="bg-foreground text-content1"
          >
            <span>Save</span>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
