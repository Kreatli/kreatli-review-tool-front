import React from 'react';

import { useFileStateContext } from '../../../contexts/File';
import { ProjectDto } from '../../../services/types';
import { AssetComments } from '../AssetComments';
import { AssetDescription } from '../AssetDescription';
import { AssetPanelHeader } from './AssetPanelHeader';
import { AssetPanelInput } from './AssetPanelInput';
import { AssetPanelLoading } from './AssetPanelLoading';

interface Props {
  project?: ProjectDto;
  isLoading?: boolean;
}

export const AssetPanel = ({ project, isLoading = false }: Props) => {
  const { activeFile, commentsRef } = useFileStateContext();

  return (
    <div className="flex flex-col overflow-hidden">
      {!isLoading && <AssetPanelInput />}
      <AssetPanelHeader />
      <div ref={commentsRef} className="overflow-auto">
        {isLoading || !activeFile ? <AssetPanelLoading /> : <AssetDescription file={activeFile} />}
        {activeFile && <AssetComments project={project} fileId={activeFile.id} />}
      </div>
    </div>
  );
};
