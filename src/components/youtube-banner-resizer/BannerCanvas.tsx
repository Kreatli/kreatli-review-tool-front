import { cn } from '@heroui/react';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

import { Icon } from '../various/Icon';
import { CANVAS_HEIGHT, CANVAS_WIDTH, SAFE_ZONE } from './bannerGeometry';
import {
  applyYoutubeAspectCornerResize,
  clampFrameRelative,
  CornerResizeHandle,
  frameRectFromRelative,
  FrameRelative,
  getNaturalCropRect,
  imgLocalToRelative,
  relativeToImgLocal,
} from './bannerViewport';

function clientToImgLocal(
  clientX: number,
  clientY: number,
  stageEl: HTMLElement,
  imgRect: { x: number; y: number; width: number; height: number },
): { lx: number; ly: number } {
  const r = stageEl.getBoundingClientRect();
  return {
    lx: clientX - r.left - imgRect.x,
    ly: clientY - r.top - imgRect.y,
  };
}

function cursorForHandle(h: CornerResizeHandle): string {
  switch (h) {
    case 'nw':
    case 'se':
      return 'nwse-resize';
    case 'ne':
    case 'sw':
      return 'nesw-resize';
    default:
      return 'default';
  }
}

const HANDLE =
  'absolute z-30 box-border h-3.5 w-3.5 rounded-sm border-2 border-primary-600 bg-white shadow-sm touch-manipulation';

interface BannerCanvasProps {
  imageUrl: string | null;
  naturalWidth: number;
  naturalHeight: number;
  frameRelative: FrameRelative;
  onFrameRelativeChange: (next: FrameRelative) => void;
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
  frameRelative,
  onFrameRelativeChange,
  onCropRegionReady,
  getRootProps,
  getInputProps,
  isDragActive,
  isLoading = false,
}: BannerCanvasProps) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const imgRectRef = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const onFrameRelativeChangeRef = useRef(onFrameRelativeChange);
  onFrameRelativeChangeRef.current = onFrameRelativeChange;

  const frameRelativeRef = useRef(frameRelative);
  frameRelativeRef.current = frameRelative;

  const dragListenersCleanupRef = useRef<(() => void) | null>(null);

  /** Image box in stage-local CSS pixels (object-fit: contain). */
  const [imgRect, setImgRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  imgRectRef.current = imgRect;

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

  useEffect(
    () => () => {
      dragListenersCleanupRef.current?.();
      dragListenersCleanupRef.current = null;
    },
    [],
  );

  const frameRect = useMemo(
    () =>
      frameRectFromRelative(
        { x: imgRect.x, y: imgRect.y, width: imgRect.width, height: imgRect.height },
        frameRelative,
      ),
    [frameRelative, imgRect.height, imgRect.width, imgRect.x, imgRect.y],
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

  const attachPointerDrag = useCallback(
    (pointerId: number, onMove: (e: PointerEvent) => void, onEnd: (e: PointerEvent) => void) => {
      dragListenersCleanupRef.current?.();
      const move = (e: PointerEvent) => {
        if (e.pointerId !== pointerId) return;
        onMove(e);
      };
      const end = (e: PointerEvent) => {
        if (e.pointerId !== pointerId) return;
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', end);
        window.removeEventListener('pointercancel', end);
        dragListenersCleanupRef.current = null;
        onEnd(e);
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', end);
      window.addEventListener('pointercancel', end);
      dragListenersCleanupRef.current = () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', end);
        window.removeEventListener('pointercancel', end);
      };
    },
    [],
  );

  const beginMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isInteractive) return;
      if (e.button !== 0) return;
      e.preventDefault();
      const stage = stageRef.current;
      if (!stage) return;
      const ir = imgRectRef.current;
      const { fl, ft, fw, fh } = relativeToImgLocal(frameRelativeRef.current, ir.width, ir.height);
      const { lx, ly } = clientToImgLocal(e.clientX, e.clientY, stage, ir);
      const startLx = lx;
      const startLy = ly;
      attachPointerDrag(
        e.pointerId,
        (ev) => {
          const ir2 = imgRectRef.current;
          const st = stageRef.current;
          if (!st) return;
          const cur = clientToImgLocal(ev.clientX, ev.clientY, st, ir2);
          const nFl = fl + (cur.lx - startLx);
          const nFt = ft + (cur.ly - startLy);
          const clampedFl = Math.min(Math.max(0, nFl), ir2.width - fw);
          const clampedFt = Math.min(Math.max(0, nFt), ir2.height - fh);
          const next = clampFrameRelative(
            imgLocalToRelative(clampedFl, clampedFt, fw, fh, ir2.width, ir2.height),
            ir2.width,
            ir2.height,
          );
          onFrameRelativeChangeRef.current(next);
        },
        () => {},
      );
    },
    [attachPointerDrag, isInteractive],
  );

  const beginResize = useCallback(
    (handle: CornerResizeHandle) => (e: React.PointerEvent) => {
      if (!isInteractive) return;
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      const stage = stageRef.current;
      if (!stage) return;
      const ir = imgRectRef.current;
      const startRect = relativeToImgLocal(frameRelativeRef.current, ir.width, ir.height);
      attachPointerDrag(
        e.pointerId,
        (ev) => {
          const ir2 = imgRectRef.current;
          const st = stageRef.current;
          if (!st) return;
          const cur = clientToImgLocal(ev.clientX, ev.clientY, st, ir2);
          const nextLocal = applyYoutubeAspectCornerResize(handle, startRect, cur.lx, cur.ly, ir2.width, ir2.height);
          const next = clampFrameRelative(
            imgLocalToRelative(nextLocal.fl, nextLocal.ft, nextLocal.fw, nextLocal.fh, ir2.width, ir2.height),
            ir2.width,
            ir2.height,
          );
          onFrameRelativeChangeRef.current(next);
        },
        () => {},
      );
    },
    [attachPointerDrag, isInteractive],
  );

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg border border-foreground-200 bg-foreground-50"
      style={{ aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}` }}
    >
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

          {isInteractive && (
            <div
              className={cn(
                'absolute z-20 touch-none rounded-sm border-2 border-dashed border-primary-500',
                'shadow-[0_0_0_1px_rgba(59,130,246,0.35),0_0_24px_rgba(59,130,246,0.25)]',
              )}
              style={{
                left: frameRect.x,
                top: frameRect.y,
                width: frameRect.width,
                height: frameRect.height,
              }}
              role="presentation"
              aria-label="YouTube banner crop frame — drag to move, use handles to resize"
            >
              <div className="absolute inset-[8px] z-10 cursor-grab active:cursor-grabbing" onPointerDown={beginMove} />

              {/* YouTube safe zones: stronger tints + high-contrast labels */}
              <div className="pointer-events-none absolute inset-0 z-[5]">
                {(() => {
                  const dt = SAFE_ZONE.desktop.top;
                  const db = SAFE_ZONE.desktop.bottom;
                  const ml = SAFE_ZONE.mobile.left;
                  const mr = SAFE_ZONE.mobile.right;
                  const stripH = db - dt;
                  const wingWLeft = ml;
                  const wingWRight = 1 - mr;
                  const stripMidY = (dt + stripH / 2) * 100;

                  const tvFill = 'rgba(91, 33, 182, 0.58)';
                  const desktopFill = 'rgba(217, 119, 6, 0.58)';
                  const mobileFill = 'rgba(5, 120, 85, 0.55)';

                  const zoneLabel =
                    'pointer-events-none rounded-md border-2 px-2 py-1 text-[10px] font-extrabold leading-snug tracking-tight text-white sm:text-[11px] ';
                  const zoneLabelShadow =
                    'shadow-[0_0_0_1px_rgba(0,0,0,0.85),0_2px_16px_rgba(0,0,0,0.65)] [text-shadow:0_1px_2px_rgba(0,0,0,0.95)]';

                  return (
                    <>
                      {/* TV-only: top + bottom bands */}
                      <div
                        className="absolute left-0 top-0 w-full border-b-2 border-violet-950/80"
                        style={{ height: `${dt * 100}%`, backgroundColor: tvFill }}
                      />
                      <div
                        className="absolute bottom-0 left-0 w-full border-t-2 border-violet-950/80"
                        style={{ height: `${(1 - db) * 100}%`, backgroundColor: tvFill }}
                      />
                      <span
                        className={cn(
                          zoneLabel,
                          zoneLabelShadow,
                          'absolute left-1.5 top-1 z-[3] max-w-[min(46%,150px)] border-violet-200 bg-violet-950',
                        )}
                      >
                        TV only — top & bottom stripes
                      </span>

                      {/* Desktop-only wings */}
                      <div
                        className="absolute left-0 border-r-[3px] border-r-amber-950"
                        style={{
                          top: `${dt * 100}%`,
                          width: `${wingWLeft * 100}%`,
                          height: `${stripH * 100}%`,
                          backgroundColor: desktopFill,
                        }}
                      />
                      <div
                        className="absolute right-0 border-l-[3px] border-l-amber-950"
                        style={{
                          top: `${dt * 100}%`,
                          width: `${wingWRight * 100}%`,
                          height: `${stripH * 100}%`,
                          backgroundColor: desktopFill,
                        }}
                      />
                      <span
                        className={cn(
                          zoneLabel,
                          zoneLabelShadow,
                          'absolute z-[3] max-w-[min(44%,150px)] border-amber-200 bg-amber-950',
                        )}
                        style={{
                          left: `${(ml / 2) * 100}%`,
                          top: `${stripMidY}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        Desktop sides
                      </span>
                      <span
                        className={cn(
                          zoneLabel,
                          zoneLabelShadow,
                          'absolute z-[3] max-w-[min(44%,150px)] border-amber-200 bg-amber-950',
                        )}
                        style={{
                          left: `${((mr + 1) / 2) * 100}%`,
                          top: `${stripMidY}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        Desktop sides
                      </span>

                      {/* Mobile safe rectangle */}
                      <div
                        className="absolute ring-[3px] ring-inset ring-emerald-200"
                        style={{
                          left: `${ml * 100}%`,
                          top: `${dt * 100}%`,
                          width: `${(mr - ml) * 100}%`,
                          height: `${stripH * 100}%`,
                          backgroundColor: mobileFill,
                          boxShadow: 'inset 0 0 0 2px rgba(6, 95, 70, 0.95)',
                        }}
                      />
                      <span
                        className={cn(
                          zoneLabel,
                          zoneLabelShadow,
                          'absolute z-[4] max-w-[min(54%,200px)] border-emerald-200 bg-emerald-950 text-center',
                        )}
                        style={{
                          left: `${((ml + mr) / 2) * 100}%`,
                          top: `${stripMidY}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        Safe on all devices
                      </span>

                      {/* Strip edges (desktop banner crop) */}
                      <div
                        className="absolute inset-x-0 z-[2] h-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.35)]"
                        style={{ top: `${dt * 100}%` }}
                      />
                      <div
                        className="absolute inset-x-0 z-[2] h-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.35)]"
                        style={{ top: `${db * 100}%` }}
                      />
                    </>
                  );
                })()}
              </div>

              {/* Corner resize handles (16:9 locked — no edge-only resize) */}
              <button
                type="button"
                aria-label="Resize crop frame north-west"
                className={cn(HANDLE, 'left-0 top-0 -translate-x-1/2 -translate-y-1/2')}
                style={{ cursor: cursorForHandle('nw') }}
                onPointerDown={beginResize('nw')}
              />
              <button
                type="button"
                aria-label="Resize crop frame north-east"
                className={cn(HANDLE, 'right-0 top-0 -translate-y-1/2 translate-x-1/2')}
                style={{ cursor: cursorForHandle('ne') }}
                onPointerDown={beginResize('ne')}
              />
              <button
                type="button"
                aria-label="Resize crop frame south-east"
                className={cn(HANDLE, 'bottom-0 right-0 translate-x-1/2 translate-y-1/2')}
                style={{ cursor: cursorForHandle('se') }}
                onPointerDown={beginResize('se')}
              />
              <button
                type="button"
                aria-label="Resize crop frame south-west"
                className={cn(HANDLE, 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2')}
                style={{ cursor: cursorForHandle('sw') }}
                onPointerDown={beginResize('sw')}
              />

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
