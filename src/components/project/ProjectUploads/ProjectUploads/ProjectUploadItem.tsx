import { CircularProgress, Image } from '@heroui/react';
import { formatBytes } from '../../../../utils/formatBytes';
import { Icon } from '../../../various/Icon';
import { AssetIcon } from '../../../asset/AssetIcon';

interface Props {
  previewUrl?: string;
  name: string;
  size: number;
  progress: number;
  fileType: string;
  isError?: boolean;
}

export const ProjectUploadItem = ({ previewUrl, name, size, progress, fileType, isError }: Props) => {
  return (
    <div className="flex gap-2 items-start">
      <div className="size-10 shrink-0">
        {previewUrl ? (
          <Image className="w-full h-full object-cover" removeWrapper src={previewUrl} alt={name} />
        ) : (
          <div className="w-full h-full rounded-large bg-foreground-100 flex items-center justify-center">
            <AssetIcon fileType={fileType} size={20} />
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="font-medium line-clamp-2 break-all">{name}</div>
        <div className="text-gray-500">{formatBytes(size)}</div>
      </div>
      <div>
        <CircularProgress
          size="sm"
          value={progress}
          color={isError ? 'danger' : progress === 100 ? 'success' : 'primary'}
          showValueLabel
          valueLabel={isError ? <Icon icon="error" size={18} className="text-danger" /> : undefined}
        />
      </div>
    </div>
  );
};
