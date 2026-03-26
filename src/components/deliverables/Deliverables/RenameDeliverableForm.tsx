import { addToast, Button, Input } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { usePatchDeliverableId } from '../../../services/hooks';
import { getProjectIdDeliverables } from '../../../services/services';
import { getErrorMessage } from '../../../utils/getErrorMessage';

interface Props {
  projectId: string;
  deliverableId: string | undefined;
  name: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export const RenameDeliverableForm = ({ projectId, deliverableId, name, onCancel, onSuccess }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = usePatchDeliverableId();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { name },
  });

  const onSubmit = (data: { name: string }) => {
    if (!deliverableId) {
      return;
    }

    mutate(
      { id: deliverableId, requestBody: { name: data.name } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getProjectIdDeliverables.key, projectId] });
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
