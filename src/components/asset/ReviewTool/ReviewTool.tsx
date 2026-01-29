import { useRouter } from 'next/router';
import React from 'react';

import { AssetContextProvider } from '../../../contexts/Asset';
import { useFileStateContext } from '../../../contexts/File';
import { ReviewToolCanvasShapesContextProvider, ReviewToolContextProvider } from '../../../contexts/ReviewTool';
import { FileDto, ProjectDto, StackDto } from '../../../services/types';
import { ReviewToolCanvas } from './ReviewToolCanvas';
import { ReviewToolFooter } from './ReviewToolFooter';
import { ReviewToolHeader } from './ReviewToolHeader';
import { ReviewToolLoading } from './ReviewToolLoading';

interface Props {
  stack?: StackDto;
  project: ProjectDto | undefined;
  isLoading: boolean;
  onSwitchFile?: (file: FileDto) => void;
}

export const ReviewTool = ({ stack, project, isLoading, onSwitchFile }: Props) => {
  const router = useRouter();

  const { activeFile, file, compareFile, setActiveFileId, setActiveComment } = useFileStateContext();

  if (isLoading || !file || !project) {
    return <ReviewToolLoading />;
  }

  const handleHeaderClose = () => {
    setActiveComment(null);
    setActiveFileId(compareFile?.id ?? '');

    if (stack) {
      router.replace(`/project/${project.id}/assets/stack/${stack.id}?selectedFileId=${compareFile?.id}`);
    } else {
      router.replace(`/project/${project.id}/assets/${compareFile?.id}`);
    }
  };

  const handleCompareHeaderClose = () => {
    setActiveComment(null);
    setActiveFileId(file?.id ?? '');

    if (file.stackId) {
      router.replace(`/project/${project.id}/assets/stack/${file.stackId}?selectedFileId=${file.id}`);
    } else {
      router.replace(`/project/${project.id}/assets/${file?.id}`);
    }
  };

  return (
    <div key={file.id} className="flex flex-col overflow-hidden">
      <ReviewToolContextProvider>
        <ReviewToolCanvasShapesContextProvider>
          <AssetContextProvider projectId={project.id} selectedAsset={stack ?? file} project={project}>
            <div className="flex overflow-hidden">
              <ReviewToolHeader
                file={file}
                project={project}
                stack={stack}
                isActive={activeFile?.id === file.id && !!compareFile}
                isCompareMode={!!compareFile}
                onSwitchFile={onSwitchFile}
                onClick={() => setActiveFileId(file.id)}
                onClose={handleHeaderClose}
              />
              {compareFile && (
                <ReviewToolHeader
                  file={compareFile}
                  project={project}
                  isCompareMode={!!compareFile}
                  isActive={activeFile?.id === compareFile.id && !!compareFile}
                  onClick={() => setActiveFileId(compareFile.id)}
                  onClose={handleCompareHeaderClose}
                />
              )}
            </div>
          </AssetContextProvider>
          <div className="flex flex-1 overflow-hidden">
            <ReviewToolCanvas
              file={file}
              onClick={() => {
                setActiveFileId(file.id);
                setActiveComment(null);
              }}
            />
            {compareFile && (
              <ReviewToolCanvas
                file={compareFile}
                onClick={() => {
                  setActiveFileId(compareFile.id);
                  setActiveComment(null);
                }}
              />
            )}
          </div>
          <ReviewToolFooter isDisabled={project.status !== 'active'} project={project} />
        </ReviewToolCanvasShapesContextProvider>
      </ReviewToolContextProvider>
    </div>
  );
};
