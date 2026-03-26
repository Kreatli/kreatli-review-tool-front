import { Avatar } from '@heroui/react';

import { TaskInfoDto } from '../../../services/types';

interface Props {
  task: TaskInfoDto;
  onClick: () => void;
}

export const TasksPickerItem = ({ task, onClick }: Props) => {
  return (
    <div className="relative">
      <div className="flex gap-2 rounded-large p-1.5 hover:bg-foreground-100">
        <div className="shrink-0">
          <Avatar
            name={task.owner.name}
            size="sm"
            getInitials={(name) => name.charAt(0).toUpperCase()}
            src={task.owner.avatar?.url}
          />
        </div>
        <div className="flex flex-col gap-0.5 overflow-hidden">
          <button
            type="button"
            className="size-xs overflow-hidden text-ellipsis whitespace-nowrap text-start font-semibold after:absolute after:inset-0 after:z-20"
            onClick={onClick}
          >
            {task.name}
          </button>
          <div className="text-xs text-foreground-500">{task.statusLabel || 'Unplaced'}</div>
        </div>
      </div>
    </div>
  );
};
