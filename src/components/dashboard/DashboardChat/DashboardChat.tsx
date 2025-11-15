import { Button, Card, CardBody } from '@heroui/react';
import { ProjectDto } from '../../../services/types';
import Link from 'next/link';
import { Icon } from '../../various/Icon';
import { useGetProjectIdChats } from '../../../services/hooks';
import { DashboardChatSkeleton } from './DashboardChatSkeleton';
import { DashboardError } from '../DashboardError';
import { DashboardChatConversations } from './DashboardChatConversations';

interface Props {
  project: ProjectDto;
}

export const DashboardChat = ({ project }: Props) => {
  const { data, isPending, isError, refetch } = useGetProjectIdChats(project.id);

  return (
    <Card>
      <CardBody className="p-3 px-4">
        <div className="flex justify-between gap-4 mb-2 items-center">
          <Link href={`/project/${project.id}/assets`} className="flex items-center gap-1">
            <span className="text-lg font-semibold">Chat</span>
            {!isPending && !isError && (
              <span className="text-foreground-500 font-normal text-medium">({data.length} conversations)</span>
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
          <DashboardChatConversations projectId={project.id} conversations={data.slice(0, 3)} />
        )}
      </CardBody>
    </Card>
  );
};
