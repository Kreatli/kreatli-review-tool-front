import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Checkbox, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { useRouter } from 'next/router';
import React from 'react';

import { useAssetContext } from '../../../../contexts/Asset';
import { useProjectContext } from '../../../../contexts/Project';
import { ProjectFileDto } from '../../../../services/types';
import { handleSpaceAndEnter } from '../../../../utils/keydown';
import { Icon } from '../../../various/Icon';
import { ProjectFileAssignee } from './ProjectFileAssignee';
import { ProjectFileCover } from './ProjectFileCover';
import { ProjectFileStatus } from './ProjectFileStatus';

interface Props {
  isSelected?: boolean;
  isDisabled?: boolean;
  isReadonly?: boolean;
  file: ProjectFileDto;
  onSelectionChange?: () => void;
}

export const ProjectFile = ({ isSelected, isDisabled, isReadonly, file, onSelectionChange }: Props) => {
  const { name, metadata, commentsCount } = file;
  const { isUploading = false } = metadata;

  const router = useRouter();
  const { project } = useProjectContext();
  const { getAssetActions } = useAssetContext();

  const handleClick = () => {
    if (isDisabled) {
      return;
    }

    router.push(`/project/${router.query.id}/assets/${file.id}`);
  };

  const {
    attributes,
    listeners,
    isSorting,
    transition,
    activeIndex,
    index,
    transform,
    setDraggableNodeRef,
    setDroppableNodeRef,
  } = useSortable({
    id: file.id,
    disabled: isDisabled || isSelected || isReadonly,
    animateLayoutChanges: () => true,
  });

  return (
    <div
      ref={setDraggableNodeRef}
      style={{
        transition,
        transform: isSorting ? undefined : CSS.Translate.toString(transform),
      }}
      {...listeners}
      {...attributes}
      tabIndex={-1}
      className="relative flex flex-col gap-3"
    >
      {activeIndex > index && (
        <div
          ref={setDroppableNodeRef}
          className="pointer-events-none absolute -left-16 bottom-0 top-0 w-[calc(100%+4rem)]"
        />
      )}
      {activeIndex < index && (
        <div
          ref={setDroppableNodeRef}
          className="pointer-events-none absolute -right-16 bottom-0 top-0 w-[calc(100%+4rem)]"
        />
      )}
      <div
        tabIndex={isDisabled ? -1 : 0}
        className="absolute-cursor w-full cursor-default rounded-2xl outline-offset-2 outline-focus focus:outline focus:outline-2"
        onKeyDown={handleSpaceAndEnter(handleClick)}
        onDoubleClick={handleClick}
      >
        <ProjectFileCover file={file} isLoading={isUploading} />
        <div className="relative">
          <ProjectFileStatus
            className="absolute bottom-2 left-2 z-10 border-1"
            projectId={project.id}
            statuses={project.assetStatuses}
            file={file}
            isDisabled={isReadonly}
          />
        </div>
      </div>
      {isSelected !== undefined && (
        <Checkbox
          isSelected={isSelected}
          color="default"
          isDisabled={isReadonly}
          className="absolute left-2 right-2 top-2 z-10"
          onChange={onSelectionChange}
        />
      )}
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button
            size="sm"
            radius="full"
            isDisabled={isUploading || isSelected || isReadonly}
            className="absolute right-2 top-2 z-10"
            variant="faded"
            isIconOnly
          >
            <Icon icon="dots" size={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="flat">
          {getAssetActions(file).map((action) => (
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
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-2">
          <div className="truncate text-lg font-semibold">{name}</div>
        </div>
        <div className="flex items-start justify-between gap-2">
          <ProjectFileAssignee
            projectId={project.id}
            file={file}
            members={project.members}
            isDisabled={isDisabled || isReadonly}
          />
          <div className="text-sm text-foreground-500">
            {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
          </div>
        </div>
      </div>
    </div>
  );
};
