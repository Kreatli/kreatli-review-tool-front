import { Image } from '@heroui/react';
import { AssetDto, ProjectMemberDto } from '../../../services/types';
import React from 'react';
import { AssetIcon } from '../../asset/AssetIcon';
import Link from 'next/link';
import { ProjectFileStatus } from '../../project/ProjectAssets/ProjectFile/ProjectFileStatus';
import { ProjectFileAssignee } from '../../project/ProjectAssets/ProjectFile/ProjectFileAssignee';

interface Props {
  projectId: string;
  file: AssetDto;
  members: ProjectMemberDto[];
}

export const DashboardAsset = ({ projectId, file, members }: Props) => {
  const [isError, setIsError] = React.useState(false);

  const previewUrl = file.metadata.thumbnailUrl ?? file.url;

  const handleError = () => {
    setIsError(true);
  };

  return (
    <div className="w-full h-full group/asset hover:border-foreground-400 transition-all aspect-video flex items-center bg-foreground-100 justify-center overflow-hidden border border-foreground-200 rounded-medium relative">
      {isError ? (
        <div>
          <AssetIcon fileType={file.fileType} size={24} />
        </div>
      ) : (
        <Image src={previewUrl} radius="none" onError={handleError} />
      )}
      <div className="absolute -top-8 left-0 right-0 p-1.5 z-10 group-hover/asset:top-0 transition-all bg-foreground-50/75">
        <div className="whitespace-nowrap text-ellipsis text-xs relative overflow-hidden">{file.name}</div>
      </div>
      <ProjectFileStatus
        className="border-1 absolute bottom-2 left-2 z-20"
        projectId={projectId}
        file={file}
        isDisabled={false}
      />
      <ProjectFileAssignee
        file={file}
        members={members}
        size="xs"
        projectId={projectId}
        className="absolute bottom-1.5 right-1.5 z-20"
      />
      <Link href={`/project/${projectId}/assets/${file.id}`} aria-label={file.name} className="absolute inset-0 z-10" />
    </div>
  );
};
