import { Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { useState, useEffect } from 'react';
import { formatBytes } from '../../../utils/formatBytes';

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
  'no-status': {
    label: 'No status',
    color: 'default',
  },
} as const;

interface Props {
  title: string;
  size: number; // size in bytes
  assignee?: string;
  comments: number;
  status: 'in-progress' | 'review-needed' | 'approved' | 'changes-required' | 'no-status';
  onClick?: () => void;
}

export const ProjectFeatureFile = ({
  title,
  size,
  comments,
  status: initialStatus,
  onClick,
}: Props) => {
  const [status, setStatus] = useState<keyof typeof statuses>(initialStatus);

  // Sync with props when they change (for animation control)
  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  const statusConfig = statuses[status] || statuses['no-status'];

  return (
    <div className="flex flex-col gap-2">
      <div className="relative aspect-video rounded-2xl overflow-hidden border border-foreground-300 bg-foreground-50">
        <img
          src={`https://picsum.photos/600/400?title=${title}`}
          alt="File"
          className="absolute h-full w-full object-cover"
        />
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2">
          <div onClick={(e) => e.stopPropagation()}>
            <Dropdown placement="top-start">
              <DropdownTrigger>
                <Chip
                  size="sm"
                  variant="dot"
                  color={statusConfig.color}
                  className="cursor-pointer bg-foreground-50"
                  style={statusConfig.color === 'default' ? { color: '#A1A1AA' } : undefined}
                >
                  {statusConfig.label}
                </Chip>
              </DropdownTrigger>
              <DropdownMenu
                selectedKeys={[status]}
                selectionMode="single"
                disallowEmptySelection
                onSelectionChange={(keys) => setStatus(keys.currentKey as keyof typeof statuses)}
              >
                <DropdownItem key="no-status">No status</DropdownItem>
                <DropdownItem key="changes-required">Changes required</DropdownItem>
                <DropdownItem key="approved">Approved</DropdownItem>
                <DropdownItem key="review-needed">Review Needed</DropdownItem>
                <DropdownItem key="in-progress">In Progress</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <Chip size="sm" variant="faded" className="bg-foreground-50">
            <span className="font-medium text-foreground-700">{formatBytes(size)}</span>
          </Chip>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="font-semibold text-foreground truncate">{title}</div>
        <div className="text-sm text-foreground-500">
          {comments} {comments === 1 ? 'comment' : 'comments'}
        </div>
      </div>
    </div>
  );
};
