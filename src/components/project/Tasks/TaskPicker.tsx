import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Spinner,
  ScrollShadow,
} from '@heroui/react';
import { Icon } from '../../various/Icon';
import { TaskDto } from '../../../services/types';
import { Http } from '../../../services/httpRequest';
import { useDebounceCallback } from '../../../hooks/useDebounceCallback';

interface Props {
  projectId: string;
  skipIds?: string[];
  onSelect: (task: TaskDto) => void;
  children: React.ReactNode;
  excludeUnplaced?: boolean; // Filter out unplaced tasks (tasks without projectStage)
}

export const TaskPicker = ({ projectId, skipIds = [], children, onSelect, excludeUnplaced = false }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isFetching = useRef(false);

  useEffect(() => {
    const loadInitialTasks = async () => {
      if (!projectId) {
        setIsLoading(false);
        return;
      }

      isFetching.current = true;
      setIsLoading(true);

      try {
        const response = await Http.getRequest(`/project/${projectId}/tasks`, undefined, undefined, undefined, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        console.log('TaskPicker - API response:', response);

        if (response && Array.isArray(response)) {
          const allTasks = response as TaskDto[];
          // Filter out unplaced tasks if excludeUnplaced is true
          let filteredTasks = allTasks.filter((task) => {
            if (excludeUnplaced && !task.projectStage) {
              return false; // Exclude unplaced tasks
            }
            return !skipIds.includes(task.id);
          });
          console.log('TaskPicker - Filtered tasks:', filteredTasks);
          setTasks(filteredTasks);
        } else {
          console.warn('TaskPicker - Unexpected response format:', response);
          setTasks([]);
        }
      } catch (error) {
        console.error('Failed to load tasks:', error);
        setTasks([]);
      } finally {
        setIsLoading(false);
        isFetching.current = false;
      }
    };

    if (isVisible && projectId) {
      loadInitialTasks();
    } else if (!isVisible) {
      // Reset when modal closes
      setTasks([]);
      setSearch('');
      setIsLoading(false);
    }
  }, [isVisible, projectId, skipIds, excludeUnplaced]);

  const debouncedSearch = useDebounceCallback((searchTerm: string) => {
    if (isFetching.current || !projectId) return;

    isFetching.current = true;
    setIsLoading(true);

    Http.getRequest(`/project/${projectId}/tasks`, undefined, undefined, undefined, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (response && Array.isArray(response)) {
          const allTasks = response as TaskDto[];
          // Filter out unplaced tasks if excludeUnplaced is true
          let filteredTasks = allTasks.filter((task) => {
            if (excludeUnplaced && !task.projectStage) {
              return false; // Exclude unplaced tasks
            }
            return !skipIds.includes(task.id);
          });

          if (searchTerm.trim()) {
            filteredTasks = filteredTasks.filter((task) => task.name.toLowerCase().includes(searchTerm.toLowerCase()));
          }

          setTasks(filteredTasks);
        } else {
          setTasks([]);
        }
      })
      .catch((error) => {
        console.error('Failed to search tasks:', error);
        setTasks([]);
      })
      .finally(() => {
        setIsLoading(false);
        isFetching.current = false;
      });
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setIsVisible(isOpen);
    if (isOpen) {
      setSearch('');
    }
  };

  const handleTaskSelect = (task: TaskDto) => {
    onSelect(task);
    setIsVisible(false);
    setSearch('');
  };

  const handleOpenClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(true);
  };

  // Clone children to add onClick that opens modal
  const childrenWithHandler = React.isValidElement(children)
    ? React.cloneElement(
        children as React.ReactElement,
        {
          ...(children as React.ReactElement).props,
          onClick: (e: React.MouseEvent) => {
            // Call original onClick if it exists
            const originalOnClick = (children as React.ReactElement).props?.onClick;
            if (typeof originalOnClick === 'function') {
              originalOnClick(e);
            }
            // Always open modal
            setIsVisible(true);
          },
        } as any,
      )
    : children;

  return (
    <>
      <span onClick={handleOpenClick} style={{ display: 'inline-block' }}>
        {childrenWithHandler}
      </span>
      <Modal isOpen={isVisible} onClose={() => handleOpenChange(false)} size="2xl" scrollBehavior="inside">
        <ModalContent>
          <ModalHeader className="text-xl font-semibold">Select Task</ModalHeader>
          <ModalBody className="gap-4">
            <Input
              placeholder="Search tasks..."
              value={search}
              onChange={handleSearchChange}
              startContent={<Icon icon="search" size={18} className="text-foreground-400" />}
              classNames={{
                input: 'text-sm',
                inputWrapper: 'h-10',
              }}
            />
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Spinner size="lg" />
              </div>
            ) : tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-default-100">
                  <Icon icon="check" size={32} className="text-foreground-400" />
                </div>
                <p className="mb-1 text-sm font-medium text-foreground-600">No tasks found</p>
                <p className="text-xs text-foreground-500">
                  {search ? 'Try a different search term' : 'No tasks available in this project'}
                </p>
              </div>
            ) : (
              <ScrollShadow className="max-h-[400px]">
                <div className="flex flex-col gap-2">
                  {tasks.map((task) => (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => handleTaskSelect(task)}
                      className="flex items-center gap-3 rounded-lg border border-default-200 bg-background p-3 text-left transition-all hover:border-primary hover:bg-primary-50"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-semibold text-foreground-900">{task.name}</p>
                          {task.projectStage && (
                            <span className="shrink-0 rounded bg-primary-100 px-1.5 py-0.5 text-xs font-medium text-primary-700">
                              On Board
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-xs text-foreground-500">
                            {task.assignees.length} contributor{task.assignees.length !== 1 ? 's' : ''}
                          </span>
                          {task.projectStage && (
                            <>
                              <span className="text-xs text-foreground-300">•</span>
                              <span className="text-xs text-foreground-500">{task.projectStage}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <Icon icon="arrowRight" size={16} className="shrink-0 text-foreground-400" />
                    </button>
                  ))}
                </div>
              </ScrollShadow>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
