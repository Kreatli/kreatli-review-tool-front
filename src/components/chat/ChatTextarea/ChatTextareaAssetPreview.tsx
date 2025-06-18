import { Image } from '@heroui/react';
import { AssetDto } from '../../../services/types';

interface Props {
  asset: AssetDto;
  width: number;
  height: number;
}

export const ChatTextareaAssetPreview = ({ asset, width, height }: Props) => {
  const imageUrl = asset.fileType.startsWith('image') ? asset.url : asset.metadata.thumbnailUrl;

  return (
    <Image
      src={imageUrl}
      width={width}
      height={height}
      radius="full"
      className="border"
      classNames={{ img: 'object-cover' }}
    />
  );
};
