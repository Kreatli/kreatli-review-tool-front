import { RestrictToElement } from '@dnd-kit/dom/modifiers';
import { isSortable } from '@dnd-kit/dom/sortable';
import { DragDropProvider } from '@dnd-kit/react';
import { Link } from '@heroui/react';
import { nanoid } from 'nanoid';
import { useMemo, useRef } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { ProjectDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { BoardColumnsFormField } from './BoardColumnsFormField';

interface Props {
  statuses: ProjectDto['taskStatuses'];
  onSubmit: (statuses: ProjectDto['taskStatuses']) => void;
}

export const BoardColumnsForm = ({ statuses, onSubmit }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const defaultStatuses = useMemo(() => {
    if (statuses.length < 7) {
      return [...statuses, { value: nanoid(), color: '#a1a1aa', label: '' }];
    }

    return statuses;
  }, [statuses]);

  const methods = useForm({
    defaultValues: {
      statuses: defaultStatuses,
    },
    mode: 'all',
  });

  const { control, handleSubmit } = methods;

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'statuses',
  });

  const handleRemove = (value: string) => {
    const index = fields.findIndex((item) => item.value === value);
    remove(index);
  };

  const handleAddStatusOption = () => {
    append({ value: nanoid(), color: '#a1a1aa', label: '' });
  };

  return (
    <FormProvider {...methods}>
      <form id="edit-project-statuses-form" noValidate onSubmit={handleSubmit((data) => onSubmit(data.statuses))}>
        <div ref={parentRef} className="flex min-h-60 w-full flex-col gap-2">
          <DragDropProvider
            // eslint-disable-next-line react-hooks/refs
            modifiers={[RestrictToElement.configure({ element: parentRef.current })]}
            onDragEnd={({ operation }) => {
              const { source } = operation;

              if (isSortable(source)) {
                move(source.initialIndex, source.index);
              }
            }}
          >
            {fields.map(({ value }, index) => (
              <BoardColumnsFormField key={value} value={value} index={index} onRemove={() => handleRemove(value)} />
            ))}
          </DragDropProvider>
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
                Add column
              </Link>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
