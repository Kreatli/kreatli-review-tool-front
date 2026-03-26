import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react';

import { DeliverableInfoDto } from '../../../services/types';
import { formatDate } from '../../../utils/dates';
import { Icon } from '../../various/Icon';

interface Props {
  deliverables: DeliverableInfoDto[];
  onSelect: (deliverable: DeliverableInfoDto) => void;
  onRename: () => void;
  onDelete: () => void;
  onClick: (deliverable: DeliverableInfoDto) => void;
}

export const DeliverablesCards = ({ deliverables, onSelect, onRename, onDelete, onClick }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {deliverables.map((deliverable) => (
        <Card key={deliverable.id} className="relative">
          <CardHeader className="pb-1">
            <div className="flex w-full flex-col">
              <div className="flex items-center justify-between gap-2">
                <Chip
                  size="sm"
                  variant="dot"
                  style={{ color: deliverable.statusColor ?? '#A1A1AA' }}
                  className="max-w-4"
                  classNames={{ dot: 'bg-current', content: 'text-foreground max-w-40 truncate' }}
                >
                  {deliverable.statusLabel || 'No status'}
                </Chip>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      size="sm"
                      radius="full"
                      variant="faded"
                      isIconOnly
                      className="z-10"
                      onClick={() => onSelect(deliverable)}
                    >
                      <Icon icon="dots" size={16} />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu variant="flat">
                    <DropdownItem key="rename" startContent={<Icon icon="edit" size={16} />} onClick={onRename}>
                      Rename
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      color="danger"
                      startContent={<Icon icon="trash" size={16} />}
                      onClick={onDelete}
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <button
                type="button"
                className="text-start font-semibold after:absolute after:inset-0"
                onClick={() => onClick(deliverable)}
              >
                {deliverable.name}
              </button>
            </div>
          </CardHeader>
          <CardBody className="py-0">
            <div className="flex flex-col gap-0.5 text-sm">
              <div>Start date: {formatDate(deliverable.endDate)}</div>
              <div>Due date: {formatDate(deliverable.endDate)}</div>
            </div>
          </CardBody>
          <CardFooter>
            <div className="flex items-center gap-2 text-sm">
              <Avatar
                name={deliverable.owner.name}
                src={deliverable.owner.avatar?.url}
                className="size-7"
                getInitials={(name) => name.charAt(0).toUpperCase()}
              />
              {deliverable.owner.name}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
