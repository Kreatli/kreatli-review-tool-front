import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { Icon } from '../../various/Icon';
import { formatBytes } from '../../../utils/formatBytes';

interface Props {
  title: string;
  items: number;
  size: number; // size in bytes
  onClick?: () => void;
}

export const ProjectFeatureFolder = ({ title, items, size, onClick }: Props) => {
  return (
    <div className="bg-foreground-50 border border-foreground-300 rounded-2xl py-2.5 px-4 flex items-center gap-3">
      <Icon icon="folder" className="text-foreground-500 size-5 shrink-0" />
      <div className="flex flex-col items-start flex-1 overflow-hidden">
        <div className="font-semibold text-foreground truncate w-full">{title}</div>
        <div className="text-sm text-foreground-500">
          {items} file{items === 1 ? '' : 's'}, {formatBytes(size)}
        </div>
      </div>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button size="sm" radius="full" variant="faded" isIconOnly>
            <Icon icon="dots" size={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="flat">
          <DropdownItem key="open" onClick={onClick}>
            Open
          </DropdownItem>
          <DropdownItem key="rename" onClick={onClick}>
            Rename
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
