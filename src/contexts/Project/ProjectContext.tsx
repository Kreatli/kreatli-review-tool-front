/* eslint-disable @typescript-eslint/indent */
import { addToast, MenuItemProps } from '@heroui/react';
import { useRouter } from 'next/router';
import React from 'react';

import { ProjectMembersModal } from '../../components/project/ProjectMembers';
import { ArchiveProjectModal } from '../../components/project/ProjectModals/ArchiveProjectModal';
import { ChangeProjectCoverModal } from '../../components/project/ProjectModals/ChangeProjectCoverModal';
import { CompleteProjectModal } from '../../components/project/ProjectModals/CompleteProjectModal';
import { DeleteProjectModal } from '../../components/project/ProjectModals/DeleteProjectModal';
import { LeaveProjectModal } from '../../components/project/ProjectModals/LeaveProjectModal';
import { RenameProjectModal } from '../../components/project/ProjectModals/RenameProjectModal';
import { RestoreProjectModal } from '../../components/project/ProjectModals/RestoreProjectModal';
import { IconType } from '../../components/various/Icon';
import { useSession } from '../../hooks/useSession';
import { ProjectDto } from '../../services/types';
import { useProjectStatusesModal } from '../../hooks/useProjectStatusesModal';

export interface ProjectAssetsFilters {
  status?: string;
  assignee?: string;
  sizeFrom?: number;
  sizeTo?: number;
}

interface Context {
  getProjectActions: (project: ProjectDto) => {
    label: string;
    icon: IconType;
    showDivider?: boolean;
    hideInCard?: boolean;
    color?: MenuItemProps['color'];
    onClick: () => void;
  }[];
  restoreProject: (project: ProjectDto) => void;
  search: string;
  setSearch: (search: string) => void;
  filters: ProjectAssetsFilters;
  setFilters: (filters: ProjectAssetsFilters) => void;
  isProjectOwner: boolean;
  project: ProjectDto;
  setIsMembersModalOpen: (isOpen: boolean) => void;
}

export const ProjectContext = React.createContext<Context | null>(null);

export const useProjectContext = () => {
  const context = React.useContext(ProjectContext);

  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectContextProvider');
  }

  return context;
};

interface Props {
  selectedProject: ProjectDto | undefined;
  setSelectedProjectId?: (id: string) => void;
}

export const ProjectContextProvider = ({
  children,
  selectedProject,
  setSelectedProjectId,
}: React.PropsWithChildren<Props>) => {
  const [isRenameModalOpen, setIsRenameModalOpen] = React.useState(false);
  const [isCoverModalOpen, setIsCoverModalOpen] = React.useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = React.useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = React.useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = React.useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = React.useState(false);

  const [search, setSearch] = React.useState('');
  const [filters, setFilters] = React.useState<ProjectAssetsFilters>({});
  const { user } = useSession();
  const router = useRouter();

  const isProjectOwner = selectedProject?.createdBy?.id === user?.id;

  const setIsEditProjectStatusesModalOpen = useProjectStatusesModal((state) => state.setIsVisible);

  const restoreProject = (project: ProjectDto) => {
    setSelectedProjectId?.(project.id);
    setIsRestoreModalOpen(true);
  };

  const getProjectActions = (project: ProjectDto) => {
    if (project.createdBy?.id !== user?.id) {
      if (project.status === 'active') {
        return [
          {
            label: 'Recently deleted',
            icon: 'time' as const,
            onClick: () => {
              router.push(`/project/${project.id}/assets/archived`);
            },
          },
          {
            label: 'Leave project',
            icon: 'door' as const,
            color: 'danger' as const,
            onClick: () => {
              setSelectedProjectId?.(project.id);
              setIsLeaveModalOpen(true);
            },
          },
        ];
      }

      return [];
    }

    return [
      ...(project.status === 'active'
        ? [
            {
              label: 'Rename',
              icon: 'edit' as const,
              onClick: () => {
                setSelectedProjectId?.(project.id);
                setIsRenameModalOpen(true);
              },
            },
            {
              label: 'Change cover image',
              icon: 'panorama' as const,
              onClick: () => {
                setSelectedProjectId?.(project.id);
                setIsCoverModalOpen(true);
              },
            },
            {
              label: 'Invite member',
              icon: 'userPlus' as const,
              onClick: () => {
                setSelectedProjectId?.(project.id);
                setIsMembersModalOpen(true);
              },
            },
            {
              label: 'Edit statuses',
              icon: 'gear' as const,
              onClick: () => {
                setIsEditProjectStatusesModalOpen(true);
              },
            },
            {
              label: 'Recently deleted',
              icon: 'time' as const,
              showDivider: true,
              onClick: () => {
                router.push(`/project/${project.id}/assets/archived`);
              },
            },
            {
              label: 'Complete project',
              icon: 'check' as const,
              color: 'success' as const,
              onClick: () => {
                setSelectedProjectId?.(project.id);
                setIsCompleteModalOpen(true);
              },
            },
            {
              label: 'Archive project',
              icon: 'trash' as const,
              color: 'danger' as const,
              onClick: () => {
                setSelectedProjectId?.(project.id);
                setIsArchiveModalOpen(true);
              },
            },
          ]
        : []),
      ...(project.status === 'archived'
        ? [
            {
              label: 'Restore project',
              icon: 'update' as const,
              onClick: () => {
                restoreProject(project);
              },
            },
            {
              label: 'Delete project',
              icon: 'trash' as const,
              color: 'danger' as const,
              onClick: () => {
                setSelectedProjectId?.(project.id);
                setIsDeleteModalOpen(true);
              },
            },
          ]
        : []),
      ...(project.status === 'completed'
        ? [
            {
              label: 'Reactivate project',
              icon: 'update' as const,
              onClick: () => {
                restoreProject(project);
              },
            },
            {
              label: 'Archive project',
              icon: 'folder' as const,
              color: 'danger' as const,
              onClick: () => {
                setSelectedProjectId?.(project.id);
                setIsArchiveModalOpen(true);
              },
            },
          ]
        : []),
    ];
  };

  return (
    <ProjectContext.Provider
      value={{
        getProjectActions,
        restoreProject,
        project: selectedProject as ProjectDto,
        isProjectOwner,
        search,
        setSearch,
        filters,
        setFilters,
        setIsMembersModalOpen,
      }}
    >
      {children}
      <RenameProjectModal
        project={selectedProject}
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
      />
      <ChangeProjectCoverModal
        project={selectedProject}
        isOpen={isCoverModalOpen}
        onClose={() => setIsCoverModalOpen(false)}
      />
      <ProjectMembersModal
        project={selectedProject}
        isOpen={isMembersModalOpen}
        onClose={() => setIsMembersModalOpen(false)}
      />
      <CompleteProjectModal
        project={selectedProject}
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
      />
      <ArchiveProjectModal
        project={selectedProject}
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
      />
      <RestoreProjectModal
        project={selectedProject}
        isOpen={isRestoreModalOpen}
        onClose={() => setIsRestoreModalOpen(false)}
      />
      <DeleteProjectModal
        project={selectedProject}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
      <LeaveProjectModal
        project={selectedProject}
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
      />
    </ProjectContext.Provider>
  );
};
