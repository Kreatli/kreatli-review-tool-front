import { addToast } from '@heroui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { useFreeToolsInactiveGate } from '../../contexts/FreeToolsInactiveGateContext';
import { useSession } from '../../hooks/useSession';
import { useSoftGate } from '../../hooks/useSoftGate';
import { BannerCanvas } from './BannerCanvas';
import { BannerControls } from './BannerControls';
import { BannerExport } from './BannerExport';
import { FrameRelative, getDefaultFrameRelative } from './bannerViewport';

// Maximum image dimensions to prevent memory exhaustion
const MAX_IMAGE_DIMENSION = 10000;
const MAX_FILE_SIZE_BYTES = 40 * 1024 * 1024; // 40MB (match Adobe UX)

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
  const [frameRelative, setFrameRelative] = useState<FrameRelative>(() => getDefaultFrameRelative(2560, 1440));
  const [exportFormat, setExportFormat] = useState<'png' | 'jpg'>('png');
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /** Latest natural-pixel crop computed in BannerCanvas — read at export time only. */
  const cropRef = useRef<{ sx: number; sy: number; sw: number; sh: number } | null>(null);
  const onCropRegionReady = useCallback((crop: { sx: number; sy: number; sw: number; sh: number } | null) => {
    cropRef.current = crop;
  }, []);

  const { isSignedIn } = useSession();
  const { isInactiveLocked, openInactivePlanModal } = useFreeToolsInactiveGate();

  const resetImageState = useCallback(() => {
    setImageState((prev) => {
      if (prev.imageUrl) URL.revokeObjectURL(prev.imageUrl);
      return { file: null, imageUrl: null, naturalWidth: 0, naturalHeight: 0 };
    });
    setFrameRelative(getDefaultFrameRelative(2560, 1440));
    cropRef.current = null;
    setIsLoadingImage(false);
  }, []);

  const { triggerSoftGate } = useSoftGate({
    onReset: resetImageState,
  });

  const loadImageFile = useCallback(
    (file: File) => {
      if (isInactiveLocked) {
        openInactivePlanModal();
        return;
      }

      setIsLoadingImage(true);

      if (imageState.imageUrl) {
        URL.revokeObjectURL(imageState.imageUrl);
      }

      const imageUrl = URL.createObjectURL(file);

      const fail = (message: string) => {
        URL.revokeObjectURL(imageUrl);
        setIsLoadingImage(false);
        addToast({ title: message, color: 'danger', variant: 'flat' });
      };

      const succeed = (naturalWidth: number, naturalHeight: number) => {
        if (naturalWidth === 0 || naturalHeight === 0) {
          fail('Invalid image file. Please upload a valid PNG or JPG image.');
          return;
        }

        if (naturalWidth > MAX_IMAGE_DIMENSION || naturalHeight > MAX_IMAGE_DIMENSION) {
          fail(
            `Image dimensions too large. Maximum size is ${MAX_IMAGE_DIMENSION} × ${MAX_IMAGE_DIMENSION}px.`,
          );
          return;
        }

        setImageState({
          file,
          imageUrl,
          naturalWidth,
          naturalHeight,
        });
        setFrameRelative(getDefaultFrameRelative(naturalWidth, naturalHeight));
        setIsLoadingImage(false);
        cropRef.current = null;

        if (!isSignedIn) triggerSoftGate();
      };

      void (async () => {
        if (typeof createImageBitmap === 'function') {
          try {
            const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
            const w = bitmap.width;
            const h = bitmap.height;
            bitmap.close();
            if (w > 0 && h > 0) {
              succeed(w, h);
              return;
            }
          } catch {
            /* try createImageBitmap without options, then <img> */
          }

          try {
            const bitmap = await createImageBitmap(file);
            const w = bitmap.width;
            const h = bitmap.height;
            bitmap.close();
            if (w > 0 && h > 0) {
              succeed(w, h);
              return;
            }
          } catch {
            /* <img> fallback */
          }
        }

        await new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            succeed(img.naturalWidth, img.naturalHeight);
            resolve();
          };
          img.onerror = () => {
            fail('Failed to load image. The file may be corrupted or not a valid image. Please try a different file.');
            resolve();
          };
          img.src = imageUrl;
        });
      })();
    },
    [imageState.imageUrl, isSignedIn, triggerSoftGate, isInactiveLocked, openInactivePlanModal],
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match(/^image\/(png|jpeg|jpg|webp)$/)) {
      addToast({ title: 'Please upload a JPEG, PNG, or WebP image', color: 'danger', variant: 'flat' });
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      addToast({ title: 'File size must be less than 40MB', color: 'danger', variant: 'flat' });
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
      'image/webp': ['.webp'],
    },
    maxSize: MAX_FILE_SIZE_BYTES,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors.some((e) => e.code === 'file-too-large')) {
          addToast({ title: 'File size must be less than 40MB', color: 'danger', variant: 'flat' });
        } else if (rejection.errors.some((e) => e.code === 'file-invalid-type')) {
          addToast({ title: 'Please upload a JPEG, PNG, or WebP image', color: 'danger', variant: 'flat' });
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
        <div className="min-w-0 flex-1 lg:sticky lg:top-6 lg:flex-[1.4]">
          <BannerCanvas
            imageUrl={imageState.imageUrl}
            naturalWidth={imageState.naturalWidth}
            naturalHeight={imageState.naturalHeight}
            frameRelative={frameRelative}
            onFrameRelativeChange={setFrameRelative}
            onCropRegionReady={onCropRegionReady}
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            isLoading={isLoadingImage}
          />
        </div>

        {/* Controls Section */}
        <div className="flex flex-col gap-4 lg:w-96 lg:shrink-0">
          <BannerControls
            hasImage={!!imageState.imageUrl}
            onReupload={handleReupload}
            onResetViewport={
              imageState.imageUrl
                ? () => setFrameRelative(getDefaultFrameRelative(imageState.naturalWidth, imageState.naturalHeight))
                : undefined
            }
          />

          <BannerExport
            file={imageState.file}
            imageUrl={imageState.imageUrl}
            getCropRect={() => cropRef.current}
            exportFormat={exportFormat}
            onExportFormatChange={setExportFormat}
            onExportStart={() => {
              if (isInactiveLocked) {
                openInactivePlanModal();
                return false;
              }
              if (!isSignedIn) {
                triggerSoftGate();
                return false;
              }
            }}
          />
        </div>
      </div>
      {/* Hidden file input for reupload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Reupload image"
      />
    </div>
  );
};
