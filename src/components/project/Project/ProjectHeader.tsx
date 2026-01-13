import {
  Avatar,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from '@heroui/react';
import NextLink from 'next/link';
import React from 'react';

import { useProjectContext } from '../../../contexts/Project';
import { useProjectUploadContext } from '../../../contexts/Project/ProjectUploadContext';
import { ProjectDto } from '../../../services/types';
import { CreateFolderModal } from '../../asset/AssetModals/CreateFolderModal';
import { Icon } from '../../various/Icon';
import { ProjectMembersModal, ProjectMembersThumbnails } from '../ProjectMembers';
import { ProjectBreadcrumbs } from './ProjectBreadcrumbs';

interface Props {
  project: ProjectDto;
}

export const ProjectHeader = ({ project }: Props) => {
  const coverUrl = project.cover?.url;
  const { isProjectOwner, getProjectActions } = useProjectContext();
  const { inputRef, getInputProps } = useProjectUploadContext();

  const [isMembersModalOpen, setIsMembersModalOpen] = React.useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = React.useState(false);

  const uploadAssets = () => {
    inputRef.current?.click();
  };

  const projectActions = getProjectActions(project);

  return (
    <div>
      <Link as={NextLink} href="/" className="gap-0.5 text-foreground-500">
        <Icon icon="arrowLeft" size={18} />
        Projects
      </Link>
      <div className="flex items-start justify-between gap-4">
        <ProjectBreadcrumbs
          fileCount={project.fileCount}
          coverUrl={coverUrl}
          totalFileSize={project.totalFileSize}
          path={[{ name: project.name, url: '#' }]}
        >
          {projectActions.length > 0 && (
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="flat" radius="full">
                  <Icon icon="dots" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="flat">
                {projectActions.map((action) => (
                  <DropdownItem
                    key={action.label}
                    color={action.color}
                    showDivider={action.showDivider}
                    startContent={<Icon icon={action.icon} size={16} />}
                    onPress={action.onClick}
                  >
                    {action.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}
        </ProjectBreadcrumbs>
        <div className="flex items-center gap-4">
          {isProjectOwner && (
            <Avatar
              as="button"
              aria-label="Add project member"
              fallback={<Icon icon="userPlus" size={18} />}
              isBordered
              disabled={project.status !== 'active'}
              size="sm"
              className="hidden text-lg font-medium text-foreground-500 sm:block"
              onClick={() => setIsMembersModalOpen(true)}
            />
          )}
          <div className="ml-1 hidden sm:flex">
            <button
              type="button"
              aria-label="Project members"
              disabled={project.status !== 'active'}
              className="rounded-full outline-offset-4"
              onClick={() => setIsMembersModalOpen(true)}
            >
              <ProjectMembersThumbnails members={project.members} />
            </button>
          </div>
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
                  onPress={() => setIsFolderModalOpen(true)}
                >
                  Create folder
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <ProjectMembersModal
          isOpen={isMembersModalOpen}
          project={project}
          onClose={() => setIsMembersModalOpen(false)}
        />
        <CreateFolderModal
          isOpen={isFolderModalOpen}
          projectId={project.id}
          onClose={() => setIsFolderModalOpen(false)}
        />
      </div>
    </div>
  );
};
