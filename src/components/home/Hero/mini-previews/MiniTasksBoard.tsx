import { Avatar, Chip } from '@heroui/react';

import { Icon } from '../../../various/Icon';

const columns = [
  {
    label: 'Briefing',
    tasks: [
      { title: 'Write campaign brief', user: 'https://i.pravatar.cc/150?u=mini-alex', name: 'Alex' },
      { title: 'Collect brand assets', user: 'https://i.pravatar.cc/150?u=mini-sam', name: 'Sam' },
    ],
  },
  {
    label: 'Production',
    tasks: [{ title: 'Edit hero video v3', user: 'https://i.pravatar.cc/150?u=mini-jordan', name: 'Jordan' }],
  },
  {
    label: 'Client Review',
    tasks: [
      { title: 'Final cut sign-off', user: 'https://i.pravatar.cc/150?u=mini-taylor', name: 'Taylor' },
    ],
  },
];

export const MiniTasksBoard = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon icon="board" size={14} className="text-foreground-500" />
          <span className="text-xs font-semibold">Tasks</span>
        </div>
        <Chip size="sm" variant="flat" className="h-5 text-[10px]">
          3 active
        </Chip>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {columns.map((col) => (
          <div key={col.label} className="flex flex-col gap-1">
            <div className="rounded bg-foreground-50 px-1.5 py-1 dark:bg-foreground-100/30">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-foreground-500">
                {col.label}
              </span>
            </div>
            {col.tasks.map((task) => (
              <div
                key={task.title}
                className="rounded border border-foreground-200 bg-content1 p-1.5"
              >
                <p className="text-[10px] font-medium leading-tight">{task.title}</p>
                <div className="mt-1 flex items-center gap-1">
                  <Avatar size="sm" src={task.user} className="h-3.5 w-3.5" />
                  <span className="text-[9px] text-foreground-400">{task.name}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
