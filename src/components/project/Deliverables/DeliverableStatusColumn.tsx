import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { DeliverableDto } from '../../../services/types';
import { DeliverableCard } from './DeliverableCard';
import { Icon } from '../../various/Icon';

interface Props {
  statusId: string;
  status: { label: string; color: string; order: number };
  deliverables: DeliverableDto[];
  onDeliverableUpdated?: () => void;
  onEditDeliverable?: (deliverable: DeliverableDto) => void;
}

export const DeliverableStatusColumn = ({ statusId, status, deliverables, onDeliverableUpdated, onEditDeliverable }: Props) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `status-${statusId}`,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex min-w-[340px] max-w-[340px] flex-col h-full transition-all ${isOver ? 'ring-2 ring-primary ring-offset-2 rounded-xl' : ''}`}
    >
      <div className="mb-4 flex items-center gap-2.5 rounded-xl bg-default-50 border border-default-200 px-4 py-3 sticky top-0 z-10 shrink-0 shadow-sm">
        <div
          className="h-3.5 w-3.5 rounded-full shrink-0 ring-2 ring-white shadow-sm"
          style={{ backgroundColor: status.color }}
        />
        <h3 className="text-sm font-semibold truncate text-foreground-900">{status.label}</h3>
        <span className="ml-auto text-xs font-medium text-foreground-500 shrink-0 bg-default-200 px-2 py-0.5 rounded-full">
          {deliverables.length}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto pr-1 min-h-0">
        <SortableContext items={deliverables.map((d) => d.id)} strategy={verticalListSortingStrategy}>
          {deliverables.length > 0 ? (
            deliverables.map((deliverable) => (
              <DeliverableCard
                key={deliverable.id}
                deliverable={deliverable}
                statusColor={status.color}
                onDeliverableUpdated={onDeliverableUpdated}
                onEdit={onEditDeliverable}
              />
            ))
          ) : (
            <div className="rounded-xl border-2 border-dashed border-default-200 bg-default-50/50 p-12 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-default-100 flex items-center justify-center">
                  <Icon icon="file" size={20} className="text-foreground-400" />
                </div>
                <p className="text-sm font-medium text-foreground-600">No deliverables</p>
                <p className="text-xs text-foreground-500">Drag items here or create new</p>
              </div>
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
};

