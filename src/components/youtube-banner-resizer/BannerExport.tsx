import { Button, Radio, RadioGroup } from '@heroui/react';
import { useState } from 'react';

import { Icon } from '../various/Icon';
import { ResizeMode } from './YouTubeBannerResizer';

// Canvas dimensions (YouTube recommended)
const CANVAS_WIDTH = 2560;
const CANVAS_HEIGHT = 1440;

interface BannerExportProps {
  imageUrl: string | null;
  naturalWidth: number;
  naturalHeight: number;
  resizeMode: ResizeMode;
  position: { x: number; y: number };
  exportFormat: 'png' | 'jpg';
  onExportFormatChange: (format: 'png' | 'jpg') => void;
}

export const BannerExport = ({
  imageUrl,
  naturalWidth,
  naturalHeight,
  resizeMode,
  position,
  exportFormat,
  onExportFormatChange,
}: BannerExportProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const calculateImageDimensions = () => {
    if (!naturalWidth || !naturalHeight) return null;

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
      width: imgWidth,
      height: imgHeight,
      x: (CANVAS_WIDTH - imgWidth) / 2 + position.x,
      y: (CANVAS_HEIGHT - imgHeight) / 2 + position.y,
    };
  };

  const handleExport = async () => {
    if (!imageUrl) return;

    setIsExporting(true);

    try {
      // Create offscreen canvas at full resolution
      const canvas = document.createElement('canvas');
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }

      // Draw white background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Load and draw image
      const img = new Image();
      img.crossOrigin = 'anonymous';

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          try {
            const dims = calculateImageDimensions();
            if (!dims) {
              reject(new Error('Failed to calculate image dimensions'));
              return;
            }

            // Ensure image stays within canvas bounds
            const drawX = Math.max(0, Math.min(dims.x, CANVAS_WIDTH - dims.width));
            const drawY = Math.max(0, Math.min(dims.y, CANVAS_HEIGHT - dims.height));
            const drawWidth = Math.min(dims.width, CANVAS_WIDTH - drawX);
            const drawHeight = Math.min(dims.height, CANVAS_HEIGHT - drawY);

            // Draw image at calculated position and size
            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
            resolve();
          } catch (error) {
            reject(error);
          }
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = imageUrl;
      });

      // Convert to blob and download
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            throw new Error('Failed to create blob');
          }

          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `youtube-banner-kreatli.${exportFormat}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          setIsExporting(false);
        },
        exportFormat === 'png' ? 'image/png' : 'image/jpeg',
        0.95
      );
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export banner. Please try again.');
      setIsExporting(false);
    }
  };

  return (
    <div className="rounded-lg border border-foreground-200 bg-content1 p-4">
      <h3 className="mb-3 font-sans text-sm font-semibold">Export</h3>
      <div className="flex flex-col gap-3">
        <RadioGroup
          value={exportFormat}
          onValueChange={(value) => onExportFormatChange(value as 'png' | 'jpg')}
          orientation="vertical"
        >
          <Radio value="png">PNG (Recommended)</Radio>
          <Radio value="jpg">JPG (Smaller file size)</Radio>
        </RadioGroup>
        <Button
          color="primary"
          onPress={handleExport}
          isDisabled={!imageUrl || isExporting}
          isLoading={isExporting}
          startContent={!isExporting ? <Icon icon="download" size={16} /> : undefined}
          className="w-full"
        >
          {isExporting ? 'Exporting...' : 'Export Banner'}
        </Button>
        {imageUrl && (
          <p className="text-xs text-foreground-500">
            Exports at {CANVAS_WIDTH} × {CANVAS_HEIGHT}px
          </p>
        )}
      </div>
    </div>
  );
};
