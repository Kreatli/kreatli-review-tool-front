import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { FileStateContextProvider } from '../../../contexts/File';
import { ProjectUploadContextProvider } from '../../../contexts/Project/ProjectUploadContext';
import { useProjectStatusesModal } from '../../../hooks/useProjectStatusesModal';
import { useSession } from '../../../hooks/useSession';
import { useGetAssetFileId, useGetAssetStackId } from '../../../services/hooks';
import { useGetProjectId } from '../../../services/hooks';
import { FileDto } from '../../../services/types';
import { ProjectPaywall } from '../../project/Project/ProjectPaywall';
import { EditProjectStatusesModal } from '../../project/ProjectModals/EditProjectStatusesModal';
import { AssetPanel } from '../AssetPanel';
import { ReviewTool } from '../ReviewTool';

interface Props {
  stackId: string;
  projectId: string;
  compareFileId?: string | null;
}

export const Stack = ({ stackId, projectId, compareFileId }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useSession();

  const { data: stack, isPending: isAssetLoading, error } = useGetAssetStackId(stackId);
  const { data: compareFile, isLoading: isCompareAssetLoading } = useGetAssetFileId(compareFileId ?? '', {
    enabled: !!compareFileId,
  });
  const { data: project, isPending: isProjectLoading } = useGetProjectId(projectId);

  const selectedFileId = searchParams.get('selectedFileId') ?? stack?.active?.id;

  const selectedFile = useMemo(
    () => stack?.files.find((file) => file.id === selectedFileId),
    [stack?.files, selectedFileId],
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (stack?.active?.id && !params.get('selectedFileId')) {
      params.set('selectedFileId', stack?.active?.id ?? '');
    }

    router.replace(`${location.pathname}?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stack?.active]);

  const isEditProjectStatusesModalOpen = useProjectStatusesModal((state) => state.isVisible);
  const setIsEditProjectStatusesModalOpen = useProjectStatusesModal((state) => state.setIsVisible);

  const isLoading = isAssetLoading || isProjectLoading || isCompareAssetLoading;

  useEffect(() => {
    if (error && 'status' in error && error.status === 404) {
      const params = new URLSearchParams(location.search);
      const selectedFileId = params.get('selectedFileId');

      if (selectedFileId) {
        router.replace(`/project/${projectId}/assets/${selectedFileId}`);
      }
    }
  }, [error, router, projectId]);

  if (error && 'status' in error && error.status === 404) {
    return null;
  }

  if (!isProjectLoading && !error && user && project && !project?.createdBy?.subscription.isActive) {
    return <ProjectPaywall project={project} user={user} />;
  }

  if (isLoading || !project || !selectedFile) {
    return (
      <FileStateContextProvider fileId="" file={undefined}>
        <div className="grid-cols-[1fr,350px] md:grid md:h-screen">
          <ReviewTool project={project} isLoading={isLoading} />
          <AssetPanel project={project} isLoading={isLoading} />
        </div>
      </FileStateContextProvider>
    );
  }

  const handleSwitchFile = (file: FileDto) => {
    const params = new URLSearchParams(location.search);

    params.set('selectedFileId', file.id);

    router.replace(`${location.pathname}?${params.toString()}`);
  };

  return (
    <>
      <ProjectUploadContextProvider project={project} folderId={router.query.folderId?.toString()}>
        <FileStateContextProvider fileId={selectedFile.id} file={selectedFile} compareFile={compareFile}>
          <div className="grid-cols-[1fr,350px] md:grid md:h-screen">
            <ReviewTool
              project={project}
              stack={stack}
              stackSelectedFile={selectedFile}
              isLoading={isLoading}
              onSwitchFile={handleSwitchFile}
            />
            <AssetPanel project={project} isLoading={isLoading} />
          </div>
        </FileStateContextProvider>
      </ProjectUploadContextProvider>

      <EditProjectStatusesModal
        project={project}
        isOpen={isEditProjectStatusesModalOpen}
        onClose={() => setIsEditProjectStatusesModalOpen(false)}
      />
    </>
  );
};
