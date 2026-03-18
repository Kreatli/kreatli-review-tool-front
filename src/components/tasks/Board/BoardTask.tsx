import { useSortable } from '@dnd-kit/react/sortable';
import { Avatar, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { useRouter } from 'next/router';

import { TaskInfoDto } from '../../../services/types';
import { Icon } from '../../various/Icon';

interface Props {
  id: string;
  index: number;
  column: string;
  task: TaskInfoDto;
  onRemove?: () => void;
  onRename?: () => void;
  onClick?: () => void;
}

export const BoardTask = ({ id, index, column, task, onRename, onRemove, onClick }: Props) => {
  const router = useRouter();

  const { ref } = useSortable({
    id,
    index,
    type: 'item',
    accept: 'item',
    group: column,
  });

  const handleClick = () => {
    router.replace(`/project/${router.query.id}/tasks?taskId=${id}`);
  };

  return (
    <div
      ref={ref}
      className="group pointer-events-auto relative rounded-small bg-foreground-50 p-2.5 shadow-small"
      onClick={handleClick}
    >
      <div className="flex flex-col gap-2">
        {task.isHidden && (
          <Chip
            size="sm"
            variant="flat"
            className="-m-1 h-auto p-0.5"
            startContent={<Icon icon="eyeCrossed" size={12} className="mx-1" />}
          >
            Only visible to you
          </Chip>
        )}
        <div className="text-small font-semibold">{task.name}</div>
        <div className="flex items-center justify-between gap-1 overflow-hidden text-foreground">
          {task.owner && (
            <div className="flex items-center gap-1.5 truncate text-xs">
              <Avatar
                src={task.owner.avatar?.url}
                className="size-5 shrink-0"
                name={task.owner.name}
                getInitials={(name) => name.charAt(0)}
              />
              {task.owner.name}
            </div>
          )}
          {task.commentCount > 0 && (
            <div className="flex items-center gap-1 text-xs text-foreground-500">
              <Icon icon="chat" size={16} />
              {task.commentCount}
            </div>
          )}
        </div>
      </div>
      <div className="absolute right-0.5 top-0.5">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              size="sm"
              isIconOnly
              radius="full"
              variant="light"
              className="text-foreground-500 opacity-0 focus:opacity-100 group-hover:opacity-100"
              onClick={onClick}
            >
              <Icon icon="dots" size={18} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="flat">
            <DropdownItem key="rename" startContent={<Icon icon="edit" size={16} />} onClick={onRename}>
              Rename
            </DropdownItem>
            <DropdownItem key="delete" color="danger" startContent={<Icon icon="trash" size={16} />} onClick={onRemove}>
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};
