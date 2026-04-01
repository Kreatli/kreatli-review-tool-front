import { Chip } from '@heroui/react';

import { Icon } from '../../../various/Icon';

export const MiniSafeZoneChecker = () => {
  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <Icon icon="monitorPlay" size={14} className="text-foreground-500" />
        <span className="text-xs font-semibold">Safe-Zone Checker</span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-2 content-center gap-2">
        {/* Phone mockup */}
        <div className="flex flex-col items-center gap-1">
          <div className="relative flex aspect-[9/16] w-full max-w-[60px] items-center justify-center overflow-hidden rounded-lg border-2 border-foreground-300 bg-foreground-100">
            <div className="absolute inset-0 bg-gradient-to-b from-foreground-200/40 via-transparent to-foreground-200/40" />
            <div className="absolute inset-x-1 inset-y-2 border border-dashed border-success-500/60" />
            <Icon icon="play" size={12} className="relative z-10 text-foreground-400" />
          </div>
          <Chip size="sm" variant="flat" className="h-4 text-[8px]">
            9:16
          </Chip>
        </div>
        {/* Desktop mockup */}
        <div className="flex flex-col items-center gap-1">
          <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded border-2 border-foreground-300 bg-foreground-100">
            <div className="absolute inset-0 bg-gradient-to-r from-foreground-200/40 via-transparent to-foreground-200/40" />
            <div className="absolute inset-x-2 inset-y-1 border border-dashed border-primary-500/60" />
            <Icon icon="play" size={12} className="relative z-10 text-foreground-400" />
          </div>
          <Chip size="sm" variant="flat" className="h-4 text-[8px]">
            16:9
          </Chip>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1 text-[9px] text-success-600">
        <Icon icon="check" size={10} />
        <span>All safe zones clear</span>
      </div>
    </div>
  );
};
