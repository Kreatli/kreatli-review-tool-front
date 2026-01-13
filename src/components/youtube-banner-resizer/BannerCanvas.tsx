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
      const scale = displaySize.width / CANVAS_WIDTH;
      setDragStart({ x: e.clientX - position.x * scale, y: e.clientY - position.y * scale });
    },
    [imageUrl, position, displaySize],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !imageUrl) return;
      const scale = displaySize.width / CANVAS_WIDTH;
      const newX = (e.clientX - dragStart.x) / scale;
      const newY = (e.clientY - dragStart.y) / scale;
      onPositionChange({ x: newX, y: newY });
    },
    [isDragging, imageUrl, dragStart, displaySize, onPositionChange],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      const handleMouseMoveWindow = (e: MouseEvent) => handleMouseMove(e);
      window.addEventListener('mousemove', handleMouseMoveWindow);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMoveWindow);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

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
            'flex h-full w-full cursor-pointer items-center justify-center bg-foreground-100 transition-colors',
            {
              'bg-foreground-200': isDragActive,
            },
          )}
        >
          <div className="flex flex-col items-center gap-3 p-8 text-center">
            <Icon icon="upload" size={32} className="text-foreground-400" />
            <div>
              <p className="font-medium text-foreground-600">
                {isDragActive ? 'Drop your image here' : 'Drag and drop your image here or click to upload'}
              </p>
              <p className="mt-1 text-sm text-foreground-500">PNG, JPG up to 10MB</p>
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
              className={cn('absolute select-none', {
                'cursor-move': true,
              })}
              style={{
                width: dims.width,
                height: dims.height,
                left: dims.x,
                top: dims.y,
                objectFit: 'cover',
              }}
              onMouseDown={handleMouseDown}
              draggable={false}
              role="img"
              aria-label={`Banner image, ${naturalWidth} by ${naturalHeight} pixels`}
            />
          )}

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-sm text-white">Processing image...</p>
              </div>
            </div>
          )}

          {/* Device Viewport Overlay */}
          {previewMode !== 'desktop' && (
            <div
              className="absolute border-2 border-dashed border-primary/50 bg-primary/5"
              style={{
                left: viewport.x * scale,
                top: viewport.y * scale,
                width: viewport.width * scale,
                height: viewport.height * scale,
              }}
            >
              <div className="absolute -top-6 left-0 text-xs font-medium text-primary">
                {previewMode.charAt(0).toUpperCase() + previewMode.slice(1)} View
              </div>
            </div>
          )}

          {/* Safe Area Overlay */}
          {showSafeAreas && (
            <>
              <div
                className="absolute border-2 border-success bg-success/10"
                style={{
                  left: SAFE_AREA_X * scale,
                  top: SAFE_AREA_Y * scale,
                  width: SAFE_AREA_WIDTH * scale,
                  height: SAFE_AREA_HEIGHT * scale,
                }}
              >
                <div className="absolute -top-6 left-0 text-xs font-medium text-success">Safe Area (All Devices)</div>
              </div>
            </>
          )}

          {/* Canvas Border */}
          <div className="pointer-events-none absolute inset-0 border-2 border-foreground-300" />
        </div>
      )}

      {/* Info Overlay */}
      {imageUrl && !isLoading && (
        <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
          Canvas: {CANVAS_WIDTH} × {CANVAS_HEIGHT}px
          {naturalWidth > 0 && naturalHeight > 0 && (
            <span className="ml-2">• Image: {naturalWidth} × {naturalHeight}px</span>
          )}
        </div>
      )}

      {/* Drag hint */}
      {imageUrl && !isLoading && (
        <div className="absolute right-2 top-2 hidden rounded bg-black/70 px-2 py-1 text-xs text-white sm:block">
          Click and drag to reposition
        </div>
      )}
    </div>
  );
};
