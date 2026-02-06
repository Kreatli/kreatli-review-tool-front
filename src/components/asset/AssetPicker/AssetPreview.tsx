import { Image } from '@heroui/react';

import { AssetFileDto } from '../../../services/types';
import { AssetIcon } from '../../asset/AssetIcon';

interface Props {
  asset: AssetFileDto;
  width: number;
  height: number;
}

export const AssetPreview = ({ asset, width, height }: Props) => {
  const imageUrl = asset.fileType.startsWith('image') ? asset.url : asset.metadata.thumbnailUrl;

  if (!imageUrl) {
    return (
      <div style={{ width, height }} className="rounded-full border">
        <AssetIcon fileType={asset.fileType} size={20} />
      </div>
    );
  }

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
