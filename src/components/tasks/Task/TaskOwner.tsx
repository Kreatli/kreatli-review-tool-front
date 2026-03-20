import { addToast, Button, cn } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { usePatchTaskId } from '../../../services/hooks';
import { getProjectIdTasks, getTaskId } from '../../../services/services';
import { UserDto } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../../various/Icon';
import { TaskAssigneeSelect } from './TaskAssigneeSelect';
import { TaskUser } from './TaskUser';

interface Props {
  projectId: string;
  taskId: string;
  owner: UserDto;
}

export const TaskOwner = ({ projectId, taskId, owner }: Props) => {
  const [isEditable, setIsEditable] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: updateTask, isPending } = usePatchTaskId();

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
    updateTask(
      { id: taskId, requestBody: { owner: data.owner } },
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
            <TaskAssigneeSelect label="" size="md" autoFocus projectId={projectId} />
          </form>
        </FormProvider>
      ) : (
        <TaskUser user={owner} />
      )}
    </div>
  );
};
