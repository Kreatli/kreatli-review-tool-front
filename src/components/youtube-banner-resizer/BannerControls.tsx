import { Button } from '@heroui/react';

import { Icon } from '../various/Icon';

interface BannerControlsProps {
  hasImage: boolean;
  onReupload?: () => void;
}

export const BannerControls = ({
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
    </div>
  );
};
