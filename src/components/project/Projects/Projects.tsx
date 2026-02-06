import { Button, Input, Tab, Tabs } from '@heroui/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';

import { useDebounce } from '../../../hooks/useDebounce';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { usePlansModalVisibility } from '../../../hooks/usePlansModalVisibility';
import { useSession } from '../../../hooks/useSession';
import { useGetProjects } from '../../../services/hooks';
import { GetProjectsQueryParams } from '../../../services/types';
import { useIsBreakpoint } from '../../tiptap/hooks/use-is-breakpoint';
import { Icon } from '../../various/Icon';
import { CreateProjectModal } from '../ProjectModals/CreateProjectModal';
import { ProjectsGrid } from '../ProjectsGrid';
import { ProjectsList } from '../ProjectsList/ProjectsList';

export const Projects = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useSession();

  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState<GetProjectsQueryParams['status']>(
    (searchParams.get('tab') as GetProjectsQueryParams['status']) ?? 'active',
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  const isMobile = useIsBreakpoint('max', 768);
  const [view, setView] = useLocalStorage({ key: 'projectsView', defaultValue: 'list' });

  const setIsPlansModalVisible = usePlansModalVisibility((state) => state.setIsVisible);

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
    if (!user?.subscription.isActive) {
      setIsPlansModalVisible(true);

      return;
    }

    setIsCreateModalOpen(true);
  };

  return (
    <div className="xs:p-6 border-t border-foreground-200 p-3">
      <div className="mb-2 flex justify-between gap-4">
        <h2 className="text-3xl font-semibold">Projects</h2>
        <Button className="bg-foreground text-content1" onClick={handleCreateProjectClick}>
          <Icon icon="plus" size={16} />
          Create project
        </Button>
      </div>
      <div className="mb-4">
        <div className="flex w-full justify-between gap-6">
          <div className="flex w-full flex-col gap-6 gap-y-2 md:flex-row">
            <Tabs selectedKey={status} onSelectionChange={handleTabChange}>
              <Tab title={`All (${data?.totals.all ?? 0})`} key="all" />
              <Tab title={`Active (${data?.totals.active ?? 0})`} key="active" />
              <Tab title={`Completed (${data?.totals.completed ?? 0})`} key="completed" />
              <Tab title={`Archived (${data?.totals.archived ?? 0})`} key="archived" />
            </Tabs>
            <Input
              value={search}
              placeholder="Search"
              className="w-full md:w-fit"
              variant="underlined"
              isClearable
              startContent={<Icon icon="search" />}
              onChange={handleInputChange}
              onClear={() => setSearch('')}
            />
          </div>
          <Tabs
            selectedKey={view}
            className="hidden md:block"
            classNames={{ tabList: 'gap-1' }}
            onSelectionChange={(key) => setView(key as string)}
          >
            <Tab key="list" title={<Icon icon="list" size={18} />} className="p-2" />
            <Tab key="grid" title={<Icon icon="grid" size={18} />} className="p-2" />
          </Tabs>
        </div>
      </div>
      {view === 'list' && !isMobile && (
        <ProjectsList
          projects={data?.projects ?? []}
          search={searchDebounced}
          status={status}
          isError={isError}
          isLoading={isLoading}
          onCreateProject={handleCreateProjectClick}
        />
      )}
      {(view === 'grid' || isMobile) && (
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
    </div>
  );
};
