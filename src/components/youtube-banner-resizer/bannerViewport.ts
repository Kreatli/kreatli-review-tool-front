import { CANVAS_HEIGHT, CANVAS_WIDTH } from './bannerGeometry';

const BANNER_ASPECT = CANVAS_WIDTH / CANVAS_HEIGHT;

/** Crop frame as fractions of the displayed image box (stable across resize). */
export interface FrameRelative {
  nx: number;
  ny: number;
  nw: number;
  nh: number;
}

/** Corner resize only — aspect is always locked to YouTube banner (16:9). */
export type CornerResizeHandle = 'nw' | 'ne' | 'sw' | 'se';

const MIN_FRAME_PX = 32;

function minFrameSize(imgW: number, imgH: number): { minW: number; minH: number } {
  const minW = Math.min(imgW, Math.max(MIN_FRAME_PX, imgW * 0.04));
  const minH = Math.min(imgH, Math.max(MIN_FRAME_PX, imgH * 0.04));
  return { minW, minH };
}

/** Minimum 16:9 frame that satisfies both pixel minimums. */
function minYoutubeFrameSize(imgW: number, imgH: number): { minFw: number; minFh: number } {
  const { minW, minH } = minFrameSize(imgW, imgH);
  let minFw = Math.max(minW, minH * BANNER_ASPECT);
  let minFh = minFw / BANNER_ASPECT;
  if (minFh < minH) {
    minFh = minH;
    minFw = minFh * BANNER_ASPECT;
  }
  return { minFw, minFh };
}

/** Largest 16:9 rect fully inside the image box (for default frame). */
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

export function imgLocalToRelative(
  fl: number,
  ft: number,
  fw: number,
  fh: number,
  imgW: number,
  imgH: number,
): FrameRelative {
  if (!imgW || !imgH) return { nx: 0, ny: 0, nw: 1, nh: 1 };
  return {
    nx: fl / imgW,
    ny: ft / imgH,
    nw: fw / imgW,
    nh: fh / imgH,
  };
}

export function relativeToImgLocal(
  rel: FrameRelative,
  imgW: number,
  imgH: number,
): { fl: number; ft: number; fw: number; fh: number } {
  const cr = clampFrameRelative(rel, imgW, imgH);
  return {
    fl: cr.nx * imgW,
    ft: cr.ny * imgH,
    fw: cr.nw * imgW,
    fh: cr.nh * imgH,
  };
}

export function clampFrameRelative(rel: FrameRelative, imgW: number, imgH: number): FrameRelative {
  if (!imgW || !imgH) return { nx: 0, ny: 0, nw: 1, nh: 1 };
  const { minFw, minFh } = minYoutubeFrameSize(imgW, imgH);
  const maxFw = Math.min(imgW, imgH * BANNER_ASPECT);

  let fl = rel.nx * imgW;
  let ft = rel.ny * imgH;
  let fw = rel.nw * imgW;
  let fh = rel.nh * imgH;

  fh = fw / BANNER_ASPECT;

  if (fw < minFw) {
    fw = minFw;
    fh = fw / BANNER_ASPECT;
  }
  if (fh < minFh) {
    fh = minFh;
    fw = fh * BANNER_ASPECT;
  }
  if (fw > maxFw) {
    fw = maxFw;
    fh = fw / BANNER_ASPECT;
  }
  if (fh > imgH) {
    fh = imgH;
    fw = fh * BANNER_ASPECT;
  }
  if (fw > imgW) {
    fw = imgW;
    fh = fw / BANNER_ASPECT;
  }
  if (fw < minFw) {
    fw = minFw;
    fh = fw / BANNER_ASPECT;
  }
  if (fh < minFh) {
    fh = minFh;
    fw = fh * BANNER_ASPECT;
  }

  fl = clamp(fl, 0, imgW - fw);
  ft = clamp(ft, 0, imgH - fh);

  return imgLocalToRelative(fl, ft, fw, fh, imgW, imgH);
}

/** Default: centered maximum 16:9 frame inside image (natural aspect matches display). */
export function getDefaultFrameRelative(naturalWidth: number, naturalHeight: number): FrameRelative {
  if (!naturalWidth || !naturalHeight) {
    return { nx: 0, ny: 0, nw: 1, nh: 1 };
  }
  const { width: fw, height: fh } = getInscribedFrameSize(naturalWidth, naturalHeight);
  const fl = (naturalWidth - fw) / 2;
  const ft = (naturalHeight - fh) / 2;
  return clampFrameRelative(imgLocalToRelative(fl, ft, fw, fh, naturalWidth, naturalHeight), naturalWidth, naturalHeight);
}

export function frameRectFromRelative(
  imgRect: { x: number; y: number; width: number; height: number },
  rel: FrameRelative,
): { x: number; y: number; width: number; height: number } {
  const cr = clampFrameRelative(rel, imgRect.width, imgRect.height);
  return {
    x: imgRect.x + cr.nx * imgRect.width,
    y: imgRect.y + cr.ny * imgRect.height,
    width: cr.nw * imgRect.width,
    height: cr.nh * imgRect.height,
  };
}

/**
 * From a fixed top-left corner, pick (fw,fh) with fw/fh = YouTube aspect so the moving corner
 * tracks (lx, ly) as closely as possible while staying inside the image.
 */
function sizeFromFixedTopLeft(
  fl0: number,
  ft0: number,
  lx: number,
  ly: number,
  imgW: number,
  imgH: number,
  minFw: number,
  minFh: number,
): { fl: number; ft: number; fw: number; fh: number } {
  const wRaw = clamp(lx - fl0, minFw, imgW - fl0);
  const hRaw = clamp(ly - ft0, minFh, imgH - ft0);
  let w = Math.min(wRaw, hRaw * BANNER_ASPECT);
  let h = w / BANNER_ASPECT;
  if (h > hRaw + 1e-6) {
    h = hRaw;
    w = h * BANNER_ASPECT;
  }
  w = clamp(w, minFw, imgW - fl0);
  h = w / BANNER_ASPECT;
  if (ft0 + h > imgH) {
    h = imgH - ft0;
    w = h * BANNER_ASPECT;
  }
  if (fl0 + w > imgW) {
    w = imgW - fl0;
    h = w / BANNER_ASPECT;
  }
  w = Math.max(w, minFw);
  h = w / BANNER_ASPECT;
  return { fl: fl0, ft: ft0, fw: w, fh: h };
}

/** Fixed bottom-left (fl0, fb); pointer (lx, ly) is the moving top-right (NE). */
function sizeFromFixedBottomLeft(
  fl0: number,
  fb: number,
  lx: number,
  ly: number,
  imgW: number,
  imgH: number,
  minFw: number,
  minFh: number,
): { fl: number; ft: number; fw: number; fh: number } {
  const wRaw = clamp(lx - fl0, minFw, imgW - fl0);
  const hRaw = clamp(fb - ly, minFh, fb);
  let w = Math.min(wRaw, hRaw * BANNER_ASPECT);
  let h = w / BANNER_ASPECT;
  if (h > hRaw + 1e-6) {
    h = hRaw;
    w = h * BANNER_ASPECT;
  }
  w = clamp(w, minFw, imgW - fl0);
  h = w / BANNER_ASPECT;
  if (fl0 + w > imgW) {
    w = imgW - fl0;
    h = w / BANNER_ASPECT;
  }
  const ft = fb - h;
  return { fl: fl0, ft, fw: w, fh: h };
}

/** Fixed bottom-right (fr, fb); pointer (lx, ly) is the moving top-left (NW). */
function sizeFromFixedBottomRight(
  fr: number,
  fb: number,
  lx: number,
  ly: number,
  imgW: number,
  imgH: number,
  minFw: number,
  minFh: number,
): { fl: number; ft: number; fw: number; fh: number } {
  const wRaw = clamp(fr - lx, minFw, fr);
  const hRaw = clamp(fb - ly, minFh, fb);
  let w = Math.min(wRaw, hRaw * BANNER_ASPECT);
  let h = w / BANNER_ASPECT;
  if (h > hRaw + 1e-6) {
    h = hRaw;
    w = h * BANNER_ASPECT;
  }
  w = clamp(w, minFw, fr);
  h = w / BANNER_ASPECT;
  let fl = fr - w;
  let ft = fb - h;
  if (fl < 0) {
    fl = 0;
    w = fr;
    h = w / BANNER_ASPECT;
    ft = fb - h;
  }
  if (ft < 0) {
    ft = 0;
    h = fb;
    w = h * BANNER_ASPECT;
    fl = fr - w;
  }
  return { fl, ft, fw: w, fh: h };
}

/** Fixed top-right (fr, ft0); pointer (lx, ly) is the moving bottom-left (SW). */
function sizeFromFixedTopRight(
  fr: number,
  ft0: number,
  lx: number,
  ly: number,
  imgH: number,
  minFw: number,
  minFh: number,
): { fl: number; ft: number; fw: number; fh: number } {
  const wRaw = clamp(fr - lx, minFw, fr);
  const hRaw = clamp(ly - ft0, minFh, imgH - ft0);
  let w = Math.min(wRaw, hRaw * BANNER_ASPECT);
  let h = w / BANNER_ASPECT;
  if (h > hRaw + 1e-6) {
    h = hRaw;
    w = h * BANNER_ASPECT;
  }
  w = clamp(w, minFw, fr);
  h = w / BANNER_ASPECT;
  let fl = fr - w;
  if (fl < 0) {
    fl = 0;
    w = fr;
    h = w / BANNER_ASPECT;
  }
  if (ft0 + h > imgH) {
    h = imgH - ft0;
    w = h * BANNER_ASPECT;
    fl = fr - w;
  }
  return { fl, ft: ft0, fw: w, fh: h };
}

/**
 * Corner resize with pointer at the moving corner (image-local). Opposite corner stays fixed.
 * Frame always stays 2560:1440 proportion (16:9).
 */
export function applyYoutubeAspectCornerResize(
  handle: CornerResizeHandle,
  start: { fl: number; ft: number; fw: number; fh: number },
  lx: number,
  ly: number,
  imgW: number,
  imgH: number,
): { fl: number; ft: number; fw: number; fh: number } {
  const { minFw, minFh } = minYoutubeFrameSize(imgW, imgH);
  const clx = clamp(lx, 0, imgW);
  const cly = clamp(ly, 0, imgH);
  const fr = start.fl + start.fw;
  const fb = start.ft + start.fh;

  switch (handle) {
    case 'se':
      return sizeFromFixedTopLeft(start.fl, start.ft, clx, cly, imgW, imgH, minFw, minFh);
    case 'ne':
      return sizeFromFixedBottomLeft(start.fl, fb, clx, cly, imgW, imgH, minFw, minFh);
    case 'nw':
      return sizeFromFixedBottomRight(fr, fb, clx, cly, imgW, imgH, minFw, minFh);
    case 'sw':
      return sizeFromFixedTopRight(fr, start.ft, clx, cly, imgH, minFw, minFh);
    default:
      return start;
  }
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

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}
