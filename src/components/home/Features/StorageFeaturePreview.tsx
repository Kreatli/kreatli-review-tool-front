import { Button, Card, CardBody, Chip, CircularProgress, Progress } from '@heroui/react';
import { Icon } from '../../various/Icon';
import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';
import { useState } from 'react';
import { useIsTouchScreen } from '../../../hooks/useIsTouchScreen';
import { useSession } from '../../../hooks/useSession';

export const StorageFeaturePreview = () => {
  const { openSignUpModal } = useSignUpModalVisibility();
  const { isSignedIn } = useSession();
  const isTouchScreen = useIsTouchScreen();
  const [shouldHide, setShouldHide] = useState(false);

  const handleClick = () => {
    if (!isSignedIn) {
      openSignUpModal();
    }
    setShouldHide(true);
  };

  return (
    <Card className="relative group">
      <div
        className={`opacity-0 transition-opacity duration-300 pointer-events-none absolute inset-0 bg-black/30 dark:bg-black/60 z-10 ${
          shouldHide || isTouchScreen ? '' : 'group-hover:opacity-100'
        }`}
      />
      <CardBody className="min-h-96 flex flex-col gap-4 p-4" onClick={() => setShouldHide(true)}>
        {/* Header with Security Badge */}
        <div className="flex justify-between items-center border-b border-foreground-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-foreground-100 p-2.5 rounded-lg">
              <Icon icon="folder" />
            </div>
            <div className="flex flex-col">
              <div className="font-semibold">Creative Assets</div>
              <div className="text-sm text-foreground-500">127 items, 45.2GB</div>
            </div>
          </div>
          <Chip
            size="sm"
            variant="flat"
            color="success"
            startContent={<Icon icon="shield" size={14} />}
            className="cursor-pointer"
            onClick={handleClick}
          >
            Encrypted
          </Chip>
        </div>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-foreground-300 rounded-lg p-6 bg-foreground-50 hover:border-primary transition-colors">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="bg-foreground-100 rounded-full p-3">
              <Icon icon="upload" size={24} className="text-primary" />
            </div>
            <div>
              <div className="font-semibold mb-1">Drag & drop files here</div>
              <div className="text-sm text-foreground-500">or click to browse • Supports files up to 10GB</div>
            </div>
            <Button size="sm" className="bg-foreground text-content1" onClick={handleClick}>
              <Icon icon="upload" size={16} />
              Upload Files
            </Button>
          </div>
        </div>

        {/* Active Uploads */}
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-foreground-600">Uploading...</div>
          <div className="flex flex-col gap-2">
            {/* Large Video Upload */}
            <div className="flex items-center gap-3 p-3 bg-foreground-50 rounded-lg border border-foreground-200">
              <div className="bg-foreground-100 rounded p-2">
                <Icon icon="file" size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">product_launch_v2.mp4</div>
                <div className="text-xs text-foreground-500">2.4 GB • Video</div>
                <Progress
                  size="sm"
                  value={68}
                  color="primary"
                  className="mt-1"
                  classNames={{
                    indicator: 'bg-primary',
                  }}
                />
              </div>
              <CircularProgress size="sm" value={68} color="primary" showValueLabel />
            </div>

            {/* Image Upload */}
            <div className="flex items-center gap-3 p-3 bg-foreground-50 rounded-lg border border-foreground-200">
              <div className="bg-foreground-100 rounded p-2">
                <Icon icon="file" size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">brand_assets_package.zip</div>
                <div className="text-xs text-foreground-500">850 MB • Archive</div>
                <Progress
                  size="sm"
                  value={100}
                  color="success"
                  className="mt-1"
                  classNames={{
                    indicator: 'bg-success',
                  }}
                />
              </div>
              <CircularProgress size="sm" value={100} color="success" showValueLabel />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

