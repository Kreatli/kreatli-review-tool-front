import React, { useState, useEffect } from 'react';
import { Image, Spinner } from '@heroui/react';
import { getAssetFileId } from '../../../services/services';
import { AssetIcon } from '../../asset/AssetIcon';
import { FileDto } from '../../../services/types';

interface Props {
  mediaIds: string[];
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const DeliverableMediaPreview = ({ mediaIds, maxVisible = 3, size = 'sm' }: Props) => {
  const [mediaData, setMediaData] = useState<(FileDto | null)[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const sizeMap = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
  };

  const dimensions = sizeMap[size];

  useEffect(() => {
    const loadMedia = async () => {
      if (mediaIds.length === 0) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const promises = mediaIds.slice(0, maxVisible).map(async (id) => {
          try {
            const response = await getAssetFileId(id);
            return response as FileDto;
          } catch (error) {
            console.error(`Failed to load media ${id}:`, error);
            return null;
          }
        });

        const results = await Promise.all(promises);
        setMediaData(results);
      } catch (error) {
        console.error('Failed to load media:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMedia();
  }, [mediaIds, maxVisible]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner size="sm" />
      </div>
    );
  }

  if (mediaIds.length === 0) {
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded bg-default-100">
        <AssetIcon fileType="" size={20} />
      </div>
    );
  }

  const visibleMedia = mediaData.filter(Boolean).slice(0, maxVisible);
  const remainingCount = mediaIds.length - maxVisible;

  return (
    <div className="flex items-center gap-1">
      {visibleMedia.map((media, index) => {
        if (!media) return null;

        const imageUrl = media.fileType?.startsWith('image') 
          ? media.url 
          : media.metadata?.thumbnailUrl;

        return (
          <div
            key={media.id || index}
            className="relative flex-shrink-0 overflow-hidden rounded border border-default-200 bg-default-50"
            style={{ width: dimensions.width, height: dimensions.height }}
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                width={dimensions.width}
                height={dimensions.height}
                radius="none"
                classNames={{ img: 'object-cover' }}
                alt={media.name}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <AssetIcon fileType={media.fileType || ''} size={dimensions.width / 2} />
              </div>
            )}
          </div>
        );
      })}
      {remainingCount > 0 && (
        <div
          className="flex items-center justify-center rounded border border-default-200 bg-default-100 text-xs font-medium text-foreground-600"
          style={{ width: dimensions.width, height: dimensions.height }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

