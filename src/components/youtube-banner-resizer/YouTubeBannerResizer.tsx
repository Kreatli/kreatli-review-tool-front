import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { BannerCanvas } from './BannerCanvas';
import { BannerControls } from './BannerControls';
import { BannerExport } from './BannerExport';
import { BannerPreviewModes } from './BannerPreviewModes';

export type ResizeMode = 'cover' | 'contain';
export type PreviewMode = 'desktop' | 'mobile' | 'tablet' | 'tv';

interface ImageState {
  file: File | null;
  imageUrl: string | null;
  naturalWidth: number;
  naturalHeight: number;
}

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
          alert('File size must be less than 10MB');
        } else if (rejection.errors.some((e) => e.code === 'file-invalid-type')) {
          alert('Please upload a PNG or JPG image');
        } else {
          alert('Failed to upload file. Please try again.');
        }
        return;
      }

      const file = acceptedFiles[0];
      if (file) {
        // Clean up previous image URL if exists
        if (imageState.imageUrl) {
          URL.revokeObjectURL(imageState.imageUrl);
        }

        const imageUrl = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
          setImageState({
            file,
            imageUrl,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
          });
          // Reset position when new image is loaded
          setPosition({ x: 0, y: 0 });
        };
        img.onerror = () => {
          alert('Failed to load image. Please try a different file.');
          URL.revokeObjectURL(imageUrl);
        };
        img.src = imageUrl;
      }
    },
    multiple: false,
  });

  const handleResetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

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
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        {/* Canvas Section */}
        <div className="flex-1 min-w-0">
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
          />
        </div>

        {/* Controls Section */}
        <div className="flex flex-col gap-4 lg:w-80 lg:shrink-0">
          <BannerControls
            resizeMode={resizeMode}
            onResizeModeChange={setResizeMode}
            position={position}
            onPositionChange={setPosition}
            onResetPosition={handleResetPosition}
            showSafeAreas={showSafeAreas}
            onShowSafeAreasChange={setShowSafeAreas}
            hasImage={!!imageState.imageUrl}
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
    </div>
  );
};
