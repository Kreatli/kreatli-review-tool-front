import { addToast, Button, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';

import { useDeleteTaskIdAssetAssetId } from '../../../services/hooks';
import { getAssetIdTasks, getTaskIdAssets } from '../../../services/services';
import { AssetFileDto } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../../various/Icon';
import { TaskAsset } from './TaskAsset';

interface Props {
  projectId: string;
  asset: AssetFileDto;
  taskId: string;
}

export const TaskAttachment = ({ projectId, asset, taskId }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useDeleteTaskIdAssetAssetId();

  const handleDelete = () => {
    mutate(
      { id: taskId, assetId: asset.id },
      {
        onSuccess: ({ assets }) => {
          queryClient.setQueryData([getTaskIdAssets.key, taskId], { assets });
          queryClient.invalidateQueries({ queryKey: [getAssetIdTasks.key, asset.id] });
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <TaskAsset projectId={projectId} asset={asset}>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button
            size="sm"
            isIconOnly
            isLoading={isPending}
            radius="full"
            variant="faded"
            className={cn('z-10 -mr-1 -mt-1 text-foreground-600 opacity-0 transition-opacity group-hover:opacity-100', {
              'opacity-100': isPending,
            })}
          >
            <Icon icon="dots" size={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="flat">
          <DropdownItem
            key="delete"
            color="danger"
            startContent={<Icon icon="trash" size={16} />}
            onClick={handleDelete}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </TaskAsset>
  );
};
