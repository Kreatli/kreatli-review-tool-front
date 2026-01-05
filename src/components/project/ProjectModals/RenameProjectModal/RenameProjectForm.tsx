import { addToast, Button, Input } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../../constants/validationRules';
import { usePutProjectId } from '../../../../services/hooks';
import { getProjectId, getProjects } from '../../../../services/services';
import { ProjectDto } from '../../../../services/types';
import { getErrorMessage } from '../../../../utils/getErrorMessage';

interface Props {
  project: ProjectDto;
  onSuccess?: () => void;
}

export const RenameProjectForm = ({ project, onSuccess }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: project.name,
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = usePutProjectId();

  const onSubmit = ({ name }: { name: string }) => {
    mutate(
      { id: project.id, requestBody: { name } },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: [getProjects.key] });
          queryClient.setQueryData([getProjectId.key, project.id], data);
          addToast({ title: 'The project was successfully renamed', color: 'success', variant: 'flat' });
          onSuccess?.();
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        placeholder="My project"
        variant="faded"
        autoFocus
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
        {...register('name', VALIDATION_RULES.SHORT_TEXT)}
      />
      <Button type="submit" isLoading={isPending} className="ml-auto w-fit bg-foreground text-content1">
        Save changes
      </Button>
    </form>
  );
};
