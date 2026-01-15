import { Button, ButtonGroup, Tooltip } from '@heroui/react';

import { Icon } from '../various/Icon';
import { PreviewMode } from './YouTubeBannerResizer';

interface BannerPreviewModesProps {
  previewMode: PreviewMode;
  onPreviewModeChange: (mode: PreviewMode) => void;
}

const PREVIEW_INFO = {
  desktop: { label: 'Desktop', description: 'Full banner visible (2560×1440px)' },
  mobile: { label: 'Mobile', description: 'Center crop (~1280×720px visible)' },
  tablet: { label: 'Tablet', description: 'Medium crop (~2048×1152px visible)' },
  tv: { label: 'TV', description: 'Full banner, may crop edges' },
};

export const BannerPreviewModes = ({ previewMode, onPreviewModeChange }: BannerPreviewModesProps) => {
  return (
    <div className="rounded-lg border border-foreground-200 bg-content1 p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <Icon icon="monitorPlay" size={16} className="text-foreground-400" />
        <h3 className="font-sans text-sm font-semibold">Device Preview</h3>
      </div>
      <ButtonGroup variant="bordered" className="w-full" isDisabled={false}>
        {(Object.keys(PREVIEW_INFO) as PreviewMode[]).map((mode) => (
          <Tooltip key={mode} content={PREVIEW_INFO[mode].description}>
            <Button
              size="sm"
              variant={previewMode === mode ? 'solid' : 'bordered'}
              color={previewMode === mode ? 'primary' : 'default'}
              onPress={() => onPreviewModeChange(mode)}
              className="flex-1"
            >
              {PREVIEW_INFO[mode].label}
            </Button>
          </Tooltip>
        ))}
      </ButtonGroup>
      <p className="mt-2 text-xs text-foreground-500">{PREVIEW_INFO[previewMode].description}</p>
    </div>
  );
};
