import { Avatar } from '@heroui/react';

import { Icon } from '../../../various/Icon';

const messages = [
  {
    user: 'https://i.pravatar.cc/150?u=mini-chat-peter',
    name: 'Peter R.',
    text: 'Just uploaded the latest cut. Thoughts?',
    time: '10:24 AM',
  },
  {
    user: 'https://i.pravatar.cc/150?u=mini-chat-martin',
    name: 'Martin D.',
    text: 'Watching now 👀',
    time: '10:25 AM',
  },
];

export const MiniChat = () => {
  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <Icon icon="chat" size={14} className="text-foreground-500" />
        <span className="text-xs font-semibold">Project Chat</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-2 rounded-lg bg-foreground-50 p-2 dark:bg-foreground-100/30">
        <div className="min-h-0 flex-1 space-y-2">
          {messages.map((msg) => (
            <div key={msg.time} className="flex items-start gap-1.5">
              <Avatar size="sm" src={msg.user} className="h-4 w-4 flex-shrink-0" />
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-semibold">{msg.name}</span>
                  <span className="text-[9px] text-foreground-400">{msg.time}</span>
                </div>
                <p className="text-[10px] leading-tight text-foreground-600">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-1 rounded border border-foreground-200 bg-content1 px-2 py-1">
          <span className="flex-1 text-[9px] text-foreground-400">Type a message...</span>
          <Icon icon="send" size={10} className="text-foreground-400" />
        </div>
      </div>
    </div>
  );
};
