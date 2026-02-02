import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { addToast, Button } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useImperativeHandle, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { usePutProjectIdStackStackId } from '../../../../services/hooks';
import { getAssetFolderId, getAssetStackId, getProjectId, getProjectIdAssets } from '../../../../services/services';
import { ProjectFileDto, ProjectStackDto } from '../../../../services/types';
import { getErrorMessage } from '../../../../utils/getErrorMessage';
import { ManageVersionsItem } from './ManageVersionsItem';

export interface ManageVersionsFormRef {
  getIsDirty: () => boolean;
}

interface Props {
  projectId: string;
  stack: ProjectStackDto;
  formRef: React.RefObject<ManageVersionsFormRef | null>;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const ManageVersionsForm = ({ projectId, stack, formRef, onCancel, onSuccess }: Props) => {
  const [activeFileId, setActiveFileId] = useState<string | undefined>(
    stack.files.find((file) => file.id === stack.active?.id)?.id,
  );

  const queryClient = useQueryClient();
  const { mutate: updateStack, isPending } = usePutProjectIdStackStackId();

  const methods = useForm({
    defaultValues: {
      files: [...stack.files].reverse(),
    },
    mode: 'all',
  });

  useImperativeHandle(
    formRef,
    () => ({
      getIsDirty: () => methods.formState.isDirty,
    }),
    [methods.formState.isDirty],
  );

  const { control, getValues, handleSubmit } = methods;

  const { fields, move, remove } = useFieldArray({
    control,
    name: 'files',
    keyName: '_id',
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const items = getValues('files');

      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      move(oldIndex, newIndex);
    }
  };

  const handleRemove = (fileId: string) => {
    if (fileId === activeFileId) {
      setActiveFileId(fields.find((item) => item.id !== fileId)?.id);
    }

    const index = fields.findIndex((item) => item.id === fileId);
    remove(index);
  };

  const onSubmit = (data: { files: ProjectFileDto[] }) => {
    const prevActiveFileIndex = [...stack.files].reverse().findIndex((file) => file.id === stack.active?.id);
    const activeFileIndex = data.files.findIndex((file) => file.id === activeFileId);
    const shouldUpdateActive = stack.active?.id !== activeFileId || prevActiveFileIndex !== activeFileIndex;

    updateStack(
      {
        id: projectId,
        stackId: stack.id,
        requestBody: {
          files: [...data.files.map((file) => file.id)].reverse(),
          activeFileId: shouldUpdateActive ? data.files[activeFileIndex].id : undefined,
        },
      },
      {
        onSuccess: ({ parent, project, stack }) => {
          if (parent) {
            queryClient.setQueryData([getAssetFolderId.key, parent.id], parent);
          }

          queryClient.setQueryData([getProjectId.key, projectId], project);
          queryClient.invalidateQueries({ queryKey: [getProjectIdAssets.key, projectId] });
          queryClient.setQueryData([getAssetStackId.key, stack?.id], stack);
          addToast({ title: 'Versions were successfully updated', color: 'success', variant: 'flat' });
          onSuccess?.();
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <FormProvider {...methods}>
      <form noValidate className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col overflow-hidden">
          <DndContext
            sensors={sensors}
            modifiers={[restrictToParentElement]}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={fields.map(({ id }) => id)} strategy={verticalListSortingStrategy}>
              {fields.map((file, index) => (
                <ManageVersionsItem
                  key={file.id}
                  file={file}
                  version={fields.length - index}
                  shouldHideActions={fields.length === 1}
                  isDisabled={isPending}
                  isActive={file.id === activeFileId}
                  onRemove={() => handleRemove(file.id)}
                  onMarkAsActive={() => setActiveFileId(file.id)}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="light" isDisabled={isPending} onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isPending} className="bg-foreground text-content1">
            Save changes
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
