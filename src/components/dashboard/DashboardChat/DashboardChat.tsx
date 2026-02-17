import { Button } from '@heroui/react';
import Link from 'next/link';

import { useGetProjectIdChats } from '../../../services/hooks';
import { ProjectDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { DashboardError } from '../DashboardError';
import { DashboardChatConversations } from './DashboardChatConversations';
import { DashboardChatSkeleton } from './DashboardChatSkeleton';

interface Props {
  project: ProjectDto;
}

export const DashboardChat = ({ project }: Props) => {
  const { data, isPending, isError, refetch } = useGetProjectIdChats(project.id);

  return (
    <div className="border-t border-foreground-200 px-4 pb-4 lg:border-l lg:border-t-0">
      <div className="sticky top-0 z-10 mb-2 flex items-center justify-between gap-4 bg-background py-3">
        <Link href={`/project/${project.id}/chat`} className="flex items-center gap-1">
          <span className="text-lg font-semibold">Chat</span>
          {!isPending && !isError && (
            <span className="text-medium font-normal text-foreground-500">
              ({data.length} conversation{data.length === 1 ? '' : 's'})
            </span>
          )}
        </Link>
        <Button as={Link} href={`/project/${project.id}/chat`} size="sm" variant="flat" color="primary">
          Go to Chat
          <Icon icon="arrowRight" size={16} />
        </Button>
      </div>
      {isPending ? (
        <DashboardChatSkeleton />
      ) : isError ? (
        <DashboardError onReload={refetch} />
      ) : (
        <DashboardChatConversations projectId={project.id} conversations={data.slice(0, 4)} />
      )}
    </div>
  );
};
