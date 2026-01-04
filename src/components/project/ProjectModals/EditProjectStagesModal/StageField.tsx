import { useSortable } from '@dnd-kit/sortable';
import { useController, useFormContext } from 'react-hook-form';
import { CSS } from '@dnd-kit/utilities';
import { Button, Input, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { Icon } from '../../../various/Icon';
import { ProjectStageDto } from '../../../../services/types';
import { StatusColorDot } from '../EditProjectStatusesModal/StatusColorDot';
import { StatusColorPicker } from '../EditProjectStatusesModal/StatusColorPicker';
import { useState } from 'react';

interface Props {
  id: string;
  index: number;
  onRemove: () => void;
}

export const StageField = ({ id, index, onRemove }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const {
    formState: { errors },
    register,
  } = useFormContext<{ stages: ProjectStageDto[] }>();

  const { field: colorField } = useController({ 
    name: `stages.${index}.color`,
    defaultValue: '#016fee',
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleColorSelect = (color: string) => {
    colorField.onChange(color);
    setIsPopoverOpen(false);
  };

  const isInvalid = !!errors?.stages?.[index]?.name?.message;

  return (
    <div ref={setNodeRef} style={style} className="flex w-full items-center gap-1">
      <div {...attributes} {...listeners}>
        <Icon icon="dotsSix" size={20} className="text-foreground-500 cursor-move" />
      </div>
      <div className="relative flex-1">
        <Input
          className="w-full"
          size="sm"
          isInvalid={isInvalid}
          placeholder="Enter stage name"
          classNames={{ input: 'pr-5' }}
          errorMessage={errors?.stages?.[index]?.name?.message}
          {...register(`stages.${index}.name`, {
            validate: (value, formValues) => {
              if (!value) {
                return 'Stage name is required';
              }

              const hasDuplicate = formValues.stages.filter((item, idx) => item.name === value && idx !== index).length > 0;

              if (hasDuplicate) {
                return 'Stage name must be unique';
              }

              if (value.length > 200) {
                return 'Stage name must not exceed 200 characters';
              }

              return true;
            },
          })}
        />
        <Popover placement="bottom" isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
              <StatusColorDot color={colorField.value || '#016fee'} />
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-4">
            <StatusColorPicker selectedColor={colorField.value || '#016fee'} onColorSelect={handleColorSelect} />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Button isIconOnly size="sm" variant="light" className="text-foreground-500" radius="full" onClick={onRemove}>
          <Icon icon="trash" size={16} />
        </Button>
      </div>
    </div>
  );
};

