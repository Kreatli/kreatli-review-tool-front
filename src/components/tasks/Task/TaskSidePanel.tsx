import { TaskDto } from '../../../services/types';
import { TaskContributors } from './TaskContributors';
import { TaskOwner } from './TaskOwner';
import { TaskStatus } from './TaskStatus';

interface Props {
  projectId: string;
  task: TaskDto;
}

export const TaskSidePanel = ({ projectId, task }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="sticky top-0 flex flex-col gap-3">
        <TaskStatus projectId={projectId} taskId={task.id} status={task.status} statusLabel={task.statusLabel} />
        <TaskOwner projectId={projectId} taskId={task.id} owner={task.owner} />
        <TaskContributors projectId={projectId} taskId={task.id} contributors={task.contributors} />
      </div>
    </div>
  );
};
