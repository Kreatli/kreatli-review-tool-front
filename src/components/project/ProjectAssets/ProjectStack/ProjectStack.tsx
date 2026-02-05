import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Checkbox, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { useRouter } from 'next/router';

import { useAssetContext } from '../../../../contexts/Asset';
import { useProjectContext } from '../../../../contexts/Project';
import { useOnboardingStore } from '../../../../hooks/useOnboarding';
import { ProjectStackDto } from '../../../../services/types';
import { handleSpaceAndEnter } from '../../../../utils/keydown';
import { Icon } from '../../../various/Icon';
import { ProjectFileAssignee } from '../ProjectFile/ProjectFileAssignee';
import { ProjectFileCover } from '../ProjectFile/ProjectFileCover';
import { ProjectFileStatus } from '../ProjectFile/ProjectFileStatus';

interface Props {
  isSelected?: boolean;
  isDisabled?: boolean;
  isReadonly?: boolean;
  stack: ProjectStackDto;
  onSelectionChange?: () => void;
  dataOnboardingOpenFile?: boolean;
}

export const ProjectStack = ({
  isSelected,
  isDisabled,
  isReadonly,
  stack,
  onSelectionChange,
  dataOnboardingOpenFile,
}: Props) => {
  const { name, commentsCount } = stack.active!;

  const router = useRouter();
  const { project } = useProjectContext();
  const { getAssetActions } = useAssetContext();

  const handleClick = () => {
    if (isDisabled) {
      return;
    }
    if (useOnboardingStore.getState().step === 2) {
      useOnboardingStore.getState().advanceToFileOpened();
    }
    router.push(`/project/${router.query.id}/assets/stack/${stack.id}`);
  };

  const handleManageVersionsClick = () => {
    const actions = getAssetActions(stack);
    const manageVersionAction = actions.find((action) => action.key === 'manageVersions');

    manageVersionAction?.onClick();
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
    id: stack.id,
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
        {...(dataOnboardingOpenFile && { 'data-onboarding': 'open-file' })}
      >
        <ProjectFileCover file={stack.active!} />
        <div className="relative">
          <ProjectFileStatus
            className="absolute bottom-2 left-2 z-10 border-1"
            projectId={project.id}
            statuses={project.assetStatuses}
            file={stack.active!}
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
      <div className="absolute right-2 top-2 z-10 flex items-center gap-2">
        <Chip
          as="button"
          type="button"
          size="sm"
          className="bg-foreground text-content1"
          classNames={{ content: 'font-semibold' }}
          onClick={handleManageVersionsClick}
        >
          v{stack.active?.stackVersion}
        </Chip>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button size="sm" radius="full" isDisabled={isSelected || isReadonly} variant="faded" isIconOnly>
              <Icon icon="dots" size={20} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="flat">
            {getAssetActions(stack).map((action) => (
              <DropdownItem
                key={action.key}
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
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-2">
          <div className="truncate text-lg font-semibold">{name}</div>
        </div>
        <div className="flex items-start justify-between gap-2">
          <ProjectFileAssignee
            projectId={project.id}
            file={stack.active!}
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
