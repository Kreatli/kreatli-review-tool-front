import { Chip, Image } from '@heroui/react';
import { AssetDto } from '../../../services/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { STATUS_COLOR, STATUS_LABEL } from '../../../utils/status';
import { formatBytes } from '../../../utils/formatBytes';
import { Icon } from '../../various/Icon';

interface Props {
  asset: AssetDto;
}

export const ChatMessagesItemAssetPreview = ({ asset }: Props) => {
  const router = useRouter();

  const imageUrl = asset.fileType.startsWith('image') ? asset.url : asset.metadata.thumbnailUrl;

  return (
    <div className="w-fit h-60 relative border border-foreground-300 overflow-hidden min-w-56 rounded-medium flex items-center justify-center">
      <Link
        href={`/project/${router.query.id}/assets/${asset.id}`}
        aria-label="Open in review tool"
        className="absolute inset-0 transition-[background,opacity] rounded-medium opacity-0 hover:opacity-100 hover:bg-background/20"
        target="_blank"
      >
        {/* <div className="w-full h-full flex items-center justify-center text-sm text-foreground">
          Open in review tool
        </div> */}
      </Link>
      <img src={imageUrl} className="h-auto max-h-full" />
      <Chip
        size="sm"
        variant="dot"
        color={STATUS_COLOR[asset.status ?? 'none']}
        className="bg-default-100 pointer-events-none border-1 absolute bottom-2 left-2"
      >
        {STATUS_LABEL[asset.status ?? 'none']}
      </Chip>
      <Chip size="sm" variant="faded" className="absolute border-1 bottom-2 right-2 pointer-events-none">
        <span className="font-medium text-foreground-700">{formatBytes(asset.fileSize)}</span>
      </Chip>
      <Chip
        size="sm"
        variant="faded"
        className="absolute top-2 left-2 right-2 border-1 min-w-[auto] pointer-events-none"
        classNames={{ content: 'max-w-full overflow-hidden text-ellipsis' }}
      >
        {asset.name}
      </Chip>
    </div>
  );
};
