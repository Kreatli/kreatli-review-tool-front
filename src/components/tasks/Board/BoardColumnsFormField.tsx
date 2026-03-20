import { useSortable } from '@dnd-kit/react/sortable';
import { Button, Input } from '@heroui/react';
import { useFormContext } from 'react-hook-form';

import { ProjectDto } from '../../../services/types';
import { Icon } from '../../various/Icon';

interface Props {
  value: string;
  index: number;
  onRemove: () => void;
}

export const BoardColumnsFormField = ({ value, index, onRemove }: Props) => {
  const { ref, handleRef } = useSortable({ id: value, index });

  const {
    formState: { errors },
    register,
  } = useFormContext<{ statuses: ProjectDto['taskStatuses'] }>();

  const isInvalid = !!errors?.statuses?.[index]?.label?.message;

  return (
    <div ref={ref} className="flex w-full items-center gap-1">
      <div ref={handleRef}>
        <Icon icon="dotsSix" size={20} className="text-foreground-500" />
      </div>
      <div className="relative flex-1">
        <Input
          className="w-full"
          size="sm"
          autoFocus
          isInvalid={isInvalid}
          placeholder="Enter column name"
          classNames={{ input: 'pr-5' }}
          {...register(`statuses.${index}.label`, {
            validate: (value, formValues) => {
              if (!value && formValues.statuses.length - 1 === index) {
                return true;
              }

              if (!value) {
                return 'Column name is required';
              }

              const hasDuplicate = formValues.statuses.filter((item) => item.label === value).length > 1;

              if (hasDuplicate) {
                return 'Column name must be unique';
              }

              if (value.length > 100) {
                return 'Column name must not exceed 100 characters';
              }

              return true;
            },
          })}
        />
      </div>
      <div>
        <Button isIconOnly size="sm" variant="light" className="text-foreground-500" radius="full" onClick={onRemove}>
          <Icon icon="trash" size={16} />
        </Button>
      </div>
    </div>
  );
};
