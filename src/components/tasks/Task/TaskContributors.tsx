import { addToast, Button, cn } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { usePatchTaskId } from '../../../services/hooks';
import { getTaskId } from '../../../services/services';
import { UserDto } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../../various/Icon';
import { TaskContributorsSelect } from './TaskContributorsSelect';
import { TaskUser } from './TaskUser';

interface Props {
  projectId: string;
  taskId: string;
  contributors: UserDto[];
}

export const TaskContributors = ({ projectId, taskId, contributors }: Props) => {
  const [isEditable, setIsEditable] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: updateTask, isPending } = usePatchTaskId();

  const formMethods = useForm({
    defaultValues: {
      contributors: contributors.map((contributor) => ({
        userId: contributor.id,
        name: contributor.name,
        avatar: contributor.avatar?.url,
      })),
    },
    mode: 'onTouched',
  });

  const { handleSubmit } = formMethods;

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleCancel = () => {
    setIsEditable(false);
  };

  const handleSave = (data: { contributors: { userId: string }[] }) => {
    updateTask(
      { id: taskId, requestBody: { contributors: data.contributors.map((contributor) => contributor.userId) } },
      {
        onSuccess: (data) => {
          // queryClient.invalidateQueries({ queryKey: [getProjectIdTasks.key, projectId] });
          queryClient.setQueryData([getTaskId.key, taskId], data);
          setIsEditable(false);
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  const hasContributors = contributors.length > 0;

  return (
    <div className="flex flex-col gap-1">
      <div className={cn('flex min-h-8 items-center gap-1', { 'justify-between': isEditable })}>
        <div className="pl-3 font-semibold">Contributors</div>
        {(hasContributors || isEditable) &&
          (isEditable ? (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="light" isDisabled={isPending} onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                size="sm"
                variant="flat"
                type="submit"
                form="task-contributors-form"
                isLoading={isPending}
                color="primary"
              >
                <span>Save</span>
              </Button>
            </div>
          ) : (
            <Button size="sm" variant="light" radius="full" isIconOnly onClick={handleEdit}>
              <Icon icon="edit" size={16} />
            </Button>
          ))}
      </div>
      {isEditable ? (
        <FormProvider {...formMethods}>
          <form id="task-contributors-form" noValidate onSubmit={handleSubmit(handleSave)}>
            <TaskContributorsSelect autoFocus label="" size="md" projectId={projectId} />
          </form>
        </FormProvider>
      ) : contributors.length === 0 ? (
        <Button className="w-fit" size="sm" variant="flat" onClick={handleEdit}>
          Add contributors
        </Button>
      ) : (
        <div className="flex flex-wrap gap-2">
          {contributors.map((contributor) => (
            <TaskUser key={contributor.id} user={contributor} />
          ))}
        </div>
      )}
    </div>
  );
};
