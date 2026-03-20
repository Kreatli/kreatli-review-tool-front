import { addToast, Button, Input } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { JSONContent } from '@tiptap/react';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { useSession } from '../../../hooks/useSession';
import { usePostTask } from '../../../services/hooks';
import { getProjectIdTasks } from '../../../services/services';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { SimpleEditor } from '../../tiptap/components/tiptap-templates/simple/simple-editor';
import { TaskAssigneeSelect } from './TaskAssigneeSelect';
import { TaskContributorsSelect } from './TaskContributorsSelect';
import { TaskStageSelect } from './TaskStageSelect';
import { TaskVisibilitySelect } from './TaskVisibilitySelect';

interface FormData {
  name: string;
  status: string | undefined;
  owner: string;
  contributors: {
    userId: string;
    name: string;
    avatar: string;
  }[];
  visibleTo: string[];
}

interface Props {
  projectId: string;
  status?: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export const NewTaskForm = ({ projectId, status, onCancel, onSuccess }: Props) => {
  const { user } = useSession();
  const { mutate: createTask, isPending } = usePostTask();
  const queryClient = useQueryClient();
  const editorJsonRef = useRef<JSONContent>(undefined);

  const formMethods = useForm({
    defaultValues: {
      name: '',
      status: status === 'unplaced' ? undefined : (status ?? undefined),
      owner: user?.id ?? '',
      contributors: [],
      visibleTo: [],
    },
    mode: 'onTouched',
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = formMethods;

  const onSubmit = ({ contributors, ...rest }: FormData) => {
    createTask(
      {
        requestBody: {
          projectId,
          contributors: contributors.map((contributor) => contributor.userId),
          content: editorJsonRef.current,
          ...rest,
        },
      },
      {
        onSuccess: () => {
          onSuccess();
          queryClient.invalidateQueries({ queryKey: [getProjectIdTasks.key, projectId] });
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  const handleContentUpdate = (editorJson: JSONContent) => {
    editorJsonRef.current = editorJson;
  };

  return (
    <FormProvider {...formMethods}>
      {/* eslint-disable-next-line react-hooks/refs */}
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <Input
            label="Title"
            placeholder="Title"
            isInvalid={!!errors.name}
            autoFocus
            {...register('name', VALIDATION_RULES.SHORT_TEXT)}
          />
          <div className="flex min-h-40 flex-col rounded-medium border border-foreground-200 p-3">
            <SimpleEditor isEditable onUpdate={handleContentUpdate} />
          </div>
          <TaskAssigneeSelect projectId={projectId} />
          <TaskContributorsSelect projectId={projectId} />
          <TaskStageSelect projectId={projectId} />
          <TaskVisibilitySelect />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="light" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isPending} className="bg-foreground text-content1">
            <span>Create task</span>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
