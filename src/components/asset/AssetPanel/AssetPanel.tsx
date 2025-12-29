import React from 'react';

import { AssetComments } from '../AssetComments';
import { AssetDescription } from '../AssetDescription';
import { AssetPanelHeader } from './AssetPanelHeader';
import { AssetPanelLoading } from './AssetPanelLoading';
import { useFileStateContext } from '../../../contexts/File';
import { ProjectDto } from '../../../services/types';

interface Props {
  project?: ProjectDto;
  isLoading?: boolean;
}

export const AssetPanel = ({ project, isLoading = false }: Props) => {
  const { activeFile, commentsRef } = useFileStateContext();

  return (
    <div className="flex flex-col overflow-hidden">
      <AssetPanelHeader />
      <div ref={commentsRef} className="overflow-auto">
        {isLoading || !activeFile ? <AssetPanelLoading /> : <AssetDescription file={activeFile} />}
        {activeFile && <AssetComments project={project} fileId={activeFile.id} />}
      </div>
    </div>
  );
};
