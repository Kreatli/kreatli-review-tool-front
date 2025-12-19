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
import { StatusField } from './StatusField';
import { STATUS_COLORS } from './StatusColorPicker';

interface Props {
  statuses: ProjectDto['assetStatuses'];
  onSubmit: (statuses: ProjectDto['assetStatuses']) => void;
}

export const EditProjectStatusesForm = ({ statuses, onSubmit }: Props) => {
  const defaultStatuses = useMemo(() => {
    const notUsedColor =
      STATUS_COLORS.find((color) => !statuses.some((item) => item.color === color)) ??
      STATUS_COLORS[statuses.length % STATUS_COLORS.length];

    if (statuses.length < 7) {
      return [...statuses, { value: nanoid(), color: notUsedColor, label: '' }];
    }

    return statuses;
  }, [statuses]);

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

      const oldIndex = items.findIndex((item) => item.value === active.id);
      const newIndex = items.findIndex((item) => item.value === over.id);

      move(oldIndex, newIndex);
    }
  };

  const handleRemove = (value: string) => {
    const index = fields.findIndex((item) => item.value === value);
    remove(index);
  };

  const handleAddStatusOption = () => {
    append({ value: nanoid(), color: STATUS_COLORS[fields.length], label: '' });
  };

  return (
    <FormProvider {...methods}>
      <form id="edit-project-statuses-form" noValidate onSubmit={handleSubmit((data) => onSubmit(data.statuses))}>
        <div className="w-full flex flex-col gap-2 min-h-60">
          <DndContext
            sensors={sensors}
            modifiers={[restrictToParentElement]}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={fields.map(({ value }) => value)} strategy={verticalListSortingStrategy}>
              {fields.map(({ value }, index) => (
                <StatusField key={value} value={value} index={index} onRemove={() => handleRemove(value)} />
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
