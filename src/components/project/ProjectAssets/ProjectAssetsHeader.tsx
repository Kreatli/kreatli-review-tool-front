import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import React from 'react';

import { useProjectContext } from '../../../contexts/Project';
import { useProjectUploadContext } from '../../../contexts/Project/ProjectUploadContext';
import { formatBytes } from '../../../utils/formatBytes';
import { CreateFolderModal } from '../../asset/AssetModals/CreateFolderModal';
import { Icon } from '../../various/Icon';
import { ProjectAssetsFilters } from './ProjectAssetsSearch';

interface Props {
  title?: string;
  folderId?: string;
  fileCount?: number;
  totalFileSize?: number;
}

export const ProjectAssetsHeader = ({ title = 'Media', folderId, fileCount, totalFileSize }: Props) => {
  const { project } = useProjectContext();
  const { inputRef, getInputProps } = useProjectUploadContext();

  const [isFolderModalOpen, setIsFolderModalOpen] = React.useState(false);

  const uploadAssets = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <div className="flex flex-wrap justify-between gap-2">
        <div className="flex-1 overflow-hidden">
          <h2 className="truncate text-2xl font-semibold">{title}</h2>
          <span className="-mt-0.5 block text-sm text-foreground-500">
            {fileCount ?? project.fileCount} files, {formatBytes(totalFileSize ?? project.totalFileSize)}
          </span>
        </div>
        <div className="order-1 basis-full lg:order-none lg:basis-auto">
          <ProjectAssetsFilters />
        </div>
        <div>
          <div className="hidden sm:block">
            <ButtonGroup>
              <Button
                className="bg-foreground pr-1 text-content1"
                isDisabled={project.status !== 'active'}
                onClick={uploadAssets}
              >
                <Icon icon="upload" size={16} />
                Upload
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
                    startContent={<Icon icon="plus" size={18} />}
                    onPress={() => setIsFolderModalOpen(true)}
                  >
                    Create folder
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </ButtonGroup>
            <input {...getInputProps()} />
          </div>
          <div className="sm:hidden">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  isDisabled={project.status !== 'active'}
                  size="sm"
                  radius="full"
                  className="bg-foreground text-content1"
                >
                  <Icon icon="upload" size={16} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="flat">
                <DropdownItem key="upload" startContent={<Icon icon="upload" size={18} />} onPress={uploadAssets}>
                  Upload files
                </DropdownItem>
                <DropdownItem
                  key="create-folder"
                  startContent={<Icon icon="plus" size={18} />}
                  onPress={() => {
                    setIsFolderModalOpen(true);
                  }}
                >
                  Create folder
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
      <CreateFolderModal
        isOpen={isFolderModalOpen}
        projectId={project.id}
        folderId={folderId}
        onClose={() => setIsFolderModalOpen(false)}
      />
    </>
  );
};
