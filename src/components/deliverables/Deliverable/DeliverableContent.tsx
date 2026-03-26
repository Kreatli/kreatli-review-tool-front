import { DeliverableDto } from '../../../services/types';
import { formatFullDate } from '../../../utils/dates';
import { DeliverableDescription } from './DeliverableDescription';
import { DeliverableSidePanel } from './DeliverableSidePanel';
import { DeliverableTasks } from './DeliverableTasks';

interface Props {
  projectId: string;
  deliverable: DeliverableDto;
}

export const DeliverableContent = ({ projectId, deliverable }: Props) => {
  return (
    <div className="flex min-h-[200px] flex-col gap-4">
      <div className="grid gap-4 pb-6 md:grid-cols-[1fr_300px]">
        <div className="order-1 flex flex-col gap-4 md:order-none">
          <DeliverableDescription deliverableId={deliverable.id} content={deliverable.content} />
          <DeliverableTasks projectId={projectId} deliverableId={deliverable.id} />
          <div className="text-xs text-foreground-500">
            Created at {formatFullDate(deliverable.createdAt)} by {deliverable.createdBy?.name}
          </div>
        </div>
        <DeliverableSidePanel projectId={projectId} deliverable={deliverable} />
      </div>
    </div>
  );
};
