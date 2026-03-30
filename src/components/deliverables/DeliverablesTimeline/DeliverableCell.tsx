import { Avatar } from '@heroui/react';

import { DeliverableInfoDto } from '../../../services/types';

interface Props {
  deliverables: DeliverableInfoDto[];
  row: { id: string };
}

export const DeliverableCell = ({ deliverables, row }: Props) => {
  const deliverable = deliverables.find((deliverable) => deliverable.id === row.id);

  if (!deliverable) {
    return <div className="text-sm font-medium text-foreground-500">Total: {deliverables.length}</div>;
  }

  return (
    <div className="flex cursor-pointer items-center gap-2">
      <Avatar
        name={deliverable?.owner.name}
        src={deliverable?.owner.avatar?.url}
        className="size-5 shrink-0"
        getInitials={(name) => name.charAt(0).toUpperCase()}
      />
      <div className="flex flex-col">
        <div className="truncate">{deliverable?.name}</div>
        <div className="text-xs font-normal text-foreground-500">{deliverable.statusLabel || 'No status'}</div>
      </div>
    </div>
  );
};
