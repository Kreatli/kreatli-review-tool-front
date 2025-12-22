import { GetProjectsQueryParams, ProjectDto } from '../../../services/types';
import React from 'react';
import { ProjectContextProvider } from '../../../contexts/Project';
import { ProjectsListTable } from './ProjectsListTable';
import { EmptyState } from '../../various/EmptyState';
import { EditProjectStatusesModal } from '../ProjectModals/EditProjectStatusesModal';
import { useProjectStatusesModal } from '../../../hooks/useProjectStatusesModal';

interface Props {
  status: GetProjectsQueryParams['status'];
  search: string;
  projects: ProjectDto[];
  isLoading: boolean;
  isError: boolean;
  onCreateProject: () => void;
}

export const ProjectsList = ({ projects, status, search, isLoading, isError, onCreateProject }: Props) => {
  const [selectedProjectId, setSelectedProjectId] = React.useState<string | null>(null);

  const selectedProject = React.useMemo(() => {
    return projects?.find((project) => project.id === selectedProjectId);
  }, [projects, selectedProjectId]);

  const isEditProjectStatusesModalOpen = useProjectStatusesModal((state) => state.isVisible);
  const setIsEditProjectStatusesModalOpen = useProjectStatusesModal((state) => state.setIsVisible);

  if (isError) {
    return (
      <EmptyState
        icon="error"
        title="Something went wrong"
        text="Please refresh the page or contact our support team to help you resolve the issue."
      />
    );
  }

  return (
    <>
      <ProjectContextProvider selectedProject={selectedProject} setSelectedProjectId={setSelectedProjectId}>
        <ProjectsListTable
          projects={projects}
          status={status}
          isLoading={isLoading}
          search={search}
          onSelectProjectId={setSelectedProjectId}
          onCreateProject={onCreateProject}
        />
      </ProjectContextProvider>
      <EditProjectStatusesModal
        project={selectedProject}
        isOpen={isEditProjectStatusesModalOpen}
        onClose={() => setIsEditProjectStatusesModalOpen(false)}
      />
    </>
  );
};
