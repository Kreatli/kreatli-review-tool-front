import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Checkbox, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { useRouter } from 'next/router';
import React from 'react';

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

  const { setNodeRef, isOver } = useDroppable({ id: `folder-${folder.id}` });

  const actions = getAssetActions(folder);

  return (
    <div className="relative group/project-folder">
      <div ref={setNodeRef} className="absolute top-0 bottom-0 left-8 right-8" />
      <button
        type="button"
        aria-label={`Open ${name}`}
        disabled={isDisabled}
        className={cn(
          'w-full cursor-default absolute-cursor rounded-2xl focus:outline-2 focus:outline outline-focus outline-offset-2',
          {
            'outline-3 outline': isOver,
          },
        )}
        onKeyDown={handleSpaceAndEnter(handleClick)}
        onDoubleClick={handleClick}
      >
        <ProjectFolderCover>
          <div className="flex items-center gap-1">
            {isSelected !== undefined && (
              <Checkbox isSelected={isSelected} isDisabled={isReadonly} color="default" onChange={onSelectionChange} />
            )}
            <div className="flex flex-col items-start flex-1 overflow-hidden first:ml-1">
              <div className="flex items-center gap-2 overflow-hidden w-full">
                <Icon icon="folder" className="text-foreground-500 size-5 shrink-0" />
                <div className="text-foreground font-semibold truncate">{name}</div>
              </div>
              <div className="text-foreground-500 text-sm">
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
