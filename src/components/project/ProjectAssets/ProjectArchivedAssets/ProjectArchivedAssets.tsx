import React from 'react';

import { useProjectContext } from '../../../../contexts/Project';
import { useGetProjectIdAssetsArchived } from '../../../../services/hooks';
import { formatBytes } from '../../../../utils/formatBytes';
import { ProjectArchivedAssetsList } from './ProjectArchivedAssetsList';

export const ProjectArchivedAssets = () => {
  const { project } = useProjectContext();
  const { data, isPending, isError } = useGetProjectIdAssetsArchived(project.id);

  const assets = React.useMemo(() => {
    return [...(data?.files ?? []), ...(data?.folders ?? [])];
  }, [data]);

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

  return (
    <div className="flex flex-col p-3 xs:px-4">
      <div>
        <h2 className="text-2xl font-semibold">Recently deleted</h2>
        <p className="text-sm text-foreground-500">
          {folders.length} folder{folders.length === 1 ? '' : 's'}, {files.length} file{files.length === 1 ? '' : 's'},{' '}
          {formatBytes(totalFileSize)}
        </p>
      </div>
      <ProjectArchivedAssetsList folders={folders} files={files} isError={isError} isPending={isPending} />
    </div>
  );
};
