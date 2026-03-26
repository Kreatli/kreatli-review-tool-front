import { Button, Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useDeliverableModalVisibility } from '../../../hooks/useDeliverableModalVisibility';
import { useGetDeliverableId } from '../../../services/hooks';
import { EmptyState } from '../../various/EmptyState';
import { Icon } from '../../various/Icon';
import { DeliverableContent } from './DeliverableContent';
import { DeliverableSkeleton } from './DeliverableSkeleton';
import { DeliverableTitle } from './DeliverableTitle';

export const DeliverableModal = () => {
  const { closeDeliverableModal } = useDeliverableModalVisibility();
  const searchParams = useSearchParams();

  const deliverableId = searchParams.get('deliverableId');

  const [isVisible, setIsVisible] = useState(false);

  const {
    data: deliverable,
    isPending: isDeliverableLoading,
    isError,
    error,
    refetch,
  } = useGetDeliverableId(deliverableId ?? '', {
    enabled: !!deliverableId,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(!!searchParams.get('deliverableId'));
  }, [searchParams]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => closeDeliverableModal(), 150);
  };

  const projectId = deliverable?.projectId;

  return (
    <Modal size="5xl" placement="top" scrollBehavior="inside" isOpen={isVisible} onClose={handleClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-2 pb-2 text-2xl">
          <DeliverableTitle
            projectId={projectId}
            deliverableId={deliverableId}
            name={deliverable?.name}
            isOverDue={!!deliverable?.endDate && new Date(deliverable.endDate) < new Date()}
            isLoading={isDeliverableLoading}
            isCompleted={deliverable?.isCompleted}
          />
        </ModalHeader>
        <ModalBody className="px-3 py-0 sm:px-6">
          {isDeliverableLoading ? (
            <DeliverableSkeleton />
          ) : error && 'status' in error && error.status === 404 ? (
            <EmptyState
              title="Deliverable not found"
              icon="trash"
              size="sm"
              text="The deliverable you are looking for has been deleted or never existed."
            />
          ) : isError || !projectId ? (
            <EmptyState
              title="Something went wrong"
              icon="error"
              text="An unexpected error occurred. Please try loading the data again."
            >
              <Button size="sm" className="mt-4" variant="flat" onClick={refetch}>
                <Icon icon="update" size={16} />
                Reload
              </Button>
            </EmptyState>
          ) : (
            <DeliverableContent projectId={projectId} deliverable={deliverable} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
