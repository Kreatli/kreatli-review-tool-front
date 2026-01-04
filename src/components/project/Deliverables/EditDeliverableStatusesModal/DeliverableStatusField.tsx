import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { useController, useFormContext } from 'react-hook-form';
import { CSS } from '@dnd-kit/utilities';
import { Button, Input, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { Icon } from '../../../various/Icon';
import { StatusColorDot } from '../../ProjectModals/EditProjectStatusesModal/StatusColorDot';
import { StatusColorPicker } from '../../ProjectModals/EditProjectStatusesModal/StatusColorPicker';

interface Props {
  id: string;
  index: number;
  onRemove: () => void;
}

interface StatusFormData {
  statuses: Array<{
    id: string;
    label: string;
    color: string;
    order: number;
    value: string;
  }>;
}

export const DeliverableStatusField = ({ id, index, onRemove }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const {
    formState: { errors },
    register,
  } = useFormContext<StatusFormData>();

  const { field: colorField } = useController({ name: `statuses.${index}.color` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleColorSelect = (color: string) => {
    colorField.onChange(color);
    setIsPopoverOpen(false);
  };

  const isInvalid = !!errors?.statuses?.[index]?.label?.message;

  return (
    <div ref={setNodeRef} style={style} className="flex w-full items-center gap-1">
      <div {...attributes} {...listeners}>
        <Icon icon="dotsSix" size={20} className="text-foreground-500" />
      </div>
      <div className="relative flex-1">
        <Input
          className="w-full"
          size="sm"
          autoFocus
          isInvalid={isInvalid}
          placeholder="Enter status label"
          classNames={{ input: 'pr-5' }}
          {...register(`statuses.${index}.label`, {
            validate: (value, formValues) => {
              if (!value && formValues.statuses.length - 1 === index) {
                return true;
              }

              if (!value) {
                return 'Status label is required';
              }

              const hasDuplicate = formValues.statuses.filter((item) => item.label === value).length > 1;

              if (hasDuplicate) {
                return 'Status label must be unique';
              }

              if (value.length > 100) {
                return 'Status label must not exceed 100 characters';
              }

              return true;
            },
          })}
        />
        <Popover placement="bottom" isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger>
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <StatusColorDot color={colorField.value} />
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-4">
            <StatusColorPicker selectedColor={colorField.value} onColorSelect={handleColorSelect} />
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

