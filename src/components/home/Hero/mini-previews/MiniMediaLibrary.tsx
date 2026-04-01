import { Chip, ChipProps } from '@heroui/react';

import { Icon } from '../../../various/Icon';

const items: Array<{ src: string; status: string; color: ChipProps['color'] }> = [
  { src: 'https://picsum.photos/200/120?random=mini1', status: 'Approved', color: 'success' },
  { src: 'https://picsum.photos/200/120?random=mini2', status: 'Changes required', color: 'danger' },
  { src: 'https://picsum.photos/200/120?random=mini3', status: 'No status', color: 'default' },
];

export const MiniMediaLibrary = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon icon="images" size={14} className="text-foreground-500" />
          <span className="text-xs font-semibold">Media Library</span>
        </div>
        <span className="text-[10px] text-foreground-400">3 files</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {items.map((item, i) => (
          <div key={i} className="relative overflow-hidden rounded border border-foreground-200">
            <img
              src={item.src}
              alt={`Media asset ${i + 1}`}
              className="aspect-video w-full object-cover"
            />
            <div className="absolute bottom-0.5 left-0.5">
              <Chip size="sm" variant="dot" color={item.color} className="h-4 bg-content1/90 text-[8px]">
                {item.status}
              </Chip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
