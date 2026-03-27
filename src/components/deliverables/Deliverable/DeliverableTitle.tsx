import { Checkbox, cn, Skeleton } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import { useDebounceCallback } from '../../../hooks/useDebounceCallback';
import { useScreenResize } from '../../../hooks/useScreenResize';
import { usePatchDeliverableId } from '../../../services/hooks';
import { getDeliverableId, getProjectIdDeliverables } from '../../../services/services';
import { DeliverableDto } from '../../../services/types';

interface Props {
  projectId?: string;
  deliverableId?: string | null;
  name: string | undefined;
  isOverDue?: boolean;
  isLoading?: boolean;
  isCompleted?: boolean;
}

export const DeliverableTitle = ({ projectId, deliverableId, name, isLoading, isCompleted }: Props) => {
  const queryClient = useQueryClient();

  const [valueBeforeEditing, setValueBeforeEditing] = useState(name);
  const [value, setValue] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(isCompleted);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const focusLeaveButtonRef = useRef<HTMLButtonElement | null>(null);

  const { mutate } = usePatchDeliverableId();

  useEffect(() => {
    setValue(name);
    setValueBeforeEditing(name);
  }, [name]);

  useEffect(() => {
    setIsChecked(isCompleted);
  }, [isCompleted]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  useScreenResize(autoResize);

  useEffect(() => {
    autoResize();
  }, [value]);

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);

    if (value === valueBeforeEditing) {
      return;
    }

    if (!value) {
      setValue(valueBeforeEditing);
      return;
    }

    if (!deliverableId) {
      return;
    }

    mutate(
      { id: deliverableId, requestBody: { name: value } },
      {
        onSuccess: (data) => {
          queryClient.setQueryData([getDeliverableId.key, deliverableId], data);

          if (projectId) {
            queryClient.invalidateQueries({ queryKey: [getProjectIdDeliverables.key, projectId] });
          }
        },
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      focusLeaveButtonRef.current?.focus();
    }
  };

  const toggleIsCompleted = useDebounceCallback((isCompleted: boolean) => {
    if (!deliverableId) {
      return;
    }

    mutate(
      { id: deliverableId, requestBody: { isCompleted } },
      {
        onSuccess: () => {
          if (projectId) {
            queryClient.invalidateQueries({ queryKey: [getProjectIdDeliverables.key, projectId] });
          }
        },
      },
    );
  }, 500);

  const handleCheckChange = (isChecked: boolean) => {
    setIsChecked(isChecked);
    toggleIsCompleted(isChecked);

    queryClient.setQueriesData<DeliverableDto>({ queryKey: [getDeliverableId.key, deliverableId] }, (data) => {
      if (!data) {
        return undefined;
      }

      return {
        ...data,
        isCompleted: isChecked,
      };
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <Skeleton className="size-6 rounded-full" />
        <Skeleton className="h-7 w-96 max-w-full rounded-medium" />
      </div>
    );
  }

  if (!name) {
    return null;
  }

  return (
    <div className="flex items-start gap-1">
      <div className="flex pt-1.5">
        <Checkbox radius="full" color="default" isSelected={isChecked} onValueChange={handleCheckChange} />
      </div>
      <div className="flex w-full">
        <button ref={focusLeaveButtonRef} disabled={!isEditing} className="sr-only" />
        <textarea
          ref={textareaRef}
          rows={1}
          className={cn(
            '-mx-1 w-[calc(100%-2rem)] resize-none rounded-md bg-transparent px-1 outline-offset-4 focus-visible:bg-foreground-100 focus-visible:outline-focus focus-visible:ring-offset-2',
            {
              'text-foreground-500': isCompleted,
            },
          )}
          value={value}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};
