import { Avatar, AvatarGroup, Chip } from '@heroui/react';

import { Icon } from '../../../various/Icon';

export const MiniShareLinks = () => {
  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <Icon icon="share" size={14} className="text-foreground-500" />
        <span className="text-xs font-semibold">Share & Review Links</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-2 rounded border border-foreground-200 bg-foreground-50 p-2 dark:bg-foreground-100/30">
        <div className="flex items-center gap-1.5 rounded border border-foreground-200 bg-content1 px-2 py-1">
          <Icon icon="link" size={10} className="flex-shrink-0 text-foreground-400" />
          <span className="flex-1 truncate text-[9px] text-foreground-500">
            kreatli.com/share/a3x9kw...
          </span>
          <Icon icon="copy" size={10} className="flex-shrink-0 text-foreground-400" />
        </div>
        <div className="flex flex-wrap gap-1">
          <Chip size="sm" variant="flat" className="h-4 text-[8px]">
            john@example.com
          </Chip>
          <Chip size="sm" variant="flat" className="h-4 text-[8px]">
            sarah@example.com
          </Chip>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <AvatarGroup size="sm" max={3} className="[&>span]:h-4 [&>span]:w-4">
            <Avatar src="https://i.pravatar.cc/150?u=share-1" />
            <Avatar src="https://i.pravatar.cc/150?u=share-2" />
            <Avatar src="https://i.pravatar.cc/150?u=share-3" />
          </AvatarGroup>
          <span className="text-[9px] text-foreground-400">3 reviewers invited</span>
        </div>
      </div>
    </div>
  );
};
