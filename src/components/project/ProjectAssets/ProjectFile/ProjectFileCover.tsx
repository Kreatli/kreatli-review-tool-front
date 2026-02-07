import { Chip, Image, Spinner } from '@heroui/react';
import React from 'react';

import { ProjectFileDto } from '../../../../services/types';
import { formatBytes } from '../../../../utils/formatBytes';
import { AssetIcon } from '../../../asset/AssetIcon';

interface Props {
  file: ProjectFileDto;
  isLoading?: boolean;
}

export const ProjectFileCover = ({ file, isLoading = false }: Props) => {
  const [isError, setIsError] = React.useState(false);

  const previewUrl = file.metadata.thumbnailUrl ?? file.url;

  const handleError = () => {
    setIsError(true);
  };

  return (
    <div className="relative flex aspect-video justify-center overflow-hidden rounded-2xl border border-foreground-300 bg-foreground-50">
      {isError ? (
        <AssetIcon fileType={file.fileType} />
      ) : (
        <Image
          src={previewUrl}
          radius="none"
          classNames={{ wrapper: 'flex items-center select-none', img: 'mx-auto' }}
          className="max-h-full"
          {...(file.format === 'svg' && {
            width: file.metadata.width,
          })}
          draggable={false}
          alt={file.name}
          onError={handleError}
        />
      )}
      <Chip size="sm" variant="faded" className="absolute bottom-2 right-2 z-10 border-1">
        <span className="font-medium text-foreground-700">{formatBytes(file.fileSize)}</span>
      </Chip>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-foreground-50/75 p-4">
          <Spinner color="current" className="text-foreground" />
        </div>
      )}
    </div>
  );
};
