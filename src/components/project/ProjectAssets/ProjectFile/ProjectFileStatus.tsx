// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Chip, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Selection } from '@heroui/react';
import React from 'react';

import { useProjectStatusesModal } from '../../../../hooks/useProjectStatusesModal';
import { queryClient } from '../../../../lib/queryClient';
import { usePutProjectIdFileFileId } from '../../../../services/hooks';
import { getProjectIdLogs } from '../../../../services/services';
import { AssetDto, ProjectDto, ProjectFileDto } from '../../../../services/types';
import { Icon } from '../../../various/Icon';

interface Props {
  projectId: string;
  file: ProjectFileDto | AssetDto;
  statuses: ProjectDto['assetStatuses'];
  className?: string;
  isDisabled?: boolean;
}

export const ProjectFileStatus = ({ file, projectId, statuses, className, isDisabled }: Props) => {
  const { status } = file;
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set([status ?? 'none']));

  const setIsEditProjectStatusesModalOpen = useProjectStatusesModal((state) => state.setIsVisible);

  React.useEffect(() => {
    setSelectedKeys(new Set([status ?? 'none']));
  }, [status]);

  const { mutate } = usePutProjectIdFileFileId();

  const handleSelectionChange = (keys: Selection) => {
    if (keys === 'all') {
      return;
    }
    const newStatus = keys.values().next().value;

    if (newStatus === 'add-new-status') {
      setIsEditProjectStatusesModalOpen(true);

      return;
    }

    setSelectedKeys(keys as Set<string>);

    mutate(
      { id: projectId, fileId: file.id, requestBody: { status: newStatus === 'none' ? null : newStatus } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getProjectIdLogs.key, projectId] });
        },
      },
    );
  };

  const selectedKey = selectedKeys.values().next().value ?? 'none';
  const activeStatus = statuses.find((status) => status.value === selectedKey);

  return (
    <Dropdown>
      <DropdownTrigger>
        <span className="inline-flex" data-onboarding="set-status">
          <Chip
            size="sm"
            variant="dot"
            style={{ color: activeStatus?.color ?? '#A1A1AA' }}
            isDisabled={isDisabled}
            color="default"
            classNames={{ dot: 'bg-current', content: 'text-foreground max-w-32 truncate' }}
            className={cn('cursor-pointer bg-default-100', className)}
          >
            {activeStatus?.label ?? 'No status'}
          </Chip>
        </span>
      </DropdownTrigger>
      <DropdownMenu
        variant="flat"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
      >
        <DropdownItem key="none" startContent={<span className="h-2 w-2 rounded-full bg-default" />}>
          No status
        </DropdownItem>
        {statuses.map((status) => (
          <DropdownItem
            key={status.value}
            className="max-w-60 truncate"
            startContent={<span className="h-2 w-2 rounded-full bg-current" style={{ color: status.color }} />}
          >
            {status.label}
          </DropdownItem>
        ))}
        <DropdownItem key="add-new-status" startContent={<Icon icon="gear" size={14} className="-ml-0.5 -mr-1" />}>
          Edit statuses
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
