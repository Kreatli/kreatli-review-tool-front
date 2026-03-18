import {
  addToast,
  Button,
  Chip,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import { useDeleteTaskIdAssetAssetId } from '../../../services/hooks';
import { getAssetIdTasks, getProjectId, getTaskIdAssets } from '../../../services/services';
import { AssetFileDto, ProjectDto } from '../../../services/types';
import { formatBytes } from '../../../utils/formatBytes';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { ProjectFileAssignee } from '../../project/ProjectAssets/ProjectFile/ProjectFileAssignee';
import { ProjectFileStatus } from '../../project/ProjectAssets/ProjectFile/ProjectFileStatus';
import { Icon } from '../../various/Icon';

interface Props {
  projectId: string;
  asset: AssetFileDto;
  taskId: string;
}

export const TaskAttachment = ({ projectId, asset, taskId }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useDeleteTaskIdAssetAssetId();

  const project = queryClient.getQueryData<ProjectDto>([getProjectId.key, projectId]);
  const previewUrl = asset.metadata.thumbnailUrl ?? asset.url;

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
    <div className="group relative flex flex-col overflow-hidden rounded-medium border border-transparent shadow-medium transition-all hover:border-foreground-300 hover:shadow-none">
      <div className="relative flex aspect-video h-full w-full justify-center overflow-hidden bg-foreground-100">
        <Image
          src={previewUrl}
          className="pointer-events-none mx-auto max-h-full"
          classNames={{ wrapper: 'flex items-center' }}
          radius="none"
          alt={asset.name}
        />
        <div className="absolute left-2 right-2 top-2 flex justify-between gap-1">
          <ProjectFileStatus
            isDisabled={project?.status !== 'active'}
            projectId={project?.id ?? ''}
            statuses={project?.assetStatuses ?? []}
            file={asset}
          />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                size="sm"
                isIconOnly
                isLoading={isPending}
                radius="full"
                variant="faded"
                className={cn(
                  'z-10 -mr-1 -mt-1 text-foreground-600 opacity-0 transition-opacity group-hover:opacity-100',
                  {
                    'opacity-100': isPending,
                  },
                )}
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
        </div>
      </div>
      <div className="flex gap-1.5 p-2">
        <ProjectFileAssignee size="xs" projectId={projectId} file={asset} members={project?.members ?? []} />
        <div className="flex flex-col overflow-hidden">
          <div className="truncate text-xs font-semibold">{asset.name}</div>
          <div className="text-xs text-foreground-500">{formatBytes(asset.fileSize)}</div>
        </div>
        {asset.stackVersion && (
          <Chip size="sm" variant="flat" className="h-auto self-start p-0.5">
            v{asset.stackVersion}
          </Chip>
        )}
      </div>
      <Link href={`/project/${projectId}/assets/${asset.id}`} className="absolute inset-0" />
    </div>
  );
};
