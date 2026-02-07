import { Chip, Image } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

import { AssetFileDto, ProjectDto, ProjectMemberDto } from '../../../services/types';
import { AssetIcon } from '../../asset/AssetIcon';
import { ProjectFileAssignee } from '../../project/ProjectAssets/ProjectFile/ProjectFileAssignee';
import { ProjectFileStatus } from '../../project/ProjectAssets/ProjectFile/ProjectFileStatus';

interface Props {
  project: ProjectDto;
  file: AssetFileDto;
  members: ProjectMemberDto[];
}

export const DashboardAsset = ({ project, file, members }: Props) => {
  const [isError, setIsError] = React.useState(false);

  const previewUrl = file.metadata.thumbnailUrl ?? file.url;

  const handleError = () => {
    setIsError(true);
  };

  return (
    <div className="group/asset relative flex aspect-video h-full w-full justify-center overflow-hidden rounded-medium border border-foreground-200 bg-foreground-100 transition-all hover:border-foreground-400">
      {isError ? (
        <div>
          <AssetIcon fileType={file.fileType} size={24} />
        </div>
      ) : (
        <Image src={previewUrl} className="mx-auto max-h-full" radius="none" onError={handleError} />
      )}
      <div className="absolute -top-8 left-0 right-0 z-10 flex items-center gap-1 bg-foreground-50/75 p-1.5 transition-all group-hover/asset:top-0">
        <div className="relative overflow-hidden text-ellipsis whitespace-nowrap text-xs">{file.name}</div>
      </div>
      <ProjectFileStatus
        className="absolute bottom-2 left-2 z-20 border-1"
        projectId={project.id}
        statuses={project.assetStatuses}
        file={file}
        isDisabled={false}
      />
      <ProjectFileAssignee
        file={file}
        members={members}
        size="xs"
        projectId={project.id}
        className="absolute bottom-1.5 right-1.5 z-20"
      />
      {file.stackVersion && (
        <Chip size="sm" className="absolute bottom-2.5 right-10 z-20 h-auto p-0.5">
          v{file.stackVersion}
        </Chip>
      )}
      <Link
        href={
          file.stackId
            ? `/project/${project.id}/assets/stack/${file.stackId}?selectedFileId=${file.id}`
            : `/project/${project.id}/assets/${file.id}`
        }
        aria-label={file.name}
        className="absolute inset-0 z-10"
      />
    </div>
  );
};
