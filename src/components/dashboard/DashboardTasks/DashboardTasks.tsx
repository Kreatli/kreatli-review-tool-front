import { Button, ScrollShadow, Skeleton } from '@heroui/react';
import NextLink from 'next/link';

import { useSession } from '../../../hooks/useSession';
import { useGetProjectIdTasks } from '../../../services/hooks';
import { ProjectDto } from '../../../services/types';
import { AssetTask } from '../../asset/AssetTasks/AssetTask';
import { EmptyState } from '../../various/EmptyState';
import { Icon } from '../../various/Icon';

interface Props {
  project: ProjectDto;
}

export const DashboardTasks = ({ project }: Props) => {
  const { user } = useSession();

  const {
    data: tasksData,
    isPending,
    isError,
    refetch,
  } = useGetProjectIdTasks(project.id, {
    owner: user?.id,
    limit: 6,
  });

  return (
    <div className="border-t border-foreground-200 lg:border-l lg:border-t-0">
      <div className="flex items-center justify-between gap-3 bg-background px-4 py-3 pb-0">
        <NextLink href={`/project/${project.id}/tasks`} className="flex items-center gap-1">
          <span className="text-lg font-semibold">Tasks assigned to you</span>
        </NextLink>
        <Button color="primary" variant="flat" size="sm" as={NextLink} href={`/project/${project.id}/tasks`}>
          Go to Tasks
          <Icon icon="arrowRight" size={16} />
        </Button>
      </div>
      <ScrollShadow className="max-h-[340px] px-4 pb-4 pt-2">
        {isPending ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2">
            <Skeleton className="h-20 w-full rounded-medium" />
            <Skeleton className="h-20 w-full rounded-medium" />
            <Skeleton className="h-20 w-full rounded-medium" />
            <Skeleton className="h-20 w-full rounded-medium" />
            <Skeleton className="h-20 w-full rounded-medium" />
            <Skeleton className="h-20 w-full rounded-medium" />
          </div>
        ) : isError ? (
          <EmptyState
            size="sm"
            title="Something went wrong"
            icon="error"
            text="An unexpected error occurred. Please try loading the data again."
          >
            <Button size="sm" variant="flat" className="mt-4" onClick={refetch}>
              <Icon icon="update" size={16} />
              Reload
            </Button>
          </EmptyState>
        ) : tasksData?.tasks.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2">
            {tasksData?.tasks.map((task) => (
              <AssetTask key={task.id} task={task} projectId={project.id} />
            ))}
          </div>
        ) : (
          <EmptyState
            size="sm"
            title="No tasks assigned to you"
            icon="board"
            text="You don't have any tasks assigned to you"
          />
        )}
      </ScrollShadow>
    </div>
  );
};
