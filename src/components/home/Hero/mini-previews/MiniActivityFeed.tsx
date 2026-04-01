import { Avatar } from '@heroui/react';

import { Icon, IconType } from '../../../various/Icon';

const entries: Array<{ icon: IconType; user: string; avatar: string; action: string; time: string }> = [
  {
    icon: 'upload',
    user: 'Peter R.',
    avatar: 'https://i.pravatar.cc/150?u=act-peter',
    action: 'uploaded hero_v3.mp4',
    time: '2m ago',
  },
  {
    icon: 'chat',
    user: 'Kate L.',
    avatar: 'https://i.pravatar.cc/150?u=act-kate',
    action: 'commented on interview clip',
    time: '8m ago',
  },
  {
    icon: 'check',
    user: 'Martin D.',
    avatar: 'https://i.pravatar.cc/150?u=act-martin',
    action: 'approved social cutdowns',
    time: '15m ago',
  },
];

export const MiniActivityFeed = () => {
  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <Icon icon="time" size={14} className="text-foreground-500" />
        <span className="text-xs font-semibold">Activity Feed</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-1.5">
        {entries.map((e, i) => (
          <div key={i} className="flex items-start gap-1.5 rounded bg-foreground-50 p-1.5 dark:bg-foreground-100/30">
            <Avatar size="sm" src={e.avatar} className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] leading-tight">
                <span className="font-semibold">{e.user}</span>{' '}
                <span className="text-foreground-500">{e.action}</span>
              </p>
              <span className="text-[8px] text-foreground-400">{e.time}</span>
            </div>
            <Icon icon={e.icon} size={10} className="mt-0.5 flex-shrink-0 text-foreground-400" />
          </div>
        ))}
      </div>
    </div>
  );
};
