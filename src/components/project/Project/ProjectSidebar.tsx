import { cn, Listbox, ListboxItem, Selection, Skeleton } from '@heroui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ProjectContextProvider } from '../../../contexts/Project';
import { ProjectDto } from '../../../services/types';
import { Icon, IconType } from '../../various/Icon';
import { ProjectSelect } from './ProjectSelect';
import { ProjectSidebarSettings } from './ProjectSidebarSettings';

const ITEMS = [
  {
    key: 'dashboard',
    url: 'dashboard',
    label: 'Home',
    icon: 'home',
  },
  {
    key: 'assets',
    url: 'assets',
    label: 'Media',
    icon: 'images',
  },
  {
    key: 'tasks',
    url: 'tasks',
    label: 'Tasks',
    icon: 'board' as IconType,
  },
  {
    key: 'chat',
    url: 'chat',
    label: 'Chat',
    icon: 'chat',
  },
  {
    key: 'activity',
    url: 'activity',
    label: 'Activity',
    icon: 'pulse' as IconType,
  },
  {
    key: 'members',
    url: 'members',
    label: 'Members',
    icon: 'group' as IconType,
    showDivider: true,
  },
  {
    key: 'assets-archived',
    url: 'assets/archived',
    label: 'Recently deleted',
    icon: 'time' as IconType,
  },
] as const;

interface Props {
  project?: ProjectDto;
  isLoading?: boolean;
}

export const ProjectSidebar = ({ project, isLoading = false }: Props) => {
  const router = useRouter();

  const [selectedKey, setSelectedKey] = useState<string>(() => {
    const firstSlug = router.pathname.split('/')[3];
    const secondSlug = router.pathname.split('/')[4];

    const key = ITEMS.find((item) => item.url === `${firstSlug}/${secondSlug}`)?.key;

    return key ?? firstSlug;
  });

  useEffect(() => {
    const firstSlug = router.pathname.split('/')[3];
    const secondSlug = router.pathname.split('/')[4];

    const key = ITEMS.find((item) => item.url === `${firstSlug}/${secondSlug}`)?.key;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedKey(key ?? firstSlug);
  }, [router.pathname]);

  const handleSelectionChange = (keys: Selection) => {
    if (keys === 'all' || !project) {
      return;
    }

    const key = keys.values().next().value ?? selectedKey;
    setSelectedKey(key as string);
    const url = ITEMS.find((item) => item.key === key)?.url;
    if (url) {
      router.push(`/project/${project.id}/${url}`);
    }
  };

  const items = ITEMS.filter((item) => {
    if (item.key === 'tasks' && !localStorage.getItem('enableTasks')) {
      return false;
    }
    return true;
  });

  return (
    <div className="sticky top-[64px] max-h-[calc(100vh-64px)] overflow-y-auto border-r border-foreground-200">
      <div className="border-b border-foreground-200 px-2 py-3">
        {isLoading || !project ? (
          <Skeleton className="mx-auto h-8 w-8 rounded-large md:w-full" />
        ) : (
          <ProjectSelect selectedProject={project} />
        )}
      </div>
      <div className="px-1 py-2">
        <Listbox
          selectedKeys={new Set([selectedKey])}
          onSelectionChange={handleSelectionChange}
          selectionMode="single"
          variant="flat"
          color="primary"
          className="pb-px"
          hideSelectedIcon
        >
          {items.map((item) => (
            <ListboxItem
              key={item.key}
              startContent={<Icon icon={item.icon} size={20} />}
              showDivider={'showDivider' in item && item.showDivider}
              classNames={{ title: 'hidden md:inline' }}
              className={cn('py-2', { 'bg-primary-50 text-primary': selectedKey === item.key })}
            >
              <span className="hidden md:inline">{item.label}</span>
            </ListboxItem>
          ))}
        </Listbox>
        {project && (
          <ProjectContextProvider selectedProject={project}>
            <ProjectSidebarSettings />
          </ProjectContextProvider>
        )}
      </div>
    </div>
  );
};
