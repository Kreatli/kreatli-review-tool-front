import React from 'react';

import ReelsOverlay from '../../assets/images/Reels_Kreatli_Overlay.png';
import ShortsOverlay from '../../assets/images/Shorts_Kreatli_Overlay.png';
import TikTokOverlay from '../../assets/images/TikTok_Kreatli_Overlay.png';
import { Platform } from './SafeZoneUpload';

interface Props {
  platform: Platform;
  width?: number;
  height?: number;
  showSafeZones: boolean;
}

const PLATFORM_OVERLAYS: Record<Platform, typeof ReelsOverlay> = {
  'instagram-reels': ReelsOverlay,
  'youtube-shorts': ShortsOverlay,
  tiktok: TikTokOverlay,
};

const PLATFORM_ALT_TEXT: Record<Platform, string> = {
  'instagram-reels': 'Instagram Reels Overlay',
  'youtube-shorts': 'YouTube Shorts Overlay',
  tiktok: 'TikTok Overlay',
};

export const PlatformOverlay = ({ platform, showSafeZones }: Props) => {
  const overlayImage = PLATFORM_OVERLAYS[platform];
  const altText = PLATFORM_ALT_TEXT[platform];

  // Handle both string and StaticImageData types
  const overlaySrc = typeof overlayImage === 'string' ? overlayImage : overlayImage.src;

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 10, // Ensure overlay is on top
      }}
    >
      <img
        src={overlaySrc}
        alt={altText}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        className="pointer-events-none"
      />
    </div>
  );
};
