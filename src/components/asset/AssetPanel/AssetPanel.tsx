import React, { useState } from 'react';
import { Tab, Tabs } from '@heroui/react';

import { AssetComments } from '../AssetComments';
import { AssetDescription } from '../AssetDescription';
import { AssetPanelHeader } from './AssetPanelHeader';
import { AssetPanelLoading } from './AssetPanelLoading';
import { useFileStateContext } from '../../../contexts/File';
import { ProjectDto } from '../../../services/types';
import { ReviewToolTasksPanel } from '../ReviewTool/ReviewToolTasksPanel';

interface Props {
  project?: ProjectDto;
  isLoading?: boolean;
}

export const AssetPanel = ({ project, isLoading = false }: Props) => {
  const { activeFile, commentsRef } = useFileStateContext();
  const [activeTab, setActiveTab] = useState<'comments' | 'tasks'>('comments');

  return (
    <div className="flex flex-col overflow-hidden">
      <AssetPanelHeader />
      
      {project && activeFile && (
        <div className="border-b border-foreground-200 px-4 py-2">
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as 'comments' | 'tasks')}
            size="sm"
          >
            <Tab key="comments" title="Comments" />
            <Tab key="tasks" title="Tasks" />
          </Tabs>
        </div>
      )}

      <div ref={commentsRef} className="overflow-auto px-4">
        {activeTab === 'comments' ? (
          <>
            {isLoading || !activeFile ? <AssetPanelLoading /> : <AssetDescription file={activeFile} />}
            {activeFile && <AssetComments project={project} fileId={activeFile.id} />}
          </>
        ) : (
          activeFile && project && (
            <ReviewToolTasksPanel project={project} fileId={activeFile.id} />
          )
        )}
      </div>
    </div>
  );
};
