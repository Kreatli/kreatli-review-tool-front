import { closestCenter } from '@dnd-kit/collision';
import { useSortable } from '@dnd-kit/react/sortable';
import { Button, Checkbox, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { useRouter } from 'next/router';

import { useAssetContext } from '../../../../contexts/Asset';
import { useProjectContext } from '../../../../contexts/Project';
import { useIsTouchScreen } from '../../../../hooks/useIsTouchScreen';
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
  index: number;
  file: ProjectFileDto;
  onSelectionChange?: () => void;
}

export const ProjectFile = ({ isSelected, isDisabled, isReadonly, index, file, onSelectionChange }: Props) => {
  const { name, commentsCount } = file;

  const router = useRouter();
  const { project } = useProjectContext();
  const { getAssetActions } = useAssetContext();

  const isTouchScreen = useIsTouchScreen();

  const handleClick = () => {
    if (isDisabled) {
      return;
    }

    router.push(`/project/${router.query.id}/assets/${file.id}`);
  };

  const { ref, isDragging } = useSortable({
    id: file.id,
    disabled: isDisabled || isSelected || isReadonly || isTouchScreen,
    index,
    collisionDetector: closestCenter,
  });

  return (
    <div
      ref={ref}
      tabIndex={-1}
      className={cn('relative flex flex-col gap-3 transition-opacity', { 'opacity-50': isDragging })}
    >
      <div
        tabIndex={isDisabled ? -1 : 0}
        className={cn(
          'absolute-cursor w-full cursor-pointer rounded-2xl outline-offset-2 outline-focus focus:outline focus:outline-2',
          {
            'outline outline-2': isSelected || isDragging,
          },
        )}
        onKeyDown={handleSpaceAndEnter(handleClick)}
        onClick={handleClick}
      >
        <ProjectFileCover file={file} />
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
          color="primary"
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
            isDisabled={isSelected || isReadonly}
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
