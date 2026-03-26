import { addToast, Button, Chip } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';

import { useGetTaskIdAssets, usePostTaskIdAsset } from '../../../services/hooks';
import { getTaskIdAssets } from '../../../services/services';
import { AssetFileDto } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { AssetPicker } from '../../asset/AssetPicker';
import { Icon } from '../../various/Icon';
import { TaskAttachment } from './TaskAttachment';

interface Props {
  projectId: string;
  taskId: string;
}

export const TaskAttachments = ({ projectId, taskId }: Props) => {
  const queryClient = useQueryClient();

  const { mutate } = usePostTaskIdAsset();
  const { data } = useGetTaskIdAssets(taskId);

  const handleSelectAsset = (asset: AssetFileDto) => {
    mutate(
      { id: taskId, requestBody: { assetId: asset.id } },
      {
        onSuccess: ({ assets }) => {
          queryClient.setQueryData([getTaskIdAssets.key, taskId], { assets });
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  const hasAssets = data?.assets && data.assets.length > 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-1 pl-3 font-semibold">
          Media
          <Chip size="sm" variant="flat" classNames={{ content: 'font-semibold' }}>
            {data?.assets.length ?? 0}
          </Chip>
        </div>
        {hasAssets && (
          <AssetPicker
            projectId={projectId}
            skipIds={data?.assets.map((asset) => asset.id) ?? []}
            onSelect={handleSelectAsset}
          >
            <Button size="sm" variant="light" radius="full" isIconOnly>
              <Icon icon="plus" size={16} />
            </Button>
          </AssetPicker>
        )}
      </div>
      {hasAssets ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
          {data?.assets.map((asset) => (
            <TaskAttachment key={asset.id} projectId={projectId} asset={asset} taskId={taskId} />
          ))}
        </div>
      ) : (
        <AssetPicker projectId={projectId} onSelect={handleSelectAsset}>
          <Button className="w-fit" size="sm" variant="flat">
            Link media
          </Button>
        </AssetPicker>
      )}
    </div>
  );
};
