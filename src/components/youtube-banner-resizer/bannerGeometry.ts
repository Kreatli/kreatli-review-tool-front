/** YouTube-recommended channel art size */
export const CANVAS_WIDTH = 2560;
export const CANVAS_HEIGHT = 1440;

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
