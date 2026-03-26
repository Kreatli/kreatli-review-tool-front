import { Button } from '@heroui/react';
import { useState } from 'react';

import { useDeliverableModalVisibility } from '../../../hooks/useDeliverableModalVisibility';
import { DeliverableInfoDto } from '../../../services/types';
import { useIsBreakpoint } from '../../tiptap/hooks/use-is-breakpoint';
import { EmptyState } from '../../various/EmptyState';
import { Icon } from '../../various/Icon';
import { NewDeliverableModal } from '../Deliverable/NewDeliverableModal';
import { DeliverablesCards } from './DeliverablesCards';
import { DeliverablesTable } from './DeliverablesTable';
import { RemoveDeliverableModal } from './RemoveDeliverableModal';
import { RenameDeliverableModal } from './RenameDeliverableModal';

interface Props {
  projectId: string;
  deliverables: DeliverableInfoDto[];
}

export const Deliverables = ({ projectId, deliverables }: Props) => {
  const [isNewDeliverableModalVisible, setIsNewDeliverableModalVisible] = useState(false);
  const [isRenameModalVisible, setIsRenameModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedDeliverable, setSelectedDeliverable] = useState<DeliverableInfoDto | undefined>(undefined);

  const isMobile = useIsBreakpoint('max', 1024);

  const { openDeliverableModal } = useDeliverableModalVisibility();

  const handleRowClick = (deliverable: DeliverableInfoDto) => {
    openDeliverableModal(deliverable.id);
  };

  return (
    <>
      {deliverables.length === 0 ? (
        <EmptyState
          title="No deliverables yet"
          text="You don't have any deliverables yet. Go ahead and create first one."
        >
          <Button className="mt-3 bg-foreground text-content1" onClick={() => setIsNewDeliverableModalVisible(true)}>
            <Icon icon="plus" size={16} />
            Create deliverable
          </Button>
        </EmptyState>
      ) : isMobile ? (
        <DeliverablesCards
          deliverables={deliverables}
          onSelect={setSelectedDeliverable}
          onRename={() => setIsRenameModalVisible(true)}
          onDelete={() => setIsDeleteModalVisible(true)}
          onClick={handleRowClick}
        />
      ) : (
        <DeliverablesTable
          deliverables={deliverables}
          onSelect={setSelectedDeliverable}
          onRename={() => setIsRenameModalVisible(true)}
          onDelete={() => setIsDeleteModalVisible(true)}
          onCreate={() => setIsNewDeliverableModalVisible(true)}
          onClick={handleRowClick}
        />
      )}
      <NewDeliverableModal
        projectId={projectId}
        isVisible={isNewDeliverableModalVisible}
        onClose={() => setIsNewDeliverableModalVisible(false)}
      />
      <RenameDeliverableModal
        projectId={projectId}
        deliverableId={selectedDeliverable?.id}
        name={selectedDeliverable?.name ?? ''}
        isVisible={isRenameModalVisible}
        onClose={() => setIsRenameModalVisible(false)}
      />
      <RemoveDeliverableModal
        projectId={projectId}
        deliverableId={selectedDeliverable?.id}
        isVisible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
      />
    </>
  );
};
