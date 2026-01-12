import { Button, Radio, RadioGroup } from '@heroui/react';

import { Icon } from '../various/Icon';
import { ResizeMode } from './YouTubeBannerResizer';

interface BannerControlsProps {
  resizeMode: ResizeMode;
  onResizeModeChange: (mode: ResizeMode) => void;
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
  onResetPosition: () => void;
  showSafeAreas: boolean;
  onShowSafeAreasChange: (show: boolean) => void;
  hasImage: boolean;
}

export const BannerControls = ({
  resizeMode,
  onResizeModeChange,
  position,
  onPositionChange,
  onResetPosition,
  showSafeAreas,
  onShowSafeAreasChange,
  hasImage,
}: BannerControlsProps) => {
  const handlePositionChange = (direction: 'up' | 'down' | 'left' | 'right', amount: number = 10) => {
    const newPosition = { ...position };
    switch (direction) {
      case 'up':
        newPosition.y = Math.max(-500, newPosition.y - amount);
        break;
      case 'down':
        newPosition.y = Math.min(500, newPosition.y + amount);
        break;
      case 'left':
        newPosition.x = Math.max(-500, newPosition.x - amount);
        break;
      case 'right':
        newPosition.x = Math.min(500, newPosition.x + amount);
        break;
    }
    onPositionChange(newPosition);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-foreground-200 bg-content1 p-4">
        <h3 className="mb-3 font-sans text-sm font-semibold">Resize Mode</h3>
        <RadioGroup
          value={resizeMode}
          onValueChange={(value) => onResizeModeChange(value as ResizeMode)}
          orientation="vertical"
        >
          <Radio value="cover">Cover (Fill canvas, may crop)</Radio>
          <Radio value="contain">Contain (Fit within canvas)</Radio>
        </RadioGroup>
      </div>

      {hasImage && (
        <>
          <div className="rounded-lg border border-foreground-200 bg-content1 p-4">
            <h3 className="mb-3 font-sans text-sm font-semibold">Position</h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-center">
                <Button
                  isIconOnly
                  variant="bordered"
                  size="sm"
                  onPress={() => handlePositionChange('up')}
                  aria-label="Move up"
                >
                  <Icon icon="arrow" size={16} className="rotate-180" />
                </Button>
              </div>
              <div className="flex justify-between">
                <Button
                  isIconOnly
                  variant="bordered"
                  size="sm"
                  onPress={() => handlePositionChange('left')}
                  aria-label="Move left"
                >
                  <Icon icon="arrowLeft" size={16} />
                </Button>
                <Button
                  isIconOnly
                  variant="bordered"
                  size="sm"
                  onPress={() => handlePositionChange('right')}
                  aria-label="Move right"
                >
                  <Icon icon="arrowRight" size={16} />
                </Button>
              </div>
              <div className="flex justify-center">
                <Button
                  isIconOnly
                  variant="bordered"
                  size="sm"
                  onPress={() => handlePositionChange('down')}
                  aria-label="Move down"
                >
                  <Icon icon="arrow" size={16} />
                </Button>
              </div>
              <Button variant="bordered" size="sm" onPress={onResetPosition} className="mt-2">
                Reset Position
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-foreground-200 bg-content1 p-4">
            <h3 className="mb-3 font-sans text-sm font-semibold">Overlays</h3>
            <Button
              variant={showSafeAreas ? 'solid' : 'bordered'}
              size="sm"
              onPress={() => onShowSafeAreasChange(!showSafeAreas)}
              startContent={<Icon icon={showSafeAreas ? 'eye' : 'eyeCrossed'} size={16} />}
              className="w-full"
            >
              {showSafeAreas ? 'Hide' : 'Show'} Safe Areas
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
