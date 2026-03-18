import { CollisionPriority } from '@dnd-kit/abstract';
import { useSortable } from '@dnd-kit/react/sortable';
import { Button, Chip, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { useState } from 'react';

import { Icon } from '../../various/Icon';
import { NewTaskModal } from '../Task/NewTaskModal';
import { BoardColumnNameModal } from './BoardColumnNameModal';
import { BoardColumnRemoveModal } from './BoardColumnRemoveModal';

interface Props {
  projectId: string;
  id: string;
  index: number;
  name: string;
  children: React.ReactNode;
  counter?: number;
  isDisabled?: boolean;
}

export const BoardColumn = ({ projectId, id, index, name, counter, children, isDisabled = false }: Props) => {
  const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useState(false);
  const [isRenameModalVisible, setIsRenameModalVisible] = useState(false);
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);

  const { ref, handleRef } = useSortable({
    id,
    index,
    type: 'column',
    collisionPriority: CollisionPriority.Low,
    accept: isDisabled ? ['item'] : ['item', 'column'],
  });

  return (
    <div
      ref={ref}
      className={cn('flex w-full min-w-64 max-w-96 flex-col overflow-auto rounded-medium bg-foreground-100', {
        'pointer-events-none': isDisabled,
      })}
    >
      <div className="sticky top-0 z-10 flex min-h-11 items-center gap-1 bg-foreground-100 p-2 pb-1">
        {!isDisabled && (
          <div ref={handleRef} className="flex size-6 items-center justify-center">
            <Icon icon="dotsSix" size={16} />
          </div>
        )}
        <div className="truncate text-sm font-semibold text-foreground-500">{name}</div>
        <Chip variant="flat" size="sm" classNames={{ content: 'font-semibold' }}>
          {counter ?? '0'}
        </Chip>
        {!isDisabled && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button size="sm" isIconOnly variant="light" className="ml-auto text-foreground-500" radius="full">
                <Icon icon="dots" size={16} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="flat">
              <DropdownItem
                key="task"
                startContent={<Icon icon="plus" size={16} />}
                onClick={() => setIsNewTaskModalVisible(true)}
              >
                New task
              </DropdownItem>
              <DropdownItem
                key="rename"
                startContent={<Icon icon="edit" size={16} />}
                onClick={() => setIsRenameModalVisible(true)}
              >
                Rename
              </DropdownItem>
              <DropdownItem
                key="delete"
                color="danger"
                startContent={<Icon icon="trash" size={16} />}
                onClick={() => setIsRemoveModalVisible(true)}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
      <div className="flex flex-col gap-2 px-2 pb-2 pt-1">
        {children}
        <Button
          size="sm"
          variant="light"
          className="pointer-events-auto justify-start"
          startContent={<Icon icon="plus" size={14} />}
          onClick={() => setIsNewTaskModalVisible(true)}
        >
          New task
        </Button>
      </div>
      <BoardColumnNameModal
        projectId={projectId}
        isVisible={isRenameModalVisible}
        columnId={id}
        name={name}
        onClose={() => setIsRenameModalVisible(false)}
      />
      <BoardColumnRemoveModal
        projectId={projectId}
        columnId={id}
        isVisible={isRemoveModalVisible}
        onClose={() => setIsRemoveModalVisible(false)}
        onSuccess={() => setIsRemoveModalVisible(false)}
      />
      <NewTaskModal
        projectId={projectId}
        status={id}
        isVisible={isNewTaskModalVisible}
        onClose={() => setIsNewTaskModalVisible(false)}
      />
    </div>
  );
};
