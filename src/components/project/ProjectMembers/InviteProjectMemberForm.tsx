import { addToast, Alert, Button, Input } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { useSession } from '../../../hooks/useSession';
import { trackEvent } from '../../../lib/amplitude';
import { usePostProjectIdMember } from '../../../services/hooks';
import { getProjectId, getProjects } from '../../../services/services';
import { ProjectDto } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';

interface Props {
  project: ProjectDto;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const InviteProjectMemberForm = ({ project, onCancel, onSuccess }: Props) => {
  const { user } = useSession();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    defaultValues: { email: '' },
  });

  const { max = 0, used = 0 } = user?.subscription.limits.usersCount ?? {};

  const queryClient = useQueryClient();
  const { mutate, isPending } = usePostProjectIdMember();

  const onSubmit = ({ email }: { email: string }) => {
    trackEvent('invite_member_click');

    mutate(
      { id: project.id, requestBody: { email, role: 'contributor' } },
      {
        onSuccess: () => {
          trackEvent('invite_member_success');
          queryClient.invalidateQueries({ queryKey: [getProjects.key] });
          queryClient.invalidateQueries({ queryKey: [getProjectId.key, project.id] });
          addToast({ title: 'The invitation was sent', color: 'success', variant: 'flat' });
          reset();
          onSuccess?.();
        },
        onError: (error) => {
          trackEvent('invite_member_failure');
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <form noValidate className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {used >= max && (
        <Alert title="You have reached the maximum number of members. Upgrade your plan to add more." color="warning" />
      )}
      <Input
        label="Email"
        placeholder="example@mail.com"
        variant="faded"
        autoFocus
        isDisabled={used >= max}
        labelPlacement="outside"
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
        {...register('email', VALIDATION_RULES.EMAIL)}
      />
      <div className="flex justify-end gap-4">
        <Button isDisabled={isPending} variant="light" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isDisabled={used >= max} isLoading={isPending} className="bg-foreground text-content1">
          <span>Invite</span>
        </Button>
      </div>
    </form>
  );
};
