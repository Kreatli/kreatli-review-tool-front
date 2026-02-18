'use client';

import { addToast, Button, Card, CardBody, Checkbox, cn, Progress, Radio, RadioGroup } from '@heroui/react';
import NextLink from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { type FileRejection, useDropzone } from 'react-dropzone';

import { useSession } from '../../hooks/useSession';
import { useSignUpModalVisibility } from '../../hooks/useSignUpModalVisibility';
import { Icon, type IconType } from '../various/Icon';

type ExportFormat = 'mp4' | 'mov' | 'webm-vp9' | 'webm-vp8';

interface PresetItem {
  id: string;
  label: string;
  width: number;
  height: number;
  icon: IconType;
}

const PRESETS: PresetItem[] = [
  { id: 'video-mobile', label: 'Video Mobile', width: 1080, height: 1920, icon: 'mobile' },
  { id: 'video-landscape', label: 'Video Landscape', width: 1920, height: 1080, icon: 'monitorPlay' },
  { id: 'square-video', label: 'Square Video', width: 1080, height: 1080, icon: 'panorama' },
  { id: 'instagram-reel', label: 'Instagram Reel', width: 1080, height: 1920, icon: 'instagram' },
  { id: 'tiktok-video', label: 'TikTok Video', width: 1080, height: 1920, icon: 'tiktok' },
  { id: 'facebook-video', label: 'Facebook Video', width: 1080, height: 1080, icon: 'facebook' },
  { id: 'linkedin-video-ad', label: 'LinkedIn Video Ad', width: 1920, height: 1920, icon: 'linkedin' },
  { id: 'youtube-video', label: 'YouTube Video', width: 1920, height: 1080, icon: 'youtube' },
  { id: 'pinterest-video-pin', label: 'Pinterest Video Pin', width: 1000, height: 1500, icon: 'panorama' },
  { id: 'custom', label: 'Custom Size', width: 0, height: 0, icon: 'fullscreen' },
];

function even(n: number) {
  return Math.max(2, Math.floor(n) & ~1);
}

function safeBaseName(fileName: string) {
  const withoutExt = fileName.replace(/\.[^.]+$/, '');
  return withoutExt.replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '') || 'video';
}

function getInputExtension(file: File): string {
  const name = file.name.toLowerCase();
  if (name.endsWith('.mp4')) return 'mp4';
  if (name.endsWith('.mov')) return 'mov';
  if (name.endsWith('.webm')) return 'webm';
  if (name.endsWith('.ogv')) return 'ogv';
  return 'mp4';
}

const MAX_FILE_SIZE_BYTES = 500 * 1024 * 1024; // 500MB

export function ResizeVideoTool() {
  const { isSignedIn } = useSession();
  const openSignUpModal = useSignUpModalVisibility((s) => s.openSignUpModal);
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [sourceWidth, setSourceWidth] = useState<number>(0);
  const [sourceHeight, setSourceHeight] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [targetWidth, setTargetWidth] = useState<number>(1920);
  const [targetHeight, setTargetHeight] = useState<number>(1080);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('video-landscape');
  const [maintainAspect, setMaintainAspect] = useState<boolean>(true);
  const [exportFormat, setExportFormat] = useState<ExportFormat>('mp4');
  const [status, setStatus] = useState<'idle' | 'loading' | 'processing' | 'done'>('idle');
  const [progress, setProgress] = useState<number>(0);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputExtension, setOutputExtension] = useState<string>('mp4');
  const [unsupported, setUnsupported] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const animationRef = useRef<number>(0);
  const downloadRef = useRef<() => void>(() => {});
  const hasTriggeredDownloadForDoneRef = useRef<boolean>(false);
  const cancelRequestedRef = useRef<boolean>(false);

  const onDrop = useCallback((accepted: File[]) => {
    const next = accepted[0];
    if (!next) return;
    if (!(next.type.startsWith('video/') || next.name.toLowerCase().match(/\.(mp4|webm|mov|ogg|avi|mkv)$/))) {
      addToast({
        title: 'Unsupported file type. Please use a video file (e.g. MP4, WebM, MOV).',
        color: 'danger',
        variant: 'flat',
      });
      return;
    }
    setUnsupported(false);
    setFile(next);
    setStatus('idle');
    setOutputBlob(null);
    setProgress(0);
  }, []);

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
      setSourceWidth(0);
      setSourceHeight(0);
      setDuration(0);
      return;
    }
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onLoadedMetadata = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const w = v.videoWidth || 0;
    const h = v.videoHeight || 0;
    setSourceWidth(w);
    setSourceHeight(h);
    setDuration(v.duration || 0);
    setTargetWidth(even(w));
    setTargetHeight(even(h));
    setSelectedPresetId('custom');
  }, []);

  const applyPreset = useCallback((preset: PresetItem) => {
    setSelectedPresetId(preset.id);
    if (preset.id !== 'custom' && preset.width > 0 && preset.height > 0) {
      setTargetWidth(even(preset.width));
      setTargetHeight(even(preset.height));
    }
  }, []);

  const runFFmpegMP4OrMOV = useCallback(
    async (
      inputFile: File,
      w: number,
      h: number,
      onProgressUpdate: (p: number) => void,
      outputFormat: 'mp4' | 'mov' = 'mp4',
    ) => {
      const [{ FFmpeg }, { fetchFile }] = await Promise.all([import('@ffmpeg/ffmpeg'), import('@ffmpeg/util')]);
      const ffmpeg = new FFmpeg();
      const ext = getInputExtension(inputFile);
      const inputName = `input.${ext}`;
      const outputName = outputFormat === 'mov' ? 'output.mov' : 'output.mp4';
      const mimeType = outputFormat === 'mov' ? 'video/quicktime' : 'video/mp4';

      const progressHandler = ({ progress: p }: { progress: number }) => {
        onProgressUpdate(Math.round(p * 100));
      };
      ffmpeg.on('progress', progressHandler);

      await ffmpeg.load();
      const data = await fetchFile(inputFile);
      await ffmpeg.writeFile(inputName, data);

      const args = [
        '-i',
        inputName,
        '-vf',
        `scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2:black`,
        '-c:v',
        'libx264',
        '-preset',
        'superfast',
        '-crf',
        '23',
        '-c:a',
        'aac',
        '-b:a',
        '128k',
        outputName,
      ];
      const code = await ffmpeg.exec(args);
      ffmpeg.off('progress', progressHandler);

      if (code !== 0) throw new Error('FFmpeg failed');
      const outData = (await ffmpeg.readFile(outputName)) as Uint8Array;
      const copy = new Uint8Array(outData.byteLength);
      copy.set(outData);
      const blob = new Blob([copy], { type: mimeType });
      return blob;
    },
    [],
  );

  const startResize = useCallback(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!file || !videoUrl) return;

    const w = even(targetWidth);
    const h = even(targetHeight);

    if (exportFormat === 'mp4' || exportFormat === 'mov') {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        addToast({
          title: 'File is too large. Maximum size is 500 MB. Try a shorter or lower-resolution video.',
          color: 'danger',
          variant: 'flat',
        });
        return;
      }
      setStatus('loading');
      setProgress(0);
      try {
        const blob = await runFFmpegMP4OrMOV(file, w, h, setProgress, exportFormat);
        setOutputBlob(blob);
        setOutputExtension(exportFormat);
        setStatus('done');
        setProgress(100);
      } catch (e) {
        console.error('Resize video FFmpeg encoding failed:', e);
        setStatus('idle');
        addToast({
          title: 'Encoding failed. File may be too large or in an unsupported format. Try WebM or a shorter video.',
          color: 'danger',
          variant: 'flat',
        });
      }
      return;
    }

    if (!video || !canvas) return;
    if (typeof canvas.captureStream !== 'function') {
      setUnsupported(true);
      addToast({
        title: 'Your browser does not support canvas recording. Try Chrome or Firefox.',
        color: 'warning',
        variant: 'flat',
      });
      return;
    }

    const mime =
      exportFormat === 'webm-vp8'
        ? 'video/webm;codecs=vp8'
        : MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
          ? 'video/webm;codecs=vp9'
          : MediaRecorder.isTypeSupported('video/webm')
            ? 'video/webm'
            : 'video/webm';
    if (!MediaRecorder.isTypeSupported(mime)) {
      setUnsupported(true);
      addToast({
        title: 'Your browser does not support video recording in this tool.',
        color: 'warning',
        variant: 'flat',
      });
      return;
    }

    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    cancelRequestedRef.current = false;
    setStatus('processing');
    setProgress(0);
    chunksRef.current = [];
    setOutputExtension('webm');

    const stream = canvas.captureStream(30);
    streamRef.current = stream;
    const recorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 2500000 });
    recorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      if (cancelRequestedRef.current) {
        cancelRequestedRef.current = false;
        setStatus('idle');
        setProgress(0);
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        recorderRef.current = null;
        return;
      }
      const blob = new Blob(chunksRef.current, { type: mime });
      setOutputBlob(blob);
      setStatus('done');
      setProgress(100);
      stream.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      recorderRef.current = null;
    };
    recorder.onerror = () => {
      setStatus('idle');
      addToast({ title: 'Recording failed. Try a shorter or smaller video.', color: 'danger', variant: 'flat' });
    };

    video.muted = true;
    video.currentTime = 0;
    recorder.start(100);

    const draw = () => {
      if (recorderRef.current?.state !== 'recording') return;
      if (cancelRequestedRef.current) {
        recorderRef.current?.stop();
        return;
      }
      const v = videoRef.current;
      if (!v || v.ended) {
        recorderRef.current?.stop();
        return;
      }
      const vw = v.videoWidth || 1;
      const vh = v.videoHeight || 1;
      const scale = Math.min(w / vw, h / vh);
      const drawW = vw * scale;
      const drawH = vh * scale;
      const x = (w - drawW) / 2;
      const y = (h - drawH) / 2;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(v, 0, 0, vw, vh, x, y, drawW, drawH);
      setProgress((v.currentTime / (duration || 1)) * 100);
      animationRef.current = requestAnimationFrame(draw);
    };

    video
      .play()
      .then(() => draw())
      .catch(() => {
        setStatus('idle');
        addToast({ title: 'Playback failed. Try another video.', color: 'danger', variant: 'flat' });
      });
  }, [file, videoUrl, targetWidth, targetHeight, duration, exportFormat, runFFmpegMP4OrMOV]);

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      recorderRef.current?.stop();
      streamRef.current?.getTracks?.().forEach((t: MediaStreamTrack) => t.stop());
    };
  }, []);

  const download = useCallback(() => {
    if (!outputBlob || !file) return;
    const base = safeBaseName(file.name);
    const url = URL.createObjectURL(outputBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${base}_${even(targetWidth)}x${even(targetHeight)}.${outputExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [outputBlob, file, targetWidth, targetHeight, outputExtension]);

  useEffect(() => {
    downloadRef.current = download;
  }, [download]);

  // Auto-download when resize completes successfully; then show sign-up modal for guests (idempotent)
  useEffect(() => {
    if (status !== 'done') {
      hasTriggeredDownloadForDoneRef.current = false;
      return;
    }
    if (!outputBlob || !file || hasTriggeredDownloadForDoneRef.current) return;
    hasTriggeredDownloadForDoneRef.current = true;
    downloadRef.current?.();
    if (!isSignedIn) {
      openSignUpModal();
    }
  }, [status, outputBlob, file, isSignedIn, openSignUpModal]);

  const reset = useCallback(() => {
    setFile(null);
    setVideoUrl(null);
    setOutputBlob(null);
    setStatus('idle');
    setProgress(0);
    setUnsupported(false);
  }, []);

  const hasVideo = !!file && !!videoUrl;
  const canResize = hasVideo && status === 'idle' && sourceWidth > 0 && sourceHeight > 0;
  const outW = even(targetWidth);
  const outH = even(targetHeight);

  const supportsWebmVp8 =
    typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('video/webm;codecs=vp8');

  const isPresetSelected = (p: PresetItem) => selectedPresetId === p.id;

  return (
    <div className="flex flex-col gap-6">
      {/* Hidden input always mounted so "Choose another video" can open the file picker */}
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
                      {sourceWidth > 0 && sourceHeight > 0 && (
                        <span>
                          {sourceWidth}×{sourceHeight}
                          {duration > 0 &&
                            ` · ${Math.floor(duration / 60)}:${String(Math.floor(duration % 60)).padStart(2, '0')}`}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button size="sm" variant="light" onPress={open} aria-label="Choose another video">
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
                  />
                </div>

                {sourceWidth > 0 && (
                  <>
                    <div className="rounded-xl border border-foreground-200 bg-content1 p-4">
                      <h3 className="mb-3 font-sans text-sm font-semibold">Select your video size</h3>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {PRESETS.map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => applyPreset(p)}
                            className={cn(
                              'flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-colors',
                              isPresetSelected(p)
                                ? 'border-primary bg-primary/5'
                                : 'border-foreground-200 bg-content1 hover:border-foreground-300 hover:bg-foreground-50',
                            )}
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground-100">
                              <Icon icon={p.icon} size={22} className="text-foreground-600" />
                            </div>
                            <span className="text-sm font-medium text-foreground-700">{p.label}</span>
                            {p.id === 'custom' ? (
                              <span className="text-xs text-foreground-500">Custom dimensions</span>
                            ) : (
                              <span className="text-xs text-foreground-500">
                                {even(p.width)} × {even(p.height)} px
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {selectedPresetId === 'custom' && (
                      <div className="rounded-lg border border-foreground-200 bg-content1 p-4">
                        <div className="mb-3 flex items-center gap-2">
                          <Icon icon="edit" size={16} className="text-foreground-400" />
                          <h3 className="font-sans text-sm font-semibold">Custom size</h3>
                        </div>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min={2}
                              max={4096}
                              value={targetWidth}
                              onChange={(e) => {
                                const val = even(Number(e.target.value) || 2);
                                setTargetWidth(val);
                                if (maintainAspect && sourceHeight > 0)
                                  setTargetHeight(even(val / (sourceWidth / sourceHeight)));
                              }}
                              className="w-24 rounded-md border border-default-300 bg-transparent px-2 py-1.5 text-sm"
                            />
                            <span className="text-foreground-500">×</span>
                            <input
                              type="number"
                              min={2}
                              max={4096}
                              value={targetHeight}
                              onChange={(e) => {
                                const val = even(Number(e.target.value) || 2);
                                setTargetHeight(val);
                                if (maintainAspect && sourceWidth > 0)
                                  setTargetWidth(even(val * (sourceWidth / sourceHeight)));
                              }}
                              className="w-24 rounded-md border border-default-300 bg-transparent px-2 py-1.5 text-sm"
                            />
                            <span className="text-xs text-foreground-500">px</span>
                          </div>
                          <label className="flex items-center gap-2 text-sm text-foreground-600">
                            <Checkbox
                              isSelected={maintainAspect}
                              onValueChange={setMaintainAspect}
                              size="sm"
                              aria-label="Maintain aspect ratio"
                            />
                            Maintain aspect ratio
                          </label>
                        </div>
                      </div>
                    )}

                    {status === 'idle' && (
                      <Button
                        color="primary"
                        size="md"
                        className="w-fit bg-foreground font-semibold text-content1"
                        onPress={startResize}
                        isDisabled={!canResize || unsupported}
                        startContent={<Icon icon="play" size={18} />}
                      >
                        Resize video
                      </Button>
                    )}

                    {(status === 'loading' || status === 'processing') && (
                      <div className="w-full space-y-2" aria-live="polite" aria-atomic="true">
                        <Progress value={progress} color="primary" size="sm" aria-label="Encoding progress" />
                        <p className="text-center text-sm text-foreground-600">
                          {status === 'loading'
                            ? `Loading video encoder… ${Math.round(progress)}%`
                            : `Resizing… ${Math.round(progress)}%`}
                        </p>
                        {status === 'processing' && (
                          <Button
                            variant="flat"
                            size="sm"
                            className="w-fit"
                            onPress={() => {
                              cancelRequestedRef.current = true;
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    )}

                    {status === 'done' && outputBlob && (
                      <div className="flex flex-col gap-3">
                        <p className="text-sm text-success-600">
                          Done. Resized to {outW}×{outH}. Download started automatically.
                        </p>
                        <Button variant="flat" onPress={reset} className="w-fit">
                          Resize another
                        </Button>
                      </div>
                    )}
                  </>
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
                  value={exportFormat}
                  onValueChange={(v) => setExportFormat(v as ExportFormat)}
                  orientation="vertical"
                  aria-label="Export format"
                  className="gap-2"
                >
                  <Radio value="mp4" description="Best compatibility, works everywhere">
                    MP4 (H.264)
                  </Radio>
                  <Radio value="mov" description="QuickTime, common in video editing">
                    MOV (H.264)
                  </Radio>
                  <Radio value="webm-vp9" description="Smaller files, modern browsers">
                    WebM (VP9)
                  </Radio>
                  {supportsWebmVp8 && (
                    <Radio value="webm-vp8" description="Good compatibility">
                      WebM (VP8)
                    </Radio>
                  )}
                </RadioGroup>
                <div className="mt-4 rounded-lg bg-foreground-50 p-3 text-sm text-foreground-600">
                  Output format matches your selection. Processing runs in your browser. WebM encoding runs in real time
                  (encoding time ≈ video length).
                </div>
              </CardBody>
            </Card>

            {/* CTA (always visible under Export) */}
            <Card className="overflow-hidden shadow-sm">
              <CardBody className="relative p-5">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-foreground/5" />
                <div className="relative flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                      <Icon icon="monitorPlay" size={18} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">Need feedback and approvals on your videos?</div>
                      <div className="text-sm text-foreground-600">
                        Resize here in seconds. In Kreatli, upload videos, collect frame-accurate feedback, and get
                        client approvals—all in one place.
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2 text-sm text-foreground-600">
                    <div className="flex items-start gap-2">
                      <Icon icon="time" size={16} className="mt-0.5 shrink-0 text-primary" />
                      <span>Frame-accurate comments and timestamps</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon icon="download" size={16} className="mt-0.5 shrink-0 text-primary" />
                      <span>Share a no-signup link with clients</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon icon="arrowRight" size={16} className="mt-0.5 shrink-0 text-primary" />
                      <span>Keep versions and decisions in one workspace</span>
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

      <canvas ref={canvasRef} className="hidden" width={outW} height={outH} />
    </div>
  );
}
