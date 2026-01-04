import { Avatar, AvatarGroup, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, addToast } from '@heroui/react';
import React, { useState, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useRouter } from 'next/router';

import { TaskDto, DeliverableDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { useProjectContext } from '../../../contexts/Project';
import { EditTaskModal } from './EditTaskModal';
import { TaskMediaPreview } from './TaskMediaPreview';
import { Http } from '../../../services/httpRequest';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { CreateDeliverableModal } from '../Deliverables/CreateDeliverableModal';

interface Props {
  task: TaskDto;
  onTaskUpdated?: () => void;
}

const getStageColor = (stageId: string | null | undefined, projectStages: any[] = [], defaultColor = '#71717a'): string => {
  if (!stageId) return defaultColor;
  const stage = projectStages.find((s) => s.id === stageId);
  return stage?.color || defaultColor;
};

export const TaskListItem = ({ task, onTaskUpdated }: Props) => {
  const { project } = useProjectContext();
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreateDeliverableModalOpen, setIsCreateDeliverableModalOpen] = useState(false);
  const [linkedDeliverable, setLinkedDeliverable] = useState<DeliverableDto | null>(null);

  // Check if task is linked to a deliverable
  useEffect(() => {
    const checkLinkedDeliverable = async () => {
      if (!project?.id) return;
      
      try {
        const response = await Http.getRequest(
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
        if (response && Array.isArray(response)) {
          const deliverables = response as DeliverableDto[];
          const linked = deliverables.find(
            (d) => d.taskId === task.id || (d.linkedTasks && d.linkedTasks.includes(task.id))
          );
          setLinkedDeliverable(linked || null);
        }
      } catch (error) {
        console.error('Failed to check linked deliverable:', error);
      }
    };

    checkLinkedDeliverable();
  }, [project?.id, task.id]);

  const handleNavigateToDeliverable = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (linkedDeliverable) {
      router.push(`/project/${project?.id}/deliverables`);
    }
  };
  
  // Only allow dragging if task is not placed on board (no projectStage)
  const isUnplaced = !task.projectStage;
  
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    disabled: !isUnplaced, // Disable dragging if task is already placed
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const stage = project?.projectStages.find((s) => s.id === task.projectStage);
  const stageColor = getStageColor(task.projectStage, project?.projectStages || []);

  const handleDelete = async () => {
    if (!project) return;

    setIsDeleting(true);
    try {
      await Http.deleteRequest(
        `/project/${project.id}/tasks/${task.id}`,
        undefined,
        undefined,
        undefined,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      addToast({
        title: 'Task deleted successfully',
        color: 'success',
        variant: 'flat',
      });

      onTaskUpdated?.();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Failed to delete task:', error);
      addToast({
        title: getErrorMessage(error),
        color: 'danger',
        variant: 'flat',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const isUnplacedTask = !task.projectStage;
  const allAssignees = [
    ...(task.inCharge ? [task.inCharge] : []),
    ...task.assignees.filter(a => task.inCharge?.id !== a.id)
  ];

  // Determine content presence for dynamic sizing
  const hasMedia = task.linkedMedia.length > 0;
  const hasLargeMedia = !isUnplacedTask && hasMedia; // Large preview only for placed tasks
  const hasSmallMedia = isUnplacedTask && hasMedia; // Small preview for unplaced tasks
  const hasAssignees = allAssignees.length > 0;
  const hasDeliverable = linkedDeliverable !== null;
  const hasStage = !isUnplacedTask && stage !== undefined;

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...(isUnplaced ? listeners : {})}
        {...(isUnplaced ? attributes : {})}
        className={`group flex flex-col rounded-lg bg-default-100 border border-default-200 p-3 transition-all hover:bg-default-200 hover:border-default-300 hover:shadow-sm ${isUnplaced ? 'cursor-move' : 'cursor-default'}`}
      >
        {/* Large Media Preview Area (for IN PROGRESS tasks with media) */}
        {hasLargeMedia && (
          <div className="mb-3 rounded bg-default-100 aspect-video flex items-center justify-center relative overflow-hidden min-h-[120px] w-full">
            {/* Background image/thumbnail if available */}
            <TaskMediaPreview mediaIds={task.linkedMedia} maxVisible={1} size="full" />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/5">
              <div className="w-16 h-16 rounded-full bg-default-200 flex items-center justify-center shadow-lg hover:bg-default-300 transition-colors">
                <Icon icon="play" size={24} className="text-foreground-900 ml-1" />
              </div>
            </div>
          </div>
        )}

        {/* Task Content */}
        <div className={`flex flex-1 flex-col ${hasLargeMedia ? 'gap-2' : 'gap-2.5'}`}>
          {/* Title and Actions */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h5
                className="text-sm font-bold text-foreground-900 cursor-pointer hover:text-primary line-clamp-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditModalOpen(true);
                }}
              >
                {task.name}
              </h5>
              {task.description && (
                <p className="mt-1 line-clamp-2 text-xs text-foreground-500">
                  {task.description}
                </p>
              )}
            </div>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  className="h-7 w-7 min-w-7 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                  aria-label="Task actions"
                >
                  <Icon icon="dots" size={16} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Task actions"
                onAction={(key) => {
                  if (key === 'edit') {
                    setIsEditModalOpen(true);
                  } else if (key === 'create-deliverable') {
                    setIsCreateDeliverableModalOpen(true);
                  } else if (key === 'delete') {
                    setIsDeleteModalOpen(true);
                  }
                }}
              >
                <DropdownItem
                  key="edit"
                  startContent={<Icon icon="edit" size={16} />}
                  className="text-foreground-700"
                >
                  Edit
                </DropdownItem>
                {!isUnplacedTask && (
                  <DropdownItem
                    key="create-deliverable"
                    startContent={<Icon icon="file" size={16} />}
                    className="text-foreground-700"
                  >
                    Create a Deliverable
                  </DropdownItem>
                )}
                <DropdownItem
                  key="delete"
                  color="danger"
                  startContent={<Icon icon="trash" size={16} />}
                  className="text-danger"
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Small Media Preview (for unplaced tasks with media) */}
          {hasSmallMedia && (
            <div className="flex items-center gap-2">
              <TaskMediaPreview mediaIds={task.linkedMedia} maxVisible={2} size="sm" />
            </div>
          )}

          {/* Description placeholder - can be removed if not needed */}
          {isUnplacedTask && (
            <p className="text-xs text-foreground-500 line-clamp-2">
              {/* Placeholder for description - can be removed or populated if description field is added */}
            </p>
          )}

          {/* Stage/Status and Deliverable Chips */}
          {(hasStage || hasDeliverable) && (
            <div className="flex items-center gap-2 flex-wrap">
              {stage && (
                <Chip 
                  size="sm" 
                  variant="flat" 
                  className="h-5 text-xs"
                  style={{ 
                    backgroundColor: `${stageColor}20`,
                    color: stageColor,
                    borderColor: stageColor
                  }}
                >
                  {stage.name}
                </Chip>
              )}
              {linkedDeliverable && (
                <Chip
                  size="sm"
                  variant="flat"
                  className="h-5 text-xs cursor-pointer hover:bg-primary-100"
                  onClick={handleNavigateToDeliverable}
                  startContent={<Icon icon="file" size={10} />}
                  title={`Linked to deliverable: ${linkedDeliverable.name}. Click to view.`}
                >
                  {linkedDeliverable.name}
                </Chip>
              )}
            </div>
          )}

          {/* Avatars at bottom */}
          {hasAssignees && (
            <div className="flex items-center gap-1.5 mt-auto pt-2">
              <AvatarGroup size="sm" max={3}>
                {allAssignees.slice(0, 3).map((assignee) => (
                  <Avatar
                    key={assignee.id}
                    size="sm"
                    className="h-6 w-6"
                    src={assignee.avatar?.url}
                    name={assignee.name}
                  />
                ))}
              </AvatarGroup>
            </div>
          )}

        </div>
      </div>

      {project && (
        <>
          <EditTaskModal
            project={project}
            task={task}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSuccess={(updatedTask) => {
              onTaskUpdated?.();
              setIsEditModalOpen(false);
            }}
          />

          <CreateDeliverableModal
            project={project}
            isOpen={isCreateDeliverableModalOpen}
            onClose={() => setIsCreateDeliverableModalOpen(false)}
            taskId={task.id}
            onSuccess={() => {
              onTaskUpdated?.();
              setIsCreateDeliverableModalOpen(false);
            }}
          />

          <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
            <ModalContent>
              <ModalHeader>Delete Task</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete &quot;{task.name}&quot;? This action cannot be undone.</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onClick={() => setIsDeleteModalOpen(false)}>
                  Cancel
                </Button>
                <Button color="danger" onClick={handleDelete} isLoading={isDeleting}>
                  Delete
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

