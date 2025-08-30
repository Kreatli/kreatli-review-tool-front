import React from 'react';

import { AssetContextProvider } from '../../../contexts/Asset';
import { useFileContext } from '../../../contexts/File';
import { ReviewToolCanvasShapesContextProvider, ReviewToolContextProvider } from '../../../contexts/ReviewTool';
import { ReviewToolCanvas } from './ReviewToolCanvas';
import { ReviewToolFooter } from './ReviewToolFooter';
import { ReviewToolHeader } from './ReviewToolHeader';
import { ReviewToolLoading } from './ReviewToolLoading';

export const ReviewTool = () => {
  const { file, project, isLoading } = useFileContext();

  if (isLoading || !file || !project) {
    return <ReviewToolLoading />;
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <ReviewToolContextProvider>
        <ReviewToolCanvasShapesContextProvider>
          <AssetContextProvider projectId={project.id} selectedAsset={file} project={project}>
            <ReviewToolHeader file={file} project={project} />
          </AssetContextProvider>
          <ReviewToolCanvas file={file} />
          <ReviewToolFooter isDisabled={project.status !== 'active'} />
        </ReviewToolCanvasShapesContextProvider>
      </ReviewToolContextProvider>
    </div>
  );
};
