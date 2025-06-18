// @ts-nocheck
import { Chip, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Selection, Tooltip } from '@heroui/react';
import React from 'react';

import { useSession } from '../../../../hooks/useSession';
import { usePutProjectIdFileFileId } from '../../../../services/hooks';
import { ProjectFileDto, ProjectMemberDto } from '../../../../services/types';
import { STATUS_COLOR, STATUS_LABEL } from '../../../../utils/status';

interface Props {
  projectId: string;
  file: ProjectFileDto;
  memberRole?: ProjectMemberDto['role'];
  className?: string;
}

export const ProjectFileStatus = ({ file, projectId, memberRole, className }: Props) => {
  const { status } = file;
  const { user } = useSession();
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set([status ?? 'none']));

  const hasAssigneeStatuses =
    file.assignee?.id === user?.id || (memberRole === 'contributor' && file.createdBy?.id === user?.id);

  const isEditable = React.useMemo(() => {
    if (memberRole === 'owner') {
      return true;
    }

    return (user?.id === file.createdBy?.id || user?.id === file.assignee?.id) && status !== 'approved';
  }, [file, memberRole, status, user]);

  const isDisabledForOwner = memberRole === 'owner' && !file.assignee;

  React.useEffect(() => {
    setSelectedKeys(new Set([status ?? 'none']));
  }, [status]);

  const { mutate } = usePutProjectIdFileFileId();

  const handleSelectionChange = (keys: Selection) => {
    if (keys === 'all') {
      return;
    }

    setSelectedKeys(keys as Set<string>);
    const newStatus = keys.values().next().value;

    mutate({ id: projectId, fileId: file.id, requestBody: { status: newStatus === 'none' ? null : newStatus } });
  };

  const chip = (
    <Chip
      size="sm"
      variant="dot"
      color={STATUS_COLOR[selectedKeys.values().next().value]}
      className={cn('bg-default-100 cursor-pointer', className)}
    >
      {STATUS_LABEL[selectedKeys.values().next().value]}
    </Chip>
  );

  if (isDisabledForOwner) {
    return <Tooltip content="You need to assign the file before changing its status">{chip}</Tooltip>;
  }

  if (!isEditable) {
    return <Tooltip content="You can't change the status of this file">{chip}</Tooltip>;
  }

  return (
    <Dropdown>
      <DropdownTrigger>{chip}</DropdownTrigger>
      <DropdownMenu
        variant="flat"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
      >
        <DropdownItem key="none" startContent={<span className="w-2 h-2 rounded-full bg-default" />}>
          No status
        </DropdownItem>
        {hasAssigneeStatuses && (
          <DropdownItem key="in-progress" startContent={<span className="w-2 h-2 rounded-full bg-primary" />}>
            In progress
          </DropdownItem>
        )}
        {!hasAssigneeStatuses && (
          <DropdownItem key="changes-required" startContent={<span className="w-2 h-2 rounded-full bg-danger" />}>
            Changes required
          </DropdownItem>
        )}
        {hasAssigneeStatuses && (
          <DropdownItem key="review-needed" startContent={<span className="w-2 h-2 rounded-full bg-warning" />}>
            Review needed
          </DropdownItem>
        )}
        {!hasAssigneeStatuses && (
          <DropdownItem key="approved" startContent={<span className="w-2 h-2 rounded-full bg-success" />}>
            Approved
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};
