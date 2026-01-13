import { Button, Radio, RadioGroup } from '@heroui/react';

import { Icon } from '../various/Icon';
import { ResizeMode } from './YouTubeBannerResizer';

// Canvas dimensions (YouTube recommended)
const CANVAS_WIDTH = 2560;
const CANVAS_HEIGHT = 1440;

interface BannerControlsProps {
  resizeMode: ResizeMode;
  onResizeModeChange: (mode: ResizeMode) => void;
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
  onResetPosition: () => void;
  showSafeAreas: boolean;
  onShowSafeAreasChange: (show: boolean) => void;
  hasImage: boolean;
  naturalWidth: number;
  naturalHeight: number;
  resizeModeValue: ResizeMode;
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
  naturalWidth,
  naturalHeight,
  resizeModeValue,
}: BannerControlsProps) => {
  // Calculate position bounds based on actual image dimensions
  const calculatePositionBounds = () => {
    if (!naturalWidth || !naturalHeight) {
      return { minX: -500, maxX: 500, minY: -500, maxY: 500 };
    }

    let imgWidth: number;
    let imgHeight: number;

    if (resizeModeValue === 'cover') {
      const canvasAspect = CANVAS_WIDTH / CANVAS_HEIGHT;
      const imageAspect = naturalWidth / naturalHeight;

      if (imageAspect > canvasAspect) {
        imgHeight = CANVAS_HEIGHT;
        imgWidth = (CANVAS_HEIGHT * naturalWidth) / naturalHeight;
      } else {
        imgWidth = CANVAS_WIDTH;
        imgHeight = (CANVAS_WIDTH * naturalHeight) / naturalWidth;
      }
    } else {
      const canvasAspect = CANVAS_WIDTH / CANVAS_HEIGHT;
      const imageAspect = naturalWidth / naturalHeight;

      if (imageAspect > canvasAspect) {
        imgWidth = CANVAS_WIDTH;
        imgHeight = (CANVAS_WIDTH * naturalHeight) / naturalWidth;
      } else {
        imgHeight = CANVAS_HEIGHT;
        imgWidth = (CANVAS_HEIGHT * naturalWidth) / naturalHeight;
      }
    }

    // Calculate bounds: image can move within canvas bounds
    const minX = -(imgWidth - CANVAS_WIDTH) / 2;
    const maxX = (imgWidth - CANVAS_WIDTH) / 2;
    const minY = -(imgHeight - CANVAS_HEIGHT) / 2;
    const maxY = (imgHeight - CANVAS_HEIGHT) / 2;

    return { minX, maxX, minY, maxY };
  };

  const handlePositionChange = (direction: 'up' | 'down' | 'left' | 'right', amount: number = 10) => {
    const bounds = calculatePositionBounds();
    const newPosition = { ...position };
    
    switch (direction) {
      case 'up':
        newPosition.y = Math.max(bounds.minY, newPosition.y - amount);
        break;
      case 'down':
        newPosition.y = Math.min(bounds.maxY, newPosition.y + amount);
        break;
      case 'left':
        newPosition.x = Math.max(bounds.minX, newPosition.x - amount);
        break;
      case 'right':
        newPosition.x = Math.min(bounds.maxX, newPosition.x + amount);
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
