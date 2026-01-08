import { Button, Skeleton } from '@heroui/react';
import React from 'react';

import { ProjectContextProvider } from '../../../contexts/Project';
import { useProjectEmptyState } from '../../../hooks/useProjectEmptyState';
import { useProjectStatusesModal } from '../../../hooks/useProjectStatusesModal';
import { GetProjectsQueryParams, ProjectDto } from '../../../services/types';
import { EmptyState } from '../../various/EmptyState';
import { Icon } from '../../various/Icon';
import { EditProjectStatusesModal } from '../ProjectModals/EditProjectStatusesModal';
import { ProjectCard } from './ProjectCard';

interface Props {
  status: GetProjectsQueryParams['status'];
  search: string;
  projects?: ProjectDto[];
  isLoading?: boolean;
  isError?: boolean;
  onCreateProject?: () => void;
}

export const ProjectsGrid = ({
  status,
  search,
  projects,
  isLoading = false,
  isError = false,
  onCreateProject,
}: Props) => {
  const [selectedProjectId, setSelectedProjectId] = React.useState<string | null>(null);

  const selectedProject = React.useMemo(() => {
    return projects?.find((project) => project.id === selectedProjectId);
  }, [projects, selectedProjectId]);

  const { title, text } = useProjectEmptyState({ search, status });

  const isEditProjectStatusesModalOpen = useProjectStatusesModal((state) => state.isVisible);
  const setIsEditProjectStatusesModalOpen = useProjectStatusesModal((state) => state.setIsVisible);

  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index}>
            <Skeleton className="mb-4 aspect-video rounded-2xl" />
            <Skeleton className="mb-1 h-5 w-full rounded-md" />
            <Skeleton className="mb-1 h-5 w-[50%] rounded-md" />
            <Skeleton className="h-5 w-[50%] rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        icon="error"
        title="Something went wrong"
        text="Please refresh the page or contact our support team to help you resolve the issue."
      />
    );
  }

  if (!projects || projects?.length === 0) {
    return (
      <EmptyState title={title} text={text}>
        {!search && (status === 'active' || status === 'all') && (
          <Button className="mt-4 bg-foreground text-content1" onClick={onCreateProject}>
            <Icon icon="plus" size={18} />
            Create project
          </Button>
        )}
      </EmptyState>
    );
  }

  return (
    <>
      <ProjectContextProvider selectedProject={selectedProject} setSelectedProjectId={setSelectedProjectId}>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8">
          {projects?.map((project) => (
            <ProjectCard key={project.id} project={project} onSelectProjectId={setSelectedProjectId} />
          ))}
        </div>
      </ProjectContextProvider>
      <EditProjectStatusesModal
        project={selectedProject}
        isOpen={isEditProjectStatusesModalOpen}
        onClose={() => setIsEditProjectStatusesModalOpen(false)}
      />
    </>
  );
};
