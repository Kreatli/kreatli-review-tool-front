import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';

import { useProjectContext } from '../../../contexts/Project';
import { useIsBreakpoint } from '../../tiptap/hooks/use-is-breakpoint';
import { Icon } from '../../various/Icon';

export const ProjectSidebarSettings = () => {
  const { project, getProjectActions } = useProjectContext();

  const isMobile = useIsBreakpoint('max', 768);

  const projectActions = getProjectActions(project);

  if (projectActions.length === 0) {
    return null;
  }

  return (
    <div className="px-1">
      <Dropdown placement="right-start">
        <DropdownTrigger>
          <Button
            startContent={<Icon icon="gear" size={20} />}
            variant="light"
            isIconOnly={isMobile}
            className="h-auto w-full min-w-0 justify-start px-2 py-2 text-left"
          >
            {!isMobile && <span>Settings</span>}
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="flat">
          {projectActions.map((action) => (
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
    </div>
  );
};
