import { Button, Card, CardBody, Input, Slider } from '@heroui/react';
import { useMemo } from 'react';

import { Icon } from '../various/Icon';
import { BannerPlacement } from './bannerPlacement';

interface BannerDimensionControlsProps {
  isDisabled: boolean;
  width: number;
  height: number;
  onChange: (next: { width: number; height: number }) => void;
  onReset: () => void;
  placement: BannerPlacement;
  onPlacementChange: (next: BannerPlacement) => void;
}

const MIN_DIMENSION = 1;
const MAX_DIMENSION = 10000;

export const BannerDimensionControls = ({
  isDisabled,
  width,
  height,
  onChange,
  onReset,
  placement,
  onPlacementChange,
}: BannerDimensionControlsProps) => {
  const isInvalid = useMemo(() => {
    return (
      !Number.isFinite(width) ||
      !Number.isFinite(height) ||
      width < MIN_DIMENSION ||
      height < MIN_DIMENSION ||
      width > MAX_DIMENSION ||
      height > MAX_DIMENSION
    );
  }, [height, width]);

  return (
    <Card className="border-foreground-200 shadow-sm">
      <CardBody className="p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon icon="file" size={16} className="text-foreground-400" />
            <h3 className="font-sans text-sm font-semibold">Dimensions</h3>
          </div>
          <Button size="sm" variant="light" onPress={onReset} isDisabled={isDisabled}>
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            isDisabled={isDisabled}
            label="Width"
            type="number"
            min={MIN_DIMENSION}
            max={MAX_DIMENSION}
            value={String(width)}
            onValueChange={(v) => {
              const nextW = Number.parseInt(v || '0', 10);
              onChange({ width: nextW, height });
            }}
            variant="faded"
            labelPlacement="outside"
            isInvalid={isInvalid}
            endContent={<span className="text-xs text-foreground-500">px</span>}
          />
          <Input
            isDisabled={isDisabled}
            label="Height"
            type="number"
            min={MIN_DIMENSION}
            max={MAX_DIMENSION}
            value={String(height)}
            onValueChange={(v) => {
              const nextH = Number.parseInt(v || '0', 10);
              onChange({ width, height: nextH });
            }}
            variant="faded"
            labelPlacement="outside"
            isInvalid={isInvalid}
            endContent={<span className="text-xs text-foreground-500">px</span>}
          />
        </div>

        <div className="mt-4">
          <Slider
            isDisabled={isDisabled}
            color="foreground"
            value={placement.zoom}
            onChange={(value) => {
              const zoom = value as number;
              onPlacementChange({ ...placement, zoom });
            }}
            minValue={1}
            maxValue={3}
            step={0.01}
            label="Zoom"
            classNames={{
              label: 'text-foreground-500',
              value: 'font-bold font-sans tabular-nums',
            }}
            size="md"
            showOutline
            showTooltip
            formatOptions={{ style: 'percent' }}
          />
        </div>

        <p className="mt-3 text-xs text-foreground-500">
          Output size defaults to 2560×1440. Drag the image to choose the visible crop area.
        </p>
      </CardBody>
    </Card>
  );
};
