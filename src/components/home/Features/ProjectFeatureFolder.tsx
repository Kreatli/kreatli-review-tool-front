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
    <div className="flex items-center gap-3 rounded-2xl border border-foreground-300 bg-foreground-50 px-4 py-2.5">
      <Icon icon="folder" className="size-5 shrink-0 text-foreground-500" />
      <div className="flex flex-1 flex-col items-start overflow-hidden">
        <div className="w-full truncate font-semibold text-foreground">{title}</div>
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
