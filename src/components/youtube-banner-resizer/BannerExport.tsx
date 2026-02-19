import { addToast, Button, Radio, RadioGroup } from '@heroui/react';
import { useState } from 'react';

import { Icon } from '../various/Icon';

// Canvas dimensions (YouTube recommended)
const CANVAS_WIDTH = 2560;
const CANVAS_HEIGHT = 1440;

interface BannerExportProps {
  imageUrl: string | null;
  naturalWidth: number;
  naturalHeight: number;
  exportFormat: 'png' | 'jpg';
  onExportFormatChange: (format: 'png' | 'jpg') => void;
  /** Called when user clicks Export (e.g. to show sign-up modal for guests). */
  onExportStart?: () => void;
}

/** Fit image within canvas (contain), centered. No squeeze, no crop. */
function getContainDimensions(naturalWidth: number, naturalHeight: number) {
  if (!naturalWidth || !naturalHeight) return null;
  const scale = Math.min(CANVAS_WIDTH / naturalWidth, CANVAS_HEIGHT / naturalHeight);
  const imgWidth = naturalWidth * scale;
  const imgHeight = naturalHeight * scale;
  const x = (CANVAS_WIDTH - imgWidth) / 2;
  const y = (CANVAS_HEIGHT - imgHeight) / 2;
  return { x, y, imgWidth, imgHeight };
}

export const BannerExport = ({
  imageUrl,
  naturalWidth,
  naturalHeight,
  exportFormat,
  onExportFormatChange,
  onExportStart,
}: BannerExportProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!imageUrl) return;

    onExportStart?.();
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
      // Note: crossOrigin not needed for blob URLs from createObjectURL

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          try {
            const dims = getContainDimensions(naturalWidth, naturalHeight);
            if (!dims) {
              reject(new Error('Failed to calculate image dimensions'));
              return;
            }
            ctx.drawImage(img, dims.x, dims.y, dims.imgWidth, dims.imgHeight);
            resolve();
          } catch (error) {
            reject(error);
          }
        };
        img.onerror = () => reject(new Error('Failed to load image for export'));
        img.src = imageUrl;
      });

      // Convert to blob and download
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setIsExporting(false);
            addToast({
              title: 'Failed to create image file. The image may be too large or corrupted.',
              color: 'danger',
              variant: 'flat',
            });
            return;
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
          addToast({
            title: 'Banner exported successfully!',
            color: 'success',
            variant: 'flat',
          });
        },
        exportFormat === 'png' ? 'image/png' : 'image/jpeg',
        0.95,
      );
    } catch (error) {
      console.error('Export failed:', error);
      let errorMessage = 'Failed to export banner. Please try again.';

      if (error instanceof Error) {
        if (error.message.includes('canvas context')) {
          errorMessage = 'Failed to initialize canvas. Please refresh the page and try again.';
        } else if (error.message.includes('load image')) {
          errorMessage = 'Failed to load image for export. The image may be corrupted.';
        } else if (error.message.includes('dimensions')) {
          errorMessage = 'Failed to calculate image dimensions. Please try a different image.';
        }
      }

      addToast({ title: errorMessage, color: 'danger', variant: 'flat' });
      setIsExporting(false);
    }
  };

  return (
    <div className="rounded-lg border border-foreground-200 bg-content1 p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <Icon icon="download" size={16} className="text-foreground-400" />
        <h3 className="font-sans text-sm font-semibold">Export</h3>
      </div>
      <div className="flex flex-col gap-3">
        <RadioGroup
          value={exportFormat}
          onValueChange={(value) => onExportFormatChange(value as 'png' | 'jpg')}
          orientation="vertical"
          className="gap-2"
        >
          <Radio value="png" description="Best quality, larger file size">
            PNG (Recommended)
          </Radio>
          <Radio value="jpg" description="Smaller file size, good quality">
            JPG (Smaller file size)
          </Radio>
        </RadioGroup>
        <Button
          onPress={handleExport}
          isDisabled={!imageUrl || isExporting}
          isLoading={isExporting}
          startContent={!isExporting ? <Icon icon="download" size={16} /> : undefined}
          className="w-full bg-foreground font-semibold text-content1"
          size="lg"
        >
          <span>{isExporting ? 'Exporting...' : 'Export Banner'}</span>
        </Button>
      </div>
    </div>
  );
};
