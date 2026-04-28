'use client';

import { addToast, Button, Card, CardBody, Progress, Radio, RadioGroup } from '@heroui/react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { type FileRejection, useDropzone } from 'react-dropzone';

import { useFreeToolsInactiveGate } from '../../contexts/FreeToolsInactiveGateContext';
import { useSession } from '../../hooks/useSession';
import { useSoftGate } from '../../hooks/useSoftGate';
import { Icon } from '../various/Icon';

type OutputFormat = 'mp4' | 'mov';
type FpsPreset = '23.976' | '24' | '25' | '29.97' | '30' | '50' | '59.94' | '60';

const MAX_FILE_SIZE_BYTES = 500 * 1024 * 1024;
const FPS_PRESETS: FpsPreset[] = ['23.976', '24', '25', '29.97', '30', '50', '59.94', '60'];

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

export function VideoFrameRateConverterTool() {
  const { isSignedIn } = useSession();
  const { isInactiveLocked, openInactivePlanModal } = useFreeToolsInactiveGate();

  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [durationSeconds, setDurationSeconds] = useState<number>(0);
  const [sourceWidth, setSourceWidth] = useState<number>(0);
  const [sourceHeight, setSourceHeight] = useState<number>(0);
  const [sourceFps, setSourceFps] = useState<number | null>(null);
  const [targetFps, setTargetFps] = useState<FpsPreset>('24');
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
    setSourceFps(null);
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
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function probeFps() {
      if (!file) {
        setSourceFps(null);
        return;
      }
      try {
        const [{ FFmpeg }, { fetchFile }] = await Promise.all([import('@ffmpeg/ffmpeg'), import('@ffmpeg/util')]);
        const ffmpeg = new FFmpeg();
        const ext = getInputExtension(file);
        const inputName = `input.${ext}`;
        await ffmpeg.load();
        await ffmpeg.writeFile(inputName, await fetchFile(file));
        let detectedFps: number | null = null;

        const logHandler = ({ message }: { message: string }) => {
          if (detectedFps !== null) return;
          const fpsMatch = message.match(/([0-9]+(?:\.[0-9]+)?)\s*fps/);
          if (fpsMatch) {
            detectedFps = Number.parseFloat(fpsMatch[1]);
          }
        };
        ffmpeg.on('log', logHandler);
        await ffmpeg.exec(['-i', inputName]);
        ffmpeg.off('log', logHandler);

        if (!cancelled) {
          setSourceFps(Number.isFinite(detectedFps) ? detectedFps : null);
        }
      } catch {
        if (!cancelled) setSourceFps(null);
      }
    }

    void probeFps();
    return () => {
      cancelled = true;
    };
  }, [file]);

  const runFFmpegFpsConvert = useCallback(
    async (inputFile: File, format: OutputFormat, fps: FpsPreset, onProgressUpdate: (p: number) => void) => {
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

      await ffmpeg.writeFile(inputName, await fetchFile(inputFile));

      const args = [
        '-i',
        inputName,
        '-vf',
        `fps=${fps}`,
        '-r',
        fps,
        '-vsync',
        'cfr',
        '-c:v',
        'libx264',
        '-preset',
        'veryfast',
        '-crf',
        '20',
        '-pix_fmt',
        'yuv420p',
        '-movflags',
        '+faststart',
        '-c:a',
        'aac',
        '-b:a',
        '128k',
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

  const startConvert = useCallback(async () => {
    if (isInactiveLocked) {
      openInactivePlanModal();
      return;
    }
    if (!file || !videoUrl || !durationSeconds) return;
    if (file.size > MAX_FILE_SIZE_BYTES) {
      addToast({
        title: 'File is too large. Maximum size is 500 MB. Try a shorter or lower-resolution video.',
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
      const blob = await runFFmpegFpsConvert(file, outputFormat, targetFps, setProgress);
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
        addToast({ title: 'Conversion cancelled.', color: 'warning', variant: 'flat' });
        return;
      }
      setStatus('idle');
      addToast({
        title: 'Frame rate conversion failed. Try a smaller file or a different target FPS.',
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
    runFFmpegFpsConvert,
    targetFps,
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
    a.download = `${base}_${targetFps}fps.${outputExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [file, isInactiveLocked, openInactivePlanModal, outputBlob, outputExtension, targetFps]);

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
  const canConvert = hasVideo && status === 'idle' && durationSeconds > 0;

  const sourceInfo = useMemo(() => {
    if (!file) return null;
    const dur = durationSeconds;
    const minutes = dur > 0 ? Math.floor(dur / 60) : 0;
    const seconds = dur > 0 ? Math.floor(dur % 60) : 0;
    return {
      durationLabel: dur > 0 ? `${minutes}:${String(seconds).padStart(2, '0')}` : '—',
      sizeLabel: formatBytes(file.size),
    };
  }, [durationSeconds, file]);

  return (
    <div className="flex flex-col gap-6">
      <input {...getInputProps()} className="sr-only" aria-hidden />

      {!hasVideo && (
        <Card shadow="sm" className="border border-foreground-200">
          <CardBody className="p-6">
            <div
              {...getRootProps()}
              className={`flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
                isDragActive ? 'border-primary bg-primary/5' : 'border-foreground-200 hover:bg-foreground-50'
              }`}
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
                  <h3 className="mb-3 font-sans text-sm font-semibold">Frame rate conversion</h3>
                  <p className="mb-3 text-sm text-foreground-600">
                    Convert to a constant frame rate for smoother playback compatibility across editing and publishing
                    workflows.
                  </p>
                  <div className="text-sm text-foreground-600">
                    Source FPS: <span className="font-semibold">{sourceFps ? sourceFps.toFixed(2) : 'Unknown'}</span> ·
                    Target FPS: <span className="font-semibold">{targetFps}</span>
                  </div>
                </div>

                {status === 'idle' && (
                  <Button
                    color="primary"
                    size="md"
                    className="w-fit bg-foreground font-semibold text-content1"
                    onPress={startConvert}
                    isDisabled={!canConvert}
                    startContent={<Icon icon="play" size={18} />}
                  >
                    Convert frame rate
                  </Button>
                )}

                {(status === 'loading' || status === 'processing') && (
                  <div className="w-full space-y-2" aria-live="polite" aria-atomic="true">
                    <Progress value={progress} color="primary" size="sm" aria-label="Conversion progress" />
                    <p className="text-center text-sm text-foreground-600">
                      {status === 'loading'
                        ? `Loading video encoder… ${Math.round(progress)}%`
                        : `Converting frame rate… ${Math.round(progress)}%`}
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
                    <p className="text-sm text-success-600">Done. Download started automatically.</p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="flat" onPress={reset} className="w-fit">
                        Convert another
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
                  <Icon icon="time" size={16} className="text-foreground-400" />
                  <h3 className="font-sans text-sm font-semibold">Target frame rate</h3>
                </div>
                <RadioGroup
                  value={targetFps}
                  onValueChange={(v) => setTargetFps(v as FpsPreset)}
                  orientation="vertical"
                  aria-label="Target frame rate"
                  className="gap-2"
                >
                  {FPS_PRESETS.map((preset) => (
                    <Radio key={preset} value={preset}>
                      {preset} fps
                    </Radio>
                  ))}
                </RadioGroup>
              </CardBody>
            </Card>

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
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
