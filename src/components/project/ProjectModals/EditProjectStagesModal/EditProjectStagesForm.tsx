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
import { ProjectStageDto } from '../../../../services/types';
import { nanoid } from 'nanoid';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { StageField } from './StageField';
import { STATUS_COLORS } from '../EditProjectStatusesModal/StatusColorPicker';

interface Props {
  stages: ProjectStageDto[];
  onSubmit: (stages: ProjectStageDto[]) => void;
}

export const EditProjectStagesForm = ({ stages, onSubmit }: Props) => {
  const defaultStages = useMemo(() => {
    // Ensure all stages have proper structure
    const formattedStages = stages.map((stage, index) => ({
      id: stage.id || nanoid(),
      name: stage.name || '',
      order: stage.order ?? index,
      color: stage.color || STATUS_COLORS[index % STATUS_COLORS.length],
    }));

    // Add one empty stage for adding new one
    const nextColor = STATUS_COLORS.find(
      (color) => !formattedStages.some((item) => item.color === color)
    ) ?? STATUS_COLORS[formattedStages.length % STATUS_COLORS.length];
    return [...formattedStages, { id: nanoid(), name: '', order: formattedStages.length, color: nextColor }];
  }, [stages]);

  const methods = useForm({
    defaultValues: {
      stages: defaultStages,
    },
    mode: 'all',
  });

  const { control, getValues, handleSubmit } = methods;

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'stages',
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
      const items = getValues('stages');

      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      move(oldIndex, newIndex);
    }
  };

  const handleRemove = (id: string) => {
    const index = fields.findIndex((item) => item.id === id);
    remove(index);
  };

  const handleAddStage = () => {
    const currentStages = getValues('stages');
    const maxOrder = currentStages.length > 0 
      ? Math.max(...currentStages.map(s => s.order ?? 0))
      : -1;
    const nextColor = STATUS_COLORS.find(
      (color) => !currentStages.some((item) => item.color === color)
    ) ?? STATUS_COLORS[currentStages.length % STATUS_COLORS.length];
    append({ id: nanoid(), name: '', order: maxOrder + 1, color: nextColor });
  };

  return (
    <FormProvider {...methods}>
      <form id="edit-project-stages-form" noValidate onSubmit={handleSubmit((data) => {
        // Filter out empty stages and update order based on position
        const validStages = data.stages
          .filter((stage) => stage.name && stage.name.trim())
          .map((stage, index) => ({
            ...stage,
            order: index,
          }));
        onSubmit(validStages);
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
                <StageField key={id} id={id} index={index} onRemove={() => handleRemove(id)} />
              ))}
            </SortableContext>
          </DndContext>
          <div className="mt-2 pl-1 empty:hidden">
            <Link
              as="button"
              type="button"
              size="sm"
              color="foreground"
              className="flex items-center gap-3"
              onClick={handleAddStage}
            >
              <Icon icon="plus" size={16} />
              Add stage
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

