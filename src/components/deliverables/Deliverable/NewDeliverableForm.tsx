import { addToast, Button, Input } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { JSONContent } from '@tiptap/react';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { useSession } from '../../../hooks/useSession';
import { usePostDeliverable } from '../../../services/hooks';
import { getProjectIdDeliverables } from '../../../services/services';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { SimpleEditor } from '../../tiptap/components/tiptap-templates/simple/simple-editor';
import { DeliverableOwnerSelect } from './DeliverableOwnerSelect';
import { DeliverableStartEndDate } from './DeliverableStartEndDate';
import { DeliverableStatusSelect } from './DeliverableStatusSelect';
import { DeliverableTasksSelect } from './DeliverableTasksSelect';

interface FormData {
  name: string;
  status: string | undefined;
  owner: string;
  startDate: string;
  endDate: string;
}

interface Props {
  projectId: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export const NewDeliverableForm = ({ projectId, onCancel, onSuccess }: Props) => {
  const { user } = useSession();
  const { mutate: createDeliverable, isPending } = usePostDeliverable();
  const queryClient = useQueryClient();
  const editorJsonRef = useRef<JSONContent>(undefined);

  const formMethods = useForm({
    defaultValues: {
      name: '',
      status: undefined,
      owner: user?.id ?? '',
      startDate: '',
      endDate: '',
      tasks: [],
    },
    mode: 'onTouched',
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = formMethods;

  const onSubmit = (formData: FormData) => {
    createDeliverable(
      {
        requestBody: {
          projectId,
          content: editorJsonRef.current,
          ...formData,
        },
      },
      {
        onSuccess: () => {
          onSuccess();
          queryClient.invalidateQueries({ queryKey: [getProjectIdDeliverables.key, projectId] });
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
          <DeliverableStartEndDate />
          <div className="flex min-h-40 flex-col rounded-medium border border-foreground-200 p-3">
            <SimpleEditor isEditable onUpdate={handleContentUpdate} />
          </div>
          <DeliverableOwnerSelect projectId={projectId} />
          <DeliverableStatusSelect projectId={projectId} />
          <DeliverableTasksSelect projectId={projectId} />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="light" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isPending} className="bg-foreground text-content1">
            <span>Create deliverable</span>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
