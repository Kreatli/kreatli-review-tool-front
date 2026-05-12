import { addToast, Button, Radio, RadioGroup } from '@heroui/react';
import { useState } from 'react';

import { Icon } from '../various/Icon';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './bannerGeometry';

interface BannerExportProps {
  file?: File | null;
  imageUrl: string | null;
  /** Natural-pixel crop of the uploaded image; must match the draggable frame. */
  getCropRect: () => { sx: number; sy: number; sw: number; sh: number } | null | undefined;
  exportFormat: 'png' | 'jpg';
  onExportFormatChange: (format: 'png' | 'jpg') => void;
  /** Called when user clicks Export. Return false to cancel export (e.g. after opening a gate modal). */
  onExportStart?: () => boolean | void;
}

export const BannerExport = ({
  file,
  imageUrl,
  getCropRect,
  exportFormat,
  onExportFormatChange,
  onExportStart,
}: BannerExportProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!imageUrl && !file) return;

    const proceed = onExportStart?.() !== false;
    if (!proceed) return;

    const crop = getCropRect();
    if (!crop || crop.sw <= 0 || crop.sh <= 0) {
      addToast({
        title: 'Could not read the banner crop. Try moving the frame slightly, then export again.',
        color: 'danger',
        variant: 'flat',
      });
      return;
    }

    setIsExporting(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      let bitmap: ImageBitmap;
      try {
        if (file) {
          try {
            bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
          } catch {
            bitmap = await createImageBitmap(file);
          }
        } else {
          if (!imageUrl) throw new Error('Missing image source for export');
          const response = await fetch(imageUrl);
          if (!response.ok) throw new Error('Failed to load image for export');
          const blob = await response.blob();
          try {
            bitmap = await createImageBitmap(blob, { imageOrientation: 'from-image' });
          } catch {
            bitmap = await createImageBitmap(blob);
          }
        }
      } catch {
        throw new Error('Failed to load image for export');
      }

      try {
        const sx = Math.max(0, Math.min(crop.sx, bitmap.width - 1));
        const sy = Math.max(0, Math.min(crop.sy, bitmap.height - 1));
        let sw = crop.sw;
        let sh = crop.sh;
        if (sx + sw > bitmap.width) sw = bitmap.width - sx;
        if (sy + sh > bitmap.height) sh = bitmap.height - sy;
        if (sw <= 0 || sh <= 0) {
          throw new Error('Invalid crop region');
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      } finally {
        bitmap.close();
      }

      canvas.toBlob(
        (blobOut) => {
          if (!blobOut) {
            setIsExporting(false);
            addToast({
              title: 'Failed to create image file. The image may be too large or corrupted.',
              color: 'danger',
              variant: 'flat',
            });
            return;
          }

          const url = URL.createObjectURL(blobOut);
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
          <span>{isExporting ? 'Exporting...' : 'Download banner'}</span>
        </Button>
      </div>
    </div>
  );
};
