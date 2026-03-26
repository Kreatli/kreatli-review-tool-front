import { addToast, Button, Input } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { usePatchTaskId } from '../../../services/hooks';
import { getProjectIdTasksBoard } from '../../../services/services';
import { getErrorMessage } from '../../../utils/getErrorMessage';

interface Props {
  projectId: string;
  taskId: string | undefined;
  name: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export const BoardTaskRenameForm = ({ projectId, taskId, name, onCancel, onSuccess }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = usePatchTaskId();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { name },
  });

  const onSubmit = (data: { name: string }) => {
    if (!taskId) {
      return;
    }

    mutate(
      { id: taskId, requestBody: { name: data.name } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getProjectIdTasksBoard.key, projectId] });
          onSuccess();
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        placeholder="Name"
        variant="faded"
        autoFocus
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
        {...register('name', VALIDATION_RULES.SHORT_TEXT)}
      />
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="light" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-foreground text-content1" isLoading={isPending}>
          <span>Save changes</span>
        </Button>
      </div>
    </form>
  );
};
