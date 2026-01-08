import { Button, Card, CardBody } from '@heroui/react';
import Link from 'next/link';

import { useGetProjectIdLogs } from '../../../services/hooks';
import { ProjectDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { DashboardError } from '../DashboardError';
import { DashboardActivitySkeleton } from './DashboardActivitySkeleton';
import { DashboardActivityTable } from './DashboardActivityTable';

interface Props {
  project: ProjectDto;
}

export const DashboardActivity = ({ project }: Props) => {
  const { data, isPending, isError, refetch } = useGetProjectIdLogs(project.id, {
    limit: 5,
    offset: 0,
  });

  return (
    <Card>
      <CardBody className="p-3 px-4">
        <div className="mb-2 flex items-center justify-between gap-4">
          <Link href={`/project/${project.id}/assets`} className="flex items-center gap-1">
            <span className="text-lg font-semibold">Activity</span>
            {!isPending && !isError && (
              <span className="text-medium font-normal text-foreground-500">({data.logsCount})</span>
            )}
          </Link>
          <Button as={Link} href={`/project/${project.id}/activity`} size="sm" variant="flat" color="primary">
            Go to Activity
            <Icon icon="arrowRight" size={16} />
          </Button>
        </div>
        {isError ? (
          <DashboardError onReload={refetch} />
        ) : isPending ? (
          <DashboardActivitySkeleton />
        ) : (
          <DashboardActivityTable logs={data.logs} />
        )}
      </CardBody>
    </Card>
  );
};
