import { Checkbox } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useDebounceCallback } from '../../../hooks/useDebounceCallback';
import { usePatchDeliverableId } from '../../../services/hooks';
import { getDeliverableId } from '../../../services/services';

interface Props {
  deliverableId: string;
  name: string;
  isCompleted: boolean;
  isOverDue?: boolean;
}

export const DeliverablesRowName = ({ deliverableId, name, isCompleted, isOverDue }: Props) => {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsChecked(isCompleted);
  }, [isCompleted]);

  const { mutate } = usePatchDeliverableId();

  const toggleIsCompleted = useDebounceCallback((isCompleted: boolean) => {
    mutate(
      { id: deliverableId, requestBody: { isCompleted } },
      {
        onSuccess: () => {
          queryClient.resetQueries({ queryKey: [getDeliverableId.key, deliverableId] });
        },
      },
    );
  }, 500);

  const handleCheckChange = (isChecked: boolean) => {
    setIsChecked(isChecked);
    toggleIsCompleted(isChecked);
  };

  return (
    <div className="text-md flex items-center gap-2 font-semibold">
      <Checkbox
        radius="full"
        isSelected={isChecked}
        isInvalid={isOverDue && !isChecked}
        onValueChange={handleCheckChange}
      />
      <div className="line-clamp-2 group-hover/row:underline">{name}</div>
    </div>
  );
};
