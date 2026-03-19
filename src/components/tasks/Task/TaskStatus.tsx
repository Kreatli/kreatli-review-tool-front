import { addToast, Button, cn } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { usePatchTaskId } from '../../../services/hooks';
import { getProjectIdTasks, getTaskId } from '../../../services/services';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../../various/Icon';
import { TaskStageSelect } from './TaskStageSelect';

interface Props {
  projectId: string;
  taskId: string;
  status?: string;
  statusLabel?: string;
}

export const TaskStatus = ({ projectId, taskId, status, statusLabel }: Props) => {
  const [isEditable, setIsEditable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: updateTask, isPending } = usePatchTaskId();

  useEffect(() => {
    if (isEditable) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOpen(true);
    }
  }, [isEditable]);

  const formMethods = useForm({
    defaultValues: {
      status,
    },
    mode: 'onTouched',
  });

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleCancel = () => {
    setIsEditable(false);
  };

  const handleSave = (data: { status: string | undefined }) => {
    updateTask(
      { id: taskId, requestBody: { status: data.status } },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: [getProjectIdTasks.key, projectId] });
          queryClient.setQueryData([getTaskId.key, taskId], data);
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
        <div className="pl-3 font-semibold">Stage</div>
        {isEditable ? (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="light" isDisabled={isPending} onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              size="sm"
              form="task-status-form"
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
          <form id="task-status-form" noValidate onSubmit={formMethods.handleSubmit(handleSave)}>
            <TaskStageSelect
              isOpen={isOpen}
              projectId={projectId}
              size="md"
              autoFocus
              label=""
              onOpenChange={setIsOpen}
            />
          </form>
        </FormProvider>
      ) : (
        <div className="rounded-medium bg-foreground-100 px-3 py-2.5 text-small">{statusLabel ?? 'Unplaced'}</div>
      )}
    </div>
  );
};
