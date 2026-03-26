import {
  Avatar,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';

import { DeliverableInfoDto } from '../../../services/types';
import { formatDate } from '../../../utils/dates';
import { Icon } from '../../various/Icon';
import { DeliverablesRowName } from './DeliverablesRowName';

interface Props {
  deliverables: DeliverableInfoDto[];
  onSelect: (deliverable: DeliverableInfoDto) => void;
  onRename: () => void;
  onDelete: () => void;
  onCreate: () => void;
  onClick: (deliverable: DeliverableInfoDto) => void;
}

export const DeliverablesTable = ({ deliverables, onSelect, onRename, onDelete, onCreate, onClick }: Props) => {
  return (
    <>
      <div className="overflow-x-auto">
        <Table removeWrapper>
          <TableHeader>
            <TableColumn>Title</TableColumn>
            <TableColumn>Owner</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn width={120}>Start date</TableColumn>
            <TableColumn width={120}>Due date</TableColumn>
            <TableColumn width={50}> </TableColumn>
          </TableHeader>
          <TableBody>
            {deliverables.map((deliverable) => (
              <TableRow
                key={deliverable.id}
                className="group/row hover:cursor-pointer hover:opacity-70"
                onClick={() => onClick(deliverable)}
              >
                <TableCell>
                  <DeliverablesRowName
                    deliverableId={deliverable.id}
                    name={deliverable.name}
                    isOverDue={!!deliverable?.endDate && new Date(deliverable.endDate) < new Date()}
                    isCompleted={deliverable.isCompleted}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 truncate">
                    <Avatar
                      name={deliverable.owner.name}
                      size="sm"
                      src={deliverable.owner.avatar?.url}
                      className="shrink-0"
                      getInitials={(name) => name?.charAt(0).toUpperCase()}
                    />
                    <div className="max-w-40 truncate">{deliverable.owner.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip
                    size="sm"
                    variant="dot"
                    style={{ color: deliverable.statusColor ?? '#A1A1AA' }}
                    className="max-w-4 border-none"
                    classNames={{ dot: 'bg-current', content: 'text-foreground max-w-40 truncate' }}
                  >
                    {deliverable.statusLabel || 'No status'}
                  </Chip>
                </TableCell>
                <TableCell className="whitespace-nowrap">{formatDate(deliverable.startDate)}</TableCell>
                <TableCell className="whitespace-nowrap">{formatDate(deliverable.endDate)}</TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" radius="full" variant="light" onClick={() => onSelect(deliverable)}>
                        <Icon icon="dots" size={16} className="rotate-90" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu variant="flat">
                      <DropdownItem key="edit-status" startContent={<Icon icon="edit" size={16} />} onClick={onRename}>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <Button variant="light" onClick={onCreate}>
          <Icon icon="plus" size={16} />
          Create deliverable
        </Button>
      </div>
    </>
  );
};
