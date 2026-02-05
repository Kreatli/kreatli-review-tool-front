import { addToast, Button, Tab, Tabs } from '@heroui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { ProjectContextProvider } from '../../../contexts/Project';
import { ProjectUploadContextProvider } from '../../../contexts/Project/ProjectUploadContext';
import { useOnboardingStore } from '../../../hooks/useOnboarding';
import { useProjectStatusesModal } from '../../../hooks/useProjectStatusesModal';
import { useProtectedPage } from '../../../hooks/useProtectedPage';
import { useSession } from '../../../hooks/useSession';
import { useGetProjectId } from '../../../services/hooks';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Header } from '../../layout/Header';
import { EmptyState } from '../../various/EmptyState';
import { EditProjectStatusesModal } from '../ProjectModals/EditProjectStatusesModal';
import { NotActiveProjectAlert } from './NotActiveProjectAlert';
import { OnboardingJoyride } from '../../onboarding/OnboardingJoyride';
import { ProjectHeader } from './ProjectHeader';
import { ProjectLoader } from './ProjectLoader';
import { ProjectPaywall } from './ProjectPaywall';

interface Props {
  hideHeader?: boolean;
  actions?: React.ReactNode;
}

export const ProjectLayout = ({ children, hideHeader = false, actions }: React.PropsWithChildren<Props>) => {
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
  const onboardingRun = useOnboardingStore((s) => s.run);
  const onboardingStep = useOnboardingStore((s) => s.step);
  const completedTabSteps = useOnboardingStore((s) => s.completedTabSteps);

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

  if (!isPending && !isError && user && !project.createdBy?.subscription.isActive) {
    return <ProjectPaywall project={project} user={user} />;
  }

  return (
    <>
      <Header />
      <div className="flex flex-1 flex-col border-t border-foreground-200 p-6 pt-2">
        {isPending || isError ? (
          <ProjectLoader />
        ) : (
          <ProjectContextProvider selectedProject={project}>
            <ProjectUploadContextProvider project={project} folderId={router.query.folderId?.toString()}>
              {hideHeader ? (
                children
              ) : (
                <div className="flex flex-1 flex-col gap-4">
                  <ProjectHeader project={project} />
                  {project.status !== 'active' && (
                    <div>
                      <NotActiveProjectAlert />
                    </div>
                  )}
                  <div className="flex flex-col gap-6 gap-y-2 sm:flex-row">
                    <div data-onboarding="project-tabs">
                      <Tabs selectedKey={router.pathname.split('/')[3]}>
                        <Tab as={NextLink} href={`/project/${project.id}/dashboard`} title="Home" key="dashboard" />
                        <Tab as={NextLink} href={`/project/${project.id}/assets`} title="Media" key="assets" />
                        <Tab as={NextLink} href={`/project/${project.id}/chat`} title="Chat" key="chat" />
                        <Tab as={NextLink} href={`/project/${project.id}/activity`} title="Activity" key="activity" />
                      </Tabs>
                    </div>
                    {actions}
                  </div>
                  <div className="flex flex-1 flex-col">{children}</div>
                </div>
              )}
            </ProjectUploadContextProvider>
          </ProjectContextProvider>
        )}
        <EditProjectStatusesModal
          project={project}
          isOpen={isEditProjectStatusesModalOpen}
          onClose={() => setIsEditProjectStatusesModalOpen(false)}
        />
      </div>
      {!isPending && !isError && project && (
        <>
          <OnboardingJoyride stepIndex={1} run={onboardingRun && onboardingStep === 1} />
          <OnboardingJoyride stepIndex={10} run={onboardingRun && onboardingStep === 10} />
          <OnboardingJoyride stepIndex={11} run={onboardingRun && onboardingStep === 11} />
          {onboardingStep === 12 && !completedTabSteps.home && router.pathname.includes('/dashboard') && (
            <OnboardingJoyride stepIndex={12} run={onboardingRun} key="home" />
          )}
          {onboardingStep === 12 && !completedTabSteps.chat && router.pathname.includes('/chat') && (
            <OnboardingJoyride stepIndex={13} run={onboardingRun} key="chat" />
          )}
          {onboardingStep === 12 && !completedTabSteps.activity && router.pathname.includes('/activity') && (
            <OnboardingJoyride stepIndex={14} run={onboardingRun} key="activity" />
          )}
        </>
      )}
    </>
  );
};
