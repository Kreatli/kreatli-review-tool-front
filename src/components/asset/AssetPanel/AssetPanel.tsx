import { Tab, Tabs } from '@heroui/react';
import { useState } from 'react';

import { useFileStateContext } from '../../../contexts/File';
import { ProjectDto } from '../../../services/types';
import { AssetComments } from '../AssetComments';
import { AssetDescription } from '../AssetDescription';
import { AssetTasks } from '../AssetTasks';
import { AssetPanelHeader } from './AssetPanelHeader';
import { AssetPanelInput } from './AssetPanelInput';
import { AssetPanelLoading } from './AssetPanelLoading';

interface Props {
  project?: ProjectDto;
  isLoading?: boolean;
}

export const AssetPanel = ({ project, isLoading = false }: Props) => {
  const [selectedTab, setSelectedTab] = useState<string | number>('comments');

  const { activeFile, commentsRef } = useFileStateContext();

  return (
    <div className="flex flex-col overflow-hidden">
      {!isLoading && <AssetPanelInput />}
      <AssetPanelHeader />
      <div ref={commentsRef} className="overflow-auto">
        {isLoading || !activeFile ? (
          <AssetPanelLoading />
        ) : (
          <>
            <AssetDescription file={activeFile} />
            {activeFile && (
              <Tabs
                size="sm"
                selectedKey={selectedTab}
                onSelectionChange={setSelectedTab}
                className="w-full px-2"
                classNames={{ tabList: 'w-full' }}
              >
                <Tab title="Comments" key="comments">
                  <AssetComments project={project} fileId={activeFile.id} />
                </Tab>
                <Tab title="Tasks" key="tasks">
                  <AssetTasks assetId={activeFile.id} projectId={project?.id ?? ''} />
                </Tab>
              </Tabs>
            )}
          </>
        )}
      </div>
    </div>
  );
};
