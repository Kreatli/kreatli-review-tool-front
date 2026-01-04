import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react';
import { useRouter } from 'next/router';
import React from 'react';

import { useProjectContext } from '../../../contexts/Project';
import { useGetProjects } from '../../../services/hooks';
import { Icon } from '../../various/Icon';

interface Props {
  projectId: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const ProjectSidebar = ({ projectId, isCollapsed = false, onToggleCollapse }: Props) => {
  const router = useRouter();
  const { project } = useProjectContext();
  const { data: projectsData } = useGetProjects({ status: 'active' });

  // Extract the active tab from the current path
  const activeTab = React.useMemo(() => {
    const pathWithoutQuery = router.asPath.split('?')[0].split('#')[0];
    const segments = pathWithoutQuery.split('/').filter(Boolean);
    const projectIndex = segments.indexOf('project');
    if (projectIndex >= 0 && segments[projectIndex + 2]) {
      return segments[projectIndex + 2];
    }
    return 'dashboard';
  }, [router.asPath]);

  const handleTabClick = (key: string) => {
    if (!project?.id) return;

    const tabRoutes: Record<string, string> = {
      dashboard: `/project/${project.id}/dashboard`,
      assets: `/project/${project.id}/assets`,
      board: `/project/${project.id}/board`,
      deliverables: `/project/${project.id}/deliverables`,
      chat: `/project/${project.id}/chat`,
      activity: `/project/${project.id}/activity`,
    };

    const route = tabRoutes[key];
    if (route) {
      router.push(route);
    }
  };

  const handleProjectSelect = (selectedProjectId: string) => {
    router.push(`/project/${selectedProjectId}/dashboard`);
  };

  const getProjectInitial = (projectName: string) => {
    return projectName.charAt(0).toUpperCase();
  };

  const navigationItems = [
    { key: 'dashboard', label: 'Home', icon: 'slides' as const },
    { key: 'board', label: 'Boards', icon: 'grid' as const },
    { key: 'deliverables', label: 'Deliverables', icon: 'folder' as const },
    { key: 'assets', label: 'Media', icon: 'panorama' as const },
    { key: 'chat', label: 'Chat', icon: 'chat' as const },
    { key: 'activity', label: 'Activity', icon: 'time' as const },
  ];

  if (!project) {
    return null;
  }

  return (
    <div
      className={`flex h-full flex-col border-r border-foreground-200 bg-background transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-56'
      }`}
    >
      {/* Project Selector */}
      {project && (
        <div className="border-b border-foreground-200 px-3 py-3">
          {projectsData?.projects && projectsData.projects.length > 0 ? (
            <Dropdown placement="bottom-start" className="w-full">
              <DropdownTrigger>
                <Button
                  variant="light"
                  className={`h-auto w-full justify-start gap-2.5 rounded-lg px-3 py-2.5 transition-all hover:bg-foreground-100 dark:hover:bg-foreground-800 ${
                    isCollapsed ? 'px-2' : ''
                  }`}
                >
                  <Avatar
                    size="sm"
                    className="shrink-0 bg-primary text-content1"
                    fallback={
                      <span className="text-xs font-semibold">{getProjectInitial(project.name)}</span>
                    }
                  />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 truncate text-left text-sm font-semibold text-foreground-900 dark:text-foreground-100">
                        {project.name}
                      </span>
                      <Icon icon="chevronDown" size={16} className="shrink-0 text-foreground-400" />
                    </>
                  )}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                variant="flat"
                selectionMode="single"
                selectedKeys={project.id ? [project.id] : []}
                onSelectionChange={(keys) => {
                  const selectedId = Array.from(keys)[0] as string;
                  if (selectedId) {
                    handleProjectSelect(selectedId);
                  }
                }}
                className="max-h-96 min-w-[240px] overflow-y-auto"
              >
                {projectsData.projects.map((proj) => (
                  <DropdownItem
                    key={proj.id}
                    textValue={proj.name}
                    className="py-2.5"
                    classNames={{
                      base: 'rounded-lg',
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <Avatar
                        size="sm"
                        className="shrink-0 bg-primary text-content1"
                        fallback={
                          <span className="text-xs font-semibold">
                            {getProjectInitial(proj.name)}
                          </span>
                        }
                      />
                      <span className="truncate text-sm font-medium">{proj.name}</span>
                    </div>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 ${
                isCollapsed ? 'justify-center px-2' : ''
              }`}
            >
              <Avatar
                size="sm"
                className="shrink-0 bg-primary text-content1"
                fallback={
                  <span className="text-xs font-semibold">{getProjectInitial(project.name)}</span>
                }
              />
              {!isCollapsed && (
                <span className="truncate text-sm font-semibold text-foreground-900 dark:text-foreground-100">
                  {project.name}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Navigation Items */}
      <div className="flex-1 space-y-0.5 overflow-y-auto px-2 py-2">
        {navigationItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => handleTabClick(item.key)}
              title={isCollapsed ? item.label : undefined}
              aria-label={item.label}
              className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background ${
                isActive
                  ? 'bg-primary-50 text-primary font-semibold shadow-sm dark:bg-primary-900/20 dark:text-primary-400'
                  : 'text-foreground-600 hover:bg-foreground-100 hover:text-foreground-900 dark:text-foreground-400 dark:hover:bg-foreground-800 dark:hover:text-foreground-100'
              } ${isCollapsed ? 'justify-center px-2' : ''}`}
            >
              {isActive && (
                <span className="absolute left-0 h-5 w-1 rounded-r-full bg-primary" />
              )}
              <Icon
                icon={item.icon}
                size={20}
                className={`shrink-0 transition-colors ${
                  isActive
                    ? 'text-primary dark:text-primary-400'
                    : 'text-foreground-500 group-hover:text-foreground-700 dark:text-foreground-400 dark:group-hover:text-foreground-200'
                }`}
              />
              {!isCollapsed && (
                <span
                  className={`text-sm transition-colors ${
                    isActive ? 'font-semibold' : 'font-medium'
                  }`}
                >
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Settings */}
      <div className="border-t border-foreground-200 px-2 py-2">
        <button
          type="button"
          title={isCollapsed ? 'Settings' : undefined}
          aria-label="Settings"
          className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-foreground-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:bg-foreground-100 hover:text-foreground-900 dark:focus:ring-offset-background dark:text-foreground-400 dark:hover:bg-foreground-800 dark:hover:text-foreground-100 ${
            isCollapsed ? 'justify-center px-2' : ''
          }`}
        >
          <Icon
            icon="gear"
            size={20}
            className="shrink-0 text-foreground-500 transition-colors group-hover:text-foreground-700 dark:text-foreground-400 dark:group-hover:text-foreground-200"
          />
          {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      {onToggleCollapse && (
        <div className="border-t border-foreground-200 px-2 py-2">
          <button
            type="button"
            onClick={onToggleCollapse}
            className="group flex w-full items-center justify-center rounded-lg px-3 py-2 text-foreground-500 transition-all duration-200 hover:bg-foreground-100 hover:text-foreground-700 dark:text-foreground-400 dark:hover:bg-foreground-800 dark:hover:text-foreground-200"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon
              icon={isCollapsed ? 'arrowRight' : 'arrowLeft'}
              size={18}
              className="transition-transform group-hover:scale-110"
            />
          </button>
        </div>
      )}
    </div>
  );
};

