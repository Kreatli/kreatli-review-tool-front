import {
  Avatar,
  Badge,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
  SharedSelection,
} from '@heroui/react';
import { Icon } from '../../various/Icon';
import { useState } from 'react';

const statuses = {
  'in-progress': {
    label: 'In Progress',
    color: 'primary',
  },
  'review-needed': {
    label: 'Review Needed',
    color: 'warning',
  },
  'changes-required': {
    label: 'Changes required',
    color: 'danger',
  },
  approved: {
    label: 'Approved',
    color: 'success',
  },
} as const;

interface Props {
  title: string;
  size: number;
  assignee?: string;
  comments: number;
  status: 'in-progress' | 'review-needed' | 'approved';
}

export const ProjectFeatureFile = ({
  title,
  size,
  assignee: initialAssignee,
  comments,
  status: initialStatus,
}: Props) => {
  const [assignee, setAssignee] = useState<string | undefined>(initialAssignee);
  const [status, setStatus] = useState<keyof typeof statuses>(initialStatus);

  const handleSelectionChange = (keys: Selection) => {
    if (keys !== 'all') {
      const newAssignee = keys.values().next().value ?? undefined;

      setAssignee(newAssignee as string | undefined);
    }
  };

  return (
    <div className="relative flex flex-col gap-2">
      <div className="relative shadow-small aspect-video rounded-md items-center justify-center flex overflow-hidden">
        <img
          src={`https://picsum.photos/600/400?title=${title}`}
          alt="File"
          className="absolute h-full w-full object-cover"
        />
      </div>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-foreground-500">
            {comments} comments, {size}MB
          </div>
        </div>
        {assignee && (
          <div className="text-sm text-foreground-500">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar size="sm" src={`https://i.pravatar.cc/150?u=${assignee}`} className="cursor-pointer" />
              </DropdownTrigger>
              <DropdownMenu
                selectionMode="single"
                disallowEmptySelection
                selectedKeys={[assignee]}
                onSelectionChange={handleSelectionChange}
              >
                <DropdownItem key="a042581f4e29026024d">Peter R.</DropdownItem>
                <DropdownItem key="a042581f4e29026024f">Martin D.</DropdownItem>
                <DropdownItem key="a042581f4e29026024e">George M.</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <Chip
              size="sm"
              variant="dot"
              color={statuses[status].color}
              className="cursor-pointer bg-foreground-50 absolute top-2 left-2"
            >
              {statuses[status].label}
            </Chip>
          </DropdownTrigger>
          <DropdownMenu
            selectedKeys={[status]}
            selectionMode="single"
            disallowEmptySelection
            onSelectionChange={(keys) => setStatus(keys.currentKey as keyof typeof statuses)}
          >
            <DropdownItem key="changes-required">Changes required</DropdownItem>
            <DropdownItem key="approved">Approved</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};
