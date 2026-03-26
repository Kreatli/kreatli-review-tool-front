import { addToast, Button, cn } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { usePatchDeliverableId } from '../../../services/hooks';
import { getDeliverableId, getProjectIdDeliverables } from '../../../services/services';
import { UserDto } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../../various/Icon';
import { DeliverableOwnerSelect } from './DeliverableOwnerSelect';
import { DeliverableUser } from './DeliverableUser';

interface Props {
  projectId: string;
  deliverableId: string;
  owner: UserDto;
}

export const DeliverableOwner = ({ projectId, deliverableId, owner }: Props) => {
  const [isEditable, setIsEditable] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: updateDeliverable, isPending } = usePatchDeliverableId();

  const formMethods = useForm({
    defaultValues: {
      owner: owner.id,
    },
    mode: 'onTouched',
  });

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleCancel = () => {
    setIsEditable(false);
  };

  const handleSave = (data: { owner: string | undefined }) => {
    updateDeliverable(
      { id: deliverableId, requestBody: { owner: data.owner } },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: [getProjectIdDeliverables.key, projectId] });
          queryClient.setQueryData([getDeliverableId.key, deliverableId], data);
          setIsEditable(false);
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-1">
      <div className={cn('flex items-center gap-1', { 'justify-between': isEditable })}>
        <div className="pl-3 font-semibold">Owner</div>
        {isEditable ? (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="light" isDisabled={isPending} onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" form="task-owner-form" isLoading={isPending} type="submit" variant="flat" color="primary">
              <span>Save</span>
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="light" radius="full" isIconOnly onClick={handleEdit}>
            <Icon icon="edit" size={16} />
          </Button>
        )}
      </div>
      {isEditable ? (
        <FormProvider {...formMethods}>
          <form id="task-owner-form" noValidate onSubmit={formMethods.handleSubmit(handleSave)}>
            <DeliverableOwnerSelect label="" size="md" autoFocus projectId={projectId} />
          </form>
        </FormProvider>
      ) : (
        <DeliverableUser user={owner} />
      )}
    </div>
  );
};
