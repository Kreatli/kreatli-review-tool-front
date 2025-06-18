import { Image } from '@heroui/react';
import { AssetDto } from '../../../services/types';
import { formatBytes } from '../../../utils/formatBytes';
import { STATUS_LABEL } from '../../../utils/status';
import { ChatTextareaAssetPreview } from './ChatTextareaAssetPreview';

interface Props {
  asset: AssetDto;
  onClick: () => void;
}

export const ChatTextareaAssetPickerItem = ({ asset, onClick }: Props) => {
  return (
    <div className="relative">
      <div className="flex gap-2 hover:bg-foreground-100 rounded-large p-1.5">
        <div className="shrink-0">
          <ChatTextareaAssetPreview asset={asset} width={44} height={44} />
        </div>
        <div className="flex flex-col gap-0.5 overflow-hidden">
          <button
            type="button"
            className="text-start font-semibold size-xs overflow-hidden text-ellipsis whitespace-nowrap after:absolute after:inset-0 after:z-20"
            onClick={onClick}
          >
            {asset.name}
          </button>
          <div className="text-foreground-500 text-xs">
            {formatBytes(asset.fileSize)}
            {asset.status && <>, {STATUS_LABEL[asset.status]}</>}
          </div>
        </div>
      </div>
    </div>
  );
};
