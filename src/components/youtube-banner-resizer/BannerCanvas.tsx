import { cn } from '@heroui/react';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

import { Icon } from '../various/Icon';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './bannerGeometry';
import {
  clampFrameAnchor,
  FrameAnchor,
  frameRectFromAnchor,
  getDefaultFrameAnchor,
  getNaturalCropRect,
} from './bannerViewport';

interface BannerCanvasProps {
  imageUrl: string | null;
  naturalWidth: number;
  naturalHeight: number;
  frameAnchor: FrameAnchor;
  onFrameAnchorChange: (next: FrameAnchor) => void;
  onCropRegionReady: (crop: { sx: number; sy: number; sw: number; sh: number } | null) => void;
  getRootProps: () => DropzoneRootProps;
  getInputProps: () => DropzoneInputProps;
  isDragActive: boolean;
  isLoading?: boolean;
}

export const BannerCanvas = ({
  imageUrl,
  naturalWidth,
  naturalHeight,
  frameAnchor,
  onFrameAnchorChange,
  onCropRegionReady,
  getRootProps,
  getInputProps,
  isDragActive,
  isLoading = false,
}: BannerCanvasProps) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  /** Image box in stage-local CSS pixels (object-fit: contain). */
  const [imgRect, setImgRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const dragRef = useRef<{
    pointerId: number | null;
    startAnchor: FrameAnchor;
    startClientX: number;
    startClientY: number;
    rangeX: number;
    rangeY: number;
  }>({
    pointerId: null,
    startAnchor: getDefaultFrameAnchor(),
    startClientX: 0,
    startClientY: 0,
    rangeX: 0,
    rangeY: 0,
  });

  const measure = useCallback(() => {
    const stage = stageRef.current;
    const img = imageRef.current;
    if (!stage || !img || !naturalWidth || !naturalHeight) return;

    const sw = stage.clientWidth;
    const sh = stage.clientHeight;
    if (!sw || !sh) return;

    const containScale = Math.min(sw / naturalWidth, sh / naturalHeight);
    const w = naturalWidth * containScale;
    const h = naturalHeight * containScale;
    const x = (sw - w) / 2;
    const y = (sh - h) / 2;
    setImgRect({ x, y, width: w, height: h });
  }, [naturalHeight, naturalWidth]);

  useLayoutEffect(() => {
    measure();
  }, [imageUrl, naturalWidth, naturalHeight, measure]);

  useEffect(() => {
    const ro = new ResizeObserver(() => measure());
    const stage = stageRef.current;
    if (stage) ro.observe(stage);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const clampedAnchor = useMemo(
    () => clampFrameAnchor(frameAnchor, imgRect.width, imgRect.height),
    [frameAnchor, imgRect.height, imgRect.width],
  );

  const frameRect = useMemo(
    () =>
      frameRectFromAnchor(
        { x: imgRect.x, y: imgRect.y, width: imgRect.width, height: imgRect.height },
        clampedAnchor,
      ),
    [clampedAnchor, imgRect.height, imgRect.width, imgRect.x, imgRect.y],
  );

  useLayoutEffect(() => {
    if (!imageUrl || !naturalWidth || !naturalHeight || imgRect.width <= 0 || imgRect.height <= 0) {
      onCropRegionReady(null);
      return;
    }
    const crop = getNaturalCropRect(naturalWidth, naturalHeight, imgRect, frameRect);
    if (crop.sw <= 0 || crop.sh <= 0) {
      onCropRegionReady(null);
      return;
    }
    onCropRegionReady(crop);
  }, [frameRect, imageUrl, imgRect, naturalHeight, naturalWidth, onCropRegionReady]);

  const isInteractive = !!imageUrl && !isLoading && imgRect.width > 0 && imgRect.height > 0;

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg border border-foreground-200 bg-foreground-50"
      style={{ aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}` }}
    >
      {/* Empty State / Upload Zone */}
      {!imageUrl && (
        <div
          {...getRootProps()}
          className={cn(
            'flex h-full w-full cursor-pointer items-center justify-center bg-gradient-to-br from-foreground-50 to-foreground-100 transition-all duration-300',
            {
              'scale-[1.02] bg-gradient-to-br from-primary/5 to-primary/10 ring-2 ring-primary/20': isDragActive,
            },
          )}
        >
          <div className="flex flex-col items-center gap-4 p-8 text-center">
            <div
              className={cn(
                'rounded-full bg-primary/10 p-6 transition-all duration-300',
                isDragActive && 'scale-110 bg-primary/20',
              )}
            >
              <Icon icon="upload" size={48} className="text-primary" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-foreground-700">
                {isDragActive ? 'Drop your image here' : 'Drag and drop your image here'}
              </p>
              <p className="text-sm text-foreground-500">or click to browse</p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-foreground-400">
                <span className="rounded-full bg-foreground-100 px-3 py-1">JPEG, PNG, WebP</span>
                <span className="rounded-full bg-foreground-100 px-3 py-1">Less than 40MB</span>
                <span className="rounded-full bg-foreground-100 px-3 py-1">2560×1440px output</span>
              </div>
            </div>
          </div>
          <input {...getInputProps()} />
        </div>
      )}

      {imageUrl && (
        <div ref={stageRef} className="relative h-full w-full bg-foreground-100">
          {/* Layer 1 — static image (no CSS transform; only centered contain layout) */}
          <img
            ref={imageRef}
            src={imageUrl}
            alt={`YouTube banner source image. Original dimensions: ${naturalWidth} × ${naturalHeight} pixels.`}
            className="pointer-events-none absolute select-none"
            draggable={false}
            style={{
              left: imgRect.x,
              top: imgRect.y,
              width: imgRect.width,
              height: imgRect.height,
              objectFit: 'fill',
            }}
            onLoad={measure}
          />

          {/* Layer 2 — dim outside the export frame (viewport window) */}
          {isInteractive && (
            <div
              className="pointer-events-none absolute z-10"
              style={{
                left: frameRect.x,
                top: frameRect.y,
                width: frameRect.width,
                height: frameRect.height,
                boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.58)',
              }}
            />
          )}

          {/* Layer 3 — draggable frame + Layer 4/5 guides inside frame */}
          {isInteractive && (
            <div
              className={cn(
                'absolute z-20 touch-none rounded-sm border-2 border-dashed border-primary-500',
                'shadow-[0_0_0_1px_rgba(59,130,246,0.35),0_0_24px_rgba(59,130,246,0.25)]',
                'cursor-grab active:cursor-grabbing',
              )}
              style={{
                left: frameRect.x,
                top: frameRect.y,
                width: frameRect.width,
                height: frameRect.height,
              }}
              onPointerDown={(e) => {
                if (!isInteractive) return;
                if ('button' in e && typeof e.button === 'number' && e.button !== 0) return;
                e.preventDefault();
                e.stopPropagation();
                const { width: fw, height: fh } = frameRect;
                const rangeX = Math.max(0, imgRect.width - fw);
                const rangeY = Math.max(0, imgRect.height - fh);
                dragRef.current = {
                  pointerId: e.pointerId,
                  startAnchor: frameAnchor,
                  startClientX: e.clientX,
                  startClientY: e.clientY,
                  rangeX,
                  rangeY,
                };
                (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
              }}
              onPointerMove={(e) => {
                const d = dragRef.current;
                if (d.pointerId !== e.pointerId) return;
                if (d.rangeX <= 0 && d.rangeY <= 0) return;
                e.preventDefault();
                const dx = e.clientX - d.startClientX;
                const dy = e.clientY - d.startClientY;
                const next: FrameAnchor = {
                  x:
                    d.rangeX > 0
                      ? d.startAnchor.x + dx / d.rangeX
                      : d.startAnchor.x,
                  y:
                    d.rangeY > 0
                      ? d.startAnchor.y + dy / d.rangeY
                      : d.startAnchor.y,
                };
                onFrameAnchorChange(clampFrameAnchor(next, imgRect.width, imgRect.height));
              }}
              onPointerUp={(e) => {
                const d = dragRef.current;
                if (d.pointerId !== e.pointerId) return;
                e.preventDefault();
                dragRef.current = { ...dragRef.current, pointerId: null };
                (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
              }}
              onPointerCancel={(e) => {
                const d = dragRef.current;
                if (d.pointerId !== e.pointerId) return;
                dragRef.current = { ...dragRef.current, pointerId: null };
                (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
              }}
              role="presentation"
              aria-label="Drag to position the YouTube banner export frame"
            >
              {/* Rule of thirds */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-y-0 left-1/3 w-px bg-white/55" />
                <div className="absolute inset-y-0 left-2/3 w-px bg-white/55" />
                <div className="absolute inset-x-0 top-1/3 h-px bg-white/55" />
                <div className="absolute inset-x-0 top-2/3 h-px bg-white/55" />
              </div>
              {/* Subtle grid */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:12px_12px]" />

              <div className="pointer-events-none absolute left-0 top-0 size-7 border-l-[3px] border-t-[3px] border-primary-400" />
              <div className="pointer-events-none absolute right-0 top-0 size-7 border-r-[3px] border-t-[3px] border-primary-400" />
              <div className="pointer-events-none absolute bottom-0 left-0 size-7 border-b-[3px] border-l-[3px] border-primary-400" />
              <div className="pointer-events-none absolute bottom-0 right-0 size-7 border-b-[3px] border-r-[3px] border-primary-400" />
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3 rounded-lg bg-black/80 px-6 py-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-sm font-medium text-white">Loading image…</p>
              </div>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 z-[5] border-2 border-foreground-200" />
        </div>
      )}
    </div>
  );
};
