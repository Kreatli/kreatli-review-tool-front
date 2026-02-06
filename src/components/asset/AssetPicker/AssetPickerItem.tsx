import { Chip } from '@heroui/react';

import { AssetFileDto } from '../../../services/types';
import { formatBytes } from '../../../utils/formatBytes';
import { AssetPreview } from './AssetPreview';

interface Props {
  asset: AssetFileDto;
  onClick: () => void;
}

export const AssetPickerItem = ({ asset, onClick }: Props) => {
  return (
    <div className="relative">
      <div className="flex gap-2 rounded-large p-1.5 hover:bg-foreground-100">
        <div className="shrink-0">
          <AssetPreview asset={asset} width={44} height={44} />
        </div>
        <div className="flex flex-col gap-0.5 overflow-hidden">
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="size-xs overflow-hidden text-ellipsis whitespace-nowrap text-start font-semibold after:absolute after:inset-0 after:z-20"
              onClick={onClick}
            >
              {asset.name}
            </button>
            {asset.stackVersion && (
              <Chip size="sm" variant="flat" className="h-auto p-0.5">
                v{asset.stackVersion}
              </Chip>
            )}
          </div>
          <div className="text-xs text-foreground-500">
            {formatBytes(asset.fileSize)}
            {asset.statusLabel && <>, {asset.statusLabel}</>}
          </div>
        </div>
      </div>
    </div>
  );
};
