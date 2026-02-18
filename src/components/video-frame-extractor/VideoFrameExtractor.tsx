/* eslint-disable @next/next/no-img-element */
// Drag-and-drop intentionally removed from this tool.
import {
  addToast,
  Button,
  Card,
  CardBody,
  Checkbox,
  cn,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Radio,
  RadioGroup,
  Tooltip,
} from '@heroui/react';
import { zipSync } from 'fflate';
import { AnimatePresence, motion } from 'framer-motion';
import NextLink from 'next/link';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { useSession } from '../../hooks/useSession';
import { useSignUpModalVisibility } from '../../hooks/useSignUpModalVisibility';
import { Icon } from '../various/Icon';

type ExportFormat = 'png' | 'jpg';

type CapturedFrame = {
  id: string;
  timestampSeconds: number;
  createdAt: number;
  blob: Blob;
  objectUrl: string;
  width: number;
  height: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function formatTimestamp(totalSeconds: number) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return '0:00';
  const s = Math.floor(totalSeconds);
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;

  const mm = hours > 0 ? String(minutes).padStart(2, '0') : String(minutes);
  const ss = String(seconds).padStart(2, '0');
  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`;
}

function safeBaseName(fileName: string) {
  const withoutExt = fileName.replace(/\.[^.]+$/, '');
  return withoutExt.replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '') || 'video';
}

async function blobFromCanvas(canvas: HTMLCanvasElement, mime: 'image/png' | 'image/jpeg', quality = 0.95) {
  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (!b) reject(new Error('Failed to create image blob'));
        else resolve(b);
      },
      mime,
      quality,
    );
  });
}

async function convertBlobToFormat(input: Blob, format: ExportFormat) {
  if (format === 'png') return input;
  // Convert PNG -> JPG (or keep JPG as JPG) to match export selection.
  const mime = 'image/jpeg' as const;

  // Prefer createImageBitmap for speed. Fallback to HTMLImageElement when unavailable.
  let bitmap: ImageBitmap | null = null;
  try {
    bitmap = await createImageBitmap(input);
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');
    // JPG has no alpha; paint white background.
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bitmap, 0, 0);
    const out = await blobFromCanvas(canvas, mime, 0.95);
    bitmap.close?.();
    return out;
  } catch (_e) {
    bitmap?.close?.();
    const url = URL.createObjectURL(input);
    try {
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image for conversion'));
        img.src = url;
      });
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Failed to get canvas context');
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      return await blobFromCanvas(canvas, mime, 0.95);
    } finally {
      URL.revokeObjectURL(url);
    }
  }
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function fileNameForFrame(base: string, timestampSeconds: number, format: ExportFormat) {
  const t = Math.max(0, timestampSeconds);
  const mm = Math.floor(t / 60);
  const ss = Math.floor(t % 60);
  const hh = Math.floor(t / 3600);
  const mmInHour = Math.floor((t % 3600) / 60);

  const stamp =
    hh > 0
      ? `${String(hh).padStart(2, '0')}h${String(mmInHour).padStart(2, '0')}m${String(ss).padStart(2, '0')}s`
      : `${String(mm).padStart(2, '0')}m${String(ss).padStart(2, '0')}s`;

  return `${base}_${stamp}.${format}`;
}

function uint8ArrayToArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  // Convert to a plain ArrayBuffer so it always matches DOM BlobPart typing.
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return copy.buffer as ArrayBuffer;
}

function FrameCard({
  frame,
  isSelectedForDownload,
  onDelete,
  onSetSelectedForDownload,
  onDownload,
  onPreview,
}: {
  frame: CapturedFrame;
  isSelectedForDownload: boolean;
  onDelete: () => void;
  onSetSelectedForDownload: (isSelected: boolean) => void;
  onDownload: () => void;
  onPreview: () => void;
}) {
  return (
    <motion.div
      layout
      style={{
        opacity: 1,
      }}
      initial={{ opacity: 0, scale: 0.98, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: 6 }}
      className="relative"
    >
      <Card
        className={cn(
          'h-full border-2 transition-colors',
          isSelectedForDownload ? 'border-primary' : 'border-transparent',
        )}
      >
        <CardBody className="flex flex-col gap-3 p-3">
          <div className="relative overflow-hidden rounded-lg bg-foreground-100">
            <button
              type="button"
              className="group relative block w-full"
              onClick={onPreview}
              aria-label={`Open preview for frame at ${formatTimestamp(frame.timestampSeconds)}`}
            >
              <img
                src={frame.objectUrl}
                alt={`Captured frame at ${formatTimestamp(frame.timestampSeconds)}`}
                className="aspect-video w-full cursor-zoom-in object-cover"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 hidden items-center justify-center bg-black/25 opacity-0 transition-opacity group-hover:flex group-hover:opacity-100">
                <div className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  Click to preview
                </div>
              </div>
            </button>

            {/* Multi-select checkbox */}
            <div
              className="absolute left-2 top-2 inline-flex items-center justify-center rounded-full bg-black/60 p-1.5 text-white backdrop-blur"
              onClick={(e) => e.stopPropagation()}
            >
              <Checkbox
                size="sm"
                color="primary"
                radius="full"
                aria-label="Select frame"
                isSelected={isSelectedForDownload}
                onValueChange={onSetSelectedForDownload}
                className="text-white"
              />
            </div>

            {/* Actions */}
            <div className="absolute right-2 top-2 flex items-center gap-2">
              <Tooltip content="Delete">
                <button
                  type="button"
                  onClick={onDelete}
                  className="rounded-full bg-black/60 p-2 text-white backdrop-blur hover:bg-black/70"
                  aria-label="Delete frame"
                >
                  <Icon icon="trash" size={18} className="text-white" />
                </button>
              </Tooltip>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Icon icon="time" size={16} className="text-foreground-400" />
                <span className="truncate text-sm font-semibold">{formatTimestamp(frame.timestampSeconds)}</span>
              </div>
              <div className="text-xs text-foreground-500">
                {frame.width}×{frame.height}
              </div>
            </div>

            <Button
              size="sm"
              variant="flat"
              className="shrink-0"
              onPress={onDownload}
              startContent={<Icon icon="download" size={16} />}
            >
              Download
            </Button>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}

export function VideoFrameExtractor() {
  const { isSignedIn } = useSession();
  const { openSignUpModal } = useSignUpModalVisibility();

  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);

  const [exportFormat, setExportFormat] = useState<ExportFormat>('png');
  const [frames, setFrames] = useState<CapturedFrame[]>([]);
  const framesRef = useRef<CapturedFrame[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [zoomFrameId, setZoomFrameId] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const hasShownSignUpPromptRef = useRef(false);
  const successfulCaptureCountRef = useRef(0);

  const wasPlayingBeforeSeekRef = useRef(false);

  const onDrop = useCallback((accepted: File[]) => {
    const next = accepted[0];
    if (!next) return;

    if (
      !(
        next.type === 'video/mp4' ||
        next.type === 'video/webm' ||
        next.type === 'video/quicktime' ||
        next.name.toLowerCase().endsWith('.mp4') ||
        next.name.toLowerCase().endsWith('.webm') ||
        next.name.toLowerCase().endsWith('.mov')
      )
    ) {
      addToast({
        title: 'Unsupported file type. Please upload an MP4, MOV, or WEBM.',
        color: 'danger',
        variant: 'flat',
      });
      return;
    }

    setFile(next);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'video/mp4': ['.mp4'],
      'video/webm': ['.webm'],
      'video/quicktime': ['.mov'],
    },
    noKeyboard: true,
  });

  // Create/revoke video object URL
  useEffect(() => {
    if (!file) {
      setVideoUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setDuration(0);
    setCurrentTime(0);
    setIsPlaying(false);

    // Reset captures on new video
    setFrames((prev) => {
      prev.forEach((f) => URL.revokeObjectURL(f.objectUrl));
      return [];
    });
    setSelectedIds([]);
    setZoomFrameId(null);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  useEffect(() => {
    framesRef.current = frames;
  }, [frames]);

  // Cleanup captured frame URLs on unmount
  useEffect(() => {
    return () => {
      framesRef.current.forEach((f) => URL.revokeObjectURL(f.objectUrl));
    };
  }, []);

  const baseName = useMemo(() => (file ? safeBaseName(file.name) : 'video'), [file]);

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(Number.isFinite(v.duration) ? v.duration : 0);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    if (!isSeeking) setCurrentTime(v.currentTime);
  };

  const handleTogglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (v.paused) {
        await v.play();
      } else {
        v.pause();
      }
    } catch (_e) {
      addToast({ title: 'Playback failed. Try again.', color: 'danger', variant: 'flat' });
    }
  };

  const handleSeekTo = (time: number) => {
    const v = videoRef.current;
    if (!v) return;
    const t = clamp(time, 0, duration || 0);
    v.currentTime = t;
    setCurrentTime(t);
  };

  const handleTimelinePointerDown = () => {
    const v = videoRef.current;
    if (!v) return;
    wasPlayingBeforeSeekRef.current = !v.paused;
    v.pause();
    setIsSeeking(true);
  };

  const handleTimelinePointerUp = async () => {
    const v = videoRef.current;
    if (!v) return;
    setIsSeeking(false);
    if (wasPlayingBeforeSeekRef.current) {
      try {
        await v.play();
      } catch (_e) {
        // ignore
      }
    }
  };

  const handleCapture = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (!v.videoWidth || !v.videoHeight) {
      addToast({ title: 'Video not ready yet—try again in a moment.', color: 'warning', variant: 'flat' });
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = v.videoWidth;
    canvas.height = v.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      addToast({ title: 'Failed to capture frame. Please refresh and try again.', color: 'danger', variant: 'flat' });
      return;
    }
    ctx.drawImage(v, 0, 0, canvas.width, canvas.height);

    try {
      const blob = await blobFromCanvas(canvas, 'image/png');
      const objectUrl = URL.createObjectURL(blob);
      const id = crypto?.randomUUID?.() ?? `${Date.now()}_${Math.random().toString(16).slice(2)}`;

      const item: CapturedFrame = {
        id,
        timestampSeconds: v.currentTime,
        createdAt: Date.now(),
        blob,
        objectUrl,
        width: canvas.width,
        height: canvas.height,
      };

      setFrames((prev) => [item, ...prev]);
      successfulCaptureCountRef.current += 1;

      // Nudge sign-up once on the 2nd successful capture (without blocking the tool).
      if (!isSignedIn && !hasShownSignUpPromptRef.current && successfulCaptureCountRef.current === 2) {
        hasShownSignUpPromptRef.current = true;
        openSignUpModal();
      }
      addToast({ title: 'Captured!', color: 'success', variant: 'flat' });
    } catch (_e) {
      addToast({ title: 'Capture failed. Please try again.', color: 'danger', variant: 'flat' });
    }
  };

  const handleDeleteFrame = (id: string) => {
    setFrames((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target) URL.revokeObjectURL(target.objectUrl);
      return prev.filter((f) => f.id !== id);
    });
    setSelectedIds((prev) => prev.filter((x) => x !== id));
    setZoomFrameId((prev) => (prev === id ? null : prev));
  };

  const downloadSingleFrame = async (frame: CapturedFrame) => {
    try {
      const outBlob = await convertBlobToFormat(frame.blob, exportFormat);
      const outName = fileNameForFrame(baseName, frame.timestampSeconds, exportFormat);
      downloadBlob(outBlob, outName);
    } catch (_e) {
      addToast({ title: 'Download failed. Please try again.', color: 'danger', variant: 'flat' });
    }
  };

  const downloadAllAsZip = async () => {
    if (!file || frames.length === 0) return;
    if (isZipping) return;
    setIsZipping(true);
    try {
      const files: Record<string, Uint8Array> = {};
      for (let i = 0; i < frames.length; i += 1) {
        const frame = frames[i];
        const outBlob = await convertBlobToFormat(frame.blob, exportFormat);
        const data = new Uint8Array(await outBlob.arrayBuffer());
        const fileName = `${String(i + 1).padStart(2, '0')}_${fileNameForFrame(baseName, frame.timestampSeconds, exportFormat)}`;
        files[fileName] = data;
      }

      const zipped = zipSync(files, { level: 0 });
      const zipBlob = new Blob([uint8ArrayToArrayBuffer(zipped)], { type: 'application/zip' });
      downloadBlob(zipBlob, `${baseName}_frames.zip`);
      addToast({ title: 'ZIP downloaded!', color: 'success', variant: 'flat' });
    } catch (_e) {
      addToast({ title: 'ZIP export failed. Please try again.', color: 'danger', variant: 'flat' });
    } finally {
      setIsZipping(false);
    }
  };

  const downloadSelectedAsZip = async () => {
    if (!file) return;
    if (selectedIds.length === 0) return;
    if (isZipping) return;
    const selectedFrames = frames.filter((f) => selectedIds.includes(f.id));
    if (selectedFrames.length === 0) return;

    setIsZipping(true);
    try {
      const files: Record<string, Uint8Array> = {};
      for (let i = 0; i < selectedFrames.length; i += 1) {
        const frame = selectedFrames[i];
        const outBlob = await convertBlobToFormat(frame.blob, exportFormat);
        const data = new Uint8Array(await outBlob.arrayBuffer());
        const fileName = `${String(i + 1).padStart(2, '0')}_${fileNameForFrame(baseName, frame.timestampSeconds, exportFormat)}`;
        files[fileName] = data;
      }

      const zipped = zipSync(files, { level: 0 });
      const zipBlob = new Blob([uint8ArrayToArrayBuffer(zipped)], { type: 'application/zip' });
      downloadBlob(zipBlob, `${baseName}_selected_frames.zip`);
      addToast({ title: 'ZIP downloaded!', color: 'success', variant: 'flat' });
    } catch (_e) {
      addToast({ title: 'ZIP export failed. Please try again.', color: 'danger', variant: 'flat' });
    } finally {
      setIsZipping(false);
    }
  };

  const zoomFrame = useMemo(() => frames.find((f) => f.id === zoomFrameId) ?? null, [frames, zoomFrameId]);
  const timelineProgressPct = useMemo(() => {
    if (!Number.isFinite(duration) || duration <= 0) return 0;
    return clamp((currentTime / duration) * 100, 0, 100);
  }, [currentTime, duration]);

  return (
    <div className="flex flex-col gap-6">
      {/* Upload / Empty state */}
      {!videoUrl && (
        <Card shadow="sm" className="border border-foreground-200">
          <CardBody className="p-6">
            <div
              {...getRootProps()}
              className={cn(
                'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 text-center transition-colors',
                isDragActive ? 'border-primary bg-primary/5' : 'border-foreground-200 hover:bg-foreground-50',
              )}
            >
              <input {...getInputProps()} />
              <div className="flex items-center gap-2 rounded-full bg-foreground-100 px-4 py-2">
                <Icon icon="addVideo" size={18} className="text-primary" />
                <span className="font-semibold">Drop a video</span>
              </div>
              <div className="max-w-xl text-sm text-foreground-500">
                MP4, MOV, or WEBM. Everything stays on your device.
              </div>
              <Button
                className="bg-foreground text-content1"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  open();
                }}
              >
                Choose a video
              </Button>
              <div className="text-xs text-foreground-400">Tip: Start scrubbing—then smash “Capture this frame”.</div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Player */}
      {videoUrl && (
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <Card shadow="sm" className="border border-foreground-200">
            <CardBody className="p-4 sm:p-5">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate font-sans text-base font-semibold">{file?.name}</div>
                    <div className="text-sm text-foreground-500">
                      {duration ? `${formatTimestamp(currentTime)} / ${formatTimestamp(duration)}` : 'Loading…'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="light"
                      onPress={() => setFile(null)}
                      aria-label="Choose another video"
                    >
                      Choose another video
                    </Button>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-xl bg-black">
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    className="aspect-video w-full cursor-pointer"
                    playsInline
                    preload="metadata"
                    onLoadedMetadata={handleLoadedMetadata}
                    onTimeUpdate={handleTimeUpdate}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                    onClick={() => {
                      if (!duration) return;
                      void handleTogglePlay();
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    onKeyDown={(e) => {
                      if (!duration) return;
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        void handleTogglePlay();
                      }
                    }}
                  />
                </div>

                {/* Timeline */}
                <div className="relative -mt-2">
                  <div className="relative rounded-xl border border-foreground-200 bg-content1 p-4">
                    <div className="mb-2 flex items-center justify-between text-xs text-foreground-500">
                      <span className="font-medium text-foreground-600">Timeline</span>
                    </div>

                    <div className="group relative">
                      {/* Custom track */}
                      <div className="relative h-2 w-full overflow-hidden rounded-full bg-foreground-200/70 shadow-inner">
                        <div className="h-full bg-black" style={{ width: `${timelineProgressPct}%` }} />
                        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:56px_100%]" />
                      </div>

                      {/* Range input sits on top (thumb only) */}
                      <input
                        type="range"
                        min={0}
                        max={Math.max(duration, 0)}
                        step={0.01}
                        value={Math.min(currentTime, Math.max(duration, 0))}
                        onChange={(e) => handleSeekTo(Number(e.target.value))}
                        onPointerDown={handleTimelinePointerDown}
                        onPointerUp={handleTimelinePointerUp}
                        onPointerCancel={handleTimelinePointerUp}
                        className={cn(
                          'absolute inset-0 h-2 w-full cursor-pointer appearance-none bg-transparent',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-content1',
                          'disabled:cursor-not-allowed disabled:opacity-50',
                          // WebKit (Chrome/Safari)
                          '[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-transparent',
                          '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full',
                          // Playhead: black fill + contrasting border so it stays visible on the progress bar
                          '[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-content1 [&::-webkit-slider-thumb]:bg-black',
                          '[&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150',
                          '[&::-webkit-slider-thumb]:-mt-1',
                          // Firefox
                          '[&::-moz-range-track]:h-2 [&::-moz-range-track]:bg-transparent',
                          '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full',
                          '[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-content1 [&::-moz-range-thumb]:bg-black',
                          '[&::-moz-range-thumb]:box-border [&::-moz-range-thumb]:shadow-lg',
                          // Make the thumb feel more “grabby”
                          'active:[&::-moz-range-thumb]:scale-110 active:[&::-webkit-slider-thumb]:scale-110',
                        )}
                        aria-label="Timeline"
                        disabled={!duration}
                      />

                      {/* Time bubble (shows while scrubbing, and on hover) */}
                      {duration > 0 && (
                        <div
                          className={cn(
                            'pointer-events-none absolute -top-9 left-0 -translate-x-1/2 rounded-full bg-foreground px-2 py-1 text-[11px] font-semibold text-content1 shadow-sm transition-opacity',
                            isSeeking ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                          )}
                          style={{ left: `${timelineProgressPct}%` }}
                        >
                          {formatTimestamp(currentTime)}
                        </div>
                      )}
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-foreground-500">
                      <span className="tabular-nums">0:00</span>
                      <span className="tabular-nums">{formatTimestamp(duration)}</span>
                    </div>

                    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="flat"
                          size="sm"
                          startContent={<Icon icon={isPlaying ? 'pause' : 'play'} size={16} />}
                          onPress={handleTogglePlay}
                          isDisabled={!duration}
                        >
                          {isPlaying ? 'Pause' : 'Play'}
                        </Button>
                        <Button
                          className="bg-foreground text-content1"
                          size="sm"
                          startContent={<Icon icon="panorama" size={16} />}
                          onPress={handleCapture}
                          isDisabled={!duration}
                        >
                          Capture this frame
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Right panel */}
          <div className="flex flex-col gap-4">
            <Card shadow="sm" className="border border-foreground-200">
              <CardBody className="p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Icon icon="download" size={16} className="text-foreground-400" />
                  <h3 className="font-sans text-sm font-semibold">Export</h3>
                </div>

                <RadioGroup
                  value={exportFormat}
                  onValueChange={(v) => setExportFormat(v as ExportFormat)}
                  orientation="vertical"
                  aria-label="Export format"
                  className="gap-2"
                >
                  <Radio value="png" description="Best quality (recommended)">
                    PNG
                  </Radio>
                  <Radio value="jpg" description="Smaller file size">
                    JPG
                  </Radio>
                </RadioGroup>

                <div className="mt-4 rounded-lg bg-foreground-50 p-3 text-sm text-foreground-600">
                  Captures are saved at the video’s native resolution.
                </div>
              </CardBody>
            </Card>

            {/* CTA (always visible under Export) */}
            <Card className="overflow-hidden">
              <CardBody className="relative p-5">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-foreground/5" />
                <div className="relative flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                      <Icon icon="panorama" size={18} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">Turn frames into approvals</div>
                      <div className="text-sm text-foreground-600">
                        Review videos in Kreatli, collect feedback, and keep every comment tied to the exact moment.
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2 text-sm text-foreground-600">
                    <div className="flex items-start gap-2">
                      <Icon icon="time" size={16} className="mt-0.5 text-primary" />
                      <span>Frame-accurate comments & timestamps</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon icon="download" size={16} className="mt-0.5 text-primary" />
                      <span>Centralize versions, exports, and decisions</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon icon="arrowRight" size={16} className="mt-0.5 text-primary" />
                      <span>Share a no-signup link with clients</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button
                      as={NextLink}
                      href={isSignedIn ? '/platform/creative-workspace' : '/sign-up'}
                      className="bg-foreground text-content1"
                    >
                      Start for Free
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      )}

      {/* Gallery */}
      {videoUrl && (
        <Card shadow="sm" className="border border-foreground-200">
          <CardBody className="p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Icon icon="panorama" size={18} className="text-primary" />
                <h2 className="font-sans text-lg font-bold">Captured frames</h2>
                <span className="rounded-full bg-foreground-100 px-2 py-0.5 text-xs font-semibold text-foreground-600">
                  {frames.length}
                </span>
                {selectedIds.length > 0 && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    {selectedIds.length} selected
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {selectedIds.length > 0 && (
                  <Button
                    size="sm"
                    className="bg-foreground text-content1"
                    isDisabled={isZipping}
                    isLoading={isZipping}
                    onPress={downloadSelectedAsZip}
                    startContent={!isZipping ? <Icon icon="download" size={16} /> : undefined}
                  >
                    <span>Download Selected</span>
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="bordered"
                  isDisabled={frames.length === 0 || isZipping}
                  isLoading={isZipping}
                  onPress={downloadAllAsZip}
                  startContent={!isZipping ? <Icon icon="download" size={16} /> : undefined}
                >
                  <span>Download all (ZIP)</span>
                </Button>
              </div>
            </div>

            {frames.length === 0 ? (
              <div className="rounded-xl border border-foreground-200 bg-foreground-50 p-6 text-center">
                <div className="mx-auto mb-2 flex w-fit items-center gap-2 rounded-full bg-content1 px-3 py-2">
                  <Icon icon="play" size={16} className="text-primary" />
                  <span className="text-sm font-semibold">Play or scrub</span>
                </div>
                <div className="text-sm text-foreground-500">
                  When you see a moment you like, hit{' '}
                  <span className="font-semibold text-foreground">Capture this frame</span>.
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                  {frames.map((frame) => (
                    <FrameCard
                      key={frame.id}
                      frame={frame}
                      isSelectedForDownload={selectedIds.includes(frame.id)}
                      onDelete={() => handleDeleteFrame(frame.id)}
                      onSetSelectedForDownload={(isSelected) =>
                        setSelectedIds((prev) => {
                          if (isSelected) return prev.includes(frame.id) ? prev : [...prev, frame.id];
                          return prev.filter((x) => x !== frame.id);
                        })
                      }
                      onDownload={() => downloadSingleFrame(frame)}
                      onPreview={() => setZoomFrameId(frame.id)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {/* Zoom modal */}
      <Modal isOpen={!!zoomFrameId} onOpenChange={() => setZoomFrameId(null)} size="5xl" aria-label="Frame preview">
        <ModalContent>
          <ModalHeader className="pb-0">Frame preview</ModalHeader>
          <ModalBody className="py-6">
            {zoomFrame && (
              <div className="flex flex-col gap-3">
                <div className="overflow-hidden rounded-xl bg-black">
                  <img src={zoomFrame.objectUrl} alt="Zoomed frame" className="w-full object-contain" />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-foreground-500">
                  <div className="flex items-center gap-2">
                    <Icon icon="time" size={16} />
                    <span>{formatTimestamp(zoomFrame.timestampSeconds)}</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-foreground text-content1"
                    onPress={() => downloadSingleFrame(zoomFrame)}
                  >
                    Download
                  </Button>
                </div>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
