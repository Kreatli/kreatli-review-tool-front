import { CANVAS_HEIGHT, CANVAS_WIDTH } from './bannerGeometry';

export interface BannerViewport {
  /** Top-left of the 2560×1440 crop in virtual (scaled) image pixels. */
  x: number;
  /** Top-left of the 2560×1440 crop in virtual (scaled) image pixels. */
  y: number;
}

export function getAutoImageScale(imgW: number, imgH: number): number {
  if (!imgW || !imgH) return 1;
  // Auto-upscale so the 2560×1440 viewport always fits inside the image.
  return Math.max(1, CANVAS_WIDTH / imgW, CANVAS_HEIGHT / imgH);
}

export function getDefaultViewport(imgW: number, imgH: number, imageScale: number): BannerViewport {
  const scaledW = imgW * imageScale;
  const scaledH = imgH * imageScale;
  const x = Math.max(0, Math.round((scaledW - CANVAS_WIDTH) / 2));
  const y = Math.max(0, Math.round((scaledH - CANVAS_HEIGHT) / 2));
  return clampViewport(imgW, imgH, imageScale, { x, y });
}

export function clampViewport(imgW: number, imgH: number, imageScale: number, viewport: BannerViewport): BannerViewport {
  const scaledW = imgW * imageScale;
  const scaledH = imgH * imageScale;
  const maxX = Math.max(0, scaledW - CANVAS_WIDTH);
  const maxY = Math.max(0, scaledH - CANVAS_HEIGHT);
  return {
    x: clamp(viewport.x, 0, maxX),
    y: clamp(viewport.y, 0, maxY),
  };
}

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

