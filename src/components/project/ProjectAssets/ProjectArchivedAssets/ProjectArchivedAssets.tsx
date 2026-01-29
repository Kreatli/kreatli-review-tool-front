import React from 'react';

import { useProjectContext } from '../../../../contexts/Project';
import { useGetProjectIdAssetsArchived } from '../../../../services/hooks';
import { ProjectBreadcrumbs } from '../../Project/ProjectBreadcrumbs';
import { ProjectArchivedAssetsList } from './ProjectArchivedAssetsList';

export const ProjectArchivedAssets = () => {
  const { project } = useProjectContext();
  const { data, isPending, isError } = useGetProjectIdAssetsArchived(project.id);

  const assets = React.useMemo(() => {
    return [...(data?.files ?? []), ...(data?.folders ?? [])];
  }, [data]);

  const fileCount = assets.length ?? 0;

  const totalFileSize = React.useMemo(() => {
    return (
      assets.reduce((acc, asset) => (asset.type === 'file' ? acc + asset.fileSize : acc + asset.totalFileSize), 0) ?? 0
    );
  }, [assets]);

  const files = React.useMemo(() => {
    return data?.files ?? [];
  }, [data]);

  const folders = React.useMemo(() => {
    return data?.folders ?? [];
  }, [data]);

  const path = [
    {
      name: project.name,
      url: `/project/${project.id}/assets`,
    },
    {
      name: 'Recently deleted',
      url: '#',
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <ProjectBreadcrumbs
        fileCount={fileCount}
        totalFileSize={totalFileSize}
        path={path}
        coverUrl={project.cover?.url}
      />
      <ProjectArchivedAssetsList folders={folders} files={files} isError={isError} isPending={isPending} />
    </div>
  );
};
