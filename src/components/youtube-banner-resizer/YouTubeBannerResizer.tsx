import { addToast } from '@heroui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { useSoftGate } from '../../hooks/useSoftGate';
import { BannerCanvas } from './BannerCanvas';
import { BannerControls } from './BannerControls';
import { BannerExport } from './BannerExport';
import { BannerPreviewModes } from './BannerPreviewModes';

export type ResizeMode = 'cover' | 'contain';
export type PreviewMode = 'desktop' | 'mobile' | 'tablet' | 'tv';

// Maximum image dimensions to prevent memory exhaustion
const MAX_IMAGE_DIMENSION = 10000;

// Canvas dimensions (YouTube recommended)
const CANVAS_WIDTH = 2560;
const CANVAS_HEIGHT = 1440;

interface ImageState {
  file: File | null;
  imageUrl: string | null;
  naturalWidth: number;
  naturalHeight: number;
}

// Calculate position bounds based on image dimensions and resize mode
const calculatePositionBounds = (
  naturalWidth: number,
  naturalHeight: number,
  resizeMode: ResizeMode,
): { minX: number; maxX: number; minY: number; maxY: number } => {
  if (!naturalWidth || !naturalHeight) {
    return { minX: -500, maxX: 500, minY: -500, maxY: 500 };
  }

  let imgWidth: number;
  let imgHeight: number;

  if (resizeMode === 'cover') {
    const canvasAspect = CANVAS_WIDTH / CANVAS_HEIGHT;
    const imageAspect = naturalWidth / naturalHeight;

    if (imageAspect > canvasAspect) {
      imgHeight = CANVAS_HEIGHT;
      imgWidth = (CANVAS_HEIGHT * naturalWidth) / naturalHeight;
    } else {
      imgWidth = CANVAS_WIDTH;
      imgHeight = (CANVAS_WIDTH * naturalHeight) / naturalWidth;
    }
  } else {
    const canvasAspect = CANVAS_WIDTH / CANVAS_HEIGHT;
    const imageAspect = naturalWidth / naturalHeight;

    if (imageAspect > canvasAspect) {
      imgWidth = CANVAS_WIDTH;
      imgHeight = (CANVAS_WIDTH * naturalHeight) / naturalWidth;
    } else {
      imgHeight = CANVAS_HEIGHT;
      imgWidth = (CANVAS_HEIGHT * naturalWidth) / naturalHeight;
    }
  }

  // Calculate bounds: image can move within canvas bounds
  const minX = -(imgWidth - CANVAS_WIDTH) / 2;
  const maxX = (imgWidth - CANVAS_WIDTH) / 2;
  const minY = -(imgHeight - CANVAS_HEIGHT) / 2;
  const maxY = (imgHeight - CANVAS_HEIGHT) / 2;

  return { minX, maxX, minY, maxY };
};

export const YouTubeBannerResizer = () => {
  const [imageState, setImageState] = useState<ImageState>({
    file: null,
    imageUrl: null,
    naturalWidth: 0,
    naturalHeight: 0,
  });
  const [resizeMode, setResizeMode] = useState<ResizeMode>('cover');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showSafeAreas, setShowSafeAreas] = useState(true);
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');
  const [exportFormat, setExportFormat] = useState<'png' | 'jpg'>('png');
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const resetTool = useCallback(() => {
    setImageState((prev) => {
      if (prev.imageUrl) {
        URL.revokeObjectURL(prev.imageUrl);
      }
      return {
        file: null,
        imageUrl: null,
        naturalWidth: 0,
        naturalHeight: 0,
      };
    });
    setPosition({ x: 0, y: 0 });
  }, []);

  const { triggerSoftGate } = useSoftGate({
    onReset: resetTool,
  });

  const loadImageFile = useCallback(
    (file: File) => {
      setIsLoadingImage(true);

      // Clean up previous image URL if exists
      if (imageState.imageUrl) {
        URL.revokeObjectURL(imageState.imageUrl);
      }

      const imageUrl = URL.createObjectURL(file);
      const img = new Image();

      img.onload = () => {
        // Validate actual image content
        if (img.naturalWidth === 0 || img.naturalHeight === 0) {
          addToast({
            title: 'Invalid image file. Please upload a valid PNG or JPG image.',
            color: 'danger',
            variant: 'flat',
          });
          URL.revokeObjectURL(imageUrl);
          setIsLoadingImage(false);
          return;
        }

        // Validate maximum dimensions
        if (img.naturalWidth > MAX_IMAGE_DIMENSION || img.naturalHeight > MAX_IMAGE_DIMENSION) {
          addToast({
            title: `Image dimensions too large. Maximum size is ${MAX_IMAGE_DIMENSION} × ${MAX_IMAGE_DIMENSION}px.`,
            color: 'danger',
            variant: 'flat',
          });
          URL.revokeObjectURL(imageUrl);
          setIsLoadingImage(false);
          return;
        }

        setImageState({
          file,
          imageUrl,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
        });
        setPosition({ x: 0, y: 0 });
        setIsLoadingImage(false);

        // Soft gate: once user uploads media, prompt sign up.
        triggerSoftGate();
      };

      img.onerror = () => {
        addToast({
          title: 'Failed to load image. The file may be corrupted or not a valid image. Please try a different file.',
          color: 'danger',
          variant: 'flat',
        });
        URL.revokeObjectURL(imageUrl);
        setIsLoadingImage(false);
      };

      img.src = imageUrl;
    },
    [imageState.imageUrl, triggerSoftGate],
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match(/^image\/(png|jpeg|jpg)$/)) {
      addToast({ title: 'Please upload a PNG or JPG image', color: 'danger', variant: 'flat' });
      return;
    }

    // Validate file size
    if (file.size > 10 * 1024 * 1024) {
      addToast({ title: 'File size must be less than 10MB', color: 'danger', variant: 'flat' });
      return;
    }

    loadImageFile(file);
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/jpg': ['.jpg'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors.some((e) => e.code === 'file-too-large')) {
          addToast({ title: 'File size must be less than 10MB', color: 'danger', variant: 'flat' });
        } else if (rejection.errors.some((e) => e.code === 'file-invalid-type')) {
          addToast({ title: 'Please upload a PNG or JPG image', color: 'danger', variant: 'flat' });
        } else {
          addToast({ title: 'Failed to upload file. Please try again.', color: 'danger', variant: 'flat' });
        }
        return;
      }

      const file = acceptedFiles[0];
      if (file) {
        loadImageFile(file);
      }
    },
    multiple: false,
  });

  const handleResetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleReupload = () => {
    fileInputRef.current?.click();
  };

  // Keyboard shortcuts for position controls
  useEffect(() => {
    if (!imageState.imageUrl) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if not typing in an input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const bounds = calculatePositionBounds(imageState.naturalWidth, imageState.naturalHeight, resizeMode);
      const step = e.shiftKey ? 50 : 10; // Larger steps with Shift key

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setPosition((prev) => ({ ...prev, y: Math.max(bounds.minY, prev.y - step) }));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setPosition((prev) => ({ ...prev, y: Math.min(bounds.maxY, prev.y + step) }));
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setPosition((prev) => ({ ...prev, x: Math.max(bounds.minX, prev.x - step) }));
          break;
        case 'ArrowRight':
          e.preventDefault();
          setPosition((prev) => ({ ...prev, x: Math.min(bounds.maxX, prev.x + step) }));
          break;
        case 'r':
        case 'R':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleResetPosition();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [imageState.imageUrl, imageState.naturalWidth, imageState.naturalHeight, resizeMode]);

  // Cleanup image URL on unmount
  useEffect(() => {
    return () => {
      if (imageState.imageUrl) {
        URL.revokeObjectURL(imageState.imageUrl);
      }
    };
  }, [imageState.imageUrl]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Canvas Section */}
        <div className="min-w-0 flex-1 lg:sticky lg:top-6">
          <BannerCanvas
            imageUrl={imageState.imageUrl}
            naturalWidth={imageState.naturalWidth}
            naturalHeight={imageState.naturalHeight}
            resizeMode={resizeMode}
            position={position}
            onPositionChange={setPosition}
            showSafeAreas={showSafeAreas}
            previewMode={previewMode}
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            isLoading={isLoadingImage}
          />
        </div>

        {/* Controls Section */}
        <div className="flex flex-col gap-4 lg:w-80 lg:shrink-0">
          <BannerControls
            resizeMode={resizeMode}
            onResizeModeChange={setResizeMode}
            showSafeAreas={showSafeAreas}
            onShowSafeAreasChange={setShowSafeAreas}
            hasImage={!!imageState.imageUrl}
            onReupload={handleReupload}
          />

          <BannerPreviewModes previewMode={previewMode} onPreviewModeChange={setPreviewMode} />

          <BannerExport
            imageUrl={imageState.imageUrl}
            naturalWidth={imageState.naturalWidth}
            naturalHeight={imageState.naturalHeight}
            resizeMode={resizeMode}
            position={position}
            exportFormat={exportFormat}
            onExportFormatChange={setExportFormat}
          />
        </div>
      </div>
      {/* Hidden file input for reupload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Reupload image"
      />
    </div>
  );
};
