import { Button, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Spinner, Input } from '@heroui/react';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

import { useProjectContext } from '../../../contexts/Project';
import { DeliverableDto, TaskDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { CreateDeliverableModal } from './CreateDeliverableModal';
import { Http } from '../../../services/httpRequest';
import { EditDeliverableStatusesModal } from './EditDeliverableStatusesModal';
import { DeliverableMediaPreview } from './DeliverableMediaPreview';
import { TaskMediaPreview } from '../Tasks/TaskMediaPreview';
import { addToast } from '@heroui/react';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Avatar, AvatarGroup } from '@heroui/react';

export const DeliverablesList = () => {
  const { project } = useProjectContext();
  const router = useRouter();
  const [deliverables, setDeliverables] = useState<DeliverableDto[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isEditStatusesModalOpen, setIsEditStatusesModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDeliverable, setEditingDeliverable] = useState<DeliverableDto | null>(null);
  const [expandedDeliverableId, setExpandedDeliverableId] = useState<string | null>(null);
  const [deliverableTasks, setDeliverableTasks] = useState<Record<string, TaskDto[]>>({});
  const [loadingTasks, setLoadingTasks] = useState<Record<string, boolean>>({});
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
  const [editingDueDateId, setEditingDueDateId] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<Record<string, boolean>>({});
  const [updatingDueDate, setUpdatingDueDate] = useState<Record<string, boolean>>({});

  const fetchDeliverables = React.useCallback(async () => {
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
      if (response) {
        const updatedDeliverables = response as DeliverableDto[];
        setDeliverables(updatedDeliverables);
        
        // If a deliverable is currently expanded, reload its tasks
        if (expandedDeliverableId) {
          const expandedDeliverable = updatedDeliverables.find(d => d.id === expandedDeliverableId);
          if (expandedDeliverable && expandedDeliverable.linkedTasks && expandedDeliverable.linkedTasks.length > 0) {
            // Clear cached tasks to force reload
            setDeliverableTasks((prev) => {
              const updated = { ...prev };
              delete updated[expandedDeliverableId];
              return updated;
            });
            // Trigger reload by toggling (will be handled by handleToggleExpand logic)
            // Actually, we'll load it directly here
            setLoadingTasks((prev) => ({ ...prev, [expandedDeliverableId]: true }));
            try {
              const tasksResponse = await Http.getRequest(
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
              
              if (tasksResponse && Array.isArray(tasksResponse)) {
                const allTasks = tasksResponse as TaskDto[];
                const linkedTasks = allTasks.filter((task) => expandedDeliverable.linkedTasks?.includes(task.id));
                setDeliverableTasks((prev) => ({ ...prev, [expandedDeliverableId]: linkedTasks }));
              }
            } catch (error) {
              console.error('Failed to reload tasks:', error);
            } finally {
              setLoadingTasks((prev) => ({ ...prev, [expandedDeliverableId]: false }));
            }
          } else {
            // No linked tasks, clear the cache
            setDeliverableTasks((prev) => {
              const updated = { ...prev };
              delete updated[expandedDeliverableId];
              return updated;
            });
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch deliverables:', error);
    }
  }, [project?.id, expandedDeliverableId]);

  React.useEffect(() => {
    fetchDeliverables();
  }, [fetchDeliverables]);

  const getStatusLabel = (statusId: string) => {
    return project?.deliverableStatuses?.[statusId]?.label || statusId;
  };

  const getStatusColor = (statusId: string) => {
    return project?.deliverableStatuses?.[statusId]?.color || '#000';
  };

  const getStageColor = (stageId: string | null | undefined): string => {
    if (!stageId) return '#71717a';
    const stage = project?.projectStages.find((s) => s.id === stageId);
    return stage?.color || '#71717a';
  };

  const isOverdue = (dueDate: string, statusId: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    if (due >= now) return false;
    
    // Consider approved/published statuses as not overdue
    const statusLabel = getStatusLabel(statusId).toLowerCase();
    const finalStatuses = ['approved', 'published'];
    return !finalStatuses.some(finalStatus => statusLabel.includes(finalStatus));
  };

  const filteredDeliverables = deliverables.filter((deliverable) => {
    if (filterStatus !== 'all' && deliverable.status !== filterStatus) {
      return false;
    }
    return true;
  });


  if (!project) {
    return null;
  }

  // Get status options for filters
  const statusOptions = project.deliverableStatuses
    ? Object.entries(project.deliverableStatuses)
        .sort((a, b) => a[1].order - b[1].order)
        .map(([statusId, status]) => ({
          id: statusId,
          label: status.label,
          color: status.color,
        }))
    : [];

  const handleEditDeliverable = (deliverable: DeliverableDto) => {
    setEditingDeliverable(deliverable);
    setIsEditModalOpen(true);
  };

  const handleToggleExpand = async (deliverable: DeliverableDto) => {
    if (expandedDeliverableId === deliverable.id) {
      // Collapse
      setExpandedDeliverableId(null);
    } else {
      // Expand - load tasks if not already loaded
      setExpandedDeliverableId(deliverable.id);
      
      if (!deliverableTasks[deliverable.id] && deliverable.linkedTasks && deliverable.linkedTasks.length > 0) {
        setLoadingTasks((prev) => ({ ...prev, [deliverable.id]: true }));
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
          
          if (response && Array.isArray(response)) {
            const allTasks = response as TaskDto[];
            const linkedTasks = allTasks.filter((task) => deliverable.linkedTasks?.includes(task.id));
            setDeliverableTasks((prev) => ({ ...prev, [deliverable.id]: linkedTasks }));
          }
        } catch (error) {
          console.error('Failed to load tasks:', error);
          setDeliverableTasks((prev) => ({ ...prev, [deliverable.id]: [] }));
        } finally {
          setLoadingTasks((prev) => ({ ...prev, [deliverable.id]: false }));
        }
      }
    }
  };

  const handleJumpToTask = (taskId: string) => {
    router.push(`/project/${project.id}/board?task=${taskId}`);
  };

  const handleStatusChange = async (deliverable: DeliverableDto, newStatus: string) => {
    if (newStatus === deliverable.status) {
      setEditingStatusId(null);
      return;
    }

    setUpdatingStatus((prev) => ({ ...prev, [deliverable.id]: true }));
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
        title: 'Status updated successfully',
        color: 'success',
        variant: 'flat',
      });

      fetchDeliverables();
      setEditingStatusId(null);
    } catch (error) {
      console.error('Failed to update status:', error);
      addToast({
        title: getErrorMessage(error),
        color: 'danger',
        variant: 'flat',
      });
    } finally {
      setUpdatingStatus((prev) => ({ ...prev, [deliverable.id]: false }));
    }
  };

  const handleDueDateChange = async (deliverable: DeliverableDto, newDueDate: string) => {
    const newDate = new Date(newDueDate).toISOString();
    if (newDate === deliverable.dueDate) {
      setEditingDueDateId(null);
      return;
    }

    setUpdatingDueDate((prev) => ({ ...prev, [deliverable.id]: true }));
    try {
      await Http.patchRequest(
        `/project/${deliverable.projectId}/deliverables/${deliverable.id}`,
        undefined,
        { dueDate: newDate },
        undefined,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      addToast({
        title: 'Due date updated successfully',
        color: 'success',
        variant: 'flat',
      });

      fetchDeliverables();
      setEditingDueDateId(null);
    } catch (error) {
      console.error('Failed to update due date:', error);
      addToast({
        title: getErrorMessage(error),
        color: 'danger',
        variant: 'flat',
      });
    } finally {
      setUpdatingDueDate((prev) => ({ ...prev, [deliverable.id]: false }));
    }
  };

  const handleJumpToMedia = (mediaId: string) => {
    router.push(`/project/${project.id}/assets/${mediaId}`);
  };

  const handleDeleteDeliverable = async (deliverable: DeliverableDto) => {
    if (!confirm(`Are you sure you want to delete "${deliverable.name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await Http.deleteRequest(
        `/project/${project.id}/deliverables/${deliverable.id}`,
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

      fetchDeliverables();
    } catch (error) {
      console.error('Failed to delete deliverable:', error);
      addToast({
        title: getErrorMessage(error),
        color: 'danger',
        variant: 'flat',
      });
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header with Filters */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Chip size="sm" variant="flat" className="bg-default-100 text-foreground-600">
              {filteredDeliverables.length}
            </Chip>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={filterStatus === 'all' ? 'solid' : 'flat'}
              color={filterStatus === 'all' ? 'primary' : 'default'}
              onClick={() => setFilterStatus('all')}
              className="font-medium"
            >
              All
            </Button>
            {statusOptions.map((status) => (
              <Button
                key={status.id}
                size="sm"
                variant={filterStatus === status.id ? 'solid' : 'flat'}
                color={filterStatus === status.id ? 'primary' : 'default'}
                onClick={() => setFilterStatus(status.id)}
                className="font-medium"
                startContent={
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: status.color }}
                  />
                }
              >
                {status.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="flat"
            startContent={<Icon icon="gear" size={16} />}
            onClick={() => setIsEditStatusesModalOpen(true)}
            className="font-medium"
          >
            Edit Statuses
          </Button>
          <Button
            color="primary"
            startContent={<Icon icon="file" size={16} />}
            onClick={() => setIsCreateModalOpen(true)}
            className="font-medium"
          >
            Create Deliverable
          </Button>
        </div>
      </div>

      {/* Deliverables Table */}
      {filteredDeliverables.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-20 w-20 rounded-full bg-default-100 flex items-center justify-center mb-6">
            <Icon icon="file" size={40} className="text-foreground-400" />
          </div>
          <h3 className="text-lg font-semibold text-foreground-900 mb-2">No deliverables found</h3>
          <p className="text-sm text-foreground-500 max-w-md">
            {filterStatus !== 'all'
              ? 'Try adjusting your filters to see more results'
              : 'Create your first deliverable to track client-facing outputs and manage project deliverables'}
          </p>
          {filterStatus === 'all' && (
            <Button
              color="primary"
              className="mt-6 font-medium"
              startContent={<Icon icon="file" size={16} />}
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create Your First Deliverable
            </Button>
          )}
        </div>
      ) : (
        <Table removeWrapper aria-label="Deliverables table">
          <TableHeader>
            <TableColumn>MEDIA</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>DUE DATE</TableColumn>
            <TableColumn>FORMAT</TableColumn>
            <TableColumn>VERSION</TableColumn>
            <TableColumn width={50}>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredDeliverables.map((deliverable) => {
              const statusLabel = getStatusLabel(deliverable.status);
              const statusColor = getStatusColor(deliverable.status);
              const overdue = isOverdue(deliverable.dueDate, deliverable.status);
              const taskCount = deliverable.linkedTasks?.length || 0;
              const isExpanded = expandedDeliverableId === deliverable.id;
              const tasks = deliverableTasks[deliverable.id] || [];
              const isLoading = loadingTasks[deliverable.id] || false;

              return (
                <React.Fragment key={deliverable.id}>
                  <TableRow
                    className="cursor-pointer hover:bg-default-50"
                    onClick={() => handleToggleExpand(deliverable)}
                  >
                    <TableCell>
                      <div 
                        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (deliverable.linkedMedia && deliverable.linkedMedia.length > 0) {
                            handleJumpToMedia(deliverable.linkedMedia[0]);
                          }
                        }}
                      >
                        <DeliverableMediaPreview 
                          mediaIds={deliverable.linkedMedia || []} 
                          maxVisible={3} 
                          size="md" 
                        />
                        {deliverable.linkedMedia && deliverable.linkedMedia.length > 0 && (
                          <span className="text-xs text-foreground-500">
                            {deliverable.linkedMedia.length} file{deliverable.linkedMedia.length !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleExpand(deliverable);
                          }}
                          className="flex items-center justify-center w-6 h-6 rounded hover:bg-default-200 transition-colors"
                          aria-label={isExpanded ? 'Collapse tasks' : 'Expand tasks'}
                        >
                          <Icon 
                            icon="chevronDown" 
                            size={14} 
                            className={`text-foreground-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </button>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-foreground-900">{deliverable.name}</span>
                          {taskCount > 0 && (
                            <span className="text-xs text-foreground-500">↔ {taskCount} task{taskCount !== 1 ? 's' : ''}</span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                  <TableCell>
                    {editingStatusId === deliverable.id ? (
                      <Dropdown
                        isOpen
                        onOpenChange={(open) => {
                          if (!open) setEditingStatusId(null);
                        }}
                      >
                        <DropdownTrigger>
                          <button
                            type="button"
                            className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-default-100 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: statusColor }}
                            />
                            <span className="text-sm font-medium" style={{ color: statusColor }}>
                              {statusLabel}
                            </span>
                          </button>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Status options"
                          onAction={(key) => {
                            if (typeof key === 'string') {
                              handleStatusChange(deliverable, key);
                            }
                          }}
                          selectedKeys={[deliverable.status]}
                        >
                          {statusOptions.map((status) => (
                            <DropdownItem
                              key={status.id}
                              startContent={
                                <div
                                  className="h-2 w-2 rounded-full"
                                  style={{ backgroundColor: status.color }}
                                />
                              }
                            >
                              {status.label}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    ) : (
                      <button
                        type="button"
                        className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-default-100 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingStatusId(deliverable.id);
                        }}
                      >
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: statusColor }}
                        />
                        <span className="text-sm font-medium" style={{ color: statusColor }}>
                          {statusLabel}
                        </span>
                        {updatingStatus[deliverable.id] && (
                          <Spinner size="sm" className="ml-1" />
                        )}
                      </button>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingDueDateId === deliverable.id ? (
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <Input
                          type="date"
                          size="sm"
                          value={new Date(deliverable.dueDate).toISOString().split('T')[0]}
                          onChange={(e) => {
                            if (e.target.value) {
                              handleDueDateChange(deliverable, e.target.value);
                            }
                          }}
                          onBlur={() => setEditingDueDateId(null)}
                          className="w-40"
                          autoFocus
                        />
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-default-100 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingDueDateId(deliverable.id);
                        }}
                      >
                        <Icon icon="calendar" size={14} className="text-foreground-400" />
                        {overdue ? (
                          <Chip size="sm" color="danger" variant="flat" className="text-xs font-semibold">
                            Overdue
                          </Chip>
                        ) : (
                          <span className="text-sm text-foreground-700">
                            {format(new Date(deliverable.dueDate), 'MMM dd, yyyy')}
                          </span>
                        )}
                        {updatingDueDate[deliverable.id] && (
                          <Spinner size="sm" className="ml-1" />
                        )}
                      </button>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-foreground-700">{deliverable.format || '-'}</span>
                  </TableCell>
                  <TableCell>
                    {deliverable.version ? (
                      <Chip size="sm" variant="flat" className="bg-default-100 text-foreground-600 text-xs font-medium">
                        {deliverable.version.startsWith('v') ? deliverable.version : `v${deliverable.version}`}
                      </Chip>
                    ) : (
                      <span className="text-sm text-foreground-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="min-w-8 w-8 h-8"
                          onClick={(e) => e.stopPropagation()}
                          onPointerDown={(e) => e.stopPropagation()}
                          aria-label="Actions"
                        >
                          <Icon icon="dots" size={16} />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Deliverable actions"
                        onAction={(key) => {
                          if (key === 'edit') {
                            handleEditDeliverable(deliverable);
                          } else if (key === 'delete') {
                            handleDeleteDeliverable(deliverable);
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
                  </TableCell>
                </TableRow>
                {isExpanded && (
                  <TableRow>
                    <TableCell colSpan={7} className="bg-default-50/50 p-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-foreground-900">Linked Tasks</h4>
                          <span className="text-xs text-foreground-500">{taskCount} task{taskCount !== 1 ? 's' : ''}</span>
                        </div>
                        {isLoading ? (
                          <div className="flex items-center justify-center py-8">
                            <Spinner size="sm" />
                          </div>
                        ) : tasks.length > 0 ? (
                          <div className="flex flex-col gap-2.5">
                            {tasks.map((task) => {
                              const taskStage = project?.projectStages.find((s) => s.id === task.projectStage);
                              const hasTaskMedia = task.linkedMedia && task.linkedMedia.length > 0;
                              const allTaskAssignees = [
                                ...(task.inCharge ? [task.inCharge] : []),
                                ...task.assignees.filter(a => task.inCharge?.id !== a.id)
                              ];
                              
                              return (
                                <div
                                  key={task.id}
                                  className="flex flex-col gap-2 rounded-lg border border-default-200 bg-background p-3 hover:border-primary hover:shadow-sm transition-all group cursor-pointer"
                                  onClick={() => handleJumpToTask(task.id)}
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-3 flex-1 min-w-0">
                                      <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary-50 border border-primary-200 shrink-0">
                                        <Icon icon="check" size={16} className="text-primary" />
                                      </div>
                                      <div className="flex flex-col min-w-0 flex-1 gap-1.5">
                                        <span className="text-sm font-semibold text-foreground-900 line-clamp-2 leading-tight">{task.name}</span>
                                        <div className="flex items-center gap-2 flex-wrap">
                                          {taskStage && (
                                            <Chip 
                                              size="sm" 
                                              variant="flat" 
                                              className="h-4 text-xs"
                                              style={{ 
                                                backgroundColor: `${getStageColor(taskStage.id)}20`,
                                                color: getStageColor(taskStage.id)
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
                                                <span className="text-xs text-foreground-500">+{allTaskAssignees.length - 3}</span>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <Icon icon="arrowRight" size={16} className="text-foreground-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                                  </div>
                                  
                                  {/* Task Media Preview */}
                                  {hasTaskMedia && (
                                    <div className="flex items-center gap-2 pl-12">
                                      <TaskMediaPreview mediaIds={task.linkedMedia} maxVisible={3} size="sm" />
                                      {task.linkedMedia.length > 3 && (
                                        <span className="text-xs text-foreground-500">+{task.linkedMedia.length - 3} more</span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="rounded-lg border border-dashed border-default-200 bg-default-50/50 p-6 text-center">
                            <Icon icon="check" size={24} className="text-foreground-300 mx-auto mb-2" />
                            <p className="text-sm text-foreground-500">No tasks linked to this deliverable</p>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      )}

      {project && (
        <>
          <CreateDeliverableModal
            project={project}
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSuccess={() => {
              fetchDeliverables();
            }}
          />
          {editingDeliverable && (
            <CreateDeliverableModal
              project={project}
              isOpen={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false);
                setEditingDeliverable(null);
              }}
              deliverableId={editingDeliverable.id}
              initialData={{
                name: editingDeliverable.name,
                description: editingDeliverable.description,
                inCharge: editingDeliverable.inCharge?.id,
                linkedMedia: editingDeliverable.linkedMedia,
                linkedTasks: editingDeliverable.linkedTasks,
                dueDate: editingDeliverable.dueDate,
                status: editingDeliverable.status,
                format: editingDeliverable.format,
                version: editingDeliverable.version,
              }}
              onSuccess={() => {
                fetchDeliverables();
                setIsEditModalOpen(false);
                setEditingDeliverable(null);
              }}
            />
          )}
          <EditDeliverableStatusesModal
            project={project}
            isOpen={isEditStatusesModalOpen}
            onClose={() => setIsEditStatusesModalOpen(false)}
          />
        </>
      )}
    </div>
  );
};
