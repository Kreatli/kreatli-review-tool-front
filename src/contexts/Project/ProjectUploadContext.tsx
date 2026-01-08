import { addToast } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import React from 'react';
import { DropzoneInputProps, DropzoneRootProps, useDropzone } from 'react-dropzone';

import { UpgradeModal } from '../../components/account/UpgradeModal';
import { ContactOwnerModal } from '../../components/account/UpgradeModal/ContactOwnerModal';
import { useMultipartUpload } from '../../hooks/useMultipartUpload';
import { useProjectUploads } from '../../hooks/useProjectUploads';
import { useSession } from '../../hooks/useSession';
import { usePostProjectIdFile } from '../../services/hooks';
import { getAssetFolderId, getAssets, getProjectId, getProjectIdAssets } from '../../services/services';
import { ProjectDto } from '../../services/types';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { getCanAddAssets, getIsValidSize } from '../../utils/limits';

export interface ProjectAssetsFilters {
  status?: string;
  assignee?: string;
  sizeFrom?: number;
  sizeTo?: number;
}

interface Context {
  isDragActive: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  getInputProps: () => DropzoneInputProps;
  getRootProps: () => DropzoneRootProps;
}

export const ProjectUploadContext = React.createContext<Context | null>(null);

export const useProjectUploadContext = () => {
  const context = React.useContext(ProjectUploadContext);

  if (!context) {
    throw new Error('useUploadProjectContext must be used within a ProjectContextProvider');
  }

  return context;
};

interface Props {
  project: ProjectDto;
  folderId?: string;
}

export const ProjectUploadContextProvider = ({ children, project, folderId }: React.PropsWithChildren<Props>) => {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = React.useState(false);
  const [isContactOwnerModalOpen, setIsContactOwnerModalOpen] = React.useState(false);

  const queryClient = useQueryClient();
  const { user } = useSession();
  const isProjectOwner = project.createdBy?.id === user?.id;

  const { mutateAsync } = usePostProjectIdFile();

  const setFileUpload = useProjectUploads((state) => state.setFileUpload);
  const setFileUploadError = useProjectUploads((state) => state.setFileUploadError);
  const updateFileUploadProgress = useProjectUploads((state) => state.updateFileUploadProgress);
  const setIsUploadedToS3 = useProjectUploads((state) => state.setIsUploadedToS3);
  const uploadFile = useMultipartUpload({ projectId: project.id });

  const onDrop = (files: File[]) => {
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
              .then(({ project: data, parent: folderData }) => {
                queryClient.setQueryData([getProjectId.key, project.id], data);
                queryClient.invalidateQueries({ queryKey: [getProjectIdAssets.key, project.id] });
                queryClient.invalidateQueries({ queryKey: [getAssets.key] });

                if (folderId) {
                  queryClient.setQueryData([getAssetFolderId.key, folderId], folderData);
                }

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
        projectId: project.id,
        progress: 0,
        folderId,
        previewUrl:
          file.type.startsWith('image') && !file.type.includes('adobe') ? URL.createObjectURL(file) : undefined,
        cancelUpload,
      });
    }
  };

  const { isDragActive, inputRef, getRootProps, getInputProps } = useDropzone({
    multiple: true,
    noClick: true,
    onDrop,
  });

  return (
    <ProjectUploadContext.Provider
      value={{
        getInputProps,
        getRootProps,
        isDragActive,
        inputRef,
      }}
    >
      {children}
      <UpgradeModal type="storage" isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} />
      <ContactOwnerModal
        type="storage"
        isOpen={isContactOwnerModalOpen}
        onClose={() => setIsContactOwnerModalOpen(false)}
      />
    </ProjectUploadContext.Provider>
  );
};
