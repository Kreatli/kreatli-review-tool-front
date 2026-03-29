import { staticFile } from "remotion";

/**
 * Full duration of each stock MP4 in seconds (`ffprobe format=duration`).
 * Clips are ~1080p H.264 samples from Google's public GTV test bucket
 * (polished promo-style footage, suitable for UI mocks).
 */
const STOCK_CLIP_DURATION_SEC = 15.046531;

export const STOCK_CLIPS = [
  { src: staticFile("stock/clip-a.mp4"), durationSec: STOCK_CLIP_DURATION_SEC },
  { src: staticFile("stock/clip-b.mp4"), durationSec: STOCK_CLIP_DURATION_SEC },
  { src: staticFile("stock/clip-c.mp4"), durationSec: STOCK_CLIP_DURATION_SEC },
] as const;

export const STOCK_IMAGES = [
  staticFile("stock/img-a.jpg"),
  staticFile("stock/img-b.jpg"),
  staticFile("stock/img-c.jpg"),
  staticFile("stock/img-d.jpg"),
] as const;

export function stockClipForSeed(seed: number): (typeof STOCK_CLIPS)[number] {
  const n = STOCK_CLIPS.length;
  const i = ((seed % n) + n) % n;
  return STOCK_CLIPS[i];
}

export function stockVideoForSeed(seed: number): string {
  return stockClipForSeed(seed).src;
}

export function stockImageForSeed(seed: number): string {
  const n = STOCK_IMAGES.length;
  const i = ((seed % n) + n) % n;
  return STOCK_IMAGES[i];
}
