import { Button, Card, CardBody } from '@heroui/react';
import { useGetAssets, useGetAssetsFolders } from '../../../services/hooks';
import { ProjectDto } from '../../../services/types';
import { DashboardError } from '../DashboardError';
import { DashboardAssetsSkeleton } from './DashboardAssetsSkeleton';
import { DashboardAssetsList } from './DashboardAssetsList';
import Link from 'next/link';
import { Icon } from '../../various/Icon';
import { DashboardAssetsEmptyState } from './DashboardAssetsEmptyState';

interface Props {
  project: ProjectDto;
}

export const DashboardAssets = ({ project }: Props) => {
  const { data: foldersData } = useGetAssetsFolders({
    limit: 12,
    offset: 0,
    projectId: project.id,
    query: '',
    skipIds: [],
  });

  const { data, isPending, isError, refetch } = useGetAssets({
    limit: 12,
    offset: 0,
    projectId: project.id,
    query: '',
    skipIds: [],
  });

  return (
    <Card>
      <CardBody className="p-3 px-4">
        <div className="flex justify-between gap-4 mb-2 items-center">
          <Link href={`/project/${project.id}/assets`} className="flex items-center gap-1">
            <span className="text-lg font-semibold">Media</span>
            {!isPending && !isError && (
              <span className="text-foreground-500 font-normal text-medium">
                ({data.fileCount} file{data.fileCount === 1 ? '' : 's'})
              </span>
            )}
          </Link>
          <Button as={Link} href={`/project/${project.id}/assets`} size="sm" variant="flat" color="primary">
            Go to Media
            <Icon icon="arrowRight" size={16} />
          </Button>
        </div>
        {isPending ? (
          <DashboardAssetsSkeleton />
        ) : isError ? (
          <DashboardError onReload={refetch} />
        ) : data.files.length > 0 ? (
          <DashboardAssetsList
            files={data.files}
            folders={foldersData?.folders ?? []}
            project={project}
            members={project.members}
          />
        ) : (
          <DashboardAssetsEmptyState />
        )}
      </CardBody>
    </Card>
  );
};
