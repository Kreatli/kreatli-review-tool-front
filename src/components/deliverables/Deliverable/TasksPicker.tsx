import { Placement } from '@floating-ui/react';
import { Input, Popover, PopoverContent, PopoverTrigger, Spinner } from '@heroui/react';
import { useState } from 'react';

import { useDebounce } from '../../../hooks/useDebounce';
import { useGetProjectIdTasks } from '../../../services/hooks';
import { TaskInfoDto } from '../../../services/types';
import { TasksPickerItem } from './TasksPickerItem';

interface Props {
  projectId: string;
  children: React.ReactNode;
  skipIds?: string[];
  placement?: Placement;
  onSelect: (task: TaskInfoDto) => void;
}

export const TasksPicker = ({ projectId, children, skipIds = [], placement = 'bottom-start', onSelect }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search);

  const { data: tasksData, isPending } = useGetProjectIdTasks(projectId, {
    search: debouncedSearch,
    skipIds: skipIds as unknown as string,
  });

  const tasks = tasksData?.tasks ?? [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleTaskSelect = (task: TaskInfoDto) => {
    onSelect(task);
    setIsVisible(false);
  };

  return (
    <Popover isOpen={isVisible} placement={placement} onOpenChange={setIsVisible}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="p-1">
        <div className="h-72 w-[500px] max-w-[90vw] overflow-auto">
          <div className="sticky top-0 z-30 p-2">
            <Input placeholder="Search..." value={search} onChange={handleSearchChange} size="sm" />
          </div>
          {tasks.length > 0 && !isPending && (
            <div className="flex flex-col p-2">
              {tasks.map((task) => (
                <TasksPickerItem key={task.id} task={task} onClick={() => handleTaskSelect(task)} />
              ))}
            </div>
          )}
          {tasks.length === 0 && !isPending && (
            <div className="p-2 text-center text-foreground-500">No tasks found</div>
          )}
          {isPending && (
            <div className="flex items-center justify-center p-2">
              <Spinner color="default" />
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
