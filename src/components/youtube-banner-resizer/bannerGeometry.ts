/** YouTube-recommended channel art size */
export const CANVAS_WIDTH = 2560;
export const CANVAS_HEIGHT = 1440;

/** YouTube safe zones (all centered within 2560 × 1440) */
export const DESKTOP_SAFE_WIDTH = 2560;
export const DESKTOP_SAFE_HEIGHT = 423;
export const MOBILE_SAFE_WIDTH = 1546;
export const MOBILE_SAFE_HEIGHT = 423;

/** Fractional positions of each safe zone within the banner */
export const SAFE_ZONE = {
  desktop: {
    top: (CANVAS_HEIGHT - DESKTOP_SAFE_HEIGHT) / 2 / CANVAS_HEIGHT,
    bottom: (CANVAS_HEIGHT + DESKTOP_SAFE_HEIGHT) / 2 / CANVAS_HEIGHT,
  },
  mobile: {
    left: (CANVAS_WIDTH - MOBILE_SAFE_WIDTH) / 2 / CANVAS_WIDTH,
    right: (CANVAS_WIDTH + MOBILE_SAFE_WIDTH) / 2 / CANVAS_WIDTH,
    top: (CANVAS_HEIGHT - MOBILE_SAFE_HEIGHT) / 2 / CANVAS_HEIGHT,
    bottom: (CANVAS_HEIGHT + MOBILE_SAFE_HEIGHT) / 2 / CANVAS_HEIGHT,
  },
} as const;

/** Uniform scale to fit image inside container; centered. No non-uniform stretch. */
export function getContainRect(
  containerW: number,
  containerH: number,
  imgW: number,
  imgH: number,
): { x: number; y: number; width: number; height: number } | null {
  if (!imgW || !imgH) return null;
  const scale = Math.min(containerW / imgW, containerH / imgH);
  const width = imgW * scale;
  const height = imgH * scale;
  const x = (containerW - width) / 2;
  const y = (containerH - height) / 2;
  return { x, y, width, height };
}
