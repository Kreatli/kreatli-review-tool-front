import { addToast, Button, Input } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../../constants/validationRules';
import { usePutProjectIdFileFileId, usePutProjectIdFolderFolderId } from '../../../../services/hooks';
import { getAssetFolderId, getProjectId, getProjectIdAssets } from '../../../../services/services';
import { ProjectAssetEditDto, ProjectFileDto, ProjectFolderDto } from '../../../../services/types';
import { getErrorMessage } from '../../../../utils/getErrorMessage';

interface Props {
  projectId: string;
  asset?: ProjectFolderDto | ProjectFileDto;
  onSuccess: () => void;
}

export const RenameAssetForm = ({ projectId, asset, onSuccess }: Props) => {
  const fileName = React.useMemo(() => {
    if (asset?.type !== 'file') {
      return asset?.name ?? '';
    }

    return asset?.name.split('.').slice(0, -1).join('.');
  }, [asset]);

  const fileExtension = React.useMemo(() => {
    if (asset?.type !== 'file') {
      return undefined;
    }

    if (!asset.name.includes('.')) {
      return undefined;
    }

    return asset.name.split('.').pop();
  }, [asset]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: fileName,
    },
  });

  const queryClient = useQueryClient();
  const { mutate: mutateFile, isPending: isSavingFile } = usePutProjectIdFileFileId();
  const { mutate: mutateFolder, isPending: isSavingFolder } = usePutProjectIdFolderFolderId();

  const isPending = isSavingFile || isSavingFolder;

  const handleSuccess = ({ project: data, parent: parentData }: ProjectAssetEditDto) => {
    if (parentData) {
      queryClient.setQueryData([getAssetFolderId.key, parentData.id], parentData);
    }

    queryClient.setQueryData([getProjectId.key, projectId], data);
    queryClient.invalidateQueries({ queryKey: [getProjectIdAssets.key, projectId] });
    addToast({ title: `The ${asset?.type} was successfully renamed`, color: 'success', variant: 'flat' });
    onSuccess?.();
  };

  const handleError = (error: unknown) => {
    addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
  };

  const onSubmit = ({ name }: { name: string }) => {
    if (!asset) {
      return;
    }

    if (asset.type === 'folder') {
      mutateFolder(
        { id: projectId, folderId: asset.id, requestBody: { name } },
        { onSuccess: handleSuccess, onError: handleError },
      );

      return;
    }

    mutateFile(
      { id: projectId, fileId: asset.id, requestBody: { name: fileExtension ? `${name}.${fileExtension}` : name } },
      { onSuccess: handleSuccess, onError: handleError },
    );
  };

  return (
    <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Input
        label={asset?.type === 'folder' ? 'Folder name' : 'File name'}
        placeholder="Enter a name"
        variant="faded"
        isInvalid={!!errors.name}
        endContent={<span className="text-small lowercase text-foreground-500">.{fileExtension}</span>}
        errorMessage={errors.name?.message}
        {...register('name', VALIDATION_RULES.SHORT_TEXT)}
      />
      <Button type="submit" isLoading={isPending} className="bg-foreground text-content1 w-fit ml-auto">
        Save changes
      </Button>
    </form>
  );
};
