import { cn } from '@heroui/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

import { Icon } from '../various/Icon';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './bannerGeometry';
import { BannerViewport } from './bannerViewport';

interface BannerCanvasProps {
  imageUrl: string | null;
  naturalWidth: number;
  naturalHeight: number;
  imageScale: number;
  viewport: BannerViewport;
  onViewportChange: (next: BannerViewport) => void;
  getRootProps: () => DropzoneRootProps;
  getInputProps: () => DropzoneInputProps;
  isDragActive: boolean;
  isLoading?: boolean;
}

export const BannerCanvas = ({
  imageUrl,
  naturalWidth,
  naturalHeight,
  imageScale,
  viewport,
  onViewportChange,
  getRootProps,
  getInputProps,
  isDragActive,
  isLoading = false,
}: BannerCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });
  const dragRef = useRef<{
    isDragging: boolean;
    startClientX: number;
    startClientY: number;
    startViewportX: number;
    startViewportY: number;
  }>({ isDragging: false, startClientX: 0, startClientY: 0, startViewportX: 0, startViewportY: 0 });

  // Calculate display size maintaining aspect ratio
  useEffect(() => {
    const updateDisplaySize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const aspect = CANVAS_WIDTH / CANVAS_HEIGHT;
        const displayHeight = containerWidth / aspect;
        setDisplaySize({ width: containerWidth, height: displayHeight });
      }
    };

    updateDisplaySize();
    window.addEventListener('resize', updateDisplaySize);
    return () => window.removeEventListener('resize', updateDisplaySize);
  }, []);

  const scale = displaySize.width > 0 ? displaySize.width / CANVAS_WIDTH : 1;

  const imgStyle = useMemo(() => {
    if (!imageUrl || !naturalWidth || !naturalHeight) return null;
    return {
      width: naturalWidth * imageScale * scale,
      height: naturalHeight * imageScale * scale,
      left: -viewport.x * scale,
      top: -viewport.y * scale,
    };
  }, [imageScale, imageUrl, naturalHeight, naturalWidth, scale, viewport.x, viewport.y]);

  const isInteractive = !!imageUrl && !isLoading && displaySize.width > 0 && displaySize.height > 0;

  return (
    <div
      ref={containerRef}
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

      {/* Canvas with Image */}
      {imageUrl && (
        <div className="relative h-full w-full bg-foreground-100">
          {/* Stage background (light gray) */}
          <div className="absolute inset-0 bg-foreground-100" />

          {/* Image */}
          {imgStyle && (
            <img
              src={imageUrl}
              alt={`Banner preview. Original dimensions: ${naturalWidth} × ${naturalHeight} pixels. Export size: ${CANVAS_WIDTH} × ${CANVAS_HEIGHT} pixels.`}
              className="absolute max-w-none select-none"
              style={{
                width: imgStyle.width,
                height: imgStyle.height,
                left: imgStyle.left,
                top: imgStyle.top,
                objectFit: 'fill',
              }}
              draggable={false}
              role="img"
              aria-label={`Banner image, ${naturalWidth} by ${naturalHeight} pixels`}
            />
          )}

          {/* Viewport overlay: draggable frame + guides */}
          <div
            className={cn('absolute inset-0 z-10', isInteractive ? 'cursor-grab' : 'cursor-default')}
            onPointerDown={(e) => {
              if (!isInteractive) return;
              if ('button' in e && typeof e.button === 'number' && e.button !== 0) return;
              e.preventDefault();
              (e.currentTarget as HTMLDivElement).setPointerCapture?.(e.pointerId);
              dragRef.current = {
                isDragging: true,
                startClientX: e.clientX,
                startClientY: e.clientY,
                startViewportX: viewport.x,
                startViewportY: viewport.y,
              };
            }}
            onPointerMove={(e) => {
              if (!dragRef.current.isDragging || !isInteractive) return;
              e.preventDefault();
              const dx = (e.clientX - dragRef.current.startClientX) / scale;
              const dy = (e.clientY - dragRef.current.startClientY) / scale;
              onViewportChange({
                x: dragRef.current.startViewportX + dx,
                y: dragRef.current.startViewportY + dy,
              });
            }}
            onPointerUp={(e) => {
              if (!dragRef.current.isDragging) return;
              e.preventDefault();
              dragRef.current.isDragging = false;
              (e.currentTarget as HTMLDivElement).releasePointerCapture?.(e.pointerId);
            }}
            onPointerCancel={(e) => {
              if (!dragRef.current.isDragging) return;
              e.preventDefault();
              dragRef.current.isDragging = false;
              (e.currentTarget as HTMLDivElement).releasePointerCapture?.(e.pointerId);
            }}
          >
            {/* dotted outer guide */}
            <div className="pointer-events-none absolute inset-2 rounded border border-dashed border-primary-400/50" />
            {/* main frame */}
            <div className="pointer-events-none absolute inset-0 rounded-sm border-2 border-primary-500" />
            {/* 3x3 grid */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-y-0 left-1/3 w-px bg-white/60" />
              <div className="absolute inset-y-0 left-2/3 w-px bg-white/60" />
              <div className="absolute inset-x-0 top-1/3 h-px bg-white/60" />
              <div className="absolute inset-x-0 top-2/3 h-px bg-white/60" />
            </div>
            {/* corner brackets (match screenshot vibe) */}
            <div className="pointer-events-none absolute left-0 top-0 size-7 border-l-4 border-t-4 border-primary-400" />
            <div className="pointer-events-none absolute right-0 top-0 size-7 border-r-4 border-t-4 border-primary-400" />
            <div className="pointer-events-none absolute bottom-0 left-0 size-7 border-b-4 border-l-4 border-primary-400" />
            <div className="pointer-events-none absolute bottom-0 right-0 size-7 border-b-4 border-r-4 border-primary-400" />
          </div>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3 rounded-lg bg-black/80 px-6 py-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-sm font-medium text-white">Processing image...</p>
                <p className="text-xs text-foreground-300">Please wait</p>
              </div>
            </div>
          )}

          {/* Canvas Border */}
          <div className="pointer-events-none absolute inset-0 border-2 border-foreground-300" />
        </div>
      )}

    </div>
  );
};
