import { useRef } from 'react';

import { TaskDto } from '../../../services/types';
import { formatFullDate } from '../../../utils/dates';
import { TaskAttachments } from './TaskAttachments';
import { TaskComments } from './TaskComments';
import { TaskDescription } from './TaskDescription';
import { TaskHeader } from './TaskHeader';
import { TaskSidePanel } from './TaskSidePanel';

interface Props {
  projectId: string;
  task: TaskDto;
}

export const TaskContent = ({ task, projectId }: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleAttach = () => {
    buttonRef.current?.scrollIntoView({ block: 'center' });
    setTimeout(() => {
      buttonRef.current?.click();
    });
  };

  return (
    <div className="flex min-h-[320px] flex-col gap-4">
      <div className="grid gap-4 pb-6 md:grid-cols-[1fr_300px]">
        <div className="order-1 flex flex-col gap-4 md:order-none">
          <TaskHeader projectId={projectId} task={task} onAttach={handleAttach} />
          <TaskDescription taskId={task.id} content={task.content} />
          <TaskAttachments ref={buttonRef} projectId={projectId} taskId={task.id} />
          <TaskComments projectId={projectId} taskId={task.id} />
          <div className="text-xs text-foreground-500">
            Created at {formatFullDate(task.createdAt)} by {task.createdBy?.name}
          </div>
        </div>
        <TaskSidePanel projectId={projectId} task={task} />
      </div>
    </div>
  );
};
