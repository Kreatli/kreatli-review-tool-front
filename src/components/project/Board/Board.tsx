import { Button, Chip, addToast } from '@heroui/react';
import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  closestCorners,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

import { useProjectContext } from '../../../contexts/Project';
import { Icon } from '../../various/Icon';
import { BoardColumn } from './BoardColumn';
import { TaskCard } from './TaskCard';
import { TasksPanel } from './TasksPanel';
import { TaskDto, ProjectStageDto, TaskEditBodyDto } from '../../../services/types';
import { useSession } from '../../../hooks/useSession';
import { Http } from '../../../services/httpRequest';
import { EditProjectStagesModal } from '../ProjectModals/EditProjectStagesModal';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { STATUS_COLORS } from '../ProjectModals/EditProjectStatusesModal/StatusColorPicker';

export const Board = () => {
  const { project } = useProjectContext();
  const { user } = useSession();
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [activeTask, setActiveTask] = useState<TaskDto | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [filterStage, setFilterStage] = useState<string>('all');
  const [isEditStagesModalOpen, setIsEditStagesModalOpen] = useState(false);
  const [overId, setOverId] = useState<string | null>(null);

  // Configure sensors to only activate on draggable elements, preventing interference with other clicks
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, // Increased distance to prevent accidental drags
        delay: 0,
        tolerance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 8,
        delay: 100, // Small delay for touch to distinguish from taps
        tolerance: 5,
      },
    }),
  );

  const fetchTasks = React.useCallback(async () => {
    if (!project?.id) return;

    try {
      const response = await Http.getRequest(`/project/${project.id}/tasks`, undefined, undefined, undefined, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response) {
        const allTasks = response as TaskDto[];
        // Filter tasks:
        // - Tasks with status (projectStage) are visible to all project members
        // - Unplaced tasks (no projectStage) are only visible to the user who owns them (inCharge or contributor)
        const filteredTasks = allTasks.filter((task) => {
          if (task.projectStage) {
            // Tasks with status are visible to all
            return true;
          } else {
            // Unplaced tasks are only visible to the owner
            return user?.id && (task.inCharge?.id === user.id || task.assignees.some((a) => a.id === user.id));
          }
        });
        setTasks(filteredTasks);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  }, [project?.id, user?.id]);

  React.useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    setOverId(over ? over.id.toString() : null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    setOverId(null);

    if (!over || !project?.id) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    // If dropping on the "My Tasks" panel, move task to unplaced
    if (over.id.toString() === 'panel-unplaced') {
      // Only update if the task is not already unplaced
      if (activeTask.projectStage !== null) {
        try {
          const taskData: TaskEditBodyDto = {
            projectStage: null,
          };

          await Http.patchRequest(`/project/${project.id}/tasks/${activeTask.id}`, undefined, taskData, undefined, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          // Remove task from all deliverables' linkedTasks when moved to unplaced
          try {
            const deliverablesResponse = await Http.getRequest(
              `/project/${project.id}/deliverables`,
              undefined,
              undefined,
              undefined,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
              },
            );

            if (deliverablesResponse && Array.isArray(deliverablesResponse)) {
              const deliverables = deliverablesResponse as any[];

              // Find deliverables that have this task in their linkedTasks
              const deliverablesWithTask = deliverables.filter(
                (deliverable) =>
                  deliverable.linkedTasks &&
                  Array.isArray(deliverable.linkedTasks) &&
                  deliverable.linkedTasks.includes(activeTask.id),
              );

              // Remove task from each deliverable's linkedTasks
              const updatePromises = deliverablesWithTask.map(async (deliverable) => {
                const newLinkedTasks = deliverable.linkedTasks.filter((taskId: string) => taskId !== activeTask.id);

                await Http.patchRequest(
                  `/project/${project.id}/deliverables/${deliverable.id}`,
                  undefined,
                  { linkedTasks: newLinkedTasks },
                  undefined,
                  {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  },
                );
              });

              await Promise.all(updatePromises);
            }
          } catch (error) {
            console.error('Failed to remove task from deliverables:', error);
            // Don't fail the task update if deliverable update fails
          }

          // Update local state optimistically
          setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === activeTask.id ? { ...task, projectStage: null } : task)),
          );

          addToast({
            title: 'Task moved to unplaced and removed from deliverables',
            color: 'success',
            variant: 'flat',
          });
        } catch (error) {
          console.error('Failed to move task to unplaced:', error);
          const errorMessage = getErrorMessage(error);
          addToast({
            title: errorMessage,
            color: 'danger',
            variant: 'flat',
          });
        }
      }
      return;
    }

    // If dropping on a column, update the task's stage
    if (over.id.toString().startsWith('column-')) {
      const newStage = over.id.toString().replace('column-', '');

      // Only update if the stage is different
      if (activeTask.projectStage !== newStage) {
        try {
          const taskData: TaskEditBodyDto = {
            projectStage: newStage,
          };

          await Http.patchRequest(`/project/${project.id}/tasks/${activeTask.id}`, undefined, taskData, undefined, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          // Update local state optimistically
          setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === activeTask.id ? { ...task, projectStage: newStage } : task)),
          );
        } catch (error) {
          console.error('Failed to update task stage:', error);
          const errorMessage = getErrorMessage(error);
          addToast({
            title: errorMessage,
            color: 'danger',
            variant: 'flat',
          });
        }
      }
      return;
    }

    // If dropping on another task, reorder within the same column
    const overTask = tasks.find((t) => t.id === over.id);
    if (overTask && activeTask.projectStage === overTask.projectStage && activeTask.projectStage) {
      const columnTasks = tasks.filter((t) => t.projectStage === activeTask.projectStage);
      const oldIndex = columnTasks.findIndex((t) => t.id === activeTask.id);
      const newIndex = columnTasks.findIndex((t) => t.id === overTask.id);

      if (oldIndex !== newIndex) {
        const reorderedTasks = arrayMove(columnTasks, oldIndex, newIndex);

        // Optimistically update local state
        setTasks((prevTasks) => {
          const otherTasks = prevTasks.filter((t) => t.projectStage !== activeTask.projectStage);
          return [...otherTasks, ...reorderedTasks];
        });

        // Note: Task reordering within columns is handled client-side
        // If backend API supports task ordering, add API call here
      }
    }
  };

  // Separate tasks into categories
  const tasksWithStatus = tasks.filter((task) => task.projectStage);
  const unplacedTasks = tasks.filter((task) => !task.projectStage);

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filterStage === 'all') {
      return true;
    }

    if (filterStage === 'unplaced') {
      return !task.projectStage;
    }

    return task.projectStage === filterStage;
  });

  // For board columns, only show tasks with status (visible to all)
  const boardTasks = filteredTasks.filter((task) => task.projectStage);

  if (!project) {
    return null;
  }

  return (
    <div className="flex h-full w-full gap-4 overflow-hidden">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={() => {
          setActiveTask(null);
          setOverId(null);
        }}
      >
        <div className="flex h-full w-full flex-1 flex-col overflow-hidden">
          {/* Header with Filters */}
          <div className="mb-6 flex flex-shrink-0 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" className="bg-default-100 text-foreground-600">
                  {filterStage === 'unplaced' ? unplacedTasks.length : boardTasks.length}
                </Chip>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={filterStage === 'all' ? 'solid' : 'flat'}
                  color={filterStage === 'all' ? 'primary' : 'default'}
                  onClick={() => setFilterStage('all')}
                  className="font-medium"
                >
                  All
                </Button>
                {project.projectStages.map((stage, index) => {
                  const stageColor = stage.color || STATUS_COLORS[index % STATUS_COLORS.length];
                  return (
                    <Button
                      key={stage.id}
                      size="sm"
                      variant={filterStage === stage.id ? 'solid' : 'flat'}
                      color={filterStage === stage.id ? 'primary' : 'default'}
                      onClick={() => setFilterStage(stage.id)}
                      className="font-medium"
                      startContent={<div className="h-2 w-2 rounded-full" style={{ backgroundColor: stageColor }} />}
                    >
                      {stage.name}
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="flat"
                startContent={<Icon icon="gear" size={16} />}
                onClick={() => setIsEditStagesModalOpen(true)}
                className="font-medium"
              >
                Edit Stages
              </Button>
              <Button
                size="sm"
                color="primary"
                startContent={<Icon icon="list" size={16} />}
                onClick={() => setIsPanelOpen(!isPanelOpen)}
                className="font-medium"
              >
                My Tasks
              </Button>
            </div>
          </div>

          <div className="flex min-h-0 w-full flex-1 gap-4 overflow-x-auto overflow-y-hidden">
            <SortableContext
              items={project.projectStages.map((stage) => `column-${stage.id}`)}
              strategy={horizontalListSortingStrategy}
            >
              <div className="flex h-full w-full gap-4">
                {project.projectStages.map((stage) => {
                  // Only show tasks with status in board columns (visible to all project members)
                  const stageTasks = boardTasks.filter((task) => task.projectStage === stage.id);
                  return <BoardColumn key={stage.id} stage={stage} tasks={stageTasks} onTaskUpdated={fetchTasks} />;
                })}
              </div>
            </SortableContext>
          </div>
        </div>

        <DragOverlay
          dropAnimation={{
            duration: 200,
            easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
          style={{
            opacity: 0.9,
            transform: 'rotate(3deg)',
          }}
        >
          {activeTask ? (
            <div className="rotate-3 shadow-2xl">
              <TaskCard task={activeTask} isDragging />
            </div>
          ) : null}
        </DragOverlay>

        {isPanelOpen && (
          <TasksPanel
            tasks={tasks.filter(
              (task) => task.inCharge?.id === user?.id || task.assignees.some((a) => a.id === user?.id),
            )}
            onClose={() => setIsPanelOpen(false)}
            onTaskCreated={fetchTasks}
            onTaskUpdated={fetchTasks}
          />
        )}

        <EditProjectStagesModal
          project={project}
          isOpen={isEditStagesModalOpen}
          onClose={() => setIsEditStagesModalOpen(false)}
          onSuccess={() => {
            // Refetch tasks after stages are updated
            fetchTasks();
          }}
        />
      </DndContext>
    </div>
  );
};
