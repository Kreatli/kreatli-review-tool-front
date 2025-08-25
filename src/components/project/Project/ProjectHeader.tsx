import {
  addToast,
  Avatar,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import NextLink from 'next/link';
import React from 'react';

import { useProjectContext } from '../../../contexts/Project';
import { usePostProjectIdFile } from '../../../services/hooks';
import { getProjectId, getProjectIdAssets } from '../../../services/services';
import { ProjectDto } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../../various/Icon';
import { CreateFolderModal } from '../../asset/AssetModals/CreateFolderModal';
import { ProjectMembersModal, ProjectMembersThumbnails } from '../ProjectMembers';
import { ProjectBreadcrumbs } from './ProjectBreadcrumbs';
import { ProjectDescriptionModal } from './ProjectDescriptionModal';
import { getCanAddAssets, getIsValidSize } from '../../../utils/limits';
import { UpgradeModal } from '../../account/UpgradeModal';
import { ContactOwnerModal } from '../../account/UpgradeModal/ContactOwnerModal';
import { useMultipartUpload } from '../../../hooks/useMultipartUpload';
import { useProjectUploads } from '../../../hooks/useProjectUploads';
import { nanoid } from 'nanoid';

interface Props {
  project: ProjectDto;
}

export const ProjectHeader = ({ project }: Props) => {
  const coverUrl = project.cover?.url;
  const queryClient = useQueryClient();
  const { mutateAsync } = usePostProjectIdFile();
  const { isProjectOwner, getProjectActions } = useProjectContext();

  const [isMembersModalOpen, setIsMembersModalOpen] = React.useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = React.useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = React.useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = React.useState(false);
  const [isContactOwnerModalOpen, setIsContactOwnerModalOpen] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const setFileUpload = useProjectUploads((state) => state.setFileUpload);
  const setFileUploadError = useProjectUploads((state) => state.setFileUploadError);
  const updateFileUploadProgress = useProjectUploads((state) => state.updateFileUploadProgress);
  const uploadFile = useMultipartUpload({ projectId: project.id });

  const uploadAssets = () => {
    inputRef.current?.click();
  };

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (!inputRef.current) {
      return;
    }

    inputRef.current.value = '';

    if (project.createdBy && !getIsValidSize(project.createdBy, files)) {
      addToast({
        title:
          project.createdBy.subscription.plan === 'free'
            ? "Files over 1GB can't be uploaded on the Free Plan."
            : 'Files must be less than 10 GB.',
        variant: 'flat',
        color: 'warning',
      });

      return;
    }

    if (project.createdBy && !getCanAddAssets(project.createdBy, files)) {
      if (isProjectOwner) {
        setIsUpgradeModalOpen(true);
      } else {
        setIsContactOwnerModalOpen(true);
      }

      return;
    }

    inputRef.current.value = '';

    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      const id = nanoid();

      setFileUpload({
        name: file.name,
        type: file.type,
        size: file.size,
        id,
        progress: 0,
        previewUrl:
          file.type.startsWith('image') && !file.type.includes('adobe') ? URL.createObjectURL(file) : undefined,
      });
      uploadFile(file, {
        onSuccess: (data) => {
          const promise = mutateAsync({
            id: project.id,
            requestBody: {
              contentType: file.type,
              fileOriginalName: file.name,
              key: data.key,
              fileId: data.fileId,
              fileSize: file.size,
            },
          });

          promise
            .then(({ project: data }) => {
              queryClient.setQueryData([getProjectId.key, project.id], data);
              queryClient.invalidateQueries({ queryKey: [getProjectIdAssets.key, project.id] });
              updateFileUploadProgress(id, 100);
            })
            .catch((error) => {
              addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
              setFileUploadError(id);
            });
        },
        onError: () => {
          addToast({ title: "Something went wrong. We couldn't upload your file.", color: 'danger', variant: 'flat' });
          setFileUploadError(id);
        },
        onProgressChange: (progress) => {
          if (progress === 100) {
            return;
          }

          updateFileUploadProgress(id, progress);
        },
      });
    }
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
              className="outline-offset-4 rounded-full"
              onClick={() => setIsMembersModalOpen(true)}
            >
              <ProjectMembersThumbnails members={project.members} />
            </button>
          </div>
          <div>
            <ButtonGroup>
              <Button className="text-content1 bg-foreground pr-1" onClick={uploadAssets}>
                <Icon icon="plus" size={16} />
                New
              </Button>
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly className="text-content1 bg-foreground">
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
            <input ref={inputRef} multiple type="file" className="sr-only" onChange={handleInputChange} />
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
        <UpgradeModal type="storage" isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} />
        <ContactOwnerModal
          type="storage"
          isOpen={isContactOwnerModalOpen}
          onClose={() => setIsContactOwnerModalOpen(false)}
        />
      </div>
    </div>
  );
};
