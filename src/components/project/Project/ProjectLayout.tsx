import { addToast, Button } from '@heroui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { ProjectContextProvider } from '../../../contexts/Project';
import { useProtectedPage } from '../../../hooks/useProtectedPage';
import { useGetProjectId } from '../../../services/hooks';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { EmptyState } from '../../various/EmptyState';
import { Header } from '../../layout/Header';
import { ProjectHeader } from './ProjectHeader';
import { ProjectLoader } from './ProjectLoader';
import { NotActiveProjectAlert } from './NotActiveProjectAlert';
import { ProjectUploadContextProvider } from '../../../contexts/Project/ProjectUploadContext';
import { EditProjectStatusesModal } from '../ProjectModals/EditProjectStatusesModal';
import { useProjectStatusesModal } from '../../../hooks/useProjectStatusesModal';
import { ProjectSidebar } from './ProjectSidebar';

interface Props {
  hideHeader?: boolean;
  actions?: React.ReactNode;
}

export const ProjectLayout = ({ children, hideHeader = false, actions }: React.PropsWithChildren<Props>) => {
  const { isSignedIn } = useProtectedPage();
  const router = useRouter();
  const {
    data: project,
    isPending,
    isError,
    error,
  } = useGetProjectId(router.query.id as string, {
    enabled: !!router.query.id,
  });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  React.useEffect(() => {
    if (isError && 'status' in error && error.status !== 403) {
      addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
    }
  }, [isError, error, router]);

  const isEditProjectStatusesModalOpen = useProjectStatusesModal((state) => state.isVisible);
  const setIsEditProjectStatusesModalOpen = useProjectStatusesModal((state) => state.setIsVisible);

  if (!isSignedIn) {
    return;
  }

  if (isError && 'status' in error && error.status === 403) {
    return (
      <>
        <Header />
        <EmptyState title="You do not have permission to view this project">
          <Button as={NextLink} href="/" className="mt-2 bg-foreground text-content1">
            Browse my projects
          </Button>
        </EmptyState>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="flex min-h-0 flex-1 flex-col border-t border-foreground-200">
        {isPending || isError ? (
          <div className="flex flex-1">
            <ProjectLoader />
          </div>
        ) : (
          <ProjectContextProvider selectedProject={project}>
            <ProjectUploadContextProvider project={project} folderId={router.query.folderId?.toString()}>
              <div className="flex min-h-0 flex-1">
                {/* Sidebar */}
                {!hideHeader && (
                  <div className="flex-shrink-0">
                    <ProjectSidebar
                      projectId={project.id}
                      isCollapsed={isSidebarCollapsed}
                      onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    />
                  </div>
                )}
                {/* Main Content */}
                <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                  {hideHeader ? (
                    children
                  ) : (
                    <div className="flex flex-1 flex-col gap-4 p-6 pt-2">
                      <ProjectHeader project={project} />
                      {project.status !== 'active' && (
                        <div>
                          <NotActiveProjectAlert />
                        </div>
                      )}
                      {actions && <div className="flex gap-6">{actions}</div>}
                      <div className="flex flex-1 flex-col overflow-auto">{children}</div>
                    </div>
                  )}
                </div>
              </div>
            </ProjectUploadContextProvider>
          </ProjectContextProvider>
        )}
        <EditProjectStatusesModal
          project={project}
          isOpen={isEditProjectStatusesModalOpen}
          onClose={() => setIsEditProjectStatusesModalOpen(false)}
        />
      </div>
    </>
  );
};
