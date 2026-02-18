import { BreadcrumbItem, Breadcrumbs } from '@heroui/react';
import { useRouter } from 'next/router';
import React from 'react';

import { useProjectContext } from '../../../../contexts/Project';
import { useProjectUploadContext } from '../../../../contexts/Project/ProjectUploadContext';
import { useGetAssetFolderId } from '../../../../services/hooks';
import { CreateFolderModal } from '../../../asset/AssetModals/CreateFolderModal';
import { ProjectAssetsHeader } from '../ProjectAssetsHeader';
import { ProjectDropFilesHint } from '../ProjectDropFilesHint';
import { ProjectFolderAssetsList } from './ProjectFolderAssetsList';
import { ProjectFolderAssetsLoading } from './ProjectFolderAssetsLoading';

interface Props {
  folderId: string;
}

export const ProjectFolderAssets = ({ folderId }: Props) => {
  const router = useRouter();

  const { project } = useProjectContext();
  const { isDragActive, getRootProps } = useProjectUploadContext();
  const { data: folder, isLoading } = useGetAssetFolderId(folderId);

  const [isFolderModalOpen, setIsFolderModalOpen] = React.useState(false);

  const path = React.useMemo(() => {
    if (!folder) {
      return [{ name: 'Media', url: `/project/${project.id}/assets` }];
    }

    return [
      { name: 'Media', url: `/project/${project.id}/assets` },
      ...folder.path.map(({ id, name }) => ({ name, url: `/project/${project.id}/assets/folder/${id}` })),
      { name: folder.name, url: '#' },
    ];
  }, [folder, project]);

  const handleAction = (key: React.Key) => {
    const url = path.find((item) => item.url === key)?.url;
    if (url) {
      router.push(url);
    }
  };

  if (isLoading) {
    return <ProjectFolderAssetsLoading />;
  }

  return (
    <div className="flex-1 p-3 xs:px-4" {...getRootProps()}>
      <Breadcrumbs onAction={handleAction}>
        {path.map((item) => (
          <BreadcrumbItem key={item.url}>{item.name}</BreadcrumbItem>
        ))}
      </Breadcrumbs>
      <ProjectAssetsHeader
        title={folder?.name}
        folderId={folderId}
        fileCount={folder?.fileCount}
        totalFileSize={folder?.totalFileSize}
      />
      <div className="flex flex-col gap-4">
        <ProjectDropFilesHint isVisible={isDragActive} />
        {folder && <ProjectFolderAssetsList project={project} folder={folder} />}
        <CreateFolderModal
          isOpen={isFolderModalOpen}
          projectId={project.id}
          folderId={folderId}
          onClose={() => {
            setIsFolderModalOpen(false);
          }}
        />
      </div>
    </div>
  );
};
