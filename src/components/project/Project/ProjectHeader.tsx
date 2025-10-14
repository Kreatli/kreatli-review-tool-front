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
import { ProjectDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { CreateFolderModal } from '../../asset/AssetModals/CreateFolderModal';
import { ProjectMembersModal, ProjectMembersThumbnails } from '../ProjectMembers';
import { ProjectBreadcrumbs } from './ProjectBreadcrumbs';
import { ProjectDescriptionModal } from './ProjectDescriptionModal';
import { useProjectUploadContext } from '../../../contexts/Project/ProjectUploadContext';

interface Props {
  project: ProjectDto;
}

export const ProjectHeader = ({ project }: Props) => {
  const coverUrl = project.cover?.url;
  const { isProjectOwner, getProjectActions } = useProjectContext();
  const { inputRef, getInputProps } = useProjectUploadContext();

  const [isMembersModalOpen, setIsMembersModalOpen] = React.useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = React.useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = React.useState(false);

  const uploadAssets = () => {
    inputRef.current?.click();
  };

  const projectActions = getProjectActions(project);

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link as={NextLink} href="/" className="gap-0.5 text-foreground-500">
        <Icon icon="arrowLeft" size={18} />
        Projects
      </Link>
      <div className="flex gap-4 justify-between">
        <ProjectBreadcrumbs
          fileCount={project.fileCount}
          coverUrl={coverUrl}
          totalFileSize={project.totalFileSize}
          path={[{ name: project.name, url: '#' }]}
        >
          <div className="flex gap-2 -ml-1">
            <Button isIconOnly size="sm" variant="light" radius="full" onClick={() => setIsDescriptionModalOpen(true)}>
              <Icon icon="helpCircle" size={20} />
            </Button>
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
          </div>
        </ProjectBreadcrumbs>
        <div className="flex gap-4">
          {isProjectOwner && (
            <div className="p-1">
              <Avatar
                as="button"
                aria-label="Add project member"
                fallback="+"
                isBordered
                disabled={project.status !== 'active'}
                size="sm"
                className="text-lg font-medium text-foreground-500"
                onClick={() => setIsMembersModalOpen(true)}
              />
            </div>
          )}
          <div className="p-1">
            <button
              type="button"
              aria-label="Project members"
              disabled={project.status !== 'active'}
              className="outline-offset-4 rounded-full"
              onClick={() => setIsMembersModalOpen(true)}
            >
              <ProjectMembersThumbnails members={project.members} />
            </button>
          </div>
          <div>
            <ButtonGroup>
              <Button
                className="text-content1 bg-foreground pr-1"
                isDisabled={project.status !== 'active'}
                onClick={uploadAssets}
              >
                <Icon icon="plus" size={16} />
                New
              </Button>
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly isDisabled={project.status !== 'active'} className="text-content1 bg-foreground">
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
        <ProjectDescriptionModal
          isOpen={isDescriptionModalOpen}
          project={project}
          onClose={() => setIsDescriptionModalOpen(false)}
        />
      </div>
    </div>
  );
};
