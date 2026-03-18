import { Skeleton } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import { usePatchTaskId } from '../../../services/hooks';
import { getProjectIdTasks, getTaskId } from '../../../services/services';

interface Props {
  projectId: string;
  taskId?: string | null;
  name: string | undefined;
  isLoading?: boolean;
}

export const TaskTitle = ({ projectId, taskId, name, isLoading }: Props) => {
  const queryClient = useQueryClient();

  const [valueBeforeEditing, setValueBeforeEditing] = useState(name);
  const [value, setValue] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const focusLeaveButtonRef = useRef<HTMLButtonElement | null>(null);

  const { mutate } = usePatchTaskId();

  useEffect(() => {
    setValue(name);
    setValueBeforeEditing(name);
  }, [name]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

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

    if (!taskId) {
      return;
    }

    mutate(
      { id: taskId, requestBody: { name: value } },
      {
        onSuccess: (data) => {
          queryClient.setQueryData([getTaskId.key, taskId], data);
          queryClient.invalidateQueries({ queryKey: [getProjectIdTasks.key, projectId] });
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

  if (isLoading) {
    return <Skeleton className="h-7 w-96 max-w-full rounded-medium" />;
  }

  if (!name) {
    return null;
  }

  return (
    <div className="flex w-full">
      <button ref={focusLeaveButtonRef} disabled={!isEditing} className="sr-only" />
      <textarea
        ref={textareaRef}
        rows={1}
        className="-mx-1 w-[calc(100%-2rem)] resize-none rounded-md px-1 outline-offset-4 focus-visible:outline-focus focus-visible:ring-offset-2"
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};
