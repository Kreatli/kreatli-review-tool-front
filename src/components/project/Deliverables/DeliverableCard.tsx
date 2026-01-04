import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
  Accordion,
  AccordionItem,
} from '@heroui/react';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import NextLink from 'next/link';

import { DeliverableDto, AssetDto, TaskDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { getAssetFileId } from '../../../services/services';
import { AssetIcon } from '../../asset/AssetIcon';
import { AssetPicker } from '../../asset/AssetPicker';
import { useProjectContext } from '../../../contexts/Project';
import { Http } from '../../../services/httpRequest';
import { addToast } from '@heroui/react';
import { ProjectMemberItem } from '../ProjectMemberItem';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { TaskPicker } from '../Tasks/TaskPicker';
import { TaskMediaPreview } from '../Tasks/TaskMediaPreview';
import { useRouter } from 'next/router';

interface Props {
  deliverable: DeliverableDto;
  statusColor: string;
  isDragging?: boolean;
  onDeliverableUpdated?: () => void;
  onEdit?: (deliverable: DeliverableDto) => void;
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

export const DeliverableCard = ({
  deliverable,
  statusColor,
  isDragging = false,
  onDeliverableUpdated,
  onEdit,
}: Props) => {
  const { project } = useProjectContext();
  const router = useRouter();
  const isOverdue = new Date(deliverable.dueDate) < new Date() && deliverable.status !== 'approved';
  const [linkedAssets, setLinkedAssets] = useState<AssetDto[]>([]);
  const [linkedTasks, setLinkedTasks] = useState<TaskDto[]>([]);
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isUpdatingInCharge, setIsUpdatingInCharge] = useState(false);
  const [isUpdatingMedia, setIsUpdatingMedia] = useState(false);
  const [isUpdatingTasks, setIsUpdatingTasks] = useState(false);
  const [inChargeId, setInChargeId] = useState<string | null>(deliverable.inCharge?.id || null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: deliverable.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  };

  useEffect(() => {
    const loadAssets = async () => {
      if (deliverable.linkedMedia && deliverable.linkedMedia.length > 0) {
        setIsLoadingAssets(true);
        try {
          const assetPromises = deliverable.linkedMedia.map(async (assetId) => {
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
          setLinkedAssets(assets);
        } catch (error) {
          console.error('Failed to load linked assets:', error);
        } finally {
          setIsLoadingAssets(false);
        }
      }
    };

    loadAssets();
  }, [deliverable.linkedMedia]);

  useEffect(() => {
    setInChargeId(deliverable.inCharge?.id || null);
  }, [deliverable.inCharge]);

  // Load tasks when deliverable changes
  useEffect(() => {
    const loadTasks = async () => {
      if (deliverable.linkedTasks && deliverable.linkedTasks.length > 0) {
        setIsLoadingTasks(true);
        try {
          const response = await Http.getRequest(
            `/project/${deliverable.projectId}/tasks`,
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
            const allTasks = response as TaskDto[];
            const linkedTasks = allTasks.filter((task) => deliverable.linkedTasks?.includes(task.id));
            setLinkedTasks(linkedTasks);
          }
        } catch (error) {
          console.error('Failed to load linked tasks:', error);
          setLinkedTasks([]);
        } finally {
          setIsLoadingTasks(false);
        }
      } else {
        setLinkedTasks([]);
      }
    };

    loadTasks();
  }, [deliverable.linkedTasks, deliverable.projectId]);

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === deliverable.status) return;

    setIsUpdatingStatus(true);
    try {
      await Http.patchRequest(
        `/project/${deliverable.projectId}/deliverables/${deliverable.id}`,
        undefined,
        { status: newStatus },
        undefined,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      addToast({
        title: 'Deliverable status updated',
        color: 'success',
        variant: 'flat',
      });

      onDeliverableUpdated?.();
    } catch (error) {
      console.error('Failed to update deliverable status:', error);
      addToast({
        title: 'Failed to update deliverable status',
        color: 'danger',
        variant: 'flat',
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleInChargeChange = async (keys: Selection) => {
    if (keys !== 'all') {
      const newInChargeId = keys.values().next().value ?? null;

      if (newInChargeId === inChargeId) return;

      setIsUpdatingInCharge(true);
      setInChargeId(newInChargeId as string | null);

      try {
        await Http.patchRequest(
          `/project/${deliverable.projectId}/deliverables/${deliverable.id}`,
          undefined,
          { inCharge: newInChargeId as string },
          undefined,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        addToast({
          title: 'Deliverable responsible updated',
          color: 'success',
          variant: 'flat',
        });

        onDeliverableUpdated?.();
      } catch (error) {
        console.error('Failed to update deliverable responsible:', error);
        setInChargeId(deliverable.inCharge?.id || null);
        addToast({
          title: getErrorMessage(error),
          color: 'danger',
          variant: 'flat',
        });
      } finally {
        setIsUpdatingInCharge(false);
      }
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this deliverable? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      await Http.deleteRequest(
        `/project/${deliverable.projectId}/deliverables/${deliverable.id}`,
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
        title: 'Deliverable deleted successfully',
        color: 'success',
        variant: 'flat',
      });

      onDeliverableUpdated?.();
    } catch (error) {
      console.error('Failed to delete deliverable:', error);
      addToast({
        title: getErrorMessage(error),
        color: 'danger',
        variant: 'flat',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddMedia = async (asset: AssetDto) => {
    if (linkedAssets.find((a) => a.id === asset.id)) {
      return;
    }

    setIsUpdatingMedia(true);
    try {
      const newLinkedMedia = [...deliverable.linkedMedia, asset.id];

      await Http.patchRequest(
        `/project/${deliverable.projectId}/deliverables/${deliverable.id}`,
        undefined,
        { linkedMedia: newLinkedMedia },
        undefined,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      addToast({
        title: 'Media added successfully',
        color: 'success',
        variant: 'flat',
      });

      onDeliverableUpdated?.();
    } catch (error) {
      console.error('Failed to add media:', error);
      addToast({
        title: getErrorMessage(error),
        color: 'danger',
        variant: 'flat',
      });
    } finally {
      setIsUpdatingMedia(false);
    }
  };

  const handleRemoveMedia = async (assetId: string) => {
    setIsUpdatingMedia(true);
    try {
      const newLinkedMedia = deliverable.linkedMedia.filter((id) => id !== assetId);

      await Http.patchRequest(
        `/project/${deliverable.projectId}/deliverables/${deliverable.id}`,
        undefined,
        { linkedMedia: newLinkedMedia },
        undefined,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      addToast({
        title: 'Media removed successfully',
        color: 'success',
        variant: 'flat',
      });

      onDeliverableUpdated?.();
    } catch (error) {
      console.error('Failed to remove media:', error);
      addToast({
        title: getErrorMessage(error),
        color: 'danger',
        variant: 'flat',
      });
    } finally {
      setIsUpdatingMedia(false);
    }
  };

  const handleAddTask = async (task: TaskDto) => {
    if (linkedTasks.find((t) => t.id === task.id)) {
      return;
    }

    setIsUpdatingTasks(true);
    try {
      const currentLinkedTasks = deliverable.linkedTasks || [];
      const newLinkedTasks = [...currentLinkedTasks, task.id];

      await Http.patchRequest(
        `/project/${deliverable.projectId}/deliverables/${deliverable.id}`,
        undefined,
        { linkedTasks: newLinkedTasks },
        undefined,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      setLinkedTasks([...linkedTasks, task]);
      addToast({
        title: 'Task linked successfully',
        color: 'success',
        variant: 'flat',
      });

      onDeliverableUpdated?.();
    } catch (error) {
      console.error('Failed to link task:', error);
      addToast({
        title: getErrorMessage(error),
        color: 'danger',
        variant: 'flat',
      });
    } finally {
      setIsUpdatingTasks(false);
    }
  };

  const handleRemoveTask = async (taskId: string) => {
    setIsUpdatingTasks(true);
    try {
      const currentLinkedTasks = deliverable.linkedTasks || [];
      const newLinkedTasks = currentLinkedTasks.filter((id) => id !== taskId);

      await Http.patchRequest(
        `/project/${deliverable.projectId}/deliverables/${deliverable.id}`,
        undefined,
        { linkedTasks: newLinkedTasks },
        undefined,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      setLinkedTasks(linkedTasks.filter((t) => t.id !== taskId));
      addToast({
        title: 'Task unlinked successfully',
        color: 'success',
        variant: 'flat',
      });

      onDeliverableUpdated?.();
    } catch (error) {
      console.error('Failed to unlink task:', error);
      addToast({
        title: getErrorMessage(error),
        color: 'danger',
        variant: 'flat',
      });
    } finally {
      setIsUpdatingTasks(false);
    }
  };

  const handleJumpToTask = (taskId: string) => {
    router.push(`/project/${deliverable.projectId}/board?task=${taskId}`);
  };

  // Determine content presence for dynamic sizing
  const hasMedia = deliverable.linkedMedia && deliverable.linkedMedia.length > 0;
  const primaryMedia = linkedAssets.length > 0 ? linkedAssets[0] : null;
  const hasFormat = !!deliverable.format;
  const hasVersion = !!deliverable.version;
  const hasInCharge = !!deliverable.inCharge;
  const hasLinkedTasks = deliverable.linkedTasks && deliverable.linkedTasks.length > 0;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`h-full transition-all ${isDragging ? 'z-50 rotate-2 scale-105 shadow-2xl' : 'shadow-sm hover:shadow-md'}`}
      isPressable
      isHoverable
    >
      <CardBody className="p-0">
        {/* Large Media Preview Area - Only show if media exists */}
        {hasMedia && primaryMedia && !isLoadingAssets && (
          <div
            className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-default-100"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/project/${deliverable.projectId}/assets/${primaryMedia.id}`);
            }}
          >
            {primaryMedia.fileType.startsWith('image') ? (
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
                <AssetIcon fileType={primaryMedia.fileType} size={48} />
              </div>
            )}
            {primaryMedia.fileType.startsWith('video') && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-default-200 shadow-lg transition-colors hover:bg-default-300">
                  <Icon icon="play" size={24} className="ml-1 text-foreground-900" />
                </div>
              </div>
            )}
          </div>
        )}

        <CardHeader
          className={`flex-col items-start px-4 pt-4 ${hasMedia && primaryMedia ? 'gap-2 pb-2' : 'gap-3 pb-3'} border-b border-default-100`}
        >
          <div className="flex w-full items-start justify-between gap-2">
            <div className="flex min-w-0 flex-1 flex-col gap-1" {...attributes} {...listeners}>
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex cursor-move touch-none items-center opacity-40 transition-opacity hover:opacity-60">
                  <Icon icon="dotsSix" size={14} className="text-foreground-400" />
                </div>
                <h4 className="cursor-move truncate text-sm font-semibold text-foreground-900 transition-colors hover:text-primary">
                  {deliverable.name}
                </h4>
              </div>
              {deliverable.description && (
                <p className="line-clamp-2 pl-5 text-xs text-foreground-500">{deliverable.description}</p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-1.5" onPointerDown={(e) => e.stopPropagation()}>
              <Dropdown>
                <DropdownTrigger>
                  <button
                    type="button"
                    className="h-3.5 w-3.5 shrink-0 cursor-pointer rounded-full transition-all hover:ring-2 hover:ring-primary hover:ring-offset-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                    style={{ backgroundColor: statusColor }}
                    onClick={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.stopPropagation()}
                    aria-label="Change status"
                  />
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Status actions"
                  onAction={(key) => {
                    if (typeof key === 'string' && key.startsWith('status-')) {
                      handleStatusChange(key.replace('status-', ''));
                    }
                  }}
                >
                  {project?.deliverableStatuses &&
                    Object.entries(project.deliverableStatuses)
                      .sort((a, b) => a[1].order - b[1].order)
                      .map(([statusId, status]) => (
                        <DropdownItem
                          key={`status-${statusId}`}
                          startContent={
                            <div
                              className="h-2.5 w-2.5 shrink-0 rounded-full"
                              style={{ backgroundColor: status.color }}
                            />
                          }
                          className={deliverable.status === statusId ? 'bg-default-100 font-medium' : ''}
                        >
                          {status.label}
                        </DropdownItem>
                      ))}
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    size="sm"
                    variant="light"
                    isIconOnly
                    isLoading={isDeleting}
                    className="h-7 w-7 min-w-7 opacity-60 transition-opacity hover:opacity-100"
                    onClick={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.stopPropagation()}
                    aria-label="More options"
                  >
                    <Icon icon="dots" size={14} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Deliverable actions"
                  onAction={(key) => {
                    if (key === 'edit') {
                      onEdit?.(deliverable);
                    } else if (key === 'delete') {
                      handleDelete();
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
          {(deliverable.format || deliverable.version) && (
            <div className="flex flex-wrap gap-1.5">
              {deliverable.format && (
                <Chip size="sm" variant="flat" className="text-xs font-medium">
                  {deliverable.format}
                </Chip>
              )}
              {deliverable.version && (
                <Chip size="sm" variant="flat" className="text-xs font-medium">
                  v{deliverable.version}
                </Chip>
              )}
            </div>
          )}
        </CardHeader>

        <div className={`p-4 ${hasMedia && primaryMedia ? 'space-y-2' : 'space-y-2.5'}`}>
          {/* Responsible - Only show if assigned */}
          {hasInCharge && (
            <div className="flex items-center gap-2.5">
              <Icon icon="user" size={14} className="shrink-0 text-foreground-400" />
              <span className="shrink-0 text-xs font-medium text-foreground-500">Responsible:</span>
              <Dropdown placement="bottom-start" offset={10}>
                <DropdownTrigger>
                  <button
                    type="button"
                    className="-mx-1 flex cursor-pointer items-center gap-1.5 rounded-md px-1 transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                    disabled={isUpdatingInCharge}
                  >
                    <Avatar
                      size="sm"
                      className="h-6 w-6 shrink-0"
                      src={project?.members.find((m) => m.user?.id === inChargeId)?.user?.avatar?.url}
                      name={project?.members.find((m) => m.user?.id === inChargeId)?.user?.name}
                    />
                    <span className="truncate text-sm font-medium text-foreground-700">
                      {project?.members.find((m) => m.user?.id === inChargeId)?.user?.name ||
                        deliverable.inCharge?.name ||
                        'Unassigned'}
                    </span>
                    <Icon icon="chevronDown" size={12} className="shrink-0 text-foreground-400" />
                  </button>
                </DropdownTrigger>
                <DropdownMenu
                  variant="flat"
                  className="max-h-64 overflow-y-auto"
                  selectionMode="single"
                  selectedKeys={inChargeId ? [inChargeId] : []}
                  onSelectionChange={handleInChargeChange}
                  disabledKeys={isUpdatingInCharge ? project?.members.map((m) => m.user?.id || '').filter(Boolean) : []}
                >
                  {project?.members
                    .filter((member) => member.user && member.status === 'joined')
                    .map((member) => (
                      <DropdownItem key={member.user?.id || ''}>
                        <ProjectMemberItem member={member} />
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          )}

          {/* Media Section - Show small thumbnails if no large preview, or show additional media if large preview exists */}
          {hasMedia && (
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <Icon icon="paperclip" size={14} className="shrink-0 text-foreground-400" />
                  <span className="shrink-0 text-xs font-medium text-foreground-500">Media:</span>
                  <span className="text-xs font-medium text-foreground-600">
                    {deliverable.linkedMedia.length} file(s)
                  </span>
                </div>
                <AssetPicker
                  projectId={deliverable.projectId}
                  skipIds={linkedAssets.map((a) => a.id)}
                  onSelect={handleAddMedia}
                >
                  <Button
                    size="sm"
                    variant="light"
                    isIconOnly
                    isLoading={isUpdatingMedia}
                    className="h-7 w-7 min-w-7 opacity-60 transition-all hover:bg-primary-50 hover:text-primary hover:opacity-100"
                    onClick={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.stopPropagation()}
                    aria-label="Add media"
                  >
                    <Icon icon="plus" size={14} />
                  </Button>
                </AssetPicker>
              </div>
              {isLoadingAssets ? (
                <div className="flex items-center justify-center py-2">
                  <Spinner size="sm" />
                </div>
              ) : linkedAssets.length > 0 ? (
                <div className="flex flex-wrap gap-2.5">
                  {/* If we have a large preview, show remaining media (skip first), otherwise show all */}
                  {(primaryMedia && hasMedia ? linkedAssets.slice(1, 6) : linkedAssets.slice(0, 6)).map((asset) => {
                    const imageUrl = asset.fileType.startsWith('image') ? asset.url : asset.metadata?.thumbnailUrl;
                    return (
                      <div key={asset.id} className="group relative">
                        <NextLink
                          href={`/project/${deliverable.projectId}/assets/${asset.id}`}
                          className="relative block overflow-hidden rounded-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              width={64}
                              height={64}
                              radius="lg"
                              className="cursor-pointer border border-default-200 transition-all group-hover:scale-105 group-hover:border-primary group-hover:shadow-md"
                              classNames={{ img: 'object-cover' }}
                              alt={asset.name}
                            />
                          ) : (
                            <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg border border-default-200 bg-default-50 transition-all group-hover:scale-105 group-hover:border-primary group-hover:bg-default-100 group-hover:shadow-md">
                              <AssetIcon fileType={asset.fileType} size={28} />
                            </div>
                          )}
                          <div className="absolute inset-0 rounded-lg bg-black/0 transition-colors group-hover:bg-black/5" />
                          {/* File name tooltip on hover */}
                          <div className="absolute bottom-0 left-0 right-0 truncate rounded-b-lg bg-black/75 px-1.5 py-0.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                            {asset.name}
                          </div>
                        </NextLink>
                        <button
                          type="button"
                          className="absolute -right-1.5 -top-1.5 z-10 flex size-5 items-center justify-center rounded-full border border-default-200 bg-background opacity-0 shadow-sm transition-all hover:border-danger hover:bg-danger hover:text-white focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-1 group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveMedia(asset.id);
                          }}
                          onPointerDown={(e) => e.stopPropagation()}
                          aria-label="Remove media"
                        >
                          <Icon icon="cross" size={10} />
                        </button>
                      </div>
                    );
                  })}
                  {(primaryMedia && hasMedia ? linkedAssets.length - 1 : linkedAssets.length) > 6 && (
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-default-200 bg-default-100 text-xs font-semibold text-foreground-600 transition-colors hover:bg-default-200">
                      +{(primaryMedia && hasMedia ? linkedAssets.length - 1 : linkedAssets.length) - 6}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          )}

          <div className="flex items-center gap-2.5">
            <Icon icon="calendar" size={14} className="shrink-0 text-foreground-400" />
            <span className="shrink-0 text-xs font-medium text-foreground-500">Due:</span>
            <span className={`text-sm font-medium ${isOverdue ? 'text-danger' : 'text-foreground-700'}`}>
              {format(new Date(deliverable.dueDate), 'MMM dd, yyyy')}
            </span>
            {isOverdue && (
              <Chip size="sm" color="danger" variant="flat" className="text-xs font-semibold">
                Overdue
              </Chip>
            )}
          </div>

          {/* Linked Tasks - Only show if tasks exist */}
          {hasLinkedTasks && (
            <Accordion>
              <AccordionItem
                key="tasks"
                aria-label="Attached Tasks"
                title={
                  <div className="flex w-full items-center justify-between pr-2">
                    <div className="flex items-center gap-2.5">
                      <Icon icon="check" size={14} className="shrink-0 text-foreground-400" />
                      <span className="shrink-0 text-xs font-medium text-foreground-500">Attached Tasks:</span>
                      <span className="text-xs font-medium text-foreground-600">
                        {deliverable.linkedTasks?.length || 0} task
                        {(deliverable.linkedTasks?.length || 0) !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                }
                classNames={{
                  trigger:
                    'px-3 py-2 rounded-lg border border-default-200 bg-default-50/50 hover:bg-default-100 transition-colors',
                  content: 'pt-2',
                }}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-foreground-500">Link tasks that need to be completed</span>
                    <TaskPicker
                      projectId={deliverable.projectId}
                      skipIds={linkedTasks.map((t) => t.id)}
                      onSelect={handleAddTask}
                      excludeUnplaced
                    >
                      <Button
                        size="sm"
                        variant="light"
                        isIconOnly
                        isLoading={isUpdatingTasks}
                        className="h-7 w-7 min-w-7 opacity-60 transition-all hover:bg-primary-50 hover:text-primary hover:opacity-100"
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                        aria-label="Add task"
                      >
                        <Icon icon="plus" size={14} />
                      </Button>
                    </TaskPicker>
                  </div>
                  {isLoadingTasks ? (
                    <div className="flex items-center justify-center py-2">
                      <Spinner size="sm" />
                    </div>
                  ) : linkedTasks.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {linkedTasks.map((task) => {
                        const taskStage = project?.projectStages.find((s) => s.id === task.projectStage);
                        const hasTaskMedia = task.linkedMedia && task.linkedMedia.length > 0;
                        const allTaskAssignees = [
                          ...(task.inCharge ? [task.inCharge] : []),
                          ...task.assignees.filter((a) => task.inCharge?.id !== a.id),
                        ];

                        return (
                          <div
                            key={task.id}
                            className="group flex flex-col gap-2 rounded-lg border border-default-200 bg-background p-2.5 transition-all hover:border-primary hover:shadow-sm"
                          >
                            {/* Task Header */}
                            <div className="flex items-start justify-between gap-2">
                              <button
                                type="button"
                                className="flex min-w-0 flex-1 items-start gap-2.5 text-left"
                                onClick={() => handleJumpToTask(task.id)}
                              >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary-200 bg-primary-50">
                                  <Icon icon="check" size={16} className="text-primary" />
                                </div>
                                <div className="flex min-w-0 flex-1 flex-col gap-1">
                                  <span className="line-clamp-2 text-sm font-semibold leading-tight text-foreground-900">
                                    {task.name}
                                  </span>
                                  <div className="flex flex-wrap items-center gap-2">
                                    {taskStage && (
                                      <Chip
                                        size="sm"
                                        variant="flat"
                                        className="h-4 text-xs"
                                        style={{
                                          backgroundColor: `${statusColor}20`,
                                          color: statusColor,
                                        }}
                                      >
                                        {taskStage.name}
                                      </Chip>
                                    )}
                                    {allTaskAssignees.length > 0 && (
                                      <div className="flex items-center gap-1">
                                        <AvatarGroup size="sm" max={3}>
                                          {allTaskAssignees.slice(0, 3).map((assignee) => (
                                            <Avatar
                                              key={assignee.id}
                                              size="sm"
                                              className="h-5 w-5"
                                              src={assignee.avatar?.url}
                                              name={assignee.name}
                                            />
                                          ))}
                                        </AvatarGroup>
                                        {allTaskAssignees.length > 3 && (
                                          <span className="text-xs text-foreground-500">
                                            +{allTaskAssignees.length - 3}
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <Icon
                                  icon="arrowRight"
                                  size={14}
                                  className="mt-1 shrink-0 text-foreground-400 opacity-0 transition-opacity group-hover:opacity-100"
                                />
                              </button>
                              <button
                                type="button"
                                className="flex size-6 shrink-0 items-center justify-center rounded-full border border-default-200 bg-background opacity-0 transition-all hover:border-danger hover:bg-danger hover:text-white focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-1 group-hover:opacity-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveTask(task.id);
                                }}
                                onPointerDown={(e) => e.stopPropagation()}
                                aria-label="Unlink task"
                              >
                                <Icon icon="cross" size={10} />
                              </button>
                            </div>

                            {/* Task Media Preview */}
                            {hasTaskMedia && (
                              <div className="flex items-center gap-2 pl-11">
                                <TaskMediaPreview mediaIds={task.linkedMedia} maxVisible={3} size="sm" />
                                {task.linkedMedia.length > 3 && (
                                  <span className="text-xs text-foreground-500">
                                    +{task.linkedMedia.length - 3} more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-default-200 bg-default-50/50 p-4 text-center">
                      <p className="text-xs text-foreground-500">No tasks linked</p>
                    </div>
                  )}
                </div>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
