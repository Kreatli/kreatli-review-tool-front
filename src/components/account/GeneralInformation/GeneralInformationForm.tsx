import { addToast, Button, cn, Image, Input } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';

import { getIsTouchScreen } from '../../../utils/getIsTouchScreen';
import { Icon } from '../../various/Icon';
import { UserDto } from '../../../services/types';
import { VALIDATION_RULES } from '../../../constants/validationRules';
import { usePutUser } from '../../../services/hooks';
import { getUser } from '../../../services/services';
import { getErrorMessage } from '../../../utils/getErrorMessage';

interface Props {
  user: UserDto;
}

interface FormData {
  name: string;
  avatar: Blob | undefined;
}

export const GeneralInformationForm = ({ user }: Props) => {
  const [previewUrl, setPreviewUrl] = React.useState<string | undefined>(user.avatar?.url);

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: user.name,
      avatar: user.avatar?.url,
    },
  });

  const queryClient = useQueryClient();
  const isTouchScreen = getIsTouchScreen();
  const { mutate, isPending } = usePutUser();
  // const { mutate, isPending } = usePostProjectIdCover();

  const onSubmit = ({ avatar, name }: FormData) => {
    mutate(
      {
        requestBody: {
          avatar,
          name,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getUser.key] });
          addToast({ title: 'General information was successfully updated', color: 'success', variant: 'flat' });
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  const handleRemove = () => {
    setValue('avatar', undefined);
    setPreviewUrl(undefined);
  };

  const onDrop = React.useCallback(
    (files: File[]) => {
      const file = files[0];

      if (!file) {
        return;
      }

      if (file.size / (1024 * 1024) >= 5) {
        addToast({
          title: 'The file size should be less than 5MB',
          color: 'danger',
          variant: 'flat',
        });

        return;
      }

      setValue('avatar', file);
      setPreviewUrl(URL.createObjectURL(file));
    },
    [addToast, setValue],
  );

  const { isDragActive, isDragAccept, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/svg+xml': ['.svg'],
      'image/webp': ['.webp'],
      'image/avif': ['.avif'],
      'image/gif': ['.gif'],
    },
    disabled: isPending,
    multiple: false,
    onDrop,
  });

  return (
    <form className="flex flex-col gap-4 mt-6" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Email" label="Email" isDisabled value={user.email} />
      <Input
        placeholder="Name"
        label="Name"
        isInvalid={!!errors.name}
        {...register('name', VALIDATION_RULES.VERY_SHORT_TEXT)}
      />
      <div
        className="relative overflow-hidden h-40 flex items-center justify-center cursor-pointer rounded-2xl border border-foreground-200"
        {...getRootProps()}
      >
        {previewUrl && (
          <>
            <Image disableAnimation src={previewUrl} radius="full" removeWrapper className="size-36 object-cover" />
            {isTouchScreen && (
              <Button as="div" size="sm" variant="faded" className="absolute top-2 right-12 z-10" isIconOnly>
                <Icon icon="upload" size={16} />
              </Button>
            )}
            <Button
              size="sm"
              variant="faded"
              color="danger"
              className="absolute top-2 right-2 z-20"
              isIconOnly
              onClick={handleRemove}
            >
              <Icon icon="trash" size={16} />
            </Button>
          </>
        )}
        <div
          className={cn(
            'absolute inset-0 transition-all flex items-center justify-center bg-foreground-100 gap-2 text-sm z-10',
            {
              'opacity-0 hover:opacity-100 hover:bg-foreground-100/75': previewUrl,
              'opacity-100 bg-foreground-100/75': isDragActive && isDragAccept,
              'hover:opacity-0': isTouchScreen,
            },
          )}
        >
          <Icon icon="upload" size={20} />
          Upload avatar
        </div>
        <input type="file" {...getInputProps()} />
      </div>
      <Button type="submit" isLoading={isPending} className="bg-foreground text-content1 w-fit ml-auto">
        Save changes
      </Button>
    </form>
  );
};
