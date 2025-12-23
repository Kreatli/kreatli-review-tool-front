import { Button, Card, CardBody, Chip, CircularProgress, Image, Progress } from '@heroui/react';
import { Icon } from '../../various/Icon';
import { AssetIcon } from '../../asset/AssetIcon';
import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';
import { useSession } from '../../../hooks/useSession';
import { formatBytes } from '../../../utils/formatBytes';

interface UploadItem {
  id: string;
  name: string;
  size: number;
  fileType: string;
  progress: number;
  status: 'uploading' | 'completed' | 'queued';
  thumbnailUrl?: string;
}

export const StorageFeaturePreview = () => {
  const { openSignUpModal } = useSignUpModalVisibility();
  const { isSignedIn } = useSession();

  const uploads: UploadItem[] = [
    {
      id: '1',
      name: 'product_launch_v2.mp4',
      size: 2400000000,
      fileType: 'video/mp4',
      progress: 68,
      status: 'uploading',
    },
    {
      id: '2',
      name: 'hero_image_final.jpg',
      size: 5200000,
      fileType: 'image/jpeg',
      progress: 100,
      status: 'completed',
      thumbnailUrl: 'https://picsum.photos/80/80?random=1',
    },
    {
      id: '3',
      name: 'presentation_deck.pdf',
      size: 12000000,
      fileType: 'application/pdf',
      progress: 35,
      status: 'uploading',
    },
  ];

  const handleClick = () => {
    if (!isSignedIn) {
      openSignUpModal();
    }
  };

  const getFileTypeLabel = (fileType: string) => {
    if (fileType.startsWith('video')) return 'Video';
    if (fileType.startsWith('image')) return 'Image';
    if (fileType.includes('pdf')) return 'PDF';
    if (fileType.includes('zip') || fileType.includes('archive')) return 'Archive';
    return 'File';
  };

  const renderUploadItem = (upload: UploadItem) => {
    const isImage = upload.fileType.startsWith('image');
    const isCompleted = upload.status === 'completed';

    return (
      <div
        key={upload.id}
        className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
          isCompleted
            ? 'bg-foreground-50 border-foreground-200 hover:bg-foreground-100'
            : 'bg-foreground-50 border-foreground-200'
        }`}
      >
        {/* Thumbnail/Icon */}
        <div className="size-12 shrink-0 rounded-lg overflow-hidden bg-foreground-100 border border-foreground-200 flex items-center justify-center">
          {isImage && upload.thumbnailUrl ? (
            <Image src={upload.thumbnailUrl} alt={upload.name} className="w-full h-full object-cover" removeWrapper />
          ) : (
            <AssetIcon fileType={upload.fileType} size={24} />
          )}
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div className="font-medium text-sm truncate">{upload.name}</div>
          </div>
          <div className="text-xs text-foreground-500 mb-1.5">
            {formatBytes(upload.size)} • {getFileTypeLabel(upload.fileType)}
          </div>
          <Progress
            size="sm"
            value={upload.progress}
            color={isCompleted ? 'success' : 'primary'}
            className="mt-1"
            classNames={{
              indicator: isCompleted ? 'bg-success' : 'bg-primary',
            }}
          />
        </div>

        {/* Progress Indicator */}
        <div className="shrink-0">
          <CircularProgress
            size="sm"
            value={upload.progress}
            color={isCompleted ? 'success' : 'primary'}
            showValueLabel
          />
        </div>
      </div>
    );
  };

  return (
    <Card className="relative group">
      <CardBody className="flex flex-col gap-6 p-6">
        {/* Header with Security Badge */}
        <div className="flex justify-between items-center border-b border-foreground-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-foreground-100 p-2.5 rounded-lg">
              <Icon icon="folder" size={20} />
            </div>
            <div className="flex flex-col">
              <div className="font-semibold text-base">Creative Assets</div>
              <div className="text-sm text-foreground-500">127 items, 45.2GB</div>
            </div>
          </div>
          <Chip
            size="sm"
            variant="flat"
            color="success"
            startContent={<Icon icon="shield" size={14} />}
            className="cursor-pointer hover:bg-success-100 transition-colors"
            onClick={handleClick}
          >
            Encrypted
          </Chip>
        </div>

        {/* Upload Area */}
        <div
          className="border-2 border-dashed border-foreground-300 rounded-xl p-8 bg-gradient-to-br from-foreground-50 to-foreground-100/50 hover:border-primary hover:from-primary-50/30 hover:to-primary-100/20 transition-all duration-300 cursor-pointer group/upload"
          onClick={handleClick}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="bg-primary/10 rounded-full p-4 group-hover/upload:bg-primary/20 transition-colors">
              <Icon icon="upload" size={28} className="text-primary" />
            </div>
            <div>
              <div className="font-semibold text-base mb-1.5">Drag & drop files here</div>
              <div className="text-sm text-foreground-500">or click to browse • Supports files up to 10GB</div>
            </div>
            <Button size="md" className="bg-foreground text-content1" onClick={handleClick}>
              <Icon icon="upload" size={16} />
              Upload Files
            </Button>
          </div>
        </div>

        {/* Uploads List */}
        {uploads.length > 0 && <div className="flex flex-col gap-2.5">{uploads.map(renderUploadItem)}</div>}
      </CardBody>
    </Card>
  );
};
