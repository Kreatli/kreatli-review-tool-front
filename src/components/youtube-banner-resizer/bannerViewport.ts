import { CANVAS_HEIGHT, CANVAS_WIDTH } from './bannerGeometry';

/** User-chosen export window position, stable across resizes. */
export interface FrameAnchor {
  /** 0 = left end of valid range, 1 = right end (see clampFrameAnchor). */
  x: number;
  /** 0 = top, 1 = bottom. */
  y: number;
}

const BANNER_ASPECT = CANVAS_WIDTH / CANVAS_HEIGHT;

/** Largest 2560×1440-proportional rect fully inside the image display rect. */
export function getInscribedFrameSize(imgRectW: number, imgRectH: number): { width: number; height: number } {
  if (!imgRectW || !imgRectH || !Number.isFinite(imgRectW) || !Number.isFinite(imgRectH)) {
    return { width: 0, height: 0 };
  }
  const imgAspect = imgRectW / imgRectH;
  if (imgAspect > BANNER_ASPECT) {
    const height = imgRectH;
    const width = height * BANNER_ASPECT;
    return { width, height };
  }
  const width = imgRectW;
  const height = width / BANNER_ASPECT;
  return { width, height };
}

export function getDefaultFrameAnchor(): FrameAnchor {
  return { x: 0.5, y: 0.5 };
}

/**
 * Keeps the anchor inside [0,1] when the frame has room to move; if range is 0, pins to 0.5.
 */
export function clampFrameAnchor(anchor: FrameAnchor, imgRectW: number, imgRectH: number): FrameAnchor {
  const { width: fw, height: fh } = getInscribedFrameSize(imgRectW, imgRectH);
  const rangeX = Math.max(0, imgRectW - fw);
  const rangeY = Math.max(0, imgRectH - fh);
  return {
    x: rangeX <= 0 ? 0.5 : clamp01(anchor.x),
    y: rangeY <= 0 ? 0.5 : clamp01(anchor.y),
  };
}

export function frameRectFromAnchor(
  imgRect: { x: number; y: number; width: number; height: number },
  anchor: FrameAnchor,
): { x: number; y: number; width: number; height: number } {
  const { width: fw, height: fh } = getInscribedFrameSize(imgRect.width, imgRect.height);
  const rangeX = Math.max(0, imgRect.width - fw);
  const rangeY = Math.max(0, imgRect.height - fh);
  const ax = rangeX <= 0 ? 0.5 : anchor.x;
  const ay = rangeY <= 0 ? 0.5 : anchor.y;
  return {
    x: imgRect.x + ax * rangeX,
    y: imgRect.y + ay * rangeY,
    width: fw,
    height: fh,
  };
}

/** Natural-image pixel crop for canvas export. */
export function getNaturalCropRect(
  naturalWidth: number,
  naturalHeight: number,
  imgRect: { x: number; y: number; width: number; height: number },
  frameRect: { x: number; y: number; width: number; height: number },
): { sx: number; sy: number; sw: number; sh: number } {
  if (!naturalWidth || !naturalHeight || !imgRect.width || !imgRect.height) {
    return { sx: 0, sy: 0, sw: 0, sh: 0 };
  }
  const relX = (frameRect.x - imgRect.x) / imgRect.width;
  const relY = (frameRect.y - imgRect.y) / imgRect.height;
  const relW = frameRect.width / imgRect.width;
  const relH = frameRect.height / imgRect.height;

  let sx = Math.round(relX * naturalWidth);
  let sy = Math.round(relY * naturalHeight);
  let sw = Math.round(relW * naturalWidth);
  let sh = Math.round(relH * naturalHeight);

  // Guard float / rounding drift against bitmap edges.
  if (sx < 0) sx = 0;
  if (sy < 0) sy = 0;
  if (sw > naturalWidth) sw = naturalWidth;
  if (sh > naturalHeight) sh = naturalHeight;
  if (sx + sw > naturalWidth) sx = naturalWidth - sw;
  if (sy + sh > naturalHeight) sy = naturalHeight - sh;
  if (sx < 0) sx = 0;
  if (sy < 0) sy = 0;

  return { sx, sy, sw, sh };
}

function clamp01(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.min(1, Math.max(0, n));
}
