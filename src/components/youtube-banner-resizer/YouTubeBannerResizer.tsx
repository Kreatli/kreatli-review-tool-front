import { addToast } from '@heroui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { useSession } from '../../hooks/useSession';
import { useSignUpModalVisibility } from '../../hooks/useSignUpModalVisibility';
import { BannerCanvas } from './BannerCanvas';
import { BannerControls } from './BannerControls';
import { BannerExport } from './BannerExport';
import { BannerPreviewModes } from './BannerPreviewModes';

export type PreviewMode = 'desktop' | 'mobile' | 'tablet' | 'tv';

// Maximum image dimensions to prevent memory exhaustion
const MAX_IMAGE_DIMENSION = 10000;

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
  const [showSafeAreas, setShowSafeAreas] = useState(true);
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');
  const [exportFormat, setExportFormat] = useState<'png' | 'jpg'>('png');
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { isSignedIn } = useSession();
  const openSignUpModal = useSignUpModalVisibility((s) => s.openSignUpModal);

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
        setIsLoadingImage(false);

        // Soft gate: show sign-up popup for guests (no reset on dismiss).
        if (!isSignedIn) openSignUpModal();
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
    [imageState.imageUrl, isSignedIn, openSignUpModal],
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

  const handleReupload = () => {
    fileInputRef.current?.click();
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
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Canvas Section */}
        <div className="min-w-0 flex-1 lg:sticky lg:top-6">
          <BannerCanvas
            imageUrl={imageState.imageUrl}
            naturalWidth={imageState.naturalWidth}
            naturalHeight={imageState.naturalHeight}
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
            exportFormat={exportFormat}
            onExportFormatChange={setExportFormat}
            onExportStart={() => {
              if (!isSignedIn) openSignUpModal();
            }}
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
