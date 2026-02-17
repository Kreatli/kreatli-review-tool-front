import { addToast, Button } from '@heroui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { ProjectContextProvider } from '../../../contexts/Project';
import { ProjectUploadContextProvider } from '../../../contexts/Project/ProjectUploadContext';
import { useProjectStatusesModal } from '../../../hooks/useProjectStatusesModal';
import { useProtectedPage } from '../../../hooks/useProtectedPage';
import { useSession } from '../../../hooks/useSession';
import { useGetProjectId } from '../../../services/hooks';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Header } from '../../layout/Header';
import { EmptyState } from '../../various/EmptyState';
import { EditProjectStatusesModal } from '../ProjectModals/EditProjectStatusesModal';
import { NotActiveProjectAlert } from './NotActiveProjectAlert';
import { ProjectLoader } from './ProjectLoader';
import { ProjectPaywall } from './ProjectPaywall';
import { ProjectSidebar } from './ProjectSidebar';

export const ProjectLayout = ({ children }: React.PropsWithChildren) => {
  const { isSignedIn } = useProtectedPage();
  const { user } = useSession();
  const router = useRouter();
  const {
    data: project,
    isPending,
    isError,
    error,
  } = useGetProjectId(router.query.id as string, {
    enabled: !!router.query.id,
  });

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
        <div className="border-t border-foreground-200" />
        <EmptyState title="You do not have permission to view this project">
          <Button as={NextLink} href="/" className="mt-2 bg-foreground text-content1">
            Browse my projects
          </Button>
        </EmptyState>
      </>
    );
  }

  if (!isPending && !isError && user && !project.createdBy?.subscription.isActive) {
    return <ProjectPaywall project={project} user={user} />;
  }

  return (
    <>
      <Header />
      <div className="grid flex-1 grid-cols-[auto_1fr] border-t border-foreground-200 md:grid-cols-[200px_1fr]">
        <ProjectSidebar isLoading={isPending} project={project} />
        {isPending || isError ? (
          <ProjectLoader />
        ) : (
          <ProjectContextProvider selectedProject={project}>
            <ProjectUploadContextProvider project={project} folderId={router.query.folderId?.toString()}>
              <div>
                {project.status !== 'active' && <NotActiveProjectAlert />}
                {children}
              </div>
            </ProjectUploadContextProvider>
          </ProjectContextProvider>
        )}
      </div>
      <EditProjectStatusesModal
        project={project}
        isOpen={isEditProjectStatusesModalOpen}
        onClose={() => setIsEditProjectStatusesModalOpen(false)}
      />
    </>
  );
};
