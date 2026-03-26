import { Avatar } from '@heroui/react';

import { useTaskModalVisibility } from '../../../hooks/useTaskModalVisibility';
import { TaskInfoDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { DeliverableTasksActions } from './DeliverableTasksActions';

interface Props {
  deliverableId: string;
  tasks: TaskInfoDto[];
}

export const DeliverableTasksCards = ({ deliverableId, tasks }: Props) => {
  const { openTaskModal } = useTaskModalVisibility();

  const handleClick = (task: TaskInfoDto) => {
    openTaskModal(task.id, undefined, 'push');
  };

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="group pointer-events-auto relative cursor-pointer rounded-small bg-foreground-50 p-2.5 shadow-small"
          onClick={() => handleClick(task)}
        >
          <div className="flex flex-col gap-2">
            <div className="pr-3 text-small font-semibold">{task.name}</div>
            <div className="flex items-center justify-between gap-1 overflow-hidden text-foreground">
              {task.owner && (
                <div className="flex items-center gap-1.5 truncate text-xs">
                  <Avatar
                    src={task.owner.avatar?.url}
                    className="size-5 shrink-0"
                    name={task.owner.name}
                    getInitials={(name) => name.charAt(0).toUpperCase()}
                  />
                  {task.owner.name}
                </div>
              )}
              {task.commentCount > 0 && (
                <div className="flex items-center gap-1 text-xs text-foreground-500">
                  <Icon icon="chat" size={16} />
                  {task.commentCount}
                </div>
              )}
            </div>
          </div>
          <div className="absolute right-0.5 top-0.5">
            <DeliverableTasksActions deliverableId={deliverableId} task={task} />
          </div>
        </div>
      ))}
    </div>
  );
};
