import { Button, Card, CardBody, CardHeader, Chip, Divider, ScrollShadow } from '@heroui/react';
import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';

import { TaskDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { TaskListItem } from '../Tasks/TaskListItem';
import { CreateTaskModal } from '../Tasks/CreateTaskModal';
import { useProjectContext } from '../../../contexts/Project';

interface Props {
  tasks: TaskDto[];
  onClose: () => void;
  onTaskCreated?: () => void;
  onTaskUpdated?: () => void;
}

export const TasksPanel = ({ tasks, onClose, onTaskCreated, onTaskUpdated }: Props) => {
  const { project } = useProjectContext();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const unplacedTasks = tasks.filter((task) => !task.projectStage);
  const stagedTasks = tasks.filter((task) => task.projectStage);

  const { setNodeRef, isOver, active } = useDroppable({
    id: 'panel-unplaced',
  });

  return (
    <>
      <Card
        ref={setNodeRef}
        className={`flex h-full w-96 flex-col rounded-none border-l border-default-200 shadow-lg transition-all ${
          isOver && active
            ? 'ring-2 ring-primary ring-offset-2 bg-primary-50/20 scale-[1.01]'
            : ''
        }`}
      >
        <CardHeader className="flex shrink-0 flex-row items-center justify-between border-b border-default-200 bg-default-50/50 px-4 py-3.5">
          <div className="flex items-center gap-2">
            {/* List icon with checkmark overlay */}
            <div className="relative flex items-center justify-center">
              <Icon icon="list" size={18} className="text-foreground-500" />
              <Icon icon="check" size={10} className="absolute -right-0.5 -top-0.5 text-foreground-500" />
            </div>
            <h3 className="text-base font-semibold text-foreground-900">My Tasks</h3>
            <Chip
              size="sm"
              variant="flat"
              className="h-5 bg-default-200 px-1.5 text-xs font-medium text-foreground-700"
            >
              {tasks.length}
            </Chip>
          </div>
          <Button
            size="sm"
            variant="light"
            isIconOnly
            onClick={onClose}
            className="text-foreground-500 hover:text-foreground-900"
          >
            <Icon icon="arrowRight" size={16} />
          </Button>
        </CardHeader>
        <CardBody className="flex flex-1 flex-col gap-0 overflow-hidden p-0">
          {/* Create Task Button - Sticky at top */}
          <div className="shrink-0 border-b border-default-100 bg-default-50/30 px-4 pb-3 pt-4">
            <Button
              size="sm"
              color="primary"
              startContent={<Icon icon="plus" size={16} />}
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full font-medium"
            >
              Create Task
            </Button>
          </div>

          {/* Scrollable Content */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {tasks.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 text-center">
                <div className="mb-4 rounded-full bg-default-100 p-4">
                  <Icon icon="check" size={32} className="text-foreground-400" />
                </div>
                <p className="mb-1 text-sm font-semibold text-foreground-700">No tasks assigned to you</p>
                <p className="max-w-[240px] text-xs text-foreground-500">
                  Tasks where you're responsible or a contributor will appear here
                </p>
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
                  startContent={<Icon icon="plus" size={14} />}
                  onClick={() => setIsCreateModalOpen(true)}
                  className="mt-4"
                >
                  Create your first task
                </Button>
              </div>
            ) : (
              <ScrollShadow className="flex-1">
                <div className="flex flex-col">
                  {/* Unplaced Tasks Section */}
                  {unplacedTasks.length > 0 && (
                    <div className="flex flex-col">
                      <div className="sticky top-0 z-10 mb-2 border-b border-default-100 bg-default-50/95 px-4 py-2.5 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon icon="mail" size={14} className="text-foreground-500" />
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground-700">
                              UNPLACED
                            </h4>
                            <Chip
                              size="sm"
                              variant="flat"
                              className="h-5 bg-default-200 px-1.5 text-xs font-medium text-foreground-700"
                            >
                              {unplacedTasks.length}
                            </Chip>
                          </div>
                        </div>
                        {isOver && (
                          <div className="mt-2 flex animate-pulse items-center gap-1.5 text-xs font-medium text-primary">
                            <Icon icon="arrow" size={12} className="rotate-180" />
                            <span>Drop here to unplace task</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2 px-4 pb-3">
                        {unplacedTasks.map((task) => (
                          <TaskListItem key={task.id} task={task} onTaskUpdated={onTaskUpdated} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Divider */}
                  {unplacedTasks.length > 0 && stagedTasks.length > 0 && (
                    <div className="px-4 py-2">
                      <Divider className="bg-default-100" />
                    </div>
                  )}

                  {/* In Progress Tasks Section */}
                  {stagedTasks.length > 0 && (
                    <div className="flex flex-col">
                      <div className="sticky top-0 z-10 mb-2 border-b border-default-100 bg-default-50/95 px-4 py-2.5 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon icon="list" size={14} className="text-foreground-500" />
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground-700">
                              IN PROGRESS
                            </h4>
                            <Chip
                              size="sm"
                              variant="flat"
                              className="h-5 bg-default-200 px-1.5 text-xs font-medium text-foreground-700"
                            >
                              {stagedTasks.length}
                            </Chip>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 px-4 pb-4">
                        {stagedTasks.map((task) => (
                          <TaskListItem key={task.id} task={task} onTaskUpdated={onTaskUpdated} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollShadow>
            )}
          </div>
        </CardBody>
      </Card>

      {project && (
        <CreateTaskModal
          project={project}
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={() => {
            onTaskCreated?.();
          }}
        />
      )}
    </>
  );
};
