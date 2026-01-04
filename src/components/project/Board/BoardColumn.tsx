import { Button, Card, CardBody, CardHeader, Chip } from '@heroui/react';
import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { ProjectStageDto, TaskDto, ProjectDto } from '../../../services/types';
import { TaskCard } from './TaskCard';
import { Icon } from '../../various/Icon';
import { CreateTaskModal } from '../Tasks/CreateTaskModal';
import { useProjectContext } from '../../../contexts/Project';
import { STATUS_COLORS } from '../ProjectModals/EditProjectStatusesModal/StatusColorPicker';

interface Props {
  stage: ProjectStageDto;
  tasks: TaskDto[];
  onTaskUpdated?: () => void;
}

export const BoardColumn = ({ stage, tasks, onTaskUpdated }: Props) => {
  const { project } = useProjectContext();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { setNodeRef, isOver, active } = useDroppable({
    id: `column-${stage.id}`,
  });

  // Get stage color, using default if not set
  const stageIndex = project?.projectStages.findIndex((s) => s.id === stage.id) ?? 0;
  const stageColor = stage.color || STATUS_COLORS[stageIndex % STATUS_COLORS.length];

  return (
    <>
      <Card
        ref={setNodeRef}
        className={`flex h-full min-w-[280px] flex-1 flex-col transition-all ${
          isOver && active
            ? 'ring-2 ring-primary ring-offset-2 bg-primary-50/30 scale-[1.02]'
            : ''
        }`}
      >
        <CardHeader className="flex shrink-0 flex-row items-center justify-between border-b border-default-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <div
              className="h-3.5 w-3.5 shrink-0 rounded-full shadow-sm ring-2 ring-white"
              style={{ backgroundColor: stageColor }}
            />
            <h3 className="text-sm font-semibold">{stage.name}</h3>
            <Chip size="sm" variant="flat" className="h-5">
              {tasks.length}
            </Chip>
          </div>
          <Button
            size="sm"
            variant="light"
            isIconOnly
            className="h-6 w-6 min-w-6"
            onClick={(e) => {
              e.stopPropagation();
              setIsCreateModalOpen(true);
            }}
            title="Add task"
          >
            <Icon icon="plus" size={14} />
          </Button>
        </CardHeader>
        <CardBody className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 py-4">
          <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
            {tasks.length === 0 ? (
              <div
                className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed text-sm text-foreground-400 transition-all ${
                  isOver && active
                    ? 'border-primary bg-primary-50/30 scale-[1.02]'
                    : 'border-default-200 hover:border-default-300 hover:bg-default-50'
                }`}
                onClick={() => setIsCreateModalOpen(true)}
              >
                <div className="text-center">
                  <Icon icon="list" size={24} className="mx-auto mb-2 text-foreground-300" />
                  <p className="mb-2">{isOver && active ? 'Drop task here' : 'No tasks'}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} onTaskUpdated={onTaskUpdated} />
                ))}
              </div>
            )}
          </SortableContext>
        </CardBody>
      </Card>

      {project && (
        <CreateTaskModal
          project={project}
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          initialStage={stage.id}
          onSuccess={(task) => {
            onTaskUpdated?.();
            setIsCreateModalOpen(false);
          }}
        />
      )}
    </>
  );
};
