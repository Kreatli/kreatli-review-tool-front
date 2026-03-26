import { addToast, Button, cn } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { usePatchDeliverableId } from '../../../services/hooks';
import { getDeliverableId, getProjectIdDeliverables } from '../../../services/services';
import { DeliverableDto } from '../../../services/types';
import { formatDate } from '../../../utils/dates';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../../various/Icon';
import { DeliverableStartEndDate } from './DeliverableStartEndDate';

interface Props {
  projectId: string;
  deliverable: DeliverableDto;
}

export const DeliverableDates = ({ projectId, deliverable }: Props) => {
  const [isEditable, setIsEditable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: updateDeliverable, isPending } = usePatchDeliverableId();

  useEffect(() => {
    if (isEditable) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOpen(true);
    }
  }, [isEditable]);

  const formMethods = useForm({
    defaultValues: {
      startDate: deliverable.startDate,
      endDate: deliverable.endDate,
    },
    mode: 'onTouched',
  });

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleCancel = () => {
    setIsEditable(false);
  };

  const handleSave = (data: { startDate: string | undefined; endDate: string | undefined }) => {
    updateDeliverable(
      { id: deliverable.id, requestBody: { startDate: data.startDate, endDate: data.endDate } },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: [getProjectIdDeliverables.key, projectId] });
          queryClient.setQueryData([getDeliverableId.key, deliverable.id], data);
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
        <div className="pl-3 font-semibold">Duration</div>
        {isEditable ? (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="light" isDisabled={isPending} onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              size="sm"
              form="deliverable-status-form"
              isLoading={isPending}
              type="submit"
              variant="flat"
              color="primary"
            >
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
          <form id="deliverable-status-form" noValidate onSubmit={formMethods.handleSubmit(handleSave)}>
            <DeliverableStartEndDate isOpen={isOpen} size="md" autoFocus label="" onOpenChange={setIsOpen} />
          </form>
        </FormProvider>
      ) : (
        <div className="rounded-medium bg-foreground-100 px-3 py-2.5 text-small">
          {formatDate(deliverable.startDate)} - {formatDate(deliverable.endDate)}
        </div>
      )}
    </div>
  );
};
