import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { FileStateContextProvider } from '../../../contexts/File';
import { useProjectStatusesModal } from '../../../hooks/useProjectStatusesModal';
import { useSession } from '../../../hooks/useSession';
import { useGetAssetFileId } from '../../../services/hooks';
import { useGetProjectId } from '../../../services/hooks';
import { ProjectPaywall } from '../../project/Project/ProjectPaywall';
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

  const isLoading = isAssetLoading || isProjectLoading || isCompareAssetLoading;

  useEffect(() => {
    if (error && 'status' in error && error.status === 404) {
      router.replace('/404');
    }
  }, []);

  if (error && 'status' in error && error.status === 404) {
    return null;
  }

  if (!isProjectLoading && !error && user && project && !project?.createdBy?.subscription.isActive) {
    return <ProjectPaywall project={project} user={user} />;
  }

  return (
    <>
      <FileStateContextProvider fileId={fileId} file={file} compareFile={compareFile}>
        <div className="grid-cols-[1fr,350px] md:grid md:h-screen">
          <ReviewTool project={project} isLoading={isLoading} />
          <AssetPanel project={project} isLoading={isLoading} />
        </div>
      </FileStateContextProvider>
      <EditProjectStatusesModal
        project={project}
        isOpen={isEditProjectStatusesModalOpen}
        onClose={() => setIsEditProjectStatusesModalOpen(false)}
      />
    </>
  );
};
