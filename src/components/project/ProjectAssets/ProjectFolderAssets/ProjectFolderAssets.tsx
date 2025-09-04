import {
  addToast,
  Alert,
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

import { useProjectContext } from '../../../../contexts/Project';
import { useGetAssetFolderId, usePostProjectIdFile } from '../../../../services/hooks';
import { getAssetFolderId, getProjectId, getProjectIdAssets } from '../../../../services/services';
import { getErrorMessage } from '../../../../utils/getErrorMessage';
import { Icon } from '../../../various/Icon';
import { CreateFolderModal } from '../../../asset/AssetModals/CreateFolderModal';
import { ProjectBreadcrumbs } from '../../Project/ProjectBreadcrumbs';
import { ProjectFolderAssetsList } from './ProjectFolderAssetsList';
import { ProjectFolderAssetsLoading } from './ProjectFolderAssetsLoading';
import { getCanAddAssets, getIsValidSize } from '../../../../utils/limits';
import { UpgradeModal } from '../../../account/UpgradeModal';
import { ContactOwnerModal } from '../../../account/UpgradeModal/ContactOwnerModal';
import { nanoid } from 'nanoid';
import { useProjectUploads } from '../../../../hooks/useProjectUploads';
import { useMultipartUpload } from '../../../../hooks/useMultipartUpload';

interface Props {
  folderId: string;
}

export const ProjectFolderAssets = ({ folderId }: Props) => {
  const queryClient = useQueryClient();
  const { project, isProjectOwner } = useProjectContext();
  const { data: folder, isLoading } = useGetAssetFolderId(folderId);
  const { mutateAsync } = usePostProjectIdFile();

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isFolderModalOpen, setIsFolderModalOpen] = React.useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = React.useState(false);
  const [isContactOwnerModalOpen, setIsContactOwnerModalOpen] = React.useState(false);

  const setFileUpload = useProjectUploads((state) => state.setFileUpload);
  const updateFileUploadProgress = useProjectUploads((state) => state.updateFileUploadProgress);
  const setFileUploadError = useProjectUploads((state) => state.setFileUploadError);
  const setIsUploadedToS3 = useProjectUploads((state) => state.setIsUploadedToS3);
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

    if (project.createdBy && !getIsValidSize(files)) {
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

    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      const id = nanoid();

      const cancelUpload = uploadFile(
        { file, clientId: id },
        {
          onSuccess: (data) => {
            const promise = mutateAsync({
              id: project.id,
              requestBody: {
                parentId: folderId,
                contentType: file.type,
                fileOriginalName: file.name,
                key: data.key,
                fileId: data.fileId,
                fileSize: file.size,
              },
            });

            promise
              .then(({ project: projectData, parent: folderData }) => {
                queryClient.setQueryData([getProjectId.key, project.id], projectData);
                queryClient.setQueryData([getAssetFolderId.key, folderId], folderData);
                queryClient.invalidateQueries({ queryKey: [getProjectIdAssets.key, project.id] });
                updateFileUploadProgress(id, 100);
              })
              .catch((error) => {
                addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
                setFileUploadError(id);
              });
          },
          onError: (type) => {
            if (type !== 'user') {
              addToast({
                title: "Something went wrong. We couldn't upload your file.",
                color: 'danger',
                variant: 'flat',
              });
            }

            setFileUploadError(id);
          },
          onProgressChange: (progress) => {
            if (progress === 100) {
              setIsUploadedToS3(id);

              return;
            }

            updateFileUploadProgress(id, progress);
          },
        },
      );

      setFileUpload({
        name: file.name,
        type: file.type,
        size: file.size,
        id,
        progress: 0,
        projectId: project.id,
        folderId,
        previewUrl:
          file.type.startsWith('image') && !file.type.includes('adobe') ? URL.createObjectURL(file) : undefined,
        cancelUpload,
      });
    }
  };

  const path = React.useMemo(() => {
    const projectPath = { name: project.name, url: `/project/${project.id}` };

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
      return { name: project.name, href: `/project/${project.id}` };
    }

    return { name: folder.parent.name, href: `/project/${project.id}/assets/folder/${folder?.parent?.id}` };
  }, [folder?.parent, project.id, project.name]);

  if (isLoading) {
    return <ProjectFolderAssetsLoading />;
  }

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link as={NextLink} href={backLink.href} className="gap-0.5 text-foreground-500">
        <Icon icon="arrowLeft" size={18} />
        {backLink.name}
      </Link>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 justify-between">
          <ProjectBreadcrumbs
            fileCount={folder?.fileCount ?? 0}
            totalFileSize={folder?.totalFileSize ?? 0}
            path={path}
            coverUrl={project.cover?.url}
          />
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
            <input ref={inputRef} multiple type="file" className="sr-only" onChange={handleInputChange} />
          </div>
        </div>
        {project.status !== 'active' && (
          <div>
            <Alert
              color="primary"
              title={
                project.status === 'archived'
                  ? 'This project is archived, you can restore it to make it active again.'
                  : 'This project is completed, you can reactivate it to make it active again.'
              }
            />
          </div>
        )}
        {folder && <ProjectFolderAssetsList project={project} folder={folder} />}
        <CreateFolderModal
          isOpen={isFolderModalOpen}
          projectId={project.id}
          folderId={folderId}
          onClose={() => setIsFolderModalOpen(false)}
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
