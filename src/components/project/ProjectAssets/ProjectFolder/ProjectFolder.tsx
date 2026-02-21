import { useDroppable } from '@dnd-kit/react';
import { Button, Checkbox, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { useRouter } from 'next/router';

import { useAssetContext } from '../../../../contexts/Asset';
import { ProjectFolderDto } from '../../../../services/types';
import { formatBytes } from '../../../../utils/formatBytes';
import { handleSpaceAndEnter } from '../../../../utils/keydown';
import { Icon } from '../../../various/Icon';
import { ProjectFolderCover } from './ProjectFolderCover';

interface Props {
  isDisabled?: boolean;
  isSelected?: boolean;
  isReadonly?: boolean;
  folder: ProjectFolderDto;
  onSelectionChange?: () => void;
}

export const ProjectFolder = ({ isSelected, isDisabled, isReadonly, folder, onSelectionChange }: Props) => {
  const { name } = folder;

  const { getAssetActions } = useAssetContext();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/project/${router.query.id}/assets/folder/${folder.id}`);
  };

  const { ref, isDropTarget } = useDroppable({ id: `folder-${folder.id}` });

  const actions = getAssetActions(folder);

  return (
    <div className="group/project-folder relative">
      <div ref={ref} className="absolute bottom-0 left-8 right-8 top-0" />
      <button
        type="button"
        aria-label={`Open ${name}`}
        disabled={isDisabled}
        className={cn(
          'absolute-cursor w-full cursor-pointer rounded-2xl outline-offset-2 outline-focus focus:outline focus:outline-2',
          {
            'outline-3 outline': isDropTarget,
          },
        )}
        onClick={handleClick}
        onKeyDown={handleSpaceAndEnter(handleClick)}
        onDoubleClick={handleClick}
      >
        <ProjectFolderCover>
          <div className="flex items-center gap-1">
            {isSelected !== undefined && (
              <Checkbox isSelected={isSelected} isDisabled={isReadonly} color="primary" onChange={onSelectionChange} />
            )}
            <div className="flex flex-1 flex-col items-start overflow-hidden first:ml-1">
              <div className="flex w-full items-center gap-2 overflow-hidden">
                <Icon icon="folder" className="size-5 shrink-0 text-foreground-500" />
                <div className="truncate font-semibold text-foreground">{name}</div>
              </div>
              <div className="text-sm text-foreground-500">
                {folder.fileCount} file{folder.fileCount === 1 ? '' : 's'}, {formatBytes(folder.totalFileSize)}
              </div>
            </div>
            {actions.length > 0 && (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button size="sm" radius="full" variant="faded" isDisabled={isSelected || isReadonly} isIconOnly>
                    <Icon icon="dots" size={20} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu variant="flat">
                  {actions.map((action) => (
                    <DropdownItem
                      key={action.label}
                      color={action.color}
                      showDivider={action.showDivider}
                      startContent={<Icon icon={action.icon} size={16} />}
                      onPress={action.onClick}
                    >
                      {action.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
        </ProjectFolderCover>
      </button>
    </div>
  );
};
