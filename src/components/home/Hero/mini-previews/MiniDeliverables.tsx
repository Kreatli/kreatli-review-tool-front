import { Chip, ChipProps } from '@heroui/react';

import { Icon } from '../../../various/Icon';

const rows: Array<{ title: string; due: string; status: string; color: ChipProps['color'] }> = [
  { title: 'Hero cut (16:9) — v4', due: 'Due Tue', status: 'In review', color: 'primary' },
  { title: 'Social cutdowns (9:16)', due: 'Due Thu', status: 'Draft', color: 'default' },
  { title: 'Client delivery pack', due: 'Due Fri', status: 'Approved', color: 'success' },
];

export const MiniDeliverables = () => {
  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <Icon icon="calendar" size={14} className="text-foreground-500" />
        <span className="text-xs font-semibold">Deliverables</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded border border-foreground-200">
        <div className="grid grid-cols-[1fr_auto_auto] gap-2 bg-foreground-50 px-2 py-1 text-[9px] font-semibold text-foreground-500">
          <span>Title</span>
          <span>Status</span>
          <span>Due</span>
        </div>
        <div className="min-h-0 flex-1">
          {rows.map((r) => (
            <div
              key={r.title}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-2 border-t border-foreground-200 bg-content1 px-2 py-1.5"
            >
              <span className="truncate text-[10px] font-medium">{r.title}</span>
              <Chip size="sm" variant="flat" color={r.color} className="h-4 text-[9px]">
                {r.status}
              </Chip>
              <span className="text-[9px] text-foreground-400">{r.due}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
