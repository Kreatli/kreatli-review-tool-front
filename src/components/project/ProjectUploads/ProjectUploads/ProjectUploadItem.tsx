import { Button, CircularProgress, cn, Image, Tooltip } from '@heroui/react';
import Link from 'next/link';

import { formatBytes } from '../../../../utils/formatBytes';
import { AssetIcon } from '../../../asset/AssetIcon';
import { Icon } from '../../../various/Icon';

interface Props {
  projectId: string;
  folderId?: string;
  name: string;
  size: number;
  progress: number;
  fileType: string;
  isLoading?: boolean;
  previewUrl?: string;
  isError?: boolean;
  onCancel: () => void;
  onRemove: () => void;
}

export const ProjectUploadItem = ({
  projectId,
  folderId,
  previewUrl,
  isLoading,
  name,
  size,
  progress,
  fileType,
  isError,
  onCancel,
  onRemove,
}: Props) => {
  const handleCrossClick = () => {
    if (isError || progress === 100) {
      onRemove();

      return;
    }

    if (!isLoading) {
      onCancel();
    }
  };

  return (
    <div className="relative flex items-start gap-2 rounded-medium px-1 py-2 transition-colors hover:bg-foreground-100">
      <div className="size-10 shrink-0">
        {previewUrl ? (
          <Image className="h-full w-full object-cover" removeWrapper src={previewUrl} alt={name} />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-large bg-foreground-100">
            <AssetIcon fileType={fileType} size={20} />
          </div>
        )}
      </div>
      <div className="flex-1">
        <Link
          href={folderId ? `/project/${projectId}/assets/folder/${folderId}` : `/project/${projectId}`}
          className="line-clamp-2 break-all font-medium after:absolute after:inset-0"
        >
          {name}
        </Link>
        <div className="text-gray-500">{formatBytes(size)}</div>
      </div>
      <div className="flex items-center gap-1">
        <CircularProgress
          size="sm"
          value={progress}
          color={isError ? 'danger' : progress === 100 ? 'success' : 'primary'}
          showValueLabel
          valueLabel={isError ? <Icon icon="error" size={18} className="text-danger" /> : undefined}
        />
        <Tooltip isDisabled={isLoading} content={progress === 100 ? 'Clear' : 'Cancel upload'}>
          <Button
            isIconOnly
            radius="full"
            size="sm"
            className={cn({ 'cursor-not-allowed opacity-40': isLoading })}
            variant="light"
            onClick={handleCrossClick}
          >
            <Icon icon="cross" size={20} />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
