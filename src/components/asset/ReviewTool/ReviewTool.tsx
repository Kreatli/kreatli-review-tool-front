import React from 'react';

import { AssetContextProvider } from '../../../contexts/Asset';
import { useFileContext } from '../../../contexts/File';
import { ReviewToolCanvasShapesContextProvider, ReviewToolContextProvider } from '../../../contexts/ReviewTool';
import { ReviewToolCanvas } from './ReviewToolCanvas';
import { ReviewToolFooter } from './ReviewToolFooter';
import { ReviewToolHeader } from './ReviewToolHeader';
import { ReviewToolLoading } from './ReviewToolLoading';
import { useRouter } from 'next/router';

export const ReviewTool = () => {
  const router = useRouter();

  const { activeFile, file, compareFile, project, isLoading, setActiveFileId, setActiveComment } = useFileContext();

  if (isLoading || !file || !project) {
    return <ReviewToolLoading />;
  }

  return (
    <div key={file.id} className="flex flex-col overflow-hidden">
      <ReviewToolContextProvider>
        <ReviewToolCanvasShapesContextProvider>
          <AssetContextProvider projectId={project.id} selectedAsset={file} project={project}>
            <div className="flex overflow-hidden">
              <ReviewToolHeader
                file={file}
                project={project}
                isActive={activeFile?.id === file.id && !!compareFile}
                isCompareMode={!!compareFile}
                onClick={() => setActiveFileId(file.id)}
                onClose={() => {
                  setActiveFileId(compareFile?.id ?? '');
                  router.push(`/project/${project.id}/assets/${compareFile?.id}`);
                }}
              />
              {compareFile && (
                <ReviewToolHeader
                  file={compareFile}
                  project={project}
                  isCompareMode={!!compareFile}
                  isActive={activeFile?.id === compareFile.id && !!compareFile}
                  onClick={() => setActiveFileId(compareFile.id)}
                  onClose={() => {
                    setActiveFileId(file?.id ?? '');
                    router.push(`/project/${project.id}/assets/${file?.id}`);
                  }}
                />
              )}
            </div>
          </AssetContextProvider>
          <div className="flex-1 flex overflow-hidden">
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
          <ReviewToolFooter isDisabled={project.status !== 'active'} />
        </ReviewToolCanvasShapesContextProvider>
      </ReviewToolContextProvider>
    </div>
  );
};
