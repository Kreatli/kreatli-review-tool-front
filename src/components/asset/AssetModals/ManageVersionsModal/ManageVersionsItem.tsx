import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Chip, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';

import { ProjectFileDto } from '../../../../services/types';
import { formatBytes } from '../../../../utils/formatBytes';
import { Icon } from '../../../various/Icon';
import { ManageVersionsItemPlaceholder } from './ManageVersionsItemPlaceholder';

interface Props {
  file: ProjectFileDto;
  version: number;
  isActive: boolean;
  isDisabled?: boolean;
  shouldHideActions?: boolean;
  onMarkAsActive: () => void;
  onRemove: () => void;
}

export const ManageVersionsItem = ({
  file,
  version,
  isActive,
  isDisabled = false,
  shouldHideActions = false,
  onMarkAsActive,
  onRemove,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: file.id,
    disabled: isDisabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} className="flex items-center gap-2">
      <Chip size="sm" className={cn({ 'bg-foreground text-content1': true })} variant={true ? 'solid' : 'flat'}>
        v{version}
      </Chip>
      <div
        style={style}
        className="flex w-full items-center gap-2 overflow-hidden rounded-medium p-1"
        {...attributes}
        {...listeners}
      >
        <div className="shrink-0">
          <Icon icon="dotsSix" size={20} className="text-foreground-500" />
        </div>
        <ManageVersionsItemPlaceholder file={file} isActive={false} />
        <div className="flex flex-1 flex-col gap-px overflow-hidden">
          <div className="flex w-full items-center gap-2 overflow-hidden">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">{file.name}</div>
          </div>
          <div className="text-xs text-foreground-500">{formatBytes(file.fileSize)}</div>
        </div>
        {isActive && !shouldHideActions && (
          <Chip size="sm" variant="flat">
            Active
          </Chip>
        )}
        {!shouldHideActions && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button variant="light" isIconOnly isDisabled={isDisabled} size="sm" radius="full">
                <Icon icon="dots" size={20} className="rotate-90 text-foreground-500" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="rename" startContent={<Icon icon="check" size={18} />} onClick={onMarkAsActive}>
                Mark as Active
              </DropdownItem>
              <DropdownItem
                key="delete"
                color="danger"
                variant="flat"
                startContent={<Icon icon="trash" size={18} />}
                onClick={onRemove}
              >
                Remove from stack
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    </div>
  );
};
