import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link } from '@heroui/react';
import NextLink from 'next/link';
import React from 'react';

import { useProjectContext } from '../../../../contexts/Project';
import { useGetAssetFolderId } from '../../../../services/hooks';
import { Icon } from '../../../various/Icon';
import { CreateFolderModal } from '../../../asset/AssetModals/CreateFolderModal';
import { ProjectBreadcrumbs } from '../../Project/ProjectBreadcrumbs';
import { ProjectFolderAssetsList } from './ProjectFolderAssetsList';
import { ProjectFolderAssetsLoading } from './ProjectFolderAssetsLoading';
import { NotActiveProjectAlert } from '../../Project/NotActiveProjectAlert';
import { useProjectUploadContext } from '../../../../contexts/Project/ProjectUploadContext';
import { ProjectDropFilesHint } from '../ProjectDropFilesHint';

interface Props {
  folderId: string;
}

export const ProjectFolderAssets = ({ folderId }: Props) => {
  const { project } = useProjectContext();
  const { inputRef, isDragActive, getInputProps, getRootProps } = useProjectUploadContext();
  const { data: folder, isLoading } = useGetAssetFolderId(folderId);

  const [isFolderModalOpen, setIsFolderModalOpen] = React.useState(false);

  const uploadAssets = () => {
    inputRef.current?.click();
  };

  const path = React.useMemo(() => {
    const projectPath = { name: project.name, url: `/project/${project.id}/assets` };

    if (!folder) {
      return [projectPath];
    }

    return [
      projectPath,
      ...folder.path.map(({ id, name }) => ({ name, url: `/project/${project.id}/assets/folder/${id}` })),
      { name: folder.name, url: '#' },
    ];
  }, [folder, project]);

  const backLink = React.useMemo(() => {
    if (!folder?.parent) {
      return { name: project.name, href: `/project/${project.id}/assets` };
    }

    return { name: folder.parent.name, href: `/project/${project.id}/assets/folder/${folder?.parent?.id}` };
  }, [folder?.parent, project.id, project.name]);

  if (isLoading) {
    return <ProjectFolderAssetsLoading />;
  }

  return (
    <div className="flex-1" {...getRootProps()}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link as={NextLink} href={backLink.href} className="gap-0.5 text-foreground-500">
        <Icon icon="arrowLeft" size={18} />
        {backLink.name}
      </Link>
      <div className="flex flex-col gap-4">
        <ProjectDropFilesHint isVisible={isDragActive} />
        <div className="flex justify-between gap-4">
          <ProjectBreadcrumbs
            fileCount={folder?.fileCount ?? 0}
            totalFileSize={folder?.totalFileSize ?? 0}
            path={path}
            coverUrl={project.cover?.url}
          />
          <div>
            <ButtonGroup>
              <Button
                className="bg-foreground pr-1 text-content1"
                isDisabled={project.status !== 'active'}
                onClick={uploadAssets}
              >
                <Icon icon="upload" size={16} />
                Upload new
              </Button>
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly isDisabled={project.status !== 'active'} className="bg-foreground text-content1">
                    <Icon icon="chevronDown" size={20} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu variant="flat">
                  <DropdownItem key="upload" startContent={<Icon icon="upload" size={18} />} onPress={uploadAssets}>
                    Upload files
                  </DropdownItem>
                  <DropdownItem
                    key="create-folder"
                    startContent={<Icon icon="plus" size={16} />}
                    onPress={() => setIsFolderModalOpen(true)}
                  >
                    Create folder
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </ButtonGroup>
            <input {...getInputProps()} />
          </div>
        </div>
        {project.status !== 'active' && (
          <div>
            <NotActiveProjectAlert />
          </div>
        )}
        {folder && <ProjectFolderAssetsList project={project} folder={folder} />}
        <CreateFolderModal
          isOpen={isFolderModalOpen}
          projectId={project.id}
          folderId={folderId}
          onClose={() => setIsFolderModalOpen(false)}
        />
      </div>
    </div>
  );
};
