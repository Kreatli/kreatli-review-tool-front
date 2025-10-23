import { Image } from '@heroui/react';
import React from 'react';

import { useReviewToolContext } from '../../../../contexts/ReviewTool';
import { FileDto } from '../../../../services/types';
import { useFileStateContext } from '../../../../contexts/File';

interface Props {
  imageFile: FileDto;
  onLoad: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

export const ReviewToolImage = ({ imageFile, onLoad }: Props) => {
  const { fileRef, compareFileRef } = useReviewToolContext();
  const { compareFile } = useFileStateContext();

  const imageUrl = imageFile.metadata.thumbnailUrl ?? imageFile.url;
  const isSvg = imageFile.format === 'svg';

  return (
    <>
      <div className="absolute -inset-12">
        {!isSvg && (
          <Image
            src={imageUrl}
            removeWrapper
            radius="none"
            className="absolute inset-0 h-full w-full blur-xl grayscale pointer-events-none select-none"
          />
        )}
      </div>
      <Image
        src={imageUrl}
        // @ts-ignore
        ref={compareFile?.id === imageFile.id ? compareFileRef : fileRef}
        radius="none"
        shadow="lg"
        {...(isSvg && {
          width: '100%',
          height: '100%',
        })}
        classNames={{ wrapper: 'max-h-full max-w-full h-auto overflow-hidden' }}
        className="pointer-events-none select-none h-full"
        alt={imageFile.name}
        onLoad={onLoad}
      />
    </>
  );
};
