import { addToast, Button, Chip, Skeleton } from '@heroui/react';

import { queryClient } from '../../../lib/queryClient';
import { useGetDeliverableIdTasks, usePostDeliverableIdTask } from '../../../services/hooks';
import { getDeliverableIdTasks } from '../../../services/services';
import { TaskInfoDto } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { useIsBreakpoint } from '../../tiptap/hooks/use-is-breakpoint';
import { Icon } from '../../various/Icon';
import { DeliverableTasksCards } from './DeliverableTasksCards';
import { DeliverableTasksTable } from './DeliverableTasksTable';
import { TasksPicker } from './TasksPicker';

interface Props {
  projectId: string;
  deliverableId: string;
}

export const DeliverableTasks = ({ projectId, deliverableId }: Props) => {
  const isMobile = useIsBreakpoint('max', 1024);

  const { data: tasksData, isPending: isTasksPending } = useGetDeliverableIdTasks(deliverableId);
  const { mutate: addTask } = usePostDeliverableIdTask();

  const tasks = tasksData?.tasks ?? [];
  const hasTasks = tasks.length > 0;

  const handleSelectTask = (task: TaskInfoDto) => {
    addTask(
      { id: deliverableId, requestBody: { taskId: task.id } },
      {
        onSuccess: ({ tasks }) => {
          queryClient.setQueryData([getDeliverableIdTasks.key, deliverableId], { tasks });
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <div className="flex min-h-8 items-center gap-1 pl-3 font-semibold">
          Tasks
          <Chip size="sm" variant="flat" classNames={{ content: 'font-semibold' }}>
            {tasks.length}
          </Chip>
        </div>
        {hasTasks && (
          <TasksPicker projectId={projectId} skipIds={tasks.map((task) => task.id) ?? []} onSelect={handleSelectTask}>
            <Button size="sm" variant="light" radius="full" isIconOnly>
              <Icon icon="plus" size={16} />
            </Button>
          </TasksPicker>
        )}
      </div>
      {hasTasks ? (
        isMobile ? (
          <DeliverableTasksCards deliverableId={deliverableId} tasks={tasks} />
        ) : (
          <DeliverableTasksTable deliverableId={deliverableId} tasks={tasks} />
        )
      ) : isTasksPending ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-full rounded-medium" />
          <Skeleton className="h-6 w-full rounded-medium" />
          <Skeleton className="h-6 w-full rounded-medium" />
          <Skeleton className="h-6 w-full rounded-medium" />
        </div>
      ) : (
        <TasksPicker projectId={projectId} onSelect={handleSelectTask}>
          <Button className="w-fit" size="sm" variant="flat">
            Link tasks
          </Button>
        </TasksPicker>
      )}
    </div>
  );
};
