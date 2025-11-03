import { Chip, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Selection } from '@heroui/react';
import React from 'react';

import { usePutProjectIdFileFileId } from '../../../../services/hooks';
import { ProjectFileDto, ProjectMemberDto } from '../../../../services/types';
import { STATUS_COLOR, STATUS_LABEL } from '../../../../utils/status';

interface Props {
  projectId: string;
  file: ProjectFileDto;
  memberRole?: ProjectMemberDto['role'];
  className?: string;
  isDisabled?: boolean;
}

export const ProjectFileStatus = ({ file, projectId, memberRole, className, isDisabled }: Props) => {
  const { status } = file;
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set([status ?? 'none']));

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

    // @ts-expect-error
    mutate({ id: projectId, fileId: file.id, requestBody: { status: newStatus === 'none' ? null : newStatus } });
  };

  const selectedKey = selectedKeys.values().next().value ?? 'none';

  return (
    <Dropdown>
      <DropdownTrigger>
        <Chip
          size="sm"
          variant="dot"
          isDisabled={isDisabled}
          color={STATUS_COLOR[selectedKey]}
          className={cn('bg-default-100 cursor-pointer', className)}
        >
          {STATUS_LABEL[selectedKey]}
        </Chip>
      </DropdownTrigger>
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
        <DropdownItem key="in-progress" startContent={<span className="w-2 h-2 rounded-full bg-primary" />}>
          In progress
        </DropdownItem>
        <DropdownItem key="review-needed" startContent={<span className="w-2 h-2 rounded-full bg-warning" />}>
          Review needed
        </DropdownItem>
        <DropdownItem key="changes-required" startContent={<span className="w-2 h-2 rounded-full bg-danger" />}>
          Changes required
        </DropdownItem>
        <DropdownItem key="approved" startContent={<span className="w-2 h-2 rounded-full bg-success" />}>
          Approved
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
