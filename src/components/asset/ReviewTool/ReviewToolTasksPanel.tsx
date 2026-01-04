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
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  addToast,
} from '@heroui/react';
import React, { useState } from 'react';

import { TaskDto, ProjectDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { CreateTaskModal } from '../../project/Tasks/CreateTaskModal';
import { EditTaskModal } from '../../project/Tasks/EditTaskModal';
import { CreateDeliverableModal } from '../../project/Deliverables/CreateDeliverableModal';
import { useFileStateContext } from '../../../contexts/File';
import { useSession } from '../../../hooks/useSession';
import { Http } from '../../../services/httpRequest';
import { getErrorMessage } from '../../../utils/getErrorMessage';

interface Props {
  project: ProjectDto;
  fileId: string;
}

export const ReviewToolTasksPanel = ({ project, fileId }: Props) => {
  const { user } = useSession();
  const { activeFile } = useFileStateContext();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskDto | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingTask, setDeletingTask] = useState<TaskDto | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [creatingDeliverableTask, setCreatingDeliverableTask] = useState<TaskDto | null>(null);
  const [isCreateDeliverableModalOpen, setIsCreateDeliverableModalOpen] = useState(false);

  const [tasks, setTasks] = useState<TaskDto[]>([]);

  const fetchTasks = React.useCallback(async () => {
    if (!project?.id || !fileId) return;

    try {
      const response = await Http.getRequest(`/project/${project.id}/tasks`, undefined, undefined, undefined, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response) {
        const allTasks = response as TaskDto[];
        // Filter tasks that are linked to this media
        const linkedTasks = allTasks.filter((task) => task.linkedMedia?.includes(fileId));
        setTasks(linkedTasks);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  }, [project?.id, fileId]);

  React.useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = () => {
    setIsCreateModalOpen(true);
  };

  const handleNavigateToBoard = (taskId: string) => {
    window.open(`/project/${project.id}/board?task=${taskId}`, '_blank');
  };

  const handleEditTask = (task: TaskDto) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleDeleteTask = (task: TaskDto) => {
    setDeletingTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleCreateDeliverable = (task: TaskDto) => {
    setCreatingDeliverableTask(task);
    setIsCreateDeliverableModalOpen(true);
  };

  const handleDelete = async () => {
    if (!project || !deletingTask) return;

    setIsDeleting(true);
    try {
      await Http.deleteRequest(`/project/${project.id}/tasks/${deletingTask.id}`, undefined, undefined, undefined, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      addToast({
        title: 'Task deleted successfully',
        color: 'success',
        variant: 'flat',
      });

      fetchTasks();
      setIsDeleteModalOpen(false);
      setDeletingTask(null);
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

  const getStageColor = (stageId: string | null | undefined): string => {
    if (!stageId) return '#71717a';
    const stage = project.projectStages.find((s) => s.id === stageId);
    return stage?.color || '#71717a';
  };

  return (
    <>
      <div className="space-y-4 py-2">
        <Button
          size="md"
          color="primary"
          startContent={<Icon icon="plus" size={18} />}
          onClick={handleCreateTask}
          className="w-full font-semibold"
        >
          Create Task
        </Button>

        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-default-100 p-6">
              <Icon icon="file" size={48} className="text-foreground-400" />
            </div>
            <p className="mb-1 text-base font-medium text-foreground-700">No tasks linked to this media</p>
            <p className="text-sm text-foreground-500">Create a task to track work on this file</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => {
              const stage = project.projectStages.find((s) => s.id === task.projectStage);
              const stageColor = getStageColor(task.projectStage);
              const allAssignees = [
                ...(task.inCharge ? [task.inCharge] : []),
                ...task.assignees.filter((a) => task.inCharge?.id !== a.id),
              ];

              return (
                <Card
                  key={task.id}
                  isPressable
                  onClick={() => handleNavigateToBoard(task.id)}
                  className="cursor-pointer border border-default-200 transition-all hover:border-primary-300 hover:shadow-md"
                >
                  <CardBody className="gap-3 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h5 className="line-clamp-2 text-base font-semibold text-foreground-900">{task.name}</h5>
                        {task.description && (
                          <p className="mt-1 line-clamp-2 text-xs text-foreground-500">
                            {task.description}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-shrink-0 items-center gap-2">
                        <Icon icon="arrowRightTop" size={16} className="mt-0.5 text-foreground-400" />
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              className="h-7 w-7 min-w-7 opacity-60 transition-opacity hover:opacity-100"
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
                                handleEditTask(task);
                              } else if (key === 'create-deliverable') {
                                handleCreateDeliverable(task);
                              } else if (key === 'delete') {
                                handleDeleteTask(task);
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
                            <DropdownItem
                              key="create-deliverable"
                              startContent={<Icon icon="list" size={16} />}
                              className="text-foreground-700"
                            >
                              Create a Deliverable
                            </DropdownItem>
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
                    </div>

                    {task.projectStage && stage && (
                      <div className="flex items-center gap-2">
                        <Chip
                          size="sm"
                          variant="flat"
                          className="h-6 text-xs font-medium"
                          style={{
                            backgroundColor: `${stageColor}20`,
                            color: stageColor,
                            borderColor: `${stageColor}40`,
                            borderWidth: '1px',
                            borderStyle: 'solid',
                          }}
                        >
                          {stage.name}
                        </Chip>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-3 border-t border-default-100 pt-1">
                      <div className="flex min-w-0 flex-1 items-center gap-2">
                        {task.inCharge && (
                          <>
                            <span className="whitespace-nowrap text-xs text-foreground-500">Responsible:</span>
                            <div className="flex min-w-0 items-center gap-1.5">
                              <Avatar
                                size="sm"
                                className="h-5 w-5 flex-shrink-0"
                                src={task.inCharge.avatar?.url}
                                name={task.inCharge.name}
                              />
                              <span className="truncate text-xs font-medium text-foreground-700">
                                {task.inCharge.name}
                              </span>
                            </div>
                          </>
                        )}
                      </div>

                      {allAssignees.length > 0 && (
                        <div className="flex flex-shrink-0 items-center gap-2">
                          <AvatarGroup size="sm" max={3} className="flex-shrink-0">
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
                          {allAssignees.length > 3 && (
                            <span className="text-xs text-foreground-500">+{allAssignees.length - 3}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {activeFile && (
        <CreateTaskModal
          project={project}
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          initialMediaIds={[activeFile.id]}
          onSuccess={() => {
            fetchTasks();
          }}
        />
      )}

      {editingTask && (
        <EditTaskModal
          project={project}
          task={editingTask}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingTask(null);
          }}
          onSuccess={() => {
            fetchTasks();
            setIsEditModalOpen(false);
            setEditingTask(null);
          }}
        />
      )}

      {creatingDeliverableTask && (
        <CreateDeliverableModal
          project={project}
          isOpen={isCreateDeliverableModalOpen}
          onClose={() => {
            setIsCreateDeliverableModalOpen(false);
            setCreatingDeliverableTask(null);
          }}
          taskId={creatingDeliverableTask.id}
          onSuccess={() => {
            fetchTasks();
            setIsCreateDeliverableModalOpen(false);
            setCreatingDeliverableTask(null);
          }}
        />
      )}

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <ModalContent>
          <ModalHeader>Delete Task</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete &quot;{deletingTask?.name}&quot;? This action cannot be undone.</p>
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
  );
};
