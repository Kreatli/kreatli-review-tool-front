import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';

import { useProjectContext } from '../../../contexts/Project';
import { Icon } from '../../various/Icon';

export const ProjectSidebarSettings = () => {
  const { project, getProjectActions } = useProjectContext();

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
            className="h-auto w-full justify-start px-2 py-2 text-left"
          >
            <span className="hidden md:inline">Settings</span>
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
