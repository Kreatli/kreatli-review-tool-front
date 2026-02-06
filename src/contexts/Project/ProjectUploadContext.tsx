import { addToast } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import React, { useEffect } from 'react';
import { DropzoneInputProps, DropzoneRootProps, useDropzone } from 'react-dropzone';

import { UpgradeModal } from '../../components/account/UpgradeModal';
import { ContactOwnerModal } from '../../components/account/UpgradeModal/ContactOwnerModal';
import { useMultipartUpload } from '../../hooks/useMultipartUpload';
import { useProjectUploads } from '../../hooks/useProjectUploads';
import { useSession } from '../../hooks/useSession';
import { trackEvent } from '../../lib/amplitude';
import { usePostProjectIdFile } from '../../services/hooks';
import {
  getAssetFileId,
  getAssetFolderId,
  getAssetsFiles,
  getAssetStackId,
  getProjectId,
  getProjectIdAssets,
} from '../../services/services';
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
  openFileDialog: () => void;
  getInputProps: () => DropzoneInputProps;
  getRootProps: () => DropzoneRootProps;
  setStackId: (id: string) => void;
  setStackWithFileId: (id: string) => void;
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

  const [stackId, setStackId] = React.useState<string | undefined>(undefined);
  const [stackWithFileId, setStackWithFileId] = React.useState<string | undefined>(undefined);

  const queryClient = useQueryClient();
  const { user } = useSession();
  const isProjectOwner = project.createdBy?.id === user?.id;

  const { mutateAsync } = usePostProjectIdFile({ mutationKey: ['files-upload'] });

  const setFileUpload = useProjectUploads((state) => state.setFileUpload);
  const setFileUploadError = useProjectUploads((state) => state.setFileUploadError);
  const updateFileUploadProgress = useProjectUploads((state) => state.updateFileUploadProgress);
  const setIsUploadedToS3 = useProjectUploads((state) => state.setIsUploadedToS3);
  const uploadFile = useMultipartUpload({ projectId: project.id });

  const uploadsQueue = useProjectUploads((state) => state.uploadsQueue);
  const addItemToUploadQueue = useProjectUploads((state) => state.addItemToUploadQueue);
  const removeItemFromUploadQueue = useProjectUploads((state) => state.removeItemFromUploadQueue);

  useEffect(() => {
    const isMutating = queryClient.isMutating({ mutationKey: ['files-upload'] }) > 0;

    if (isMutating) {
      return;
    }

    const [id, firstUpload] = uploadsQueue[0] ?? [];

    if (!id || !firstUpload) {
      return;
    }

    const promise = mutateAsync(firstUpload);

    promise
      .then(({ project: data, parent: folderData }) => {
        queryClient.setQueryData([getProjectId.key, data.id], data);
        queryClient.invalidateQueries({ queryKey: [getProjectIdAssets.key, data.id] });
        queryClient.invalidateQueries({ queryKey: [getAssetsFiles.key] });

        if (firstUpload.requestBody.stackId) {
          queryClient.invalidateQueries({ queryKey: [getAssetStackId.key, firstUpload.requestBody.stackId] });
        }

        if (firstUpload.requestBody.stackWithFileId) {
          queryClient.invalidateQueries({ queryKey: [getAssetFileId.key, firstUpload.requestBody.stackWithFileId] });
        }

        if (firstUpload.requestBody.parentId) {
          queryClient.setQueryData([getAssetFolderId.key, firstUpload.requestBody.parentId], folderData);
        }

        updateFileUploadProgress(id, 100);
        trackEvent('upload_file_success');
      })
      .catch((error) => {
        addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        setFileUploadError(id);
        trackEvent('upload_file_failure');
      })
      .finally(() => {
        removeItemFromUploadQueue(id);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryClient, uploadsQueue]);

  const onDrop = (files: File[]) => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.value = '';

    if (project.createdBy && !getIsValidSize(files)) {
      addToast({
        title: 'Files must be less than 10 GB.',
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

    setStackId(undefined);
    setStackWithFileId(undefined);

    for (const file of files) {
      trackEvent('upload_file_click');

      const id = nanoid();
      const cancelUpload = uploadFile(
        { file, clientId: id },
        {
          onSuccess: async (data) => {
            addItemToUploadQueue(id, {
              id: project.id,
              requestBody: {
                parentId: folderId,
                contentType: file.type,
                fileOriginalName: file.name,
                key: data.key,
                fileId: data.fileId,
                fileSize: file.size,
                stackId,
                stackWithFileId,
              },
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

            trackEvent('upload_file_failure');

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

  const {
    isDragActive,
    inputRef,
    open: openFileDialog,
    getRootProps,
    getInputProps,
  } = useDropzone({
    multiple: true,
    noClick: true,
    onDrop,
    onFileDialogCancel: () => {
      setStackId(undefined);
      setStackWithFileId(undefined);
    },
  });

  return (
    <ProjectUploadContext.Provider
      value={{
        getInputProps,
        getRootProps,
        isDragActive,
        inputRef,
        openFileDialog,
        setStackId,
        setStackWithFileId,
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
