import { Button, Card, CardBody } from '@heroui/react';
import Link from 'next/link';

import { useGetAssets, useGetAssetsFolders } from '../../../services/hooks';
import { ProjectDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { DashboardError } from '../DashboardError';
import { DashboardAssetsEmptyState } from './DashboardAssetsEmptyState';
import { DashboardAssetsList } from './DashboardAssetsList';
import { DashboardAssetsSkeleton } from './DashboardAssetsSkeleton';

interface Props {
  project: ProjectDto;
}

export const DashboardAssets = ({ project }: Props) => {
  const {
    data: foldersData,
    isPending: isPendingFolders,
    isError: isErrorFolders,
    refetch: refetchFolders,
  } = useGetAssetsFolders({
    limit: 12,
    offset: 0,
    projectId: project.id,
    query: '',
    skipIds: [],
  });

  const {
    data,
    isPending: isPendingAssets,
    isError: isErrorAssets,
    refetch: refetchAssets,
  } = useGetAssets({
    limit: 12,
    offset: 0,
    projectId: project.id,
  });

  const isPending = isPendingFolders || isPendingAssets;
  const isError = isErrorFolders || isErrorAssets;
  const refetch = refetchFolders || refetchAssets;

  return (
    <Card>
      <CardBody className="p-3 px-4">
        <div className="mb-2 flex items-center justify-between gap-4">
          <Link href={`/project/${project.id}/assets`} className="flex items-center gap-1">
            <span className="text-lg font-semibold">Media</span>
            {!isPending && !isError && (
              <span className="text-medium font-normal text-foreground-500">
                ({data?.fileCount ?? 0} file{data?.fileCount === 1 ? '' : 's'})
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
        ) : (data && data.files.length > 0) || (foldersData && foldersData?.folders.length > 0) ? (
          <DashboardAssetsList
            files={data?.files ?? []}
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
