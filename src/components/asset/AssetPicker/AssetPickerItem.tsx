import { AssetDto } from '../../../services/types';
import { formatBytes } from '../../../utils/formatBytes';
import { AssetPreview } from './AssetPreview';

interface Props {
  asset: AssetDto;
  onClick: () => void;
}

export const AssetPickerItem = ({ asset, onClick }: Props) => {
  return (
    <div className="relative">
      <div className="flex gap-2 hover:bg-foreground-100 rounded-large p-1.5">
        <div className="shrink-0">
          <AssetPreview asset={asset} width={44} height={44} />
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
            {asset.statusLabel && <>, {asset.statusLabel}</>}
          </div>
        </div>
      </div>
    </div>
  );
};
