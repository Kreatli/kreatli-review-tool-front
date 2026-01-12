import { Button, ButtonGroup } from '@heroui/react';

import { PreviewMode } from './YouTubeBannerResizer';

interface BannerPreviewModesProps {
  previewMode: PreviewMode;
  onPreviewModeChange: (mode: PreviewMode) => void;
}

export const BannerPreviewModes = ({ previewMode, onPreviewModeChange }: BannerPreviewModesProps) => {
  return (
    <div className="rounded-lg border border-foreground-200 bg-content1 p-4">
      <h3 className="mb-3 font-sans text-sm font-semibold">Device Preview</h3>
      <ButtonGroup variant="bordered" className="w-full" isDisabled={false}>
        <Button
          size="sm"
          variant={previewMode === 'desktop' ? 'solid' : 'bordered'}
          onPress={() => onPreviewModeChange('desktop')}
        >
          Desktop
        </Button>
        <Button
          size="sm"
          variant={previewMode === 'mobile' ? 'solid' : 'bordered'}
          onPress={() => onPreviewModeChange('mobile')}
        >
          Mobile
        </Button>
        <Button
          size="sm"
          variant={previewMode === 'tablet' ? 'solid' : 'bordered'}
          onPress={() => onPreviewModeChange('tablet')}
        >
          Tablet
        </Button>
        <Button
          size="sm"
          variant={previewMode === 'tv' ? 'solid' : 'bordered'}
          onPress={() => onPreviewModeChange('tv')}
        >
          TV
        </Button>
      </ButtonGroup>
    </div>
  );
};
