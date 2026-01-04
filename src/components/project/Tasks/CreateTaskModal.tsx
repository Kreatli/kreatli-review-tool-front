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

import { ProjectDto, TaskBodyDto, TaskDto, AssetDto, DeliverableDto } from '../../../services/types';
import { useSession } from '../../../hooks/useSession';
import { Http } from '../../../services/httpRequest';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { AssetPicker } from '../../asset/AssetPicker';
import { AssetPreview } from '../../asset/AssetPicker/AssetPreview';
import { Icon } from '../../various/Icon';
import { getAssetFileId } from '../../../services/services';
import { DeliverablePicker } from '../Deliverables/DeliverablePicker';

interface Props {
  project: ProjectDto;
  isOpen: boolean;
  onClose: () => void;
  initialStage?: string;
  initialMediaIds?: string[];
  onSuccess?: (task: TaskDto) => void;
}

export const CreateTaskModal = ({ project, isOpen, onClose, initialStage, initialMediaIds = [], onSuccess }: Props) => {
  const { user } = useSession();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [inCharge, setInCharge] = useState(user?.id || '');
  const [assignees, setAssignees] = useState<string[]>(user ? [user.id] : []);
  const [projectStage, setProjectStage] = useState(initialStage || '');
  const [selectedAssets, setSelectedAssets] = useState<AssetDto[]>([]);
  const [selectedDeliverable, setSelectedDeliverable] = useState<DeliverableDto | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);

  // Memoize initialMediaIds to prevent infinite loops from array reference changes
  const initialMediaIdsString = React.useMemo(() => JSON.stringify(initialMediaIds || []), [initialMediaIds]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setName('');
      setDescription('');
      setInCharge(user?.id || '');
      setAssignees(user ? [user.id] : []);
      setProjectStage('');
      setSelectedAssets([]);
      setSelectedDeliverable(null);
    }
  }, [isOpen, user?.id]);

  // Load asset details when initialMediaIds is provided
  useEffect(() => {
    const loadInitialAssets = async () => {
      const mediaIds = initialMediaIds || [];
      if (mediaIds.length > 0) {
        setIsLoadingAssets(true);
        try {
          // Fetch asset details for each ID
          const assetPromises = mediaIds.map(async (assetId) => {
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
      } else {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialMediaIdsString]);

  const handleSelectAsset = (asset: AssetDto) => {
    if (selectedAssets.find((a) => a.id === asset.id)) {
      return;
    }
    setSelectedAssets([...selectedAssets, asset]);
  };

  const handleRemoveAsset = (asset: AssetDto) => {
    setSelectedAssets(selectedAssets.filter((a) => a.id !== asset.id));
  };

  const handleSubmit = async () => {
    console.log('=== CREATE TASK MODAL - handleSubmit called ===');
    console.log('Form values:', { name, inCharge, assignees, projectStage, selectedAssets });

    if (!name || !inCharge || assignees.length === 0) {
      addToast({
        title: 'Please fill in all required fields',
        color: 'danger',
        variant: 'flat',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert AssetDto[] to string[] (IDs)
      const linkedMedia = selectedAssets.map((asset) => asset.id);

      const taskData: TaskBodyDto = {
        name: name.trim(),
        ...(description && description.trim() && { description: description.trim() }),
        inCharge,
        assignees,
        ...(projectStage && projectStage.trim() && { projectStage: projectStage.trim() }),
      };

      // Explicitly add linkedMedia if there are selected assets
      if (linkedMedia.length > 0) {
        taskData.linkedMedia = linkedMedia;
      }

      console.log('=== TASK DATA TO SEND ===');
      console.log('selectedAssets:', selectedAssets);
      console.log('linkedMedia IDs:', linkedMedia);
      console.log('Full taskData:', JSON.stringify(taskData, null, 2));

      // Validate required fields
      if (!taskData.name || taskData.name.length === 0) {
        addToast({
          title: 'Task name is required',
          color: 'danger',
          variant: 'flat',
        });
        setIsSubmitting(false);
        return;
      }

      if (taskData.name.length > 200) {
        addToast({
          title: 'Task name must be 200 characters or less',
          color: 'danger',
          variant: 'flat',
        });
        setIsSubmitting(false);
        return;
      }

      console.log('=== MAKING API CALL TO CREATE TASK ===');
      console.log('Task data:', taskData);
      console.log('Project ID:', project.id);
      console.log('API URL:', process.env.API_URL);
      console.log('Full endpoint:', `${process.env.API_URL}/project/${project.id}/tasks`);

      const response = await Http.postRequest(`/project/${project.id}/tasks`, undefined, taskData, undefined, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('=== TASK CREATION SUCCESS ===');
      console.log('Response:', response);
      console.log('Response linkedMedia:', (response as any)?.linkedMedia);

      const createdTask = response as TaskDto;

      console.log('Created task linkedMedia:', createdTask.linkedMedia);

      // If a deliverable was selected, update it to link this task
      if (selectedDeliverable && createdTask) {
        try {
          const currentLinkedTasks = selectedDeliverable.linkedTasks || [];
          if (!currentLinkedTasks.includes(createdTask.id)) {
            await Http.patchRequest(
              `/project/${project.id}/deliverables/${selectedDeliverable.id}`,
              undefined,
              {
                linkedTasks: [...currentLinkedTasks, createdTask.id],
              },
              undefined,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            );
          }
        } catch (error) {
          console.error('Failed to link task to deliverable:', error);
          // Don't fail the task creation if linking fails
        }
      }

      addToast({
        title: 'Task created successfully',
        color: 'success',
        variant: 'flat',
      });

      if (onSuccess && createdTask) {
        onSuccess(createdTask);
      }

      onClose();
      resetForm();
    } catch (error: any) {
      console.error('Failed to create task - full error:', error);
      console.error('Error message:', error?.message);
      console.error('Error response:', error?.response);
      console.error('Error response data:', error?.response?.data);
      console.error('Error response data (stringified):', JSON.stringify(error?.response?.data, null, 2));
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
    setName('');
    setDescription('');
    setInCharge(user?.id || '');
    setAssignees(user ? [user.id] : []);
    setProjectStage('');
    setSelectedAssets([]);
    setSelectedDeliverable(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>Create Task</ModalHeader>
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
                <SelectItem key={member.user?.id || ''}>{member.user?.name || member.email}</SelectItem>
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
                <SelectItem key={member.user?.id || ''}>{member.user?.name || member.email}</SelectItem>
              ))}
            </>
          </Select>

          <Select
            label="Project Stage"
            placeholder="Select stage (optional)"
            selectedKeys={projectStage ? [projectStage] : []}
            onSelectionChange={(keys) => setProjectStage(Array.from(keys)[0] as string)}
          >
            <>
              {project.projectStages.map((stage) => (
                <SelectItem key={stage.id}>{stage.name}</SelectItem>
              ))}
            </>
          </Select>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-foreground-900">Link to Deliverable (Optional)</label>
              <DeliverablePicker
                projectId={project.id}
                skipIds={selectedDeliverable ? [selectedDeliverable.id] : []}
                onSelect={setSelectedDeliverable}
              >
                <Button size="sm" variant="flat" startContent={<Icon icon="file" size={16} />} className="font-medium">
                  {selectedDeliverable ? 'Change Deliverable' : 'Select Deliverable'}
                </Button>
              </DeliverablePicker>
            </div>
            {selectedDeliverable ? (
              <div className="flex flex-wrap gap-2.5 rounded-xl border border-default-200 bg-default-50/50 p-4">
                <div className="group relative">
                  <div className="flex items-center gap-2.5 rounded-lg border border-default-200 bg-background p-2.5 shadow-sm transition-all hover:border-primary hover:shadow-md">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary-200 bg-primary-50">
                      <Icon icon="file" size={20} className="text-primary" />
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <span className="line-clamp-1 max-w-[140px] text-xs font-semibold text-foreground-900">
                        {selectedDeliverable.name}
                      </span>
                      <div className="mt-0.5 flex items-center gap-2">
                        {selectedDeliverable.status && (
                          <span className="text-xs text-foreground-500">{selectedDeliverable.status}</span>
                        )}
                        {selectedDeliverable.dueDate && (
                          <>
                            {selectedDeliverable.status && <span className="text-xs text-foreground-300">•</span>}
                            <span className="text-xs text-foreground-500">
                              {new Date(selectedDeliverable.dueDate).toLocaleDateString()}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-1 flex size-5 items-center justify-center rounded-full border border-default-200 bg-background opacity-0 transition-all hover:border-danger hover:bg-danger hover:text-white focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-1 group-hover:opacity-100"
                      onClick={() => setSelectedDeliverable(null)}
                      aria-label="Remove deliverable"
                    >
                      <Icon icon="cross" size={10} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border-2 border-dashed border-default-200 bg-default-50/50 p-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-default-100">
                    <Icon icon="file" size={20} className="text-foreground-400" />
                  </div>
                  <p className="text-sm font-medium text-foreground-600">No deliverable selected</p>
                  <p className="text-xs text-foreground-500">
                    Click &quot;Select Deliverable&quot; to link a deliverable to this task
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground-700">Linked Media (Optional)</label>
              <AssetPicker
                projectId={project.id}
                skipIds={selectedAssets.map((a) => a.id)}
                onSelect={handleSelectAsset}
              >
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
                        <span className="line-clamp-1 max-w-[120px] text-xs font-medium">{asset.name}</span>
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
        <ModalFooter>
          <Button variant="flat" onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit} isLoading={isSubmitting}>
            Create Task
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
