import { Avatar, Button } from '@heroui/react';
import { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { TaskInfoDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { TasksPicker } from './TasksPicker';

interface Props {
  projectId: string;
}

export const DeliverableTasksSelect = ({ projectId }: Props) => {
  const [selectedTasks, setSelectedTasks] = useState<TaskInfoDto[]>([]);

  const { control } = useFormContext();
  const { field } = useController({ control, name: 'tasks' });

  const handleSelectTask = (task: TaskInfoDto) => {
    field.onChange([...field.value, task.id]);
    setSelectedTasks([...selectedTasks, task]);
  };

  const handleRemoveTask = (taskId: string) => {
    field.onChange(field.value.filter((id: string) => id !== taskId));
    setSelectedTasks(selectedTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex w-full flex-col gap-2">
        {selectedTasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between gap-2 rounded-md p-1 pl-3 shadow-medium">
            <div className="flex items-center gap-2 overflow-hidden">
              <Avatar
                name={task.owner.name}
                className="size-6 shrink-0"
                getInitials={(name) => name.charAt(0).toUpperCase()}
                src={task.owner.avatar?.url}
              />
              <div className="truncate text-sm font-semibold">{task.name}</div>
            </div>
            <Button
              size="sm"
              variant="light"
              color="danger"
              radius="full"
              isIconOnly
              onClick={() => handleRemoveTask(task.id)}
            >
              <Icon icon="trash" size={16} />
            </Button>
          </div>
        ))}
      </div>
      <TasksPicker projectId={projectId} onSelect={handleSelectTask}>
        <Button variant="light" size="sm">
          <Icon icon="plus" size={16} />
          Link tasks
        </Button>
      </TasksPicker>
    </div>
  );
};
