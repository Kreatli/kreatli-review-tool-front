import { Button } from '@heroui/react';

import { Icon } from '../various/Icon';

interface BannerControlsProps {
  showSafeAreas: boolean;
  onShowSafeAreasChange: (show: boolean) => void;
  hasImage: boolean;
  onReupload?: () => void;
}

export const BannerControls = ({
  showSafeAreas,
  onShowSafeAreasChange,
  hasImage,
  onReupload,
}: BannerControlsProps) => {
  return (
    <div className="flex flex-col gap-4">
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
