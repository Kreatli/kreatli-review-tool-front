import ReelsOverlay from '../assets/images/Reels_Kreatli_Overlay.png';
import ShortsOverlay from '../assets/images/Shorts_Kreatli_Overlay.png';
import TikTokOverlay from '../assets/images/TikTok_Kreatli_Overlay.png';
import { Platform } from '../components/safe-zone-checker/SafeZoneUpload';

interface ExportOptions {
  file: File;
  platform: Platform;
  showSafeZones: boolean;
  currentTime?: number; // For video frames
  quality?: 'low' | 'high';
}

const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1920;

const LOW_RES_SCALE = 0.5; // 50% scale for low-res preview
const HIGH_RES_SCALE = 1.0; // 100% scale for full-res export

const PLATFORM_OVERLAYS: Record<Platform, typeof ReelsOverlay> = {
  'instagram-reels': ReelsOverlay,
  'youtube-shorts': ShortsOverlay,
  tiktok: TikTokOverlay,
};

const loadOverlayImage = (platform: Platform): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    // Handle both string and StaticImageData types
    const overlayImage = PLATFORM_OVERLAYS[platform];
    const overlaySrc = typeof overlayImage === 'string' ? overlayImage : overlayImage.src;
    img.src = overlaySrc;
  });
};

const drawPlatformOverlay = async (
  ctx: CanvasRenderingContext2D,
  platform: Platform,
  width: number,
  height: number,
  showSafeZones: boolean,
) => {
  ctx.save();

  try {
    const overlayImg = await loadOverlayImage(platform);
    // Draw overlay scaled to fit canvas
    ctx.drawImage(overlayImg, 0, 0, width, height);
  } catch (error) {
    console.warn('Failed to load overlay image:', error);
  }

  ctx.restore();
};

export const exportScreenshot = async (options: ExportOptions): Promise<string> => {
  const { file, platform, showSafeZones, currentTime, quality = 'high' } = options;

  const scale = quality === 'low' ? LOW_RES_SCALE : HIGH_RES_SCALE;
  const canvasWidth = CANVAS_WIDTH * scale;
  const canvasHeight = CANVAS_HEIGHT * scale;

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  return new Promise(async (resolve, reject) => {
    if (file.type.startsWith('image/')) {
      const img = new Image();
      img.onload = async () => {
        // Draw image scaled to fit canvas
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
        // Draw overlay
        await drawPlatformOverlay(ctx, platform, canvasWidth, canvasHeight, showSafeZones);
        // Export
        const dataUrl = canvas.toDataURL('image/png');
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    } else if (file.type.startsWith('video/')) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.muted = true;
      video.playsInline = true;

      video.onloadedmetadata = () => {
        if (currentTime !== undefined) {
          video.currentTime = currentTime;
        }

        video.onseeked = async () => {
          // Draw video frame
          ctx.drawImage(video, 0, 0, canvasWidth, canvasHeight);
          // Draw overlay
          await drawPlatformOverlay(ctx, platform, canvasWidth, canvasHeight, showSafeZones);
          // Export
          const dataUrl = canvas.toDataURL('image/png');
          URL.revokeObjectURL(video.src);
          resolve(dataUrl);
        };

        video.onerror = () => {
          URL.revokeObjectURL(video.src);
          reject(new Error('Failed to load video'));
        };
      };

      video.onerror = () => {
        URL.revokeObjectURL(video.src);
        reject(new Error('Failed to load video'));
      };

      video.src = URL.createObjectURL(file);
    } else {
      reject(new Error('Unsupported file type'));
    }
  });
};

export const downloadScreenshot = (dataUrl: string, filename: string) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

