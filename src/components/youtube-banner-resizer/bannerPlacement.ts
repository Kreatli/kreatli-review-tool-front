export interface BannerPlacement {
  /** User zoom multiplier on top of cover scale. 1 = default cover. */
  zoom: number;
  /** Pan offset in canvas pixels, applied after centering. */
  offsetX: number;
  /** Pan offset in canvas pixels, applied after centering. */
  offsetY: number;
}

export function getCoverScale(canvasW: number, canvasH: number, imgW: number, imgH: number): number {
  if (!canvasW || !canvasH) return 1;
  if (!imgW || !imgH) return 1;
  return Math.max(canvasW / imgW, canvasH / imgH);
}

export function getEffectiveScale(canvasW: number, canvasH: number, imgW: number, imgH: number, placement: BannerPlacement): number {
  const cover = getCoverScale(canvasW, canvasH, imgW, imgH);
  const zoom = Number.isFinite(placement.zoom) && placement.zoom > 0 ? placement.zoom : 1;
  return cover * zoom;
}

export function clampPlacement(
  canvasW: number,
  canvasH: number,
  imgW: number,
  imgH: number,
  placement: BannerPlacement,
): BannerPlacement {
  const effectiveScale = getEffectiveScale(canvasW, canvasH, imgW, imgH, placement);
  const renderW = imgW * effectiveScale;
  const renderH = imgH * effectiveScale;

  // Base top-left when centered.
  const baseX = (canvasW - renderW) / 2;
  const baseY = (canvasH - renderH) / 2;

  // Allow panning past the borders (Adobe-like). We still keep a soft bound so the
  // image can't be dragged infinitely far away.
  const overflowX = canvasW * 0.35;
  const overflowY = canvasH * 0.35;

  // Base bounds that keep crop frame fully covered:
  // x = baseX + offsetX must satisfy: x <= 0 && x + renderW >= canvasW
  const minOffsetX = canvasW - renderW - baseX - overflowX;
  const maxOffsetX = -baseX + overflowX;
  const minOffsetY = canvasH - renderH - baseY - overflowY;
  const maxOffsetY = -baseY + overflowY;

  const offsetX = clamp(placement.offsetX, Math.min(minOffsetX, maxOffsetX), Math.max(minOffsetX, maxOffsetX));
  const offsetY = clamp(placement.offsetY, Math.min(minOffsetY, maxOffsetY), Math.max(minOffsetY, maxOffsetY));

  return {
    zoom: placement.zoom,
    offsetX,
    offsetY,
  };
}

export function getDefaultPlacement(): BannerPlacement {
  return { zoom: 1, offsetX: 0, offsetY: 0 };
}

export function getRenderRect(
  canvasW: number,
  canvasH: number,
  imgW: number,
  imgH: number,
  placement: BannerPlacement,
): { x: number; y: number; width: number; height: number } {
  const clamped = clampPlacement(canvasW, canvasH, imgW, imgH, placement);
  const effectiveScale = getEffectiveScale(canvasW, canvasH, imgW, imgH, clamped);
  const width = imgW * effectiveScale;
  const height = imgH * effectiveScale;
  const x = (canvasW - width) / 2 + clamped.offsetX;
  const y = (canvasH - height) / 2 + clamped.offsetY;
  return { x, y, width, height };
}

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(max, Math.max(min, value));
}

