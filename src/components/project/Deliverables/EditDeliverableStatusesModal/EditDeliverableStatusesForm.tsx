import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { useMemo } from 'react';
import { Icon } from '../../../various/Icon';
import { Link } from '@heroui/react';
import { ProjectDto } from '../../../../services/types';
import { nanoid } from 'nanoid';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { DeliverableStatusField } from './DeliverableStatusField';
import { STATUS_COLORS } from '../../ProjectModals/EditProjectStatusesModal/StatusColorPicker';

interface Props {
  statuses: ProjectDto['deliverableStatuses'];
  onSubmit: (statuses: Record<string, { label: string; color: string; order: number; value: string }>) => void;
}

export const EditDeliverableStatusesForm = ({ statuses, onSubmit }: Props) => {
  const statusesArray = useMemo(() => {
    return Object.entries(statuses)
      .map(([id, status]) => ({
        id,
        ...status,
      }))
      .sort((a, b) => a.order - b.order);
  }, [statuses]);

  const defaultStatuses = useMemo(() => {
    const notUsedColor =
      STATUS_COLORS.find((color) => !statusesArray.some((item) => item.color === color)) ??
      STATUS_COLORS[statusesArray.length % STATUS_COLORS.length];

    if (statusesArray.length < 7) {
      return [...statusesArray, { id: nanoid(), color: notUsedColor, label: '', order: statusesArray.length, value: nanoid() }];
    }

    return statusesArray;
  }, [statusesArray]);

  const methods = useForm({
    defaultValues: {
      statuses: defaultStatuses,
    },
    mode: 'all',
  });

  const { control, getValues, handleSubmit } = methods;

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'statuses',
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
      const items = getValues('statuses');

      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      move(oldIndex, newIndex);
    }
  };

  const handleRemove = (id: string) => {
    const index = fields.findIndex((item) => item.id === id);
    remove(index);
  };

  const handleAddStatusOption = () => {
    const currentStatuses = getValues('statuses');
    const maxOrder = currentStatuses.length > 0 
      ? Math.max(...currentStatuses.map(s => s.order ?? 0))
      : -1;
    append({ id: nanoid(), color: STATUS_COLORS[fields.length % STATUS_COLORS.length], label: '', order: maxOrder + 1, value: nanoid() });
  };

  return (
    <FormProvider {...methods}>
      <form id="edit-deliverable-statuses-form" noValidate onSubmit={handleSubmit((data) => {
        // Filter out empty statuses and update order based on position
        const validStatuses = data.statuses
          .filter((status) => status.label && status.label.trim())
          .map((status, index) => ({
            ...status,
            order: index,
            value: status.value || status.id,
          }));

        // Convert array to record format
        const statusesRecord: Record<string, { label: string; color: string; order: number; value: string }> = {};
        validStatuses.forEach((status) => {
          statusesRecord[status.id] = {
            label: status.label,
            color: status.color,
            order: status.order,
            value: status.value,
          };
        });

        onSubmit(statusesRecord);
      })}>
        <div className="flex min-h-60 w-full flex-col gap-2">
          <DndContext
            sensors={sensors}
            modifiers={[restrictToParentElement]}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={fields.map(({ id }) => id)} strategy={verticalListSortingStrategy}>
              {fields.map(({ id }, index) => (
                <DeliverableStatusField key={id} id={id} index={index} onRemove={() => handleRemove(id)} />
              ))}
            </SortableContext>
          </DndContext>
          <div className="mt-2 pl-1 empty:hidden">
            {fields.length < 7 && (
              <Link
                as="button"
                type="button"
                size="sm"
                color="foreground"
                className="flex items-center gap-3"
                onClick={handleAddStatusOption}
              >
                <Icon icon="plus" size={16} />
                Add status option
              </Link>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

