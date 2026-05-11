import { cn } from '@heroui/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

import { Icon } from '../various/Icon';
import { BannerPlacement, getRenderRect } from './bannerPlacement';

interface BannerCanvasProps {
  imageUrl: string | null;
  naturalWidth: number;
  naturalHeight: number;
  canvasWidth: number;
  canvasHeight: number;
  placement: BannerPlacement;
  onPlacementChange: (next: BannerPlacement) => void;
  getRootProps: () => DropzoneRootProps;
  getInputProps: () => DropzoneInputProps;
  isDragActive: boolean;
  isLoading?: boolean;
}

export const BannerCanvas = ({
  imageUrl,
  naturalWidth,
  naturalHeight,
  canvasWidth,
  canvasHeight,
  placement,
  onPlacementChange,
  getRootProps,
  getInputProps,
  isDragActive,
  isLoading = false,
}: BannerCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });
  const dragRef = useRef<{
    isDragging: boolean;
    startClientX: number;
    startClientY: number;
    startOffsetX: number;
    startOffsetY: number;
  }>({ isDragging: false, startClientX: 0, startClientY: 0, startOffsetX: 0, startOffsetY: 0 });

  // Calculate display size maintaining aspect ratio
  useEffect(() => {
    const updateDisplaySize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const aspect = canvasWidth && canvasHeight ? canvasWidth / canvasHeight : 16 / 9;
        const displayHeight = containerWidth / aspect;
        setDisplaySize({ width: containerWidth, height: displayHeight });
      }
    };

    updateDisplaySize();
    window.addEventListener('resize', updateDisplaySize);
    return () => window.removeEventListener('resize', updateDisplaySize);
  }, [canvasHeight, canvasWidth]);

  const scale = displaySize.width / canvasWidth;

  const renderRect = useMemo(() => {
    if (!imageUrl || !naturalWidth || !naturalHeight) return null;
    return getRenderRect(canvasWidth, canvasHeight, naturalWidth, naturalHeight, placement);
  }, [canvasHeight, canvasWidth, imageUrl, naturalHeight, naturalWidth, placement]);

  const isInteractive = !!imageUrl && !isLoading && displaySize.width > 0 && displaySize.height > 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-lg border border-foreground-200 bg-foreground-50"
      style={{ aspectRatio: `${canvasWidth} / ${canvasHeight}` }}
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
        <div className="relative h-full w-full">
          {/* Background */}
          <div className="absolute inset-0 bg-white" />

          {/* Image */}
          {renderRect && (
            <img
              ref={imageRef}
              src={imageUrl}
              alt={`Banner preview. Original dimensions: ${naturalWidth} × ${naturalHeight} pixels. Canvas size: ${canvasWidth} × ${canvasHeight} pixels.`}
              className="absolute max-w-none select-none"
              style={{
                width: renderRect.width * scale,
                height: renderRect.height * scale,
                left: renderRect.x * scale,
                top: renderRect.y * scale,
                objectFit: 'fill',
                cursor: isInteractive ? 'grab' : 'default',
              }}
              draggable={false}
              role="img"
              aria-label={`Banner image, ${naturalWidth} by ${naturalHeight} pixels`}
              onPointerDown={(e) => {
                if (!isInteractive) return;
                // Only left click/touch.
                if ('button' in e && typeof e.button === 'number' && e.button !== 0) return;
                e.preventDefault();
                (e.currentTarget as HTMLImageElement).setPointerCapture?.(e.pointerId);
                dragRef.current = {
                  isDragging: true,
                  startClientX: e.clientX,
                  startClientY: e.clientY,
                  startOffsetX: placement.offsetX,
                  startOffsetY: placement.offsetY,
                };
              }}
              onPointerMove={(e) => {
                if (!dragRef.current.isDragging || !isInteractive) return;
                e.preventDefault();
                const dx = (e.clientX - dragRef.current.startClientX) / scale;
                const dy = (e.clientY - dragRef.current.startClientY) / scale;
                onPlacementChange({
                  ...placement,
                  offsetX: dragRef.current.startOffsetX + dx,
                  offsetY: dragRef.current.startOffsetY + dy,
                });
              }}
              onPointerUp={(e) => {
                if (!dragRef.current.isDragging) return;
                e.preventDefault();
                dragRef.current.isDragging = false;
                (e.currentTarget as HTMLImageElement).releasePointerCapture?.(e.pointerId);
              }}
              onPointerCancel={(e) => {
                if (!dragRef.current.isDragging) return;
                e.preventDefault();
                dragRef.current.isDragging = false;
                (e.currentTarget as HTMLImageElement).releasePointerCapture?.(e.pointerId);
              }}
            />
          )}

          {/* Crop frame overlay (Adobe-like): border + 3x3 grid + corner handles */}
          <div className="pointer-events-none absolute inset-0 z-10">
            {/* Keep overlay purely informational so preview matches export */}
            <div className="absolute inset-0 border-2 border-white/90" />
            {/* 3x3 grid */}
            <div className="absolute inset-0">
              <div className="absolute inset-y-0 left-1/3 w-px bg-white/60" />
              <div className="absolute inset-y-0 left-2/3 w-px bg-white/60" />
              <div className="absolute inset-x-0 top-1/3 h-px bg-white/60" />
              <div className="absolute inset-x-0 top-2/3 h-px bg-white/60" />
            </div>
            {/* Corner handles */}
            <div className="absolute left-0 top-0 size-6 border-l-4 border-t-4 border-white/90" />
            <div className="absolute right-0 top-0 size-6 border-r-4 border-t-4 border-white/90" />
            <div className="absolute bottom-0 left-0 size-6 border-b-4 border-l-4 border-white/90" />
            <div className="absolute bottom-0 right-0 size-6 border-b-4 border-r-4 border-white/90" />
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
