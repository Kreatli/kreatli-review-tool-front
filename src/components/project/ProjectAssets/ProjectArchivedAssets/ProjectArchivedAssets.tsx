import React from 'react';

import { useProjectContext } from '../../../../contexts/Project';
import { useGetProjectIdAssetsArchived } from '../../../../services/hooks';
import { ProjectBreadcrumbs } from '../../Project/ProjectBreadcrumbs';
import { ProjectArchivedAssetsList } from './ProjectArchivedAssetsList';

export const ProjectArchivedAssets = () => {
  const { project } = useProjectContext();
  const { data, isPending, isError } = useGetProjectIdAssetsArchived(project.id);

  const fileCount = React.useMemo(() => {
    return data?.assets.length ?? 0;
  }, [data]);

  const totalFileSize = React.useMemo(() => {
    return (
      data?.assets.reduce(
        (acc, asset) => (asset.type === 'folder' ? acc + asset.totalFileSize : acc + asset.fileSize),
        0,
      ) ?? 0
    );
  }, [data?.assets]);

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
      name: 'Archived media',
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
