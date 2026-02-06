import { Chip, cn } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AssetFileDto } from '../../../services/types';
import { formatBytes } from '../../../utils/formatBytes';

interface Props {
  asset: AssetFileDto;
}

export const ChatMessagesItemAssetPreview = ({ asset }: Props) => {
  const router = useRouter();

  const imageUrl = asset.fileType.startsWith('image') ? asset.url : asset.metadata.thumbnailUrl;

  return (
    <div className="relative flex h-60 w-fit min-w-56 items-center justify-center overflow-hidden rounded-medium border border-foreground-300">
      <Link
        href={`/project/${router.query.id}/assets/${asset.id}`}
        aria-label="Open in review tool"
        className="absolute inset-0 rounded-medium opacity-0 transition-[background,opacity] hover:bg-background/20 hover:opacity-100"
      />
      <img src={imageUrl} className="h-auto max-h-full" />
      <Chip
        size="sm"
        variant="dot"
        style={{ color: asset.statusColor }}
        color="default"
        classNames={{ dot: cn({ 'bg-current': asset.statusColor }), content: 'text-foreground' }}
        className="pointer-events-none absolute bottom-2 left-2 border-1 bg-default-100"
      >
        {asset.statusLabel ?? 'No status'}
      </Chip>
      <Chip size="sm" variant="faded" className="pointer-events-none absolute bottom-2 right-2 border-1">
        <span className="font-medium text-foreground-700">{formatBytes(asset.fileSize)}</span>
      </Chip>
      <div className="pointer-events-none absolute left-2 right-2 top-2 flex items-center gap-1 overflow-hidden">
        <Chip
          size="sm"
          variant="faded"
          className="min-w-[auto] overflow-hidden border-1"
          classNames={{ content: 'max-w-full overflow-hidden text-ellipsis' }}
        >
          {asset.name}
        </Chip>
        {asset.stackVersion && (
          <Chip size="sm" className="border-1" variant="faded">
            v{asset.stackVersion}
          </Chip>
        )}
      </div>
    </div>
  );
};
