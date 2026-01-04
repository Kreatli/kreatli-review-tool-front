import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  addToast,
} from '@heroui/react';
import React, { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRouter } from 'next/router';

import { TaskDto, FileDto, DeliverableDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { EditTaskModal } from '../Tasks/EditTaskModal';
import { useProjectContext } from '../../../contexts/Project';
import { TaskMediaPreview } from '../Tasks/TaskMediaPreview';
import { Http } from '../../../services/httpRequest';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { getAssetFileId } from '../../../services/services';
import { AssetIcon } from '../../asset/AssetIcon';
import { CreateDeliverableModal } from '../Deliverables/CreateDeliverableModal';

interface Props {
  task: TaskDto;
  isDragging?: boolean;
  onTaskUpdated?: () => void;
}

const getStageColor = (
  stageId: string | null | undefined,
  projectStages: any[] = [],
  defaultColor = '#71717a',
): string => {
  if (!stageId) return defaultColor;
  const stage = projectStages.find((s) => s.id === stageId);
  return stage?.color || defaultColor;
};

export const TaskCard = ({ task, isDragging = false, onTaskUpdated }: Props) => {
  const { project } = useProjectContext();
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreateDeliverableModalOpen, setIsCreateDeliverableModalOpen] = useState(false);
  const [linkedDeliverable, setLinkedDeliverable] = useState<DeliverableDto | null>(null);
  const [primaryMedia, setPrimaryMedia] = useState<FileDto | null>(null);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);

  // Check if task is linked to a deliverable
  useEffect(() => {
    const checkLinkedDeliverable = async () => {
      if (!project?.id) return;

      try {
        const response = await Http.getRequest(`/project/${project.id}/deliverables`, undefined, undefined, undefined, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        if (response && Array.isArray(response)) {
          const deliverables = response as DeliverableDto[];
          const linked = deliverables.find(
            (d) => d.taskId === task.id || (d.linkedTasks && d.linkedTasks.includes(task.id)),
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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ 
    id: task.id,
    transition: {
      duration: 200,
      easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform) + (isSortableDragging ? ' scale(0.95)' : ''),
    transition,
    opacity: isSortableDragging ? 0.4 : 1,
  };

  const stageColor = getStageColor(task.projectStage, project?.projectStages || []);
  const stage = project?.projectStages.find((s) => s.id === task.projectStage);
  const isUnplacedTask = !task.projectStage;

  // Load primary media for large preview
  useEffect(() => {
    const loadPrimaryMedia = async () => {
      if (task.linkedMedia.length === 0) {
        setPrimaryMedia(null);
        return;
      }

      setIsLoadingMedia(true);
      try {
        const response = await getAssetFileId(task.linkedMedia[0]);
        setPrimaryMedia(response as FileDto);
      } catch (error) {
        console.error('Failed to load primary media:', error);
        setPrimaryMedia(null);
      } finally {
        setIsLoadingMedia(false);
      }
    };

    loadPrimaryMedia();
  }, [task.linkedMedia]);

  const handleDelete = async () => {
    if (!project) return;

    setIsDeleting(true);
    try {
      await Http.deleteRequest(`/project/${project.id}/tasks/${task.id}`, undefined, undefined, undefined, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

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

  // Determine if we should show large media preview
  const hasMedia = task.linkedMedia.length > 0;
  const hasAssignees = task.inCharge || task.assignees.length > 0;
  const hasDeliverable = linkedDeliverable !== null;
  const hasStage = stage !== undefined;

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={`group relative overflow-hidden border border-default-200 shadow-sm transition-all ${
          isSortableDragging ? 'z-50 rotate-2 shadow-2xl ring-2 ring-primary ring-offset-2' : ''
        } ${isDragging ? 'rotate-3 shadow-xl' : ''}`}
        isPressable={!isSortableDragging}
        isHoverable={!isSortableDragging}
      >
        <CardBody className="p-0">
          {/* Drag Handle */}
          <div
            {...listeners}
            className="absolute left-0 top-0 z-10 flex h-8 w-8 cursor-grab items-center justify-center rounded-br-lg bg-default-100/90 backdrop-blur-sm opacity-0 transition-all hover:bg-default-200/90 group-hover:opacity-100 active:cursor-grabbing active:scale-95"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            title="Drag to move"
            aria-label="Drag handle"
          >
            <Icon icon="dotsSix" size={14} className="text-foreground-500" />
          </div>

          {/* Large Media Preview Area - Only show if media exists */}
          {hasMedia && (
            <div
              className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-default-100"
              onClick={(e) => {
                e.stopPropagation();
                if (!isSortableDragging) {
                  setIsEditModalOpen(true);
                }
              }}
            >
              {isLoadingMedia ? (
                <Spinner size="sm" />
              ) : primaryMedia ? (
                <>
                  {primaryMedia.fileType?.startsWith('image') ? (
                    <Image
                      src={primaryMedia.url}
                      alt={primaryMedia.name}
                      radius="none"
                      classNames={{ img: 'object-cover w-full h-full' }}
                    />
                  ) : primaryMedia.metadata?.thumbnailUrl ? (
                    <Image
                      src={primaryMedia.metadata.thumbnailUrl}
                      alt={primaryMedia.name}
                      radius="none"
                      classNames={{ img: 'object-cover w-full h-full' }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <AssetIcon fileType={primaryMedia.fileType || ''} size={48} />
                    </div>
                  )}
                  {primaryMedia.fileType?.startsWith('video') && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-default-200 shadow-lg transition-colors hover:bg-default-300">
                        <Icon icon="play" size={24} className="ml-1 text-foreground-900" />
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          )}

          {/* Task Content */}
          <div className={`p-3 ${hasMedia ? 'space-y-2' : 'space-y-2.5'}`}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h4
                  className="line-clamp-2 cursor-pointer text-sm font-semibold hover:text-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isSortableDragging) {
                      setIsEditModalOpen(true);
                    }
                  }}
                >
                  {task.name}
                </h4>
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
                    className="h-7 w-7 min-w-7 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
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

            {/* Avatars and Stage/Status - Same row */}
            {(hasAssignees || hasStage || hasDeliverable) && (
              <div className="flex items-center justify-between gap-2">
                {/* Avatars - Only show if there are contributors */}
                {hasAssignees && (
                  <div className="flex items-center gap-1.5">
                    <AvatarGroup size="sm" max={3} className="justify-start">
                      {task.inCharge && (
                        <Avatar
                          isBordered
                          className="h-6 w-6 border-default-300"
                          src={task.inCharge.avatar?.url}
                          name={task.inCharge.name}
                        />
                      )}
                      {task.assignees.map((assignee) => (
                        <Avatar
                          key={assignee.id}
                          isBordered
                          className="h-6 w-6 border-default-300"
                          src={assignee.avatar?.url}
                          name={assignee.name}
                        />
                      ))}
                    </AvatarGroup>
                  </div>
                )}
                {/* Status/Stage and Deliverable Chips - Right aligned */}
                {(hasStage || hasDeliverable) && (
                  <div className="flex flex-wrap items-center gap-2">
                    {stage && (
                      <Chip
                        size="sm"
                        variant="flat"
                        className="h-5 text-xs"
                        style={{
                          backgroundColor: `${stageColor}20`,
                          color: stageColor,
                          borderColor: stageColor,
                        }}
                      >
                        {stage.name}
                      </Chip>
                    )}
                    {linkedDeliverable && (
                      <Chip
                        size="sm"
                        variant="flat"
                        className="h-5 cursor-pointer text-xs hover:bg-primary-100"
                        onClick={handleNavigateToDeliverable}
                        startContent={<Icon icon="file" size={10} />}
                        title={`Linked to deliverable: ${linkedDeliverable.name}. Click to view.`}
                      >
                        {linkedDeliverable.name}
                      </Chip>
                    )}
                  </div>
                )}
              </div>
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
