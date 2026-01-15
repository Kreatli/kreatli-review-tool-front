import { cn } from '@heroui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

import { Icon } from '../various/Icon';
import { PreviewMode, ResizeMode } from './YouTubeBannerResizer';

// Canvas dimensions (YouTube recommended)
const CANVAS_WIDTH = 2560;
const CANVAS_HEIGHT = 1440;
const CANVAS_ASPECT_RATIO = CANVAS_WIDTH / CANVAS_HEIGHT; // 16:9

// Safe area dimensions (centered)
const SAFE_AREA_WIDTH = 1546;
const SAFE_AREA_HEIGHT = 423;
const SAFE_AREA_X = (CANVAS_WIDTH - SAFE_AREA_WIDTH) / 2; // 507
const SAFE_AREA_Y = (CANVAS_HEIGHT - SAFE_AREA_HEIGHT) / 2; // 508.5

// Device viewport dimensions (approximate)
const DEVICE_VIEWPORTS = {
  desktop: { width: CANVAS_WIDTH, height: CANVAS_HEIGHT, x: 0, y: 0 },
  mobile: { width: 1280, height: 720, x: (CANVAS_WIDTH - 1280) / 2, y: (CANVAS_HEIGHT - 720) / 2 },
  tablet: { width: 2048, height: 1152, x: (CANVAS_WIDTH - 2048) / 2, y: (CANVAS_HEIGHT - 1152) / 2 },
  tv: { width: CANVAS_WIDTH, height: CANVAS_HEIGHT, x: 0, y: 0 },
};

interface BannerCanvasProps {
  imageUrl: string | null;
  naturalWidth: number;
  naturalHeight: number;
  resizeMode: ResizeMode;
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
  showSafeAreas: boolean;
  previewMode: PreviewMode;
  getRootProps: () => DropzoneRootProps;
  getInputProps: () => DropzoneInputProps;
  isDragActive: boolean;
  isLoading?: boolean;
}

export const BannerCanvas = ({
  imageUrl,
  naturalWidth,
  naturalHeight,
  resizeMode,
  position,
  onPositionChange,
  showSafeAreas,
  previewMode,
  getRootProps,
  getInputProps,
  isDragActive,
  isLoading = false,
}: BannerCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  // Calculate display size maintaining aspect ratio
  useEffect(() => {
    const updateDisplaySize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const displayHeight = containerWidth / CANVAS_ASPECT_RATIO;
        setDisplaySize({ width: containerWidth, height: displayHeight });
      }
    };

    updateDisplaySize();
    window.addEventListener('resize', updateDisplaySize);
    return () => window.removeEventListener('resize', updateDisplaySize);
  }, []);

  // Calculate image dimensions and position
  const imageDimensions = useCallback(() => {
    if (!naturalWidth || !naturalHeight) return null;

    const scale = displaySize.width / CANVAS_WIDTH;
    let imgWidth: number;
    let imgHeight: number;

    if (resizeMode === 'cover') {
      // Scale to fill canvas, maintaining aspect ratio
      const canvasAspect = CANVAS_WIDTH / CANVAS_HEIGHT;
      const imageAspect = naturalWidth / naturalHeight;

      if (imageAspect > canvasAspect) {
        // Image is wider - fit to height
        imgHeight = CANVAS_HEIGHT;
        imgWidth = (CANVAS_HEIGHT * naturalWidth) / naturalHeight;
      } else {
        // Image is taller - fit to width
        imgWidth = CANVAS_WIDTH;
        imgHeight = (CANVAS_WIDTH * naturalHeight) / naturalWidth;
      }
    } else {
      // Contain mode - fit within canvas
      const canvasAspect = CANVAS_WIDTH / CANVAS_HEIGHT;
      const imageAspect = naturalWidth / naturalHeight;

      if (imageAspect > canvasAspect) {
        // Image is wider - fit to width
        imgWidth = CANVAS_WIDTH;
        imgHeight = (CANVAS_WIDTH * naturalHeight) / naturalWidth;
      } else {
        // Image is taller - fit to height
        imgHeight = CANVAS_HEIGHT;
        imgWidth = (CANVAS_HEIGHT * naturalWidth) / naturalHeight;
      }
    }

    return {
      width: imgWidth * scale,
      height: imgHeight * scale,
      x: (displaySize.width - imgWidth * scale) / 2 + position.x * scale,
      y: (displaySize.height - imgHeight * scale) / 2 + position.y * scale,
    };
  }, [naturalWidth, naturalHeight, resizeMode, position, displaySize]);

  // Handle mouse drag
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!imageUrl) return;
      e.preventDefault();
      setIsDragging(true);
      setIsTouch(false);
      const scale = displaySize.width / CANVAS_WIDTH;
      setDragStart({ x: e.clientX - position.x * scale, y: e.clientY - position.y * scale });
    },
    [imageUrl, position, displaySize],
  );

  // Handle touch drag
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!imageUrl) return;
      e.preventDefault();
      setIsDragging(true);
      setIsTouch(true);
      const touch = e.touches[0];
      const scale = displaySize.width / CANVAS_WIDTH;
      setDragStart({ x: touch.clientX - position.x * scale, y: touch.clientY - position.y * scale });
    },
    [imageUrl, position, displaySize],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !imageUrl || isTouch) return;
      const scale = displaySize.width / CANVAS_WIDTH;
      const newX = (e.clientX - dragStart.x) / scale;
      const newY = (e.clientY - dragStart.y) / scale;
      onPositionChange({ x: newX, y: newY });
    },
    [isDragging, imageUrl, dragStart, displaySize, onPositionChange, isTouch],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !imageUrl || !isTouch) return;
      e.preventDefault();
      const touch = e.touches[0];
      const scale = displaySize.width / CANVAS_WIDTH;
      const newX = (touch.clientX - dragStart.x) / scale;
      const newY = (touch.clientY - dragStart.y) / scale;
      onPositionChange({ x: newX, y: newY });
    },
    [isDragging, imageUrl, dragStart, displaySize, onPositionChange, isTouch],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      if (isTouch) {
        const handleTouchMoveWindow = (e: TouchEvent) => handleTouchMove(e);
        const handleTouchEnd = () => {
          setIsDragging(false);
          setIsTouch(false);
        };
        window.addEventListener('touchmove', handleTouchMoveWindow, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);
        return () => {
          window.removeEventListener('touchmove', handleTouchMoveWindow);
          window.removeEventListener('touchend', handleTouchEnd);
        };
      } else {
        const handleMouseMoveWindow = (e: MouseEvent) => handleMouseMove(e);
        window.addEventListener('mousemove', handleMouseMoveWindow);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
          window.removeEventListener('mousemove', handleMouseMoveWindow);
          window.removeEventListener('mouseup', handleMouseUp);
        };
      }
    }
  }, [isDragging, isTouch, handleMouseMove, handleTouchMove, handleMouseUp]);

  const dims = imageDimensions();
  const viewport = DEVICE_VIEWPORTS[previewMode];
  const scale = displaySize.width / CANVAS_WIDTH;

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
                <span className="rounded-full bg-foreground-100 px-3 py-1">PNG, JPG</span>
                <span className="rounded-full bg-foreground-100 px-3 py-1">Up to 10MB</span>
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
          {/* Background (for contain mode) */}
          <div className="absolute inset-0 bg-white" />

          {/* Image */}
          {dims && (
            <img
              ref={imageRef}
              src={imageUrl}
              alt={`YouTube banner preview. Original dimensions: ${naturalWidth} × ${naturalHeight} pixels. Canvas size: ${CANVAS_WIDTH} × ${CANVAS_HEIGHT} pixels.`}
              className={cn('absolute select-none transition-transform duration-200', {
                'cursor-move': true,
                'cursor-grabbing': isDragging,
              })}
              style={{
                width: dims.width,
                height: dims.height,
                left: dims.x,
                top: dims.y,
                objectFit: 'cover',
                filter: isDragging ? 'brightness(0.95)' : 'none',
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              draggable={false}
              role="img"
              aria-label={`Banner image, ${naturalWidth} by ${naturalHeight} pixels`}
            />
          )}

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

          {/* Device Viewport Overlay */}
          {previewMode !== 'desktop' && (
            <div
              className="pointer-events-none absolute border-2 border-dashed border-primary/60 bg-primary/10 transition-all duration-300"
              style={{
                left: viewport.x * scale,
                top: viewport.y * scale,
                width: viewport.width * scale,
                height: viewport.height * scale,
              }}
            >
              <div className="pointer-events-auto absolute -top-6 left-0 rounded-md bg-primary px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
                {previewMode.charAt(0).toUpperCase() + previewMode.slice(1)} View
              </div>
            </div>
          )}

          {/* Safe Area Overlay */}
          {showSafeAreas && (
            <>
              <div
                className="pointer-events-none absolute border-2 border-success bg-success/10 transition-all duration-300"
                style={{
                  left: SAFE_AREA_X * scale,
                  top: SAFE_AREA_Y * scale,
                  width: SAFE_AREA_WIDTH * scale,
                  height: SAFE_AREA_HEIGHT * scale,
                }}
              >
                <div className="pointer-events-auto absolute -top-6 left-0 rounded-md bg-success px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
                  Safe Area (All Devices)
                </div>
              </div>
            </>
          )}

          {/* Canvas Border */}
          <div className="pointer-events-none absolute inset-0 border-2 border-foreground-300" />
        </div>
      )}

      {/* Info Overlay */}
      {imageUrl && !isLoading && (
        <div className="absolute bottom-2 left-2 z-10 rounded-lg bg-black/80 backdrop-blur-sm px-3 py-2 text-xs text-white shadow-lg">
          <div className="flex flex-col gap-1">
            <div className="font-medium">
              Canvas: {CANVAS_WIDTH} × {CANVAS_HEIGHT}px
            </div>
            {naturalWidth > 0 && naturalHeight > 0 && (
              <div className="flex items-center gap-2 text-foreground-300">
                <span>Image: {naturalWidth} × {naturalHeight}px</span>
                {Math.abs(naturalWidth / naturalHeight - CANVAS_WIDTH / CANVAS_HEIGHT) > 0.1 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-warning/20 px-2 py-0.5 text-warning">
                    <Icon icon="warning" size={12} />
                    Aspect ratio differs
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Drag hint */}
      {imageUrl && !isLoading && (
        <div className="absolute right-2 top-2 z-10 hidden sm:block">
          <div className="rounded-lg bg-black/80 backdrop-blur-sm px-3 py-2 text-xs text-white shadow-lg">
            <div className="font-medium">Click & drag to reposition</div>
          </div>
        </div>
      )}
    </div>
  );
};
