/**
 * Crop frame math for resize-video: normalized rect inside the *displayed* video box,
 * aspect-locked to output dimensions (targetWidth:targetHeight).
 */

export interface VideoCropFrameRelative {
  nx: number;
  ny: number;
  nw: number;
  nh: number;
}

export type VideoCornerResizeHandle = 'nw' | 'ne' | 'sw' | 'se';

const MIN_FRAME_PX = 32;

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function minFrameSize(imgW: number, imgH: number): { minW: number; minH: number } {
  const minW = Math.min(imgW, Math.max(MIN_FRAME_PX, imgW * 0.04));
  const minH = Math.min(imgH, Math.max(MIN_FRAME_PX, imgH * 0.04));
  return { minW, minH };
}

/** outputAspect = targetWidth / targetHeight (e.g. 16/9 landscape). */
export function minFrameForOutputAspect(
  imgW: number,
  imgH: number,
  outputAspect: number,
): { minFw: number; minFh: number } {
  if (!outputAspect || outputAspect <= 0 || !Number.isFinite(outputAspect)) {
    return { minFw: MIN_FRAME_PX, minFh: MIN_FRAME_PX };
  }
  const { minW, minH } = minFrameSize(imgW, imgH);
  let minFw = Math.max(minW, minH * outputAspect);
  let minFh = minFw / outputAspect;
  if (minFh < minH) {
    minFh = minH;
    minFw = minFh * outputAspect;
  }
  return { minFw, minFh };
}

/** Largest rectangle of given aspect fully inside imgW×imgH. */
export function getInscribedFrameSizeForAspect(
  imgRectW: number,
  imgRectH: number,
  outputAspect: number,
): { width: number; height: number } {
  if (!imgRectW || !imgRectH || !outputAspect || !Number.isFinite(outputAspect)) {
    return { width: 0, height: 0 };
  }
  const imgAspect = imgRectW / imgRectH;
  if (imgAspect > outputAspect) {
    const height = imgRectH;
    const width = height * outputAspect;
    return { width, height };
  }
  const width = imgRectW;
  const height = width / outputAspect;
  return { width, height };
}

export function imgLocalToRelative(
  fl: number,
  ft: number,
  fw: number,
  fh: number,
  imgW: number,
  imgH: number,
): VideoCropFrameRelative {
  if (!imgW || !imgH) return { nx: 0, ny: 0, nw: 1, nh: 1 };
  return {
    nx: fl / imgW,
    ny: ft / imgH,
    nw: fw / imgW,
    nh: fh / imgH,
  };
}

export function clampFrameRelative(
  rel: VideoCropFrameRelative,
  imgW: number,
  imgH: number,
  outputAspect: number,
): VideoCropFrameRelative {
  if (!imgW || !imgH || !outputAspect || !Number.isFinite(outputAspect)) {
    return { nx: 0, ny: 0, nw: 1, nh: 1 };
  }
  const { minFw, minFh } = minFrameForOutputAspect(imgW, imgH, outputAspect);
  const maxFw = Math.min(imgW, imgH * outputAspect);

  let fl = rel.nx * imgW;
  let ft = rel.ny * imgH;
  let fw = rel.nw * imgW;
  let fh = rel.nh * imgH;

  fh = fw / outputAspect;

  if (fw < minFw) {
    fw = minFw;
    fh = fw / outputAspect;
  }
  if (fh < minFh) {
    fh = minFh;
    fw = fh * outputAspect;
  }
  if (fw > maxFw) {
    fw = maxFw;
    fh = fw / outputAspect;
  }
  if (fh > imgH) {
    fh = imgH;
    fw = fh * outputAspect;
  }
  if (fw > imgW) {
    fw = imgW;
    fh = fw / outputAspect;
  }
  if (fw < minFw) {
    fw = minFw;
    fh = fw / outputAspect;
  }
  if (fh < minFh) {
    fh = minFh;
    fw = fh * outputAspect;
  }

  fl = clamp(fl, 0, imgW - fw);
  ft = clamp(ft, 0, imgH - fh);

  return imgLocalToRelative(fl, ft, fw, fh, imgW, imgH);
}

export function relativeToImgLocal(
  rel: VideoCropFrameRelative,
  imgW: number,
  imgH: number,
  outputAspect: number,
): { fl: number; ft: number; fw: number; fh: number } {
  const cr = clampFrameRelative(rel, imgW, imgH, outputAspect);
  return {
    fl: cr.nx * imgW,
    ft: cr.ny * imgH,
    fw: cr.nw * imgW,
    fh: cr.nh * imgH,
  };
}

export function getDefaultFrameRelative(
  naturalWidth: number,
  naturalHeight: number,
  outputAspect: number,
): VideoCropFrameRelative {
  if (!naturalWidth || !naturalHeight) {
    return { nx: 0, ny: 0, nw: 1, nh: 1 };
  }
  const { width: fw, height: fh } = getInscribedFrameSizeForAspect(naturalWidth, naturalHeight, outputAspect);
  const fl = (naturalWidth - fw) / 2;
  const ft = (naturalHeight - fh) / 2;
  return clampFrameRelative(
    imgLocalToRelative(fl, ft, fw, fh, naturalWidth, naturalHeight),
    naturalWidth,
    naturalHeight,
    outputAspect,
  );
}

export function frameRectFromRelative(
  imgRect: { x: number; y: number; width: number; height: number },
  rel: VideoCropFrameRelative,
  outputAspect: number,
): { x: number; y: number; width: number; height: number } {
  const cr = clampFrameRelative(rel, imgRect.width, imgRect.height, outputAspect);
  return {
    x: imgRect.x + cr.nx * imgRect.width,
    y: imgRect.y + cr.ny * imgRect.height,
    width: cr.nw * imgRect.width,
    height: cr.nh * imgRect.height,
  };
}

function sizeFromFixedTopLeft(
  fl0: number,
  ft0: number,
  lx: number,
  ly: number,
  imgW: number,
  imgH: number,
  minFw: number,
  minFh: number,
  outputAspect: number,
): { fl: number; ft: number; fw: number; fh: number } {
  const wRaw = clamp(lx - fl0, minFw, imgW - fl0);
  const hRaw = clamp(ly - ft0, minFh, imgH - ft0);
  let w = Math.min(wRaw, hRaw * outputAspect);
  let h = w / outputAspect;
  if (h > hRaw + 1e-6) {
    h = hRaw;
    w = h * outputAspect;
  }
  w = clamp(w, minFw, imgW - fl0);
  h = w / outputAspect;
  if (ft0 + h > imgH) {
    h = imgH - ft0;
    w = h * outputAspect;
  }
  if (fl0 + w > imgW) {
    w = imgW - fl0;
    h = w / outputAspect;
  }
  w = Math.max(w, minFw);
  h = w / outputAspect;
  return { fl: fl0, ft: ft0, fw: w, fh: h };
}

function sizeFromFixedBottomLeft(
  fl0: number,
  fb: number,
  lx: number,
  ly: number,
  imgW: number,
  imgH: number,
  minFw: number,
  minFh: number,
  outputAspect: number,
): { fl: number; ft: number; fw: number; fh: number } {
  const wRaw = clamp(lx - fl0, minFw, imgW - fl0);
  const hRaw = clamp(fb - ly, minFh, fb);
  let w = Math.min(wRaw, hRaw * outputAspect);
  let h = w / outputAspect;
  if (h > hRaw + 1e-6) {
    h = hRaw;
    w = h * outputAspect;
  }
  w = clamp(w, minFw, imgW - fl0);
  h = w / outputAspect;
  if (fl0 + w > imgW) {
    w = imgW - fl0;
    h = w / outputAspect;
  }
  const ft = fb - h;
  return { fl: fl0, ft, fw: w, fh: h };
}

function sizeFromFixedBottomRight(
  fr: number,
  fb: number,
  lx: number,
  ly: number,
  imgW: number,
  imgH: number,
  minFw: number,
  minFh: number,
  outputAspect: number,
): { fl: number; ft: number; fw: number; fh: number } {
  const wRaw = clamp(fr - lx, minFw, fr);
  const hRaw = clamp(fb - ly, minFh, fb);
  let w = Math.min(wRaw, hRaw * outputAspect);
  let h = w / outputAspect;
  if (h > hRaw + 1e-6) {
    h = hRaw;
    w = h * outputAspect;
  }
  w = clamp(w, minFw, fr);
  h = w / outputAspect;
  let fl = fr - w;
  let ft = fb - h;
  if (fl < 0) {
    fl = 0;
    w = fr;
    h = w / outputAspect;
    ft = fb - h;
  }
  if (ft < 0) {
    ft = 0;
    h = fb;
    w = h * outputAspect;
    fl = fr - w;
  }
  return { fl, ft, fw: w, fh: h };
}

function sizeFromFixedTopRight(
  fr: number,
  ft0: number,
  lx: number,
  ly: number,
  imgH: number,
  minFw: number,
  minFh: number,
  outputAspect: number,
): { fl: number; ft: number; fw: number; fh: number } {
  const wRaw = clamp(fr - lx, minFw, fr);
  const hRaw = clamp(ly - ft0, minFh, imgH - ft0);
  let w = Math.min(wRaw, hRaw * outputAspect);
  let h = w / outputAspect;
  if (h > hRaw + 1e-6) {
    h = hRaw;
    w = h * outputAspect;
  }
  w = clamp(w, minFw, fr);
  h = w / outputAspect;
  let fl = fr - w;
  if (fl < 0) {
    fl = 0;
    w = fr;
    h = w / outputAspect;
  }
  if (ft0 + h > imgH) {
    h = imgH - ft0;
    w = h * outputAspect;
    fl = fr - w;
  }
  return { fl, ft: ft0, fw: w, fh: h };
}

export function applyAspectCornerResize(
  handle: VideoCornerResizeHandle,
  start: { fl: number; ft: number; fw: number; fh: number },
  lx: number,
  ly: number,
  imgW: number,
  imgH: number,
  outputAspect: number,
): { fl: number; ft: number; fw: number; fh: number } {
  const { minFw, minFh } = minFrameForOutputAspect(imgW, imgH, outputAspect);
  const clx = clamp(lx, 0, imgW);
  const cly = clamp(ly, 0, imgH);
  const fr = start.fl + start.fw;
  const fb = start.ft + start.fh;

  switch (handle) {
    case 'se':
      return sizeFromFixedTopLeft(start.fl, start.ft, clx, cly, imgW, imgH, minFw, minFh, outputAspect);
    case 'ne':
      return sizeFromFixedBottomLeft(start.fl, fb, clx, cly, imgW, imgH, minFw, minFh, outputAspect);
    case 'nw':
      return sizeFromFixedBottomRight(fr, fb, clx, cly, imgW, imgH, minFw, minFh, outputAspect);
    case 'sw':
      return sizeFromFixedTopRight(fr, start.ft, clx, cly, imgH, minFw, minFh, outputAspect);
    default:
      return start;
  }
}

/** Map display frame rect to source video pixel crop. */
export function getSourceCropPixels(
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

/** Even width/height and even x/y for libx264/yuv420p crop filter safety. */
export function evenCropForH264(
  iw: number,
  ih: number,
  sx: number,
  sy: number,
  sw: number,
  sh: number,
): { sx: number; sy: number; sw: number; sh: number } {
  let esw = Math.max(2, Math.floor(sw) & ~1);
  let esh = Math.max(2, Math.floor(sh) & ~1);
  let esx = Math.max(0, Math.floor(sx) & ~1);
  let esy = Math.max(0, Math.floor(sy) & ~1);

  if (esx + esw > iw) esw = Math.max(2, (iw - esx) & ~1 || 2);
  if (esy + esh > ih) esh = Math.max(2, (ih - esy) & ~1 || 2);
  if (esx + esw > iw) esx = Math.max(0, (iw - esw) & ~1);
  if (esy + esh > ih) esy = Math.max(0, (ih - esh) & ~1);

  return { sx: esx, sy: esy, sw: esw, sh: esh };
}

export function outputAspectFromTargets(targetWidth: number, targetHeight: number): number {
  if (!targetHeight || !Number.isFinite(targetHeight) || !Number.isFinite(targetWidth)) return 16 / 9;
  return Math.max(0.01, targetWidth / targetHeight);
}
