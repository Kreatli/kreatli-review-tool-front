import {
  Button,
  Input,
  Textarea,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  addToast,
} from '@heroui/react';
import React, { useState, useEffect } from 'react';

import { ProjectDto, TaskEditBodyDto, TaskDto, AssetDto, DeliverableDto } from '../../../services/types';
import { Http } from '../../../services/httpRequest';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { AssetPicker } from '../../asset/AssetPicker';
import { AssetPreview } from '../../asset/AssetPicker/AssetPreview';
import { Icon } from '../../various/Icon';
import { getAssetFileId } from '../../../services/services';
import { DeliverablePicker } from '../Deliverables/DeliverablePicker';
import { CreateDeliverableModal } from '../Deliverables/CreateDeliverableModal';

interface Props {
  project: ProjectDto;
  task: TaskDto;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (task: TaskDto) => void;
}

export const EditTaskModal = ({ project, task, isOpen, onClose, onSuccess }: Props) => {
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description || '');
  const [inCharge, setInCharge] = useState(task.inCharge?.id || '');
  const [assignees, setAssignees] = useState<string[]>(task.assignees.map((a) => a.id));
  const [projectStage, setProjectStage] = useState<string | null>(task.projectStage || null);
  const [selectedAssets, setSelectedAssets] = useState<AssetDto[]>([]);
  const [selectedDeliverables, setSelectedDeliverables] = useState<DeliverableDto[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  const [isLoadingDeliverables, setIsLoadingDeliverables] = useState(false);
  const [isCreateDeliverableModalOpen, setIsCreateDeliverableModalOpen] = useState(false);

  const loadTaskAssets = React.useCallback(async () => {
    if (task.linkedMedia && task.linkedMedia.length > 0) {
      setIsLoadingAssets(true);
      try {
        const assetPromises = task.linkedMedia.map(async (assetId) => {
          try {
            const response = await getAssetFileId(assetId);
            const file = response as any;
            return {
              id: file.id,
              name: file.name,
              fileType: file.fileType,
              fileSize: file.fileSize,
              url: file.url,
              metadata: file.metadata || {},
              format: file.format || '',
              description: file.description || '',
              assignee: file.assignee,
              status: file.status,
              statusLabel: file.statusLabel,
              statusColor: file.statusColor,
            } as AssetDto;
          } catch (error) {
            console.error(`Failed to load asset ${assetId}:`, error);
            return null;
          }
        });
        
        const assets = (await Promise.all(assetPromises)).filter((asset): asset is AssetDto => asset !== null);
        setSelectedAssets(assets);
      } catch (error) {
        console.error('Failed to load task assets:', error);
      } finally {
        setIsLoadingAssets(false);
      }
    } else {
      setSelectedAssets([]);
    }
  }, [task.linkedMedia]);

  // Load deliverables that have this task linked
  const loadTaskDeliverables = React.useCallback(async () => {
    if (!project?.id || !task?.id) {
      setSelectedDeliverables([]);
      return;
    }

    setIsLoadingDeliverables(true);
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
        const allDeliverables = response as DeliverableDto[];
        // Find deliverables that have this task in their linkedTasks array
        const linkedDeliverables = allDeliverables.filter(
          (deliverable) => deliverable.linkedTasks && deliverable.linkedTasks.includes(task.id)
        );
        setSelectedDeliverables(linkedDeliverables);
      }
    } catch (error) {
      console.error('Failed to load task deliverables:', error);
      setSelectedDeliverables([]);
    } finally {
      setIsLoadingDeliverables(false);
    }
  }, [project?.id, task?.id]);

  // Load task data when modal opens
  useEffect(() => {
    if (isOpen && task) {
      setName(task.name);
      setDescription(task.description || '');
      setInCharge(task.inCharge?.id || '');
      setAssignees(task.assignees.map((a) => a.id));
      setProjectStage(task.projectStage || null);
      loadTaskAssets();
      loadTaskDeliverables();
    }
  }, [isOpen, task, loadTaskAssets, loadTaskDeliverables]);

  const handleSelectAsset = (asset: AssetDto) => {
    if (selectedAssets.find((a) => a.id === asset.id)) {
      return;
    }
    setSelectedAssets([...selectedAssets, asset]);
  };

  const handleRemoveAsset = (asset: AssetDto) => {
    setSelectedAssets(selectedAssets.filter((a) => a.id !== asset.id));
  };

  const handleSelectDeliverable = (deliverable: DeliverableDto) => {
    if (selectedDeliverables.find((d) => d.id === deliverable.id)) {
      return;
    }
    setSelectedDeliverables([...selectedDeliverables, deliverable]);
  };

  const handleRemoveDeliverable = (deliverable: DeliverableDto) => {
    setSelectedDeliverables(selectedDeliverables.filter((d) => d.id !== deliverable.id));
  };

  const handleSubmit = async () => {
    if (!name || !inCharge || assignees.length === 0) {
      addToast({
        title: 'Please fill in all required fields',
        color: 'danger',
        variant: 'flat',
      });
      return;
    }

    if (name.length > 200) {
      addToast({
        title: 'Task name must be 200 characters or less',
        color: 'danger',
        variant: 'flat',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const linkedMedia = selectedAssets.length > 0 ? selectedAssets.map((asset) => asset.id) : [];

      const taskData: TaskEditBodyDto = {
        name: name.trim(),
        ...(description && description.trim() && { description: description.trim() }),
        inCharge,
        assignees,
        projectStage: projectStage || null,
        linkedMedia: linkedMedia.length > 0 ? linkedMedia : undefined,
      };

      const response = await Http.patchRequest(
        `/project/${project.id}/tasks/${task.id}`,
        undefined,
        taskData,
        undefined,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // Update deliverables to link/unlink this task
      try {
        // Get all deliverables to check which ones should have this task
        const allDeliverablesResponse = await Http.getRequest(
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

        if (allDeliverablesResponse && Array.isArray(allDeliverablesResponse)) {
          const allDeliverables = allDeliverablesResponse as DeliverableDto[];
          
          // If task is being moved to unplaced, remove it from all deliverables
          const isMovingToUnplaced = projectStage === null && task.projectStage !== null;
          
          if (isMovingToUnplaced) {
            // Remove task from all deliverables' linkedTasks
            const updatePromises = allDeliverables
              .filter((deliverable) => 
                deliverable.linkedTasks && 
                Array.isArray(deliverable.linkedTasks) && 
                deliverable.linkedTasks.includes(task.id)
              )
              .map(async (deliverable) => {
                const newLinkedTasks = deliverable.linkedTasks.filter(
                  (id: string) => id !== task.id
                );

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
          } else {
            // Normal deliverable linking/unlinking based on selectedDeliverables
            const selectedDeliverableIds = new Set(selectedDeliverables.map((d) => d.id));

            // Update each deliverable's linkedTasks array
            const updatePromises = allDeliverables.map(async (deliverable) => {
              const currentLinkedTasks = deliverable.linkedTasks || [];
              const hasTask = currentLinkedTasks.includes(task.id);
              const shouldHaveTask = selectedDeliverableIds.has(deliverable.id);

              if (hasTask !== shouldHaveTask) {
                let newLinkedTasks: string[];
                if (shouldHaveTask) {
                  // Add task if not already present
                  newLinkedTasks = [...currentLinkedTasks, task.id];
                } else {
                  // Remove task
                  newLinkedTasks = currentLinkedTasks.filter((id) => id !== task.id);
                }

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
              }
            });

            await Promise.all(updatePromises);
          }
        }
      } catch (error) {
        console.error('Failed to update deliverable links:', error);
        // Don't fail the task update if deliverable linking fails
      }

      addToast({
        title: 'Task updated successfully',
        color: 'success',
        variant: 'flat',
      });

      if (onSuccess && response) {
        onSuccess(response as TaskDto);
      }

      onClose();
    } catch (error: any) {
      console.error('Failed to update task:', error);
      const errorMessage = getErrorMessage(error);
      addToast({
        title: errorMessage,
        color: 'danger',
        variant: 'flat',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMoveToUnplaced = async () => {
    setIsSubmitting(true);

    try {
      const taskData: TaskEditBodyDto = {
        projectStage: null,
      };

      const response = await Http.patchRequest(
        `/project/${project.id}/tasks/${task.id}`,
        undefined,
        taskData,
        undefined,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      addToast({
        title: 'Task moved to unplaced',
        color: 'success',
        variant: 'flat',
      });

      if (onSuccess && response) {
        onSuccess(response as TaskDto);
      }

      onClose();
    } catch (error: any) {
      console.error('Failed to move task to unplaced:', error);
      const errorMessage = getErrorMessage(error);
      addToast({
        title: errorMessage,
        color: 'danger',
        variant: 'flat',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
        <ModalBody className="gap-4">
          <Input
            label="Task Name"
            placeholder="Enter task name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isRequired
          />

          <Textarea
            label="Description (Optional)"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minRows={3}
            maxRows={6}
          />

          <Select
            label="Responsible"
            placeholder="Select responsible person"
            selectedKeys={inCharge ? [inCharge] : []}
            onSelectionChange={(keys) => setInCharge(Array.from(keys)[0] as string)}
            isRequired
          >
            <>
              {project.members.map((member) => (
                <SelectItem key={member.user?.id || ''}>
                  {member.user?.name || member.email}
                </SelectItem>
              ))}
            </>
          </Select>

          <Select
            label="Contributors"
            placeholder="Select contributors"
            selectedKeys={new Set(assignees)}
            onSelectionChange={(keys) => setAssignees(Array.from(keys) as string[])}
            selectionMode="multiple"
            isRequired
          >
            <>
              {project.members.map((member) => (
                <SelectItem key={member.user?.id || ''}>
                  {member.user?.name || member.email}
                </SelectItem>
              ))}
            </>
          </Select>

          <Select
            label="Project Stage"
            placeholder="Select stage (optional)"
            selectedKeys={projectStage ? [projectStage] : ['unplaced']}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;
              setProjectStage(selected === 'unplaced' ? null : (selected || null));
            }}
          >
            <>
              <SelectItem key="unplaced">
                Unplaced
              </SelectItem>
              {project.projectStages.map((stage) => (
                <SelectItem key={stage.id}>
                  {stage.name}
                </SelectItem>
              ))}
            </>
          </Select>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground-700">
                Link to Deliverables (Optional)
              </label>
              <DeliverablePicker
                projectId={project.id}
                skipIds={selectedDeliverables.map(d => d.id)}
                onSelect={handleSelectDeliverable}
              >
                <Button size="sm" variant="flat" startContent={<Icon icon="file" size={16} />}>
                  Add Deliverable
                </Button>
              </DeliverablePicker>
            </div>
            {isLoadingDeliverables ? (
              <div className="text-sm text-foreground-500">Loading deliverables...</div>
            ) : selectedDeliverables.length > 0 ? (
              <div className="flex flex-wrap gap-2 rounded-lg border border-default-200 p-3">
                {selectedDeliverables.map((deliverable) => (
                  <div
                    key={deliverable.id}
                    className="flex items-center gap-2 rounded-lg border border-default-200 bg-default-50 px-3 py-2"
                  >
                    <Icon icon="file" size={14} className="text-foreground-500" />
                    <span className="text-xs font-medium">{deliverable.name}</span>
                    <button
                      type="button"
                      className="ml-1 flex size-5 items-center justify-center rounded-full border bg-background hover:bg-default-200"
                      onClick={() => handleRemoveDeliverable(deliverable)}
                    >
                      <Icon icon="cross" size={12} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-default-300 p-4 text-center text-sm text-foreground-500">
                No deliverables linked. Click &quot;Add Deliverable&quot; to link this task to deliverables.
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground-700">
                Linked Media (Optional)
              </label>
              <AssetPicker projectId={project.id} skipIds={selectedAssets.map(a => a.id)} onSelect={handleSelectAsset}>
                <Button size="sm" variant="flat" startContent={<Icon icon="paperclip" size={16} />}>
                  Add Media
                </Button>
              </AssetPicker>
            </div>
            {isLoadingAssets ? (
              <div className="text-sm text-foreground-500">Loading media...</div>
            ) : selectedAssets.length > 0 ? (
              <div className="flex flex-wrap gap-2 rounded-lg border border-default-200 p-3">
                {selectedAssets.map((asset) => (
                  <div className="relative" key={asset.id}>
                    <div className="flex items-center gap-2 rounded-lg border border-default-200 bg-default-50 p-2">
                      <AssetPreview asset={asset} width={40} height={40} />
                      <div className="flex flex-col">
                        <span className="text-xs font-medium line-clamp-1 max-w-[120px]">{asset.name}</span>
                        <span className="text-xs text-foreground-500">
                          {asset.fileType.startsWith('image') ? 'Image' : asset.fileType}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="ml-1 flex size-5 items-center justify-center rounded-full border bg-background hover:bg-default-200"
                        onClick={() => handleRemoveAsset(asset)}
                      >
                        <Icon icon="cross" size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-default-300 p-4 text-center text-sm text-foreground-500">
                No media selected. Click &quot;Add Media&quot; to select from project assets.
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-between">
          <div className="flex gap-2">
            {task.projectStage && (
              <Button
                variant="flat"
                color="warning"
                onClick={handleMoveToUnplaced}
                isLoading={isSubmitting}
                startContent={<Icon icon="arrowLeft" size={16} />}
              >
                Move to Unplaced
              </Button>
            )}
            {task.projectStage && (
              <Button
                variant="flat"
                color="primary"
                onClick={() => setIsCreateDeliverableModalOpen(true)}
                startContent={<Icon icon="file" size={16} />}
              >
                Create a Deliverable
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="flat" onClick={onClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleSubmit} isLoading={isSubmitting}>
              Save Changes
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>

    <CreateDeliverableModal
      project={project}
      isOpen={isCreateDeliverableModalOpen}
      onClose={() => setIsCreateDeliverableModalOpen(false)}
      taskId={task.id}
      onSuccess={() => {
        onSuccess?.(task);
        setIsCreateDeliverableModalOpen(false);
      }}
    />
    </>
  );
};

