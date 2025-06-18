import { Image } from '@heroui/react';
import React from 'react';

import { useReviewToolContext } from '../../../../contexts/ReviewTool';
import { FileDto } from '../../../../services/types';

interface Props {
  imageFile: FileDto;
  onLoad: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

export const ReviewToolImage = ({ imageFile, onLoad }: Props) => {
  const { fileRef } = useReviewToolContext();

  const imageUrl = imageFile.fileType.startsWith('image') ? imageFile.url : imageFile.metadata.thumbnailUrl;

  return (
    <>
      <div className="absolute -inset-12">
        <Image
          src={imageUrl}
          removeWrapper
          radius="none"
          className="absolute inset-0 h-full w-full blur-xl grayscale pointer-events-none select-none"
        />
      </div>
      <Image
        src={imageUrl}
        // @ts-ignore
        ref={fileRef}
        radius="sm"
        shadow="lg"
        classNames={{ wrapper: 'max-h-full max-w-full h-auto overflow-hidden' }}
        className="pointer-events-none select-none h-full"
        alt={imageFile.name}
        onLoad={onLoad}
      />
    </>
  );
};
