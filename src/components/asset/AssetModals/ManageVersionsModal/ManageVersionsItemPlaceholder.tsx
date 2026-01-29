import { cn, Image } from '@heroui/react';
import React from 'react';

import { ProjectFileDto } from '../../../../services/types';
import { AssetIcon } from '../../AssetIcon';

interface Props {
  file: ProjectFileDto;
  isActive?: boolean;
}

export const ManageVersionsItemPlaceholder = ({ file, isActive = false }: Props) => {
  const [isError, setIsError] = React.useState(false);

  const previewUrl = file.metadata.thumbnailUrl ?? file.url;

  const handleError = () => {
    setIsError(true);
  };

  return (
    <div
      className={cn(
        'pointer-events-none flex aspect-video w-20 shrink-0 justify-center overflow-hidden rounded-medium border border-foreground-200 bg-foreground-50',
        {
          'border-foreground': isActive,
        },
      )}
    >
      {isError ? (
        <AssetIcon fileType={file.fileType} />
      ) : (
        <Image
          src={previewUrl}
          radius="none"
          classNames={{ wrapper: 'flex items-center select-none' }}
          className="max-h-full"
          {...(file.format === 'svg' && {
            width: file.metadata.width,
          })}
          draggable={false}
          alt={file.name}
          onError={handleError}
        />
      )}
    </div>
  );
};
