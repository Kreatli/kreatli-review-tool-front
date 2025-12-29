import { Button, Input, Tab, Tabs } from '@heroui/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { useDebounce } from '../../../hooks/useDebounce';
import { useGetProjects } from '../../../services/hooks';
import { GetProjectsQueryParams } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { CreateProjectModal } from '../ProjectModals/CreateProjectModal';
import { ProjectsGrid } from '../ProjectsGrid';
import { useSession } from '../../../hooks/useSession';
import { UpgradeModal } from '../../account/UpgradeModal';
import { ProjectsList } from '../ProjectsList/ProjectsList';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

export const Projects = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useSession();

  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState<GetProjectsQueryParams['status']>(
    (searchParams.get('tab') as GetProjectsQueryParams['status']) ?? 'active',
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = React.useState(false);

  const [view, setView] = useLocalStorage({ key: 'projectsView', defaultValue: 'list' });

  const activeTab = (searchParams.get('tab') as GetProjectsQueryParams['status']) ?? 'active';

  React.useEffect(() => {
    if (activeTab !== status) {
      setStatus(activeTab as GetProjectsQueryParams['status']);
    }
  }, [activeTab]);

  const searchDebounced = useDebounce(search);

  const { data, isLoading, isError } = useGetProjects({ status, search: searchDebounced });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleTabChange = (newStatus: React.Key) => {
    router.push({ query: { tab: newStatus.toString() } });
    setStatus(newStatus.toString() as GetProjectsQueryParams['status']);
  };

  const handleCreateProjectClick = () => {
    if (
      user?.subscription.limits.projectsCount.used &&
      user.subscription.limits.projectsCount.used >= user.subscription.limits.projectsCount.max
    ) {
      setIsUpgradeModalOpen(true);
      return;
    }

    setIsCreateModalOpen(true);
  };

  return (
    <div className="border-t border-foreground-200 p-6">
      <div className="mb-2 flex justify-between gap-4">
        <h2 className="text-3xl font-semibold">Projects</h2>
        <Button className="bg-foreground text-content1" onClick={handleCreateProjectClick}>
          <Icon icon="plus" size={16} />
          Create project
        </Button>
      </div>
      <div className="mb-4">
        <div className="flex justify-between gap-6">
          <div className="flex gap-6">
            <Tabs selectedKey={status} onSelectionChange={handleTabChange}>
              <Tab title={`All (${data?.totals.all ?? 0})`} key="all" />
              <Tab title={`Active (${data?.totals.active ?? 0})`} key="active" />
              <Tab title={`Completed (${data?.totals.completed ?? 0})`} key="completed" />
              <Tab title={`Archived (${data?.totals.archived ?? 0})`} key="archived" />
            </Tabs>
            <Input
              value={search}
              placeholder="Search"
              className="w-fit"
              variant="underlined"
              isClearable
              startContent={<Icon icon="search" />}
              onChange={handleInputChange}
              onClear={() => setSearch('')}
            />
          </div>
          <Tabs
            selectedKey={view}
            classNames={{ tabList: 'gap-1' }}
            onSelectionChange={(key) => setView(key as string)}
          >
            <Tab key="list" title={<Icon icon="list" size={18} />} className="p-2" />
            <Tab key="grid" title={<Icon icon="grid" size={18} />} className="p-2" />
          </Tabs>
        </div>
      </div>
      {view === 'list' && (
        <ProjectsList
          projects={data?.projects ?? []}
          search={searchDebounced}
          status={status}
          isError={isError}
          isLoading={isLoading}
          onCreateProject={handleCreateProjectClick}
        />
      )}
      {view === 'grid' && (
        <ProjectsGrid
          projects={data?.projects}
          status={status}
          search={searchDebounced}
          isLoading={isLoading}
          isError={isError}
          onCreateProject={handleCreateProjectClick}
        />
      )}
      <CreateProjectModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <UpgradeModal type="projects" isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} />
    </div>
  );
};
