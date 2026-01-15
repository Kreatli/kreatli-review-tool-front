import { Button, Radio, RadioGroup } from '@heroui/react';

import { Icon } from '../various/Icon';
import { ResizeMode } from './YouTubeBannerResizer';

interface BannerControlsProps {
  resizeMode: ResizeMode;
  onResizeModeChange: (mode: ResizeMode) => void;
  showSafeAreas: boolean;
  onShowSafeAreasChange: (show: boolean) => void;
  hasImage: boolean;
  onReupload?: () => void;
}

export const BannerControls = ({
  resizeMode,
  onResizeModeChange,
  showSafeAreas,
  onShowSafeAreasChange,
  hasImage,
  onReupload,
}: BannerControlsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-foreground-200 bg-content1 p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <Icon icon="fullscreen" size={16} className="text-foreground-400" />
          <h3 className="font-sans text-sm font-semibold">Resize Mode</h3>
        </div>
        <RadioGroup
          value={resizeMode}
          onValueChange={(value) => onResizeModeChange(value as ResizeMode)}
          orientation="vertical"
          className="gap-2"
        >
          <Radio value="cover" description="Fill entire canvas, may crop edges">
            Cover
          </Radio>
          <Radio value="contain" description="Fit within canvas, may show empty space">
            Contain
          </Radio>
        </RadioGroup>
      </div>

      {hasImage && onReupload && (
        <div className="rounded-lg border border-foreground-200 bg-content1 p-4 shadow-sm">
          <Button
            variant="light"
            size="sm"
            onPress={onReupload}
            startContent={<Icon icon="upload" size={16} />}
            className="w-full"
          >
            Reupload Image
          </Button>
        </div>
      )}

      {hasImage && (
        <div className="rounded-lg border border-foreground-200 bg-content1 p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <Icon icon="eye" size={16} className="text-foreground-400" />
            <h3 className="font-sans text-sm font-semibold">Overlays</h3>
          </div>
          <Button
            variant={showSafeAreas ? 'solid' : 'light'}
            color={showSafeAreas ? 'primary' : 'default'}
            size="sm"
            onPress={() => onShowSafeAreasChange(!showSafeAreas)}
            startContent={<Icon icon={showSafeAreas ? 'eye' : 'eyeCrossed'} size={16} />}
            className="w-full"
          >
            {showSafeAreas ? 'Hide' : 'Show'} Safe Areas
          </Button>
          {showSafeAreas && (
            <p className="mt-2 text-xs text-foreground-500">Safe area shows where content is visible on all devices</p>
          )}
        </div>
      )}
    </div>
  );
};
