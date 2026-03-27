import { DeliverableDto } from '../../../services/types';
import { DeliverableDates } from './DeliverableDates';
import { DeliverableOwner } from './DeliverableOwner';
import { DeliverableStatus } from './DeliverableStatus';

interface Props {
  projectId: string;
  deliverable: DeliverableDto;
}

export const DeliverableSidePanel = ({ projectId, deliverable }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="sticky top-0 flex flex-col gap-3">
        <DeliverableStatus
          projectId={projectId}
          deliverableId={deliverable.id}
          status={deliverable.status}
          statusLabel={deliverable.statusLabel}
          statusColor={deliverable.statusColor}
        />
        <DeliverableOwner projectId={projectId} deliverableId={deliverable.id} owner={deliverable.owner} />
        <DeliverableDates projectId={projectId} deliverable={deliverable} />
      </div>
    </div>
  );
};
