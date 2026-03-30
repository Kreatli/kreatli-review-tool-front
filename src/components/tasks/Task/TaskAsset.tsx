import { Chip, cn, Image } from '@heroui/react';
import Link from 'next/link';

import { queryClient } from '../../../lib/queryClient';
import { getProjectId } from '../../../services/services';
import { AssetFileDto, ProjectDto } from '../../../services/types';
import { formatBytes } from '../../../utils/formatBytes';
import { ProjectFileAssignee } from '../../project/ProjectAssets/ProjectFile/ProjectFileAssignee';
import { ProjectFileStatus } from '../../project/ProjectAssets/ProjectFile/ProjectFileStatus';

interface Props {
  asset: AssetFileDto;
  projectId: string;
  children: React.ReactNode;
  asLink?: boolean;
  showStatus?: boolean;
}

export const TaskAsset = ({ projectId, asset, children, asLink = true, showStatus = true }: Props) => {
  const project = queryClient.getQueryData<ProjectDto>([getProjectId.key, projectId]);
  const previewUrl = asset.metadata.thumbnailUrl ?? asset.url;

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
        <div className={cn('absolute left-2 right-2 top-2 flex justify-end gap-1', { 'justify-between': showStatus })}>
          {showStatus && (
            <ProjectFileStatus
              isDisabled={project?.status !== 'active'}
              projectId={project?.id ?? ''}
              statuses={project?.assetStatuses ?? []}
              file={asset}
            />
          )}
          {children}
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
      {asLink && <Link href={`/project/${projectId}/assets/${asset.id}`} className="absolute inset-0" />}
    </div>
  );
};
