import { Button, Input, Select, SelectItem } from '@heroui/react';

import { Icon } from '../various/Icon';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './bannerGeometry';

interface BannerControlsProps {
  hasImage: boolean;
  onReupload?: () => void;
  onResetViewport?: () => void;
}

export const BannerControls = ({
  hasImage,
  onReupload,
  onResetViewport,
}: BannerControlsProps) => {
  return (
    <div className="rounded-lg border border-foreground-200 bg-content1 p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-sans text-lg font-semibold text-foreground-900">Resize image</h2>
          <p className="mt-1 text-xs text-foreground-500">
            Drag the frame to move it; drag corners to resize (always 16:9 like YouTube). Download is always{' '}
            <strong className="font-medium text-foreground-700">2560×1440</strong> px.
          </p>
        </div>
        {hasImage && onReupload && (
          <Button
            variant="light"
            size="sm"
            onPress={onReupload}
            startContent={<Icon icon="upload" size={16} />}
          >
            Replace
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <Select
          label="Proportions"
          labelPlacement="outside"
          isDisabled
          selectedKeys={['custom']}
          classNames={{
            trigger: 'bg-foreground-50',
          }}
        >
          <SelectItem key="custom">Custom</SelectItem>
        </Select>

        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
          <Input
            label="Width"
            labelPlacement="outside"
            isReadOnly
            value={String(CANVAS_WIDTH)}
            endContent={<span className="text-xs text-foreground-500">px</span>}
            classNames={{ inputWrapper: 'bg-foreground-50' }}
          />
          <div className="flex h-10 items-center justify-center pb-[2px]">
            <div className="flex size-8 items-center justify-center rounded-full bg-foreground-100">
              <Icon icon="shield" size={16} className="text-foreground-600" />
            </div>
          </div>
          <Input
            label="Height"
            labelPlacement="outside"
            isReadOnly
            value={String(CANVAS_HEIGHT)}
            endContent={<span className="text-xs text-foreground-500">px</span>}
            classNames={{ inputWrapper: 'bg-foreground-50' }}
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            variant="light"
            size="sm"
            onPress={onResetViewport}
            isDisabled={!hasImage || !onResetViewport}
            startContent={<Icon icon="update" size={16} />}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
