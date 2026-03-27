import { Checkbox, cn } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useDebounceCallback } from '../../../hooks/useDebounceCallback';
import { usePatchDeliverableId } from '../../../services/hooks';
import { getDeliverableId, getProjectIdDeliverables } from '../../../services/services';
import { DeliverablesDto } from '../../../services/types';
import { Icon } from '../../various/Icon';

interface Props {
  projectId: string;
  deliverableId: string;
  tasksCount: number;
  name: string;
  isCompleted: boolean;
  isOverDue?: boolean;
}

export const DeliverablesRowName = ({ projectId, deliverableId, tasksCount, name, isCompleted }: Props) => {
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

    queryClient.setQueriesData<DeliverablesDto>({ queryKey: [getProjectIdDeliverables.key, projectId] }, (data) => {
      return {
        ...data,
        deliverables:
          data?.deliverables.map((deliverable) => {
            if (deliverable.id === deliverableId) {
              return { ...deliverable, isCompleted: isChecked };
            }
            return deliverable;
          }) ?? [],
      };
    });
  };

  return (
    <div className="text-md flex items-center gap-2 font-semibold">
      <Checkbox radius="full" isSelected={isChecked} color="default" onValueChange={handleCheckChange} />
      <div className="flex flex-col">
        <div
          className={cn('line-clamp-2 group-hover/row:underline', {
            'text-foreground-500': isCompleted,
          })}
        >
          {name}
        </div>
        {tasksCount > 0 && (
          <div className="flex items-center gap-1 text-xs text-foreground-500">
            <Icon icon="link" size={12} />
            {tasksCount} linked task{tasksCount > 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
};
