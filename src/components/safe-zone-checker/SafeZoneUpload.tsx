import { addToast, Button, cn } from '@heroui/react';
import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import { Icon } from '../various/Icon';

export type Platform = 'tiktok' | 'instagram-reels' | 'youtube-shorts';

interface Props {
  onFileSelect: (file: File, aspectRatio: number, suggestedPlatforms: Platform[]) => void;
}

export const SafeZoneUpload = ({ onFileSelect }: Props) => {
  const [isDragActive, setIsDragActive] = React.useState(false);

  const detectAspectRatio = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const img = new Image();
        img.onload = () => {
          resolve(img.width / img.height);
        };
        img.onerror = () => {
          resolve(0);
        };
        img.src = URL.createObjectURL(file);
      } else if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
          window.URL.revokeObjectURL(video.src);
          resolve(video.videoWidth / video.videoHeight);
        };
        video.onerror = () => {
          resolve(0);
        };
        video.src = URL.createObjectURL(file);
      } else {
        resolve(0);
      }
    });
  };

  const suggestPlatforms = (aspectRatio: number): Platform[] => {
    const platforms: Platform[] = [];
    // 9:16 aspect ratio is approximately 0.5625
    const targetAspectRatio = 9 / 16; // 0.5625
    const tolerance = 0.1; // Allow 10% tolerance

    if (Math.abs(aspectRatio - targetAspectRatio) <= tolerance) {
      platforms.push('tiktok', 'instagram-reels', 'youtube-shorts');
    }

    return platforms;
  };

  const validateFile = (file: File): boolean => {
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const validVideoTypes = ['video/mp4', 'video/quicktime']; // MP4, MOV

    if (!validImageTypes.includes(file.type) && !validVideoTypes.includes(file.type)) {
      addToast({
        title: 'Please upload a JPG, PNG, MP4, or MOV file',
        color: 'danger',
        variant: 'flat',
      });
      return false;
    }

    // Max 50MB for videos
    if (file.type.startsWith('video/') && file.size > 50 * 1024 * 1024) {
      addToast({
        title: 'Video files must be less than 50MB',
        color: 'danger',
        variant: 'flat',
      });
      return false;
    }

    return true;
  };

  const handleFile = useCallback(
    async (file: File) => {
      if (!validateFile(file)) {
        return;
      }

      const aspectRatio = await detectAspectRatio(file);
      const suggestedPlatforms = suggestPlatforms(aspectRatio);

      onFileSelect(file, aspectRatio, suggestedPlatforms);
    },
    [onFileSelect],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive: dropzoneIsDragActive,
    open,
  } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'video/mp4': ['.mp4'],
      'video/quicktime': ['.mov'],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: false,
    onDrop,
  });

  useEffect(() => {
    setIsDragActive(dropzoneIsDragActive);
  }, [dropzoneIsDragActive]);

  // Handle paste from clipboard
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file) {
            e.preventDefault();
            await handleFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, [handleFile]);

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed rounded-2xl p-12 transition-all cursor-pointer',
        isDragActive
          ? 'border-primary bg-primary/10'
          : 'border-foreground-200 hover:border-foreground-300 bg-foreground-50',
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="p-4 rounded-full bg-foreground-100">
          <Icon icon="upload" size={32} className="text-foreground-500" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">Upload or paste your media</p>
          <p className="text-sm text-foreground-500">
            Drag and drop an image or video, or click to browse. You can also paste from clipboard.
          </p>
          <p className="text-xs text-foreground-400 mt-2">
            Supported formats: JPG, PNG, MP4, MOV (max 50MB for videos)
          </p>
        </div>
        <Button
          className="bg-foreground text-content1 mt-2"
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
        >
          <Icon icon="upload" size={16} />
          Choose File
        </Button>
      </div>
    </div>
  );
};
