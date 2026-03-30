// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Badge, Button, Popover, PopoverContent, PopoverTrigger, Select, SelectItem } from '@heroui/react';
import React, { useEffect } from 'react';

import { useGetProjectId } from '../../../services/hooks';
import { Icon } from '../../various/Icon';

export interface DeliverablesFiltersType {
  owner?: string;
  status?: string;
}

interface Props {
  projectId: string;
  defaultFilters: DeliverablesFiltersType;
  onFiltersChange: (filters: DeliverablesFiltersType) => void;
}

export const DeliverablesFilters = ({ projectId, defaultFilters, onFiltersChange }: Props) => {
  const { data: project } = useGetProjectId(projectId, { refetchOnMount: false });

  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false);

  const [filters, setFilters] = React.useState<DeliverablesFiltersType>(defaultFilters);

  const hasFilters = Object.keys(defaultFilters).length > 0;

  useEffect(() => {
    setFilters(defaultFilters);
  }, [defaultFilters]);

  const handleApplyFilters = () => {
    setIsPopoverVisible(false);
    const filteredFilters = Object.fromEntries(Object.entries(filters).filter(([_, value]) => !!value));
    onFiltersChange(filteredFilters);
  };

  const handleResetFilters = () => {
    setFilters({});
    onFiltersChange({});
    setIsPopoverVisible(false);
  };

  const handlePopoverClose = () => {
    setFilters(defaultFilters);
  };

  const selectedStatusColor = project?.deliverableStatuses.find((status) => status.value === filters.status)?.color;

  return (
    <Badge isOneChar size="sm" color="primary" isInvisible={!hasFilters}>
      <Popover
        placement="bottom-end"
        isOpen={isPopoverVisible}
        onOpenChange={setIsPopoverVisible}
        onClose={handlePopoverClose}
      >
        <PopoverTrigger>
          <Button color="default" variant="flat">
            <Icon icon="filter" size={20} />
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex w-64 flex-col gap-2 p-2">
            <div className="text-lg font-semibold">Filters</div>
            <div className="flex flex-col gap-4">
              <Select
                label="Owner"
                size="sm"
                value={filters.owner}
                selectedKeys={filters.owner ? [filters.owner] : []}
                onChange={(e) => setFilters({ ...filters, owner: e.target.value })}
                labelPlacement="outside"
                placeholder="Select owner"
                startContent={<Icon icon="user" size={18} className="text-foreground-500" />}
              >
                {(project?.members ?? [])
                  .filter((member) => member.status === 'joined')
                  .map((member) => (
                    <SelectItem key={member.user?.id ?? member.id}>{member.user?.name}</SelectItem>
                  ))}
              </Select>
              <Select
                label="Status"
                size="sm"
                value={filters.status}
                selectedKeys={filters.status ? [filters.status] : []}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                labelPlacement="outside"
                placeholder="Select status"
                startContent={
                  <div className="flex size-4 items-center justify-center">
                    <div
                      className="h-2 w-2 rounded-full bg-current"
                      style={{ color: selectedStatusColor ?? '#A1A1AA' }}
                    />
                  </div>
                }
              >
                <SelectItem
                  key="null"
                  startContent={<span className="h-2 w-2 rounded-full bg-current" style={{ color: '#A1A1AA' }} />}
                >
                  No status
                </SelectItem>
                {(project?.deliverableStatuses ?? []).map((status) => (
                  <SelectItem
                    key={status.value}
                    startContent={<span className="h-2 w-2 rounded-full bg-current" style={{ color: status.color }} />}
                  >
                    {status.label}
                  </SelectItem>
                ))}
              </Select>
              <div className="flex justify-end gap-2">
                {hasFilters && (
                  <Button size="sm" color="danger" variant="light" onClick={handleResetFilters}>
                    Reset filters
                  </Button>
                )}
                <Button size="sm" className="bg-foreground text-content1" onClick={handleApplyFilters}>
                  Apply filters
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </Badge>
  );
};
