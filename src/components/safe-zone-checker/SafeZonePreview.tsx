import { Image } from '@heroui/react';
import React, { useRef, useEffect, useState } from 'react';

import { Platform } from './SafeZoneUpload';
import { PlatformOverlay } from './PlatformOverlay';

interface Props {
  file: File;
  platform: Platform;
  showSafeZones: boolean;
  currentTime?: number; // For video scrubbing
  onVideoLoad?: (video: HTMLVideoElement) => void;
}

export const SafeZonePreview = ({ file, platform, showSafeZones, currentTime, onVideoLoad }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  useEffect(() => {
    if (file.type.startsWith('video/') && videoRef.current) {
      const video = videoRef.current;
      const handleLoadedMetadata = () => {
        onVideoLoad?.(video);
      };
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [previewUrl, file.type, onVideoLoad]);

  useEffect(() => {
    if (videoRef.current && currentTime !== undefined) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  const isVideo = file.type.startsWith('video/');

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {isVideo ? (
        <>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={videoRef}
            src={previewUrl}
            className="w-full h-full object-contain relative"
            style={{
              zIndex: 1,
            }}
            controls={false}
            muted
            playsInline
          />
          <PlatformOverlay
            platform={platform}
            showSafeZones={showSafeZones}
          />
        </>
      ) : (
        <>
          <Image
            src={previewUrl}
            alt={file.name}
            removeWrapper
            className="w-full h-full object-contain relative"
            style={{
              zIndex: 1,
            }}
          />
          <PlatformOverlay
            platform={platform}
            showSafeZones={showSafeZones}
          />
        </>
      )}
    </div>
  );
};
