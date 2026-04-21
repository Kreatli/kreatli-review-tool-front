'use client';

import { addToast, Button, Card, CardBody, cn, Progress, Radio, RadioGroup } from '@heroui/react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { type FileRejection, useDropzone } from 'react-dropzone';

import { useFreeToolsInactiveGate } from '../../contexts/FreeToolsInactiveGateContext';
import { useSession } from '../../hooks/useSession';
import { useSoftGate } from '../../hooks/useSoftGate';
import { Icon } from '../various/Icon';

type OutputFormat = 'mp4' | 'mov';

const MAX_FILE_SIZE_BYTES = 500 * 1024 * 1024; // 500MB
const DEFAULT_AUDIO_KBPS = 128;
const MIN_VIDEO_KBPS = 200;
const MAX_VIDEO_KBPS = 12000;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function safeBaseName(fileName: string) {
  const withoutExt = fileName.replace(/\.[^.]+$/, '');
  return withoutExt.replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '') || 'video';
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'] as const;
  const idx = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  const val = bytes / 1024 ** idx;
  const rounded = idx === 0 ? Math.round(val) : Math.round(val * 10) / 10;
  return `${rounded} ${units[idx]}`;
}

function getInputExtension(file: File): string {
  const name = file.name.toLowerCase();
  if (name.endsWith('.mp4')) return 'mp4';
  if (name.endsWith('.mov')) return 'mov';
  if (name.endsWith('.webm')) return 'webm';
  if (name.endsWith('.ogv')) return 'ogv';
  return 'mp4';
}

export function VideoCompressorTool() {
  const { isSignedIn } = useSession();
  const { isInactiveLocked, openInactivePlanModal } = useFreeToolsInactiveGate();

  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [durationSeconds, setDurationSeconds] = useState<number>(0);
  const [sourceWidth, setSourceWidth] = useState<number>(0);
  const [sourceHeight, setSourceHeight] = useState<number>(0);
  const [targetSizeMb, setTargetSizeMb] = useState<number>(25);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('mp4');

  const [status, setStatus] = useState<'idle' | 'loading' | 'processing' | 'done'>('idle');
  const [progress, setProgress] = useState<number>(0);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputExtension, setOutputExtension] = useState<string>('mp4');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cancelRequestedRef = useRef<boolean>(false);
  const downloadRef = useRef<() => void>(() => {});
  const hasTriggeredDownloadForDoneRef = useRef<boolean>(false);

  const reset = useCallback(() => {
    setFile(null);
    setVideoUrl(null);
    setDurationSeconds(0);
    setSourceWidth(0);
    setSourceHeight(0);
    setStatus('idle');
    setProgress(0);
    setOutputBlob(null);
    setOutputExtension('mp4');
    cancelRequestedRef.current = false;
  }, []);

  const { triggerSoftGate } = useSoftGate({ onReset: reset });

  const onDrop = useCallback(
    (accepted: File[]) => {
      const next = accepted[0];
      if (!next) return;
      if (isInactiveLocked) {
        openInactivePlanModal();
        return;
      }
      if (!(next.type.startsWith('video/') || next.name.toLowerCase().match(/\.(mp4|webm|mov|ogg|avi|mkv)$/))) {
        addToast({
          title: 'Unsupported file type. Please use a video file (e.g. MP4, WebM, MOV).',
          color: 'danger',
          variant: 'flat',
        });
        return;
      }
      setFile(next);
      setStatus('idle');
      setOutputBlob(null);
      setProgress(0);
      hasTriggeredDownloadForDoneRef.current = false;
      cancelRequestedRef.current = false;

      triggerSoftGate();
    },
    [isInactiveLocked, openInactivePlanModal, triggerSoftGate],
  );

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    const fileTooLarge = fileRejections.some((r) => r.errors.some((e) => e.code === 'file-too-large'));
    addToast({
      title: fileTooLarge
        ? 'File is too large. Maximum size is 500 MB. Try a shorter or lower-resolution video.'
        : 'File was rejected. Please use a video file (e.g. MP4, WebM, MOV) under 500 MB.',
      color: 'danger',
      variant: 'flat',
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    onDropRejected,
    multiple: false,
    maxSize: MAX_FILE_SIZE_BYTES,
    accept: {
      'video/mp4': ['.mp4'],
      'video/webm': ['.webm'],
      'video/quicktime': ['.mov'],
      'video/ogg': ['.ogv'],
    },
    noKeyboard: true,
  });

  useEffect(() => {
    if (!file) {
      setVideoUrl(null);
      setDurationSeconds(0);
      setSourceWidth(0);
      setSourceHeight(0);
      return;
    }
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onLoadedMetadata = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setSourceWidth(v.videoWidth || 0);
    setSourceHeight(v.videoHeight || 0);
    setDurationSeconds(v.duration || 0);

    // Default: suggest a target size ~60% of source, clamped to a sane range.
    if (file?.size) {
      const srcMb = file.size / 1024 / 1024;
      setTargetSizeMb(clamp(Math.round(srcMb * 0.6), 2, Math.max(5, Math.round(srcMb))));
    }
  }, [file?.size]);

  const targetVideoKbps = useMemo(() => {
    if (!durationSeconds || durationSeconds <= 0) return null;
    const targetBytes = targetSizeMb * 1024 * 1024;
    const targetBits = targetBytes * 8;
    const totalBps = targetBits / durationSeconds;
    const totalKbps = totalBps / 1000;
    const videoKbps = clamp(Math.floor(totalKbps - DEFAULT_AUDIO_KBPS), MIN_VIDEO_KBPS, MAX_VIDEO_KBPS);
    return videoKbps;
  }, [durationSeconds, targetSizeMb]);

  const runFFmpegCompress = useCallback(
    async (inputFile: File, format: OutputFormat, videoKbps: number, onProgressUpdate: (p: number) => void) => {
      const [{ FFmpeg }, { fetchFile }] = await Promise.all([import('@ffmpeg/ffmpeg'), import('@ffmpeg/util')]);
      const ffmpeg = new FFmpeg();

      const ext = getInputExtension(inputFile);
      const inputName = `input.${ext}`;
      const outputName = format === 'mov' ? 'output.mov' : 'output.mp4';
      const mimeType = format === 'mov' ? 'video/quicktime' : 'video/mp4';

      const progressHandler = ({ progress: p }: { progress: number }) => {
        onProgressUpdate(Math.round(p * 100));
      };
      ffmpeg.on('progress', progressHandler);

      await ffmpeg.load();

      if (cancelRequestedRef.current) {
        ffmpeg.off('progress', progressHandler);
        throw new Error('Cancelled');
      }

      const data = await fetchFile(inputFile);
      await ffmpeg.writeFile(inputName, data);

      // Note: `-b:v` targets bitrate; final size varies by content/encoder overhead.
      const args = [
        '-i',
        inputName,
        '-c:v',
        'libx264',
        '-b:v',
        `${videoKbps}k`,
        '-maxrate',
        `${videoKbps}k`,
        '-bufsize',
        `${videoKbps * 2}k`,
        '-preset',
        'veryfast',
        '-movflags',
        '+faststart',
        '-c:a',
        'aac',
        '-b:a',
        `${DEFAULT_AUDIO_KBPS}k`,
        outputName,
      ];

      const code = await ffmpeg.exec(args);
      ffmpeg.off('progress', progressHandler);

      if (cancelRequestedRef.current) throw new Error('Cancelled');
      if (code !== 0) throw new Error('FFmpeg failed');

      const outData = (await ffmpeg.readFile(outputName)) as Uint8Array;
      const copy = new Uint8Array(outData.byteLength);
      copy.set(outData);
      const blob = new Blob([copy], { type: mimeType });
      return blob;
    },
    [],
  );

  const startCompress = useCallback(async () => {
    if (isInactiveLocked) {
      openInactivePlanModal();
      return;
    }
    if (!file || !videoUrl || !durationSeconds || !targetVideoKbps) return;
    if (file.size > MAX_FILE_SIZE_BYTES) {
      addToast({
        title: 'File is too large. Maximum size is 500 MB. Try a shorter or lower-resolution video.',
        color: 'danger',
        variant: 'flat',
      });
      return;
    }
    if (targetSizeMb <= 1) {
      addToast({
        title: 'Target size is too small. Try at least 2 MB.',
        color: 'danger',
        variant: 'flat',
      });
      return;
    }

    cancelRequestedRef.current = false;
    setStatus('loading');
    setProgress(0);
    setOutputBlob(null);
    setOutputExtension(outputFormat);

    try {
      const blob = await runFFmpegCompress(file, outputFormat, targetVideoKbps, setProgress);
      if (cancelRequestedRef.current) {
        setStatus('idle');
        setProgress(0);
        return;
      }
      setOutputBlob(blob);
      setStatus('done');
      setProgress(100);
    } catch (e) {
      if ((e as Error)?.message === 'Cancelled') {
        setStatus('idle');
        setProgress(0);
        addToast({ title: 'Compression cancelled.', color: 'warning', variant: 'flat' });
        return;
      }
      console.error('Video compressor FFmpeg encoding failed:', e);
      setStatus('idle');
      addToast({
        title: 'Compression failed. Try a smaller source file or a larger target size.',
        color: 'danger',
        variant: 'flat',
      });
    }
  }, [
    durationSeconds,
    file,
    isInactiveLocked,
    openInactivePlanModal,
    outputFormat,
    runFFmpegCompress,
    targetSizeMb,
    targetVideoKbps,
    videoUrl,
  ]);

  const download = useCallback(() => {
    if (isInactiveLocked) {
      openInactivePlanModal();
      return;
    }
    if (!outputBlob || !file) return;
    const base = safeBaseName(file.name);
    const url = URL.createObjectURL(outputBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${base}_compressed.${outputExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [file, isInactiveLocked, openInactivePlanModal, outputBlob, outputExtension]);

  useEffect(() => {
    downloadRef.current = download;
  }, [download]);

  useEffect(() => {
    if (status !== 'done') {
      hasTriggeredDownloadForDoneRef.current = false;
      return;
    }
    if (!outputBlob || !file || hasTriggeredDownloadForDoneRef.current) return;

    if (isInactiveLocked) {
      openInactivePlanModal();
      setStatus('idle');
      setOutputBlob(null);
      setProgress(0);
      return;
    }

    hasTriggeredDownloadForDoneRef.current = true;
    downloadRef.current?.();
    if (!isSignedIn) {
      triggerSoftGate();
    }
  }, [file, isInactiveLocked, isSignedIn, openInactivePlanModal, outputBlob, status, triggerSoftGate]);

  const hasVideo = !!file && !!videoUrl;
  const canCompress = hasVideo && status === 'idle' && durationSeconds > 0 && !!targetVideoKbps;

  const sourceInfo = useMemo(() => {
    if (!file) return null;
    const srcMb = file.size / 1024 / 1024;
    const dur = durationSeconds;
    const minutes = dur > 0 ? Math.floor(dur / 60) : 0;
    const seconds = dur > 0 ? Math.floor(dur % 60) : 0;
    return {
      srcMb,
      durationLabel: dur > 0 ? `${minutes}:${String(seconds).padStart(2, '0')}` : '—',
      sizeLabel: formatBytes(file.size),
    };
  }, [durationSeconds, file]);

  const resultSummary = useMemo(() => {
    if (!file || !outputBlob) return null;
    const before = file.size;
    const after = outputBlob.size;
    const pct = before > 0 ? Math.round(((before - after) / before) * 100) : 0;
    return { before, after, pct };
  }, [file, outputBlob]);

  return (
    <div className="flex flex-col gap-6">
      <input {...getInputProps()} className="sr-only" aria-hidden />

      {!hasVideo && (
        <Card shadow="sm" className="border border-foreground-200">
          <CardBody className="p-6">
            <div
              {...getRootProps()}
              className={cn(
                'flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 text-center transition-colors',
                isDragActive ? 'border-primary bg-primary/5' : 'border-foreground-200 hover:bg-foreground-50',
              )}
            >
              <div className="flex items-center gap-2 rounded-full bg-foreground-100 px-4 py-2">
                <Icon icon="addVideo" size={18} className="text-primary" />
                <span className="font-semibold">Drop a video</span>
              </div>
              <div className="max-w-xl text-sm text-foreground-500">
                MP4, MOV, or WebM. Max 500 MB. Everything stays on your device.
              </div>
              <Button
                className="bg-foreground text-content1"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isInactiveLocked) {
                    openInactivePlanModal();
                    return;
                  }
                  open();
                }}
              >
                Choose a video
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {hasVideo && (
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <Card shadow="sm" className="border border-foreground-200">
            <CardBody className="p-4 sm:p-5">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate font-sans text-base font-semibold">{file?.name}</div>
                    <div className="text-sm text-foreground-500">
                      {sourceWidth > 0 && sourceHeight > 0 && sourceInfo && (
                        <span>
                          {sourceWidth}×{sourceHeight}
                          {durationSeconds > 0 && ` · ${sourceInfo.durationLabel}`}
                          {file?.size ? ` · ${sourceInfo.sizeLabel}` : ''}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="light"
                    onPress={() => {
                      if (isInactiveLocked) {
                        openInactivePlanModal();
                        return;
                      }
                      open();
                    }}
                    aria-label="Choose another video"
                  >
                    Choose another video
                  </Button>
                </div>

                <div className="relative overflow-hidden rounded-xl bg-black">
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    className="aspect-video w-full"
                    onLoadedMetadata={onLoadedMetadata}
                    crossOrigin="anonymous"
                    playsInline
                    muted
                    controls
                  />
                </div>

                <div className="rounded-xl border border-foreground-200 bg-content1 p-4">
                  <h3 className="mb-3 font-sans text-sm font-semibold">Target output size</h3>
                  <div className="flex flex-wrap items-end gap-3">
                    <label className="flex flex-col gap-1">
                      <span className="text-xs font-medium text-foreground-500">Target (MB)</span>
                      <input
                        type="number"
                        min={2}
                        max={500}
                        value={targetSizeMb}
                        onChange={(e) => setTargetSizeMb(Number(e.target.value) || 2)}
                        className="w-32 rounded-md border border-default-300 bg-transparent px-2 py-1.5 text-sm"
                        aria-label="Target output size in megabytes"
                      />
                    </label>
                    <div className="text-sm text-foreground-600">
                      {targetVideoKbps ? (
                        <span>
                          Estimated video bitrate: <span className="font-semibold">{targetVideoKbps} kbps</span> (audio{' '}
                          {DEFAULT_AUDIO_KBPS} kbps)
                        </span>
                      ) : (
                        <span>Load the video to estimate bitrate.</span>
                      )}
                    </div>
                  </div>
                  {file?.size && targetSizeMb && (
                    <p className="mt-2 text-xs text-foreground-500">
                      Note: exact output size varies by content. If you need a specific limit, try a slightly smaller
                      target.
                    </p>
                  )}
                </div>

                {status === 'idle' && (
                  <Button
                    color="primary"
                    size="md"
                    className="w-fit bg-foreground font-semibold text-content1"
                    onPress={startCompress}
                    isDisabled={!canCompress}
                    startContent={<Icon icon="play" size={18} />}
                  >
                    Compress video
                  </Button>
                )}

                {(status === 'loading' || status === 'processing') && (
                  <div className="w-full space-y-2" aria-live="polite" aria-atomic="true">
                    <Progress value={progress} color="primary" size="sm" aria-label="Compression progress" />
                    <p className="text-center text-sm text-foreground-600">
                      {status === 'loading' ? `Loading video encoder… ${Math.round(progress)}%` : `Compressing… ${Math.round(progress)}%`}
                    </p>
                    <Button
                      variant="flat"
                      size="sm"
                      className="w-fit"
                      onPress={() => {
                        cancelRequestedRef.current = true;
                        setStatus('processing');
                        addToast({
                          title: 'Cancel requested. It may take a moment to stop.',
                          color: 'warning',
                          variant: 'flat',
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}

                {status === 'done' && outputBlob && (
                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-success-600">
                      Done. Download started automatically.
                    </p>
                    {resultSummary && (
                      <p className="text-sm text-foreground-600">
                        {formatBytes(resultSummary.before)} → {formatBytes(resultSummary.after)} ({resultSummary.pct}% smaller)
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <Button variant="flat" onPress={reset} className="w-fit">
                        Compress another
                      </Button>
                      <Button variant="bordered" onPress={download} className="w-fit">
                        Download again
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          <div className="flex flex-col gap-4">
            <Card shadow="sm" className="border border-foreground-200">
              <CardBody className="p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Icon icon="download" size={16} className="text-foreground-400" />
                  <h3 className="font-sans text-sm font-semibold">Export</h3>
                </div>
                <RadioGroup
                  value={outputFormat}
                  onValueChange={(v) => setOutputFormat(v as OutputFormat)}
                  orientation="vertical"
                  aria-label="Output format"
                  className="gap-2"
                >
                  <Radio value="mp4" description="Best compatibility, works everywhere">
                    MP4 (H.264)
                  </Radio>
                  <Radio value="mov" description="QuickTime container (H.264), common in editing">
                    MOV (H.264)
                  </Radio>
                </RadioGroup>
                <div className="mt-4 rounded-lg bg-foreground-50 p-3 text-sm text-foreground-600">
                  Processing runs in your browser. For large videos, compression may take a few minutes and can increase
                  device CPU usage.
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

