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
  Spinner,
  addToast,
} from '@heroui/react';
import React, { useState, useEffect } from 'react';

import { ProjectDto, DeliverableBodyDto, DeliverableDto, AssetDto, TaskDto } from '../../../services/types';
import { useSession } from '../../../hooks/useSession';
import { Http } from '../../../services/httpRequest';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { AssetPicker } from '../../asset/AssetPicker';
import { AssetPreview } from '../../asset/AssetPicker/AssetPreview';
import { Icon } from '../../various/Icon';
import { getAssetFileId } from '../../../services/services';
import { TaskPicker } from '../Tasks/TaskPicker';

interface Props {
  project: ProjectDto;
  isOpen: boolean;
  onClose: () => void;
  taskId?: string;
  deliverableId?: string;
  initialData?: {
    name?: string;
    description?: string;
    inCharge?: string;
    linkedMedia?: string[];
    linkedTasks?: string[];
    dueDate?: string;
    status?: string;
    format?: string;
    version?: string;
  };
  onSuccess?: (deliverable: DeliverableDto) => void;
}

export const CreateDeliverableModal = ({ 
  project, 
  isOpen, 
  onClose, 
  taskId,
  deliverableId,
  initialData,
  onSuccess
}: Props) => {
  const { user } = useSession();
  const isEditMode = !!deliverableId;
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [inCharge, setInCharge] = useState(initialData?.inCharge || user?.id || '');
  const [selectedAssets, setSelectedAssets] = useState<AssetDto[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<TaskDto[]>([]);
  const [dueDate, setDueDate] = useState<string>(initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '');
  const [status, setStatus] = useState(initialData?.status || '');
  const [format, setFormat] = useState(initialData?.format || '');
  const [version, setVersion] = useState(initialData?.version || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [isLoadingTask, setIsLoadingTask] = useState(false);

  // Load task data when taskId is provided
  useEffect(() => {
    const loadTaskData = async () => {
      if (taskId && isOpen && !isEditMode) {
        setIsLoadingTask(true);
        try {
          const response = await Http.getRequest(
            `/project/${project.id}/tasks/${taskId}`,
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
          if (response) {
            const task = response as TaskDto;
            // Pre-fill form with task data
            setName(task.name);
            setDescription(task.description || '');
            setInCharge(task.inCharge?.id || user?.id || '');
            
            // Pre-select the task in the "Attached Tasks" field
            setSelectedTasks([task]);
            
            // Load linked media from task
            if (task.linkedMedia && task.linkedMedia.length > 0) {
              setIsLoadingAssets(true);
              try {
                const assetPromises = task.linkedMedia.map(async (assetId) => {
                  try {
                    const assetResponse = await getAssetFileId(assetId);
                    const file = assetResponse as any;
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
            }
          }
        } catch (error) {
          console.error('Failed to load task data:', error);
          addToast({
            title: 'Failed to load task data',
            color: 'danger',
            variant: 'flat',
          });
        } finally {
          setIsLoadingTask(false);
        }
      }
    };

    if (isOpen) {
      loadTaskData();
    }
  }, [isOpen, taskId, project.id, isEditMode, user?.id]);

  // Get the first status as default (only if not editing)
  React.useEffect(() => {
    if (project?.deliverableStatuses && !isEditMode && !initialData?.status && !taskId) {
      const defaultStatus = Object.entries(project.deliverableStatuses)
        .sort((a, b) => a[1].order - b[1].order)[0];
      if (defaultStatus) {
        setStatus(defaultStatus[0]);
      }
    }
  }, [project, isEditMode, initialData?.status, taskId]);

  // Load asset details when initialData has linkedMedia IDs
  useEffect(() => {
    const loadInitialAssets = async () => {
      if (initialData?.linkedMedia && initialData.linkedMedia.length > 0) {
        setIsLoadingAssets(true);
        try {
          // Fetch asset details for each ID
          const assetPromises = initialData.linkedMedia.map(async (assetId) => {
            try {
              const response = await getAssetFileId(assetId);
              // Convert FileDto to AssetDto format (they have compatible structures)
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
          console.error('Failed to load initial assets:', error);
        } finally {
          setIsLoadingAssets(false);
        }
      } else if (!initialData?.linkedMedia) {
        // Reset assets when modal opens without initial data
        setSelectedAssets([]);
      }
    };

    if (isOpen) {
      loadInitialAssets();
    } else {
      // Reset when modal closes
      setSelectedAssets([]);
      setIsLoadingAssets(false);
    }
  }, [isOpen, initialData?.linkedMedia]);

  // Load task details when initialData has linkedTasks IDs
  useEffect(() => {
    const loadInitialTasks = async () => {
      if (initialData?.linkedTasks && initialData.linkedTasks.length > 0) {
        setIsLoadingTasks(true);
        try {
          const response = await Http.getRequest(
            `/project/${project.id}/tasks`,
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
          if (response) {
            const allTasks = response as TaskDto[];
            const linkedTasks = allTasks.filter((task) => initialData.linkedTasks?.includes(task.id));
            setSelectedTasks(linkedTasks);
          }
        } catch (error) {
          console.error('Failed to load initial tasks:', error);
        } finally {
          setIsLoadingTasks(false);
        }
      } else if (!initialData?.linkedTasks) {
        setSelectedTasks([]);
      }
    };

    if (isOpen) {
      loadInitialTasks();
    } else {
      setSelectedTasks([]);
      setIsLoadingTasks(false);
    }
  }, [isOpen, initialData?.linkedTasks, project.id]);

  const handleSelectAsset = (asset: AssetDto) => {
    if (selectedAssets.find((a) => a.id === asset.id)) {
      return;
    }
    setSelectedAssets([...selectedAssets, asset]);
  };

  const handleRemoveAsset = (asset: AssetDto) => {
    setSelectedAssets(selectedAssets.filter((a) => a.id !== asset.id));
  };

  const handleSelectTask = (task: TaskDto) => {
    if (selectedTasks.find((t) => t.id === task.id)) {
      return;
    }
    setSelectedTasks([...selectedTasks, task]);
  };

  const handleRemoveTask = (task: TaskDto) => {
    setSelectedTasks(selectedTasks.filter((t) => t.id !== task.id));
  };

  const handleSubmit = async () => {
    if (!name || !inCharge || (!isEditMode && selectedAssets.length === 0) || !dueDate || !status) {
      addToast({
        title: 'Please fill in all required fields',
        color: 'danger',
        variant: 'flat',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert date input (YYYY-MM-DD) to ISO date-time string
      const dueDateISO = dueDate ? new Date(dueDate).toISOString() : '';
      
      if (!dueDateISO) {
        addToast({
          title: 'Please select a due date',
          color: 'danger',
          variant: 'flat',
        });
        setIsSubmitting(false);
        return;
      }

      // Convert AssetDto[] to string[] (IDs)
      const linkedMedia = selectedAssets.map((asset) => asset.id);
      const linkedTasks = selectedTasks.map((task) => task.id);

      const deliverableData: DeliverableBodyDto = {
        name,
        ...(description && description.trim() && { description: description.trim() }),
        inCharge,
        linkedMedia,
        dueDate: dueDateISO,
        status,
        ...(format && { format }),
        ...(version && { version }),
        ...(linkedTasks.length > 0 && { linkedTasks }),
      };

      console.log('Making API call to create deliverable:', deliverableData);
      console.log('Project ID:', project.id);
      console.log('API URL:', process.env.API_URL);

      let response;
      if (isEditMode && deliverableId) {
        // Update existing deliverable
        console.log(`Updating deliverable ${deliverableId}`);
        response = await Http.patchRequest(
          `/project/${project.id}/deliverables/${deliverableId}`,
          undefined,
          deliverableData,
          undefined,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      } else if (taskId) {
        // Convert task to deliverable
        console.log(`Converting task ${taskId} to deliverable`);
        // For from-task endpoint, send the fields required by CreateDeliverableFromTaskDto
        // Include name and inCharge if they differ from task defaults (user can edit them)
        const fromTaskData = {
          name,
          ...(description && description.trim() && { description: description.trim() }),
          inCharge,
          linkedMedia,
          dueDate: dueDateISO,
          status,
          ...(format && { format }),
          ...(version && { version }),
        };
        response = await Http.postRequest(
          `/project/${project.id}/deliverables/from-task/${taskId}`,
          undefined,
          fromTaskData,
          undefined,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      } else {
        // Create new deliverable
        console.log(`Creating new deliverable for project ${project.id}`);
        response = await Http.postRequest(
          `/project/${project.id}/deliverables`,
          undefined,
          deliverableData,
          undefined,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      }

      console.log('Deliverable creation response:', response);

      addToast({
        title: isEditMode 
          ? 'Deliverable updated successfully' 
          : taskId 
            ? 'Task converted to deliverable' 
            : 'Deliverable created successfully',
        color: 'success',
        variant: 'flat',
      });

      if (onSuccess && response) {
        onSuccess(response as DeliverableDto);
      }

      onClose();
      resetForm();
    } catch (error: any) {
      console.error('Failed to create deliverable - full error:', error);
      console.error('Error message:', error?.message);
      console.error('Error response:', error?.response);
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

  const resetForm = () => {
    if (!initialData && !taskId) {
      setName('');
      setDescription('');
      setInCharge(user?.id || '');
      setSelectedAssets([]);
      setSelectedTasks([]);
    }
    if (!taskId) {
      setDueDate('');
      setFormat('');
      setVersion('');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="text-xl font-semibold pb-2">
          {isEditMode ? 'Edit Deliverable' : taskId ? 'Convert Task to Deliverable' : 'Create Deliverable'}
        </ModalHeader>
        <ModalBody className="gap-5 py-6">
          <Input
            label="Deliverable Name"
            placeholder="Enter deliverable name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isRequired
          />

          <Textarea
            label="Description (Optional)"
            placeholder="Enter deliverable description"
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

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-foreground-900">
                Linked Media <span className="text-danger">*</span>
              </label>
              <AssetPicker projectId={project.id} skipIds={selectedAssets.map(a => a.id)} onSelect={handleSelectAsset}>
                <Button 
                  size="sm" 
                  variant="flat" 
                  startContent={<Icon icon="paperclip" size={16} />}
                  className="font-medium"
                >
                  Add Media
                </Button>
              </AssetPicker>
            </div>
            {isLoadingAssets ? (
              <div className="flex items-center justify-center py-8 rounded-lg border border-default-200 bg-default-50">
                <div className="flex items-center gap-2 text-sm text-foreground-500">
                  <Spinner size="sm" />
                  <span>Loading media...</span>
                </div>
              </div>
            ) : selectedAssets.length > 0 ? (
              <div className="flex flex-wrap gap-2.5 rounded-xl border border-default-200 bg-default-50/50 p-4">
                {selectedAssets.map((asset) => (
                  <div className="relative group" key={asset.id}>
                    <div className="flex items-center gap-2.5 rounded-lg border border-default-200 bg-background p-2.5 shadow-sm hover:shadow-md hover:border-primary transition-all">
                      <AssetPreview asset={asset} width={44} height={44} />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold line-clamp-1 max-w-[140px] text-foreground-900">{asset.name}</span>
                        <span className="text-xs text-foreground-500">
                          {asset.fileType.startsWith('image') ? 'Image' : asset.fileType}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="ml-1 flex size-5 items-center justify-center rounded-full border border-default-200 bg-background hover:bg-danger hover:text-white hover:border-danger transition-all opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-1"
                        onClick={() => handleRemoveAsset(asset)}
                        aria-label="Remove media"
                      >
                        <Icon icon="cross" size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border-2 border-dashed border-default-200 bg-default-50/50 p-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-12 w-12 rounded-full bg-default-100 flex items-center justify-center mb-2">
                    <Icon icon="paperclip" size={20} className="text-foreground-400" />
                  </div>
                  <p className="text-sm font-medium text-foreground-600">No media selected</p>
                  <p className="text-xs text-foreground-500">Click &quot;Add Media&quot; to select from project assets</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-foreground-900">
                Attached Tasks (Optional)
              </label>
              <TaskPicker projectId={project.id} skipIds={selectedTasks.map(t => t.id)} onSelect={handleSelectTask} excludeUnplaced>
                <Button 
                  size="sm" 
                  variant="flat" 
                  startContent={<Icon icon="check" size={16} />}
                  className="font-medium"
                >
                  Add Task
                </Button>
              </TaskPicker>
            </div>
            {isLoadingTasks ? (
              <div className="flex items-center justify-center py-8 rounded-lg border border-default-200 bg-default-50">
                <div className="flex items-center gap-2 text-sm text-foreground-500">
                  <Spinner size="sm" />
                  <span>Loading tasks...</span>
                </div>
              </div>
            ) : selectedTasks.length > 0 ? (
              <div className="flex flex-wrap gap-2.5 rounded-xl border border-default-200 bg-default-50/50 p-4">
                {selectedTasks.map((task) => (
                  <div className="relative group" key={task.id}>
                    <div className="flex items-center gap-2.5 rounded-lg border border-default-200 bg-background p-2.5 shadow-sm hover:shadow-md hover:border-primary transition-all">
                      <div className="flex items-center justify-center h-11 w-11 rounded-lg bg-primary-50 border border-primary-200">
                        <Icon icon="check" size={20} className="text-primary" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold line-clamp-1 max-w-[140px] text-foreground-900">{task.name}</span>
                        <span className="text-xs text-foreground-500">
                          {task.assignees.length} contributor{task.assignees.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="ml-1 flex size-5 items-center justify-center rounded-full border border-default-200 bg-background hover:bg-danger hover:text-white hover:border-danger transition-all opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-1"
                        onClick={() => handleRemoveTask(task)}
                        aria-label="Remove task"
                      >
                        <Icon icon="cross" size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border-2 border-dashed border-default-200 bg-default-50/50 p-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-12 w-12 rounded-full bg-default-100 flex items-center justify-center mb-2">
                    <Icon icon="check" size={20} className="text-foreground-400" />
                  </div>
                  <p className="text-sm font-medium text-foreground-600">No tasks selected</p>
                  <p className="text-xs text-foreground-500">Click &quot;Add Task&quot; to link tasks to this deliverable</p>
                </div>
              </div>
            )}
          </div>

          <Input
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            isRequired
          />

          <Select
            label="Status"
            placeholder="Select status"
            selectedKeys={status ? [status] : []}
            onSelectionChange={(keys) => setStatus(Array.from(keys)[0] as string)}
            isRequired
          >
            <>
              {Object.entries(project.deliverableStatuses)
                .sort((a, b) => a[1].order - b[1].order)
                .map(([statusId, status]) => (
                  <SelectItem key={statusId}>
                    {status.label}
                  </SelectItem>
                ))}
            </>
          </Select>

          <Input
            label="Format (Optional)"
            placeholder="e.g., MP4, PDF, PNG"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          />

          <Input
            label="Version (Optional)"
            placeholder="e.g., 1.0, Final"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit} isLoading={isSubmitting}>
            {isEditMode ? 'Update Deliverable' : taskId ? 'Convert to Deliverable' : 'Create Deliverable'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
