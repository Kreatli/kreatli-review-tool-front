'use client';

import { cn } from '@heroui/react';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import {
  applyAspectCornerResize,
  clampFrameRelative,
  frameRectFromRelative,
  getSourceCropPixels,
  imgLocalToRelative,
  outputAspectFromTargets,
  relativeToImgLocal,
  type VideoCornerResizeHandle,
  type VideoCropFrameRelative,
} from './resizeVideoCropGeometry';

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

function cursorForHandle(h: VideoCornerResizeHandle): string {
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

export interface ResizeVideoCropStageProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  videoUrl: string;
  sourceWidth: number;
  sourceHeight: number;
  targetWidth: number;
  targetHeight: number;
  frameRelative: VideoCropFrameRelative;
  onFrameRelativeChange: (next: VideoCropFrameRelative) => void;
  onSourceCropReady: (crop: { sx: number; sy: number; sw: number; sh: number } | null) => void;
  onLoadedMetadata?: () => void;
  /** Disable drag/resize (encoding). */
  interactive?: boolean;
}

export function ResizeVideoCropStage({
  videoRef,
  videoUrl,
  sourceWidth,
  sourceHeight,
  targetWidth,
  targetHeight,
  frameRelative,
  onFrameRelativeChange,
  onSourceCropReady,
  onLoadedMetadata,
  interactive = true,
}: ResizeVideoCropStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRectRef = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const onFrameRelativeChangeRef = useRef(onFrameRelativeChange);
  onFrameRelativeChangeRef.current = onFrameRelativeChange;
  const frameRelativeRef = useRef(frameRelative);
  frameRelativeRef.current = frameRelative;
  const dragListenersCleanupRef = useRef<(() => void) | null>(null);

  const [imgRect, setImgRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [scrubTime, setScrubTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const outputAspect = useMemo(
    () => outputAspectFromTargets(targetWidth, targetHeight),
    [targetWidth, targetHeight],
  );

  const measure = useCallback(() => {
    const stage = stageRef.current;
    if (!stage || !sourceWidth || !sourceHeight) return;
    const sw = stage.clientWidth;
    const sh = stage.clientHeight;
    if (!sw || !sh) return;
    const containScale = Math.min(sw / sourceWidth, sh / sourceHeight);
    const w = sourceWidth * containScale;
    const h = sourceHeight * containScale;
    const x = (sw - w) / 2;
    const y = (sh - h) / 2;
    setImgRect({ x, y, width: w, height: h });
  }, [sourceHeight, sourceWidth]);

  useLayoutEffect(() => {
    measure();
  }, [videoUrl, sourceWidth, sourceHeight, measure]);

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
        outputAspect,
      ),
    [frameRelative, imgRect.height, imgRect.width, imgRect.x, imgRect.y, outputAspect],
  );

  useLayoutEffect(() => {
    if (!sourceWidth || !sourceHeight || imgRect.width <= 0 || imgRect.height <= 0) {
      onSourceCropReady(null);
      return;
    }
    const crop = getSourceCropPixels(sourceWidth, sourceHeight, imgRect, frameRect);
    if (crop.sw <= 0 || crop.sh <= 0) {
      onSourceCropReady(null);
      return;
    }
    onSourceCropReady(crop);
  }, [frameRect, imgRect, onSourceCropReady, sourceHeight, sourceWidth]);

  const isInteractive =
    interactive && sourceWidth > 0 && sourceHeight > 0 && imgRect.width > 0 && imgRect.height > 0;

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
      const ir = imgRect;
      const { fl, ft, fw, fh } = relativeToImgLocal(frameRelativeRef.current, ir.width, ir.height, outputAspect);
      const { lx, ly } = clientToImgLocal(e.clientX, e.clientY, stage, ir);
      const startLx = lx;
      const startLy = ly;
      attachPointerDrag(e.pointerId, (ev) => {
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
          outputAspect,
        );
        onFrameRelativeChangeRef.current(next);
      }, () => {});
    },
    [attachPointerDrag, imgRect, isInteractive, outputAspect],
  );

  const beginResize = useCallback(
    (handle: VideoCornerResizeHandle) => (e: React.PointerEvent) => {
      if (!isInteractive) return;
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      const stage = stageRef.current;
      if (!stage) return;
      const ir = imgRect;
      const startRect = relativeToImgLocal(frameRelativeRef.current, ir.width, ir.height, outputAspect);
      attachPointerDrag(e.pointerId, (ev) => {
        const ir2 = imgRectRef.current;
        const st = stageRef.current;
        if (!st) return;
        const cur = clientToImgLocal(ev.clientX, ev.clientY, st, ir2);
        const nextLocal = applyAspectCornerResize(handle, startRect, cur.lx, cur.ly, ir2.width, ir2.height, outputAspect);
        const next = clampFrameRelative(
          imgLocalToRelative(nextLocal.fl, nextLocal.ft, nextLocal.fw, nextLocal.fh, ir2.width, ir2.height),
          ir2.width,
          ir2.height,
          outputAspect,
        );
        onFrameRelativeChangeRef.current(next);
      }, () => {});
    },
    [attachPointerDrag, imgRect, isInteractive, outputAspect],
  );

  useEffect(() => {
    imgRectRef.current = imgRect;
  }, [imgRect]);

  const syncTimeFromVideo = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setScrubTime(v.currentTime);
    if (v.duration && Number.isFinite(v.duration)) setDuration(v.duration);
  }, [videoRef]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => syncTimeFromVideo();
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('loadedmetadata', onTime);
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('loadedmetadata', onTime);
    };
  }, [videoUrl, syncTimeFromVideo, videoRef]);

  const handleLoaded = useCallback(() => {
    syncTimeFromVideo();
    onLoadedMetadata?.();
  }, [onLoadedMetadata, syncTimeFromVideo]);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-foreground-500">
        Scrub to preview a frame, then drag the frame or corners. Export uses this crop for the whole video (output
        aspect matches your selected size).
      </p>
      <div
        ref={stageRef}
        className="relative w-full overflow-hidden rounded-xl bg-black"
        style={
          sourceWidth > 0 && sourceHeight > 0
            ? { aspectRatio: `${sourceWidth} / ${sourceHeight}` }
            : { aspectRatio: '16 / 9' }
        }
      >
        <video
          ref={videoRef}
          src={videoUrl}
          className="pointer-events-none absolute select-none"
          style={{
            left: imgRect.x,
            top: imgRect.y,
            width: imgRect.width,
            height: imgRect.height,
            objectFit: 'fill',
          }}
          onLoadedMetadata={handleLoaded}
          crossOrigin="anonymous"
          playsInline
          muted
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
            aria-label="Crop frame — drag to move, corners to resize"
          >
            <div className="absolute inset-[8px] z-10 cursor-grab active:cursor-grabbing" onPointerDown={beginMove} />

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-y-0 left-1/3 w-px bg-white/45" />
              <div className="absolute inset-y-0 left-2/3 w-px bg-white/45" />
              <div className="absolute inset-x-0 top-1/3 h-px bg-white/45" />
              <div className="absolute inset-x-0 top-2/3 h-px bg-white/45" />
            </div>

            <button
              type="button"
              aria-label="Resize north-west"
              className={cn(HANDLE, 'left-0 top-0 -translate-x-1/2 -translate-y-1/2')}
              style={{ cursor: cursorForHandle('nw') }}
              onPointerDown={beginResize('nw')}
            />
            <button
              type="button"
              aria-label="Resize north-east"
              className={cn(HANDLE, 'right-0 top-0 translate-x-1/2 -translate-y-1/2')}
              style={{ cursor: cursorForHandle('ne') }}
              onPointerDown={beginResize('ne')}
            />
            <button
              type="button"
              aria-label="Resize south-east"
              className={cn(HANDLE, 'right-0 bottom-0 translate-x-1/2 translate-y-1/2')}
              style={{ cursor: cursorForHandle('se') }}
              onPointerDown={beginResize('se')}
            />
            <button
              type="button"
              aria-label="Resize south-west"
              className={cn(HANDLE, 'left-0 bottom-0 -translate-x-1/2 translate-y-1/2')}
              style={{ cursor: cursorForHandle('sw') }}
              onPointerDown={beginResize('sw')}
            />
          </div>
        )}
      </div>

      {duration > 0 && (
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-foreground-600" htmlFor="resize-video-scrub">
            Preview position
          </label>
          <input
            id="resize-video-scrub"
            type="range"
            min={0}
            max={duration}
            step={0.05}
            value={scrubTime}
            onChange={(e) => {
              const t = Number(e.target.value);
              setScrubTime(t);
              if (videoRef.current) {
                videoRef.current.currentTime = t;
              }
            }}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-[10px] text-foreground-400">
            <span>{scrubTime.toFixed(1)}s</span>
            <span>{duration.toFixed(1)}s</span>
          </div>
        </div>
      )}
    </div>
  );
}
