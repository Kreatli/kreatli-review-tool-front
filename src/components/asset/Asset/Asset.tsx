import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { FileStateContextProvider } from '../../../contexts/File';
import { ProjectUploadContextProvider } from '../../../contexts/Project/ProjectUploadContext';
import { useOnboardingStore } from '../../../hooks/useOnboarding';
import { useProjectStatusesModal } from '../../../hooks/useProjectStatusesModal';
import { useSession } from '../../../hooks/useSession';
import { useGetAssetFileId } from '../../../services/hooks';
import { useGetProjectId } from '../../../services/hooks';
import { ProjectPaywall } from '../../project/Project/ProjectPaywall';
import { OnboardingJoyride } from '../../onboarding/OnboardingJoyride';
import { EditProjectStatusesModal } from '../../project/ProjectModals/EditProjectStatusesModal';
import { AssetPanel } from '../AssetPanel';
import { ReviewTool } from '../ReviewTool';

interface Props {
  fileId: string;
  projectId: string;
  compareFileId?: string | null;
}

export const Asset = ({ fileId, projectId, compareFileId }: Props) => {
  const router = useRouter();
  const { user } = useSession();

  const { data: file, isPending: isAssetLoading, error } = useGetAssetFileId(fileId);
  const { data: compareFile, isLoading: isCompareAssetLoading } = useGetAssetFileId(compareFileId ?? '', {
    enabled: !!compareFileId,
  });
  const { data: project, isPending: isProjectLoading } = useGetProjectId(projectId);

  const isEditProjectStatusesModalOpen = useProjectStatusesModal((state) => state.isVisible);
  const setIsEditProjectStatusesModalOpen = useProjectStatusesModal((state) => state.setIsVisible);
  const onboardingStep = useOnboardingStore((s) => s.step);
  const onboardingRun = useOnboardingStore((s) => s.run);
  const advanceToFileOpened = useOnboardingStore((s) => s.advanceToFileOpened);
  const [assetOnboardingReady, setAssetOnboardingReady] = useState(false);

  const isLoading = isAssetLoading || isProjectLoading || isCompareAssetLoading;

  // When user opens file from Home tab (or any path that doesn't go through Media), advance to step 3 so "Draw on file" and later steps show.
  useEffect(() => {
    if (onboardingRun && onboardingStep === 2 && file && project && !isLoading) {
      advanceToFileOpened();
    }
  }, [onboardingRun, onboardingStep, file, project, isLoading, advanceToFileOpened]);

  const showAssetOnboarding = onboardingRun && typeof onboardingStep === 'number' && onboardingStep >= 3 && onboardingStep <= 9;
  useEffect(() => {
    if (!showAssetOnboarding) {
      setAssetOnboardingReady(false);
      return;
    }
    const id = requestAnimationFrame(() => {
      setAssetOnboardingReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, [showAssetOnboarding]);

  useEffect(() => {
    if (error && 'status' in error && error.status === 404) {
      router.replace('/404');
    }
  }, [error, router]);

  useEffect(() => {
    if (file?.stackId) {
      router.replace(`/project/${projectId}/assets/stack/${file.stackId}?selectedFileId=${file.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  if (error && 'status' in error && error.status === 404) {
    return null;
  }

  if (!isProjectLoading && !error && user && project && !project?.createdBy?.subscription.isActive) {
    return <ProjectPaywall project={project} user={user} />;
  }

  if (isLoading || !project) {
    return (
      <FileStateContextProvider fileId="" file={undefined}>
        <div className="grid-cols-[1fr,350px] md:grid md:h-screen">
          <ReviewTool project={project} isLoading={isLoading} />
          <AssetPanel project={project} isLoading={isLoading} />
        </div>
      </FileStateContextProvider>
    );
  }

  return (
    <>
      <ProjectUploadContextProvider project={project} folderId={router.query.folderId?.toString()}>
        <FileStateContextProvider fileId={fileId} file={file} compareFile={compareFile}>
          <div className="grid-cols-[1fr,350px] md:grid md:h-screen">
            <ReviewTool project={project} isLoading={isLoading} />
            <AssetPanel project={project} isLoading={isLoading} />
          </div>
        </FileStateContextProvider>
      </ProjectUploadContextProvider>

      <EditProjectStatusesModal
        project={project}
        isOpen={isEditProjectStatusesModalOpen}
        onClose={() => setIsEditProjectStatusesModalOpen(false)}
      />
      {showAssetOnboarding && assetOnboardingReady && typeof onboardingStep === 'number' && (
        <OnboardingJoyride key={onboardingStep} stepIndex={onboardingStep} run />
      )}
    </>
  );
};
