import { Avatar, Button, Card, CardBody, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, addToast } from '@heroui/react';
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
  showStage?: boolean;
  onTaskUpdated?: () => void;
}

export const TaskItem = ({ task, showStage = false, onTaskUpdated }: Props) => {
  const { project } = useProjectContext();
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreateDeliverableModalOpen, setIsCreateDeliverableModalOpen] = useState(false);
  const [linkedDeliverable, setLinkedDeliverable] = useState<DeliverableDto | null>(null);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

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
          // Find deliverable that has this task in taskId or linkedTasks
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

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const stage = project?.projectStages.find((s) => s.id === task.projectStage);

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

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="cursor-move"
        isPressable
        isHoverable
      >
        <CardBody className="gap-3 p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h5 
                className="text-sm font-semibold cursor-pointer hover:text-primary line-clamp-2"
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
            <div className="flex items-center gap-1 flex-shrink-0">
              <Button
                size="sm"
                variant="light"
                isIconOnly
                className="h-6 w-6 min-w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditModalOpen(true);
                }}
                title="Edit task"
              >
                <Icon icon="edit" size={12} />
              </Button>
              {task.projectStage && (
                <Button
                  size="sm"
                  variant="light"
                  isIconOnly
                  className="h-6 w-6 min-w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCreateDeliverableModalOpen(true);
                  }}
                  title="Create a Deliverable"
                >
                  <Icon icon="file" size={12} />
                </Button>
              )}
              <Button
                size="sm"
                variant="light"
                isIconOnly
                className="h-6 w-6 min-w-6 text-danger hover:text-danger"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeleteModalOpen(true);
                }}
                title="Delete task"
              >
                <Icon icon="trash" size={12} />
              </Button>
            </div>
          </div>

          {task.linkedMedia.length > 0 && (
            <div className="flex items-center gap-2">
              <TaskMediaPreview mediaIds={task.linkedMedia} maxVisible={2} size="sm" />
            </div>
          )}

          <div className="flex items-center gap-2 flex-wrap">
            {showStage && stage && (
              <Chip size="sm" variant="flat" className="h-5 w-fit">
                {stage.name}
              </Chip>
            )}
            {linkedDeliverable && (
              <Chip
                size="sm"
                variant="flat"
                className="h-5 w-fit cursor-pointer hover:bg-primary-100"
                onClick={handleNavigateToDeliverable}
                startContent={<Icon icon="file" size={12} />}
                title={`Linked to deliverable: ${linkedDeliverable.name}. Click to view.`}
              >
                Deliverable
              </Chip>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              <Avatar
                size="sm"
                className="h-6 w-6 flex-shrink-0"
                src={task.inCharge?.avatar?.url}
                name={task.inCharge?.name}
              />
              <span className="text-xs text-foreground-600 truncate">{task.inCharge?.name}</span>
            </div>
            {task.assignees.length > 1 && (
              <AvatarGroup size="sm" max={3} className="justify-end flex-shrink-0">
                {task.assignees.slice(0, 3).map((assignee) => (
                  <Avatar
                    key={assignee.id}
                    className="h-6 w-6"
                    src={assignee.avatar?.url}
                    name={assignee.name}
                  />
                ))}
              </AvatarGroup>
            )}
          </div>
        </CardBody>
      </Card>

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

