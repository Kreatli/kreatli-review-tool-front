import { Chip } from '@heroui/react';

import { Icon } from '../../../various/Icon';

export const MiniVersioning = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <Icon icon="compare" size={14} className="text-foreground-500" />
        <span className="text-xs font-semibold">Version Compare</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <div className="flex flex-col gap-1">
          <div className="relative overflow-hidden rounded border-2 border-foreground-300 bg-foreground-100">
            <img
              src="https://picsum.photos/300/180?random=v1"
              alt="Version 1 preview"
              className="aspect-video w-full object-cover opacity-80"
            />
            <Chip
              size="sm"
              variant="flat"
              className="absolute left-1 top-1 h-4 bg-content1/90 text-[9px] font-bold"
            >
              v1
            </Chip>
          </div>
          <span className="text-center text-[9px] text-foreground-400">walkthrough_v1.mp4</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="relative overflow-hidden rounded border-2 border-primary bg-foreground-100">
            <img
              src="https://picsum.photos/300/180?random=v2"
              alt="Version 2 preview"
              className="aspect-video w-full object-cover"
            />
            <Chip
              size="sm"
              variant="flat"
              color="primary"
              className="absolute left-1 top-1 h-4 text-[9px] font-bold"
            >
              v2
            </Chip>
          </div>
          <span className="text-center text-[9px] text-foreground-400">walkthrough_v2.mp4</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1 text-[9px] text-success-600">
        <Icon icon="check" size={10} />
        <span>3 changes detected</span>
      </div>
    </div>
  );
};
