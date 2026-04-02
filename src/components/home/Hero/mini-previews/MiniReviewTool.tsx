import { Avatar } from '@heroui/react';

import { Icon } from '../../../various/Icon';

const comments = [
  { user: 'https://i.pravatar.cc/150?u=mini-rev-kate', name: 'Kate L.', text: 'Display QR code here', ts: '00:07' },
  { user: 'https://i.pravatar.cc/150?u=mini-rev-peter', name: 'Peter R.', text: 'Blur this section', ts: '00:14' },
];

export const MiniReviewTool = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <Icon icon="paint" size={14} className="text-foreground-500" />
        <span className="text-xs font-semibold">Review & Annotations</span>
      </div>
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <div className="relative overflow-hidden rounded border border-foreground-200 bg-foreground-100">
          <img
            src="https://picsum.photos/400/240?random=review"
            alt="Video frame under review"
            className="aspect-video w-full object-cover"
          />
          {/* Comment pin markers */}
          <div className="absolute left-[30%] top-[40%] flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-white shadow">
            1
          </div>
          <div className="absolute left-[65%] top-[55%] flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[8px] font-bold text-white shadow">
            2
          </div>
          <div className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] text-white">
            00:14 / 01:30
          </div>
        </div>
        <div className="flex w-24 flex-col gap-1.5">
          <span className="text-[9px] font-semibold text-foreground-500">Comments</span>
          {comments.map((c) => (
            <div key={c.ts} className="flex items-start gap-1">
              <Avatar size="sm" src={c.user} className="mt-0.5 h-3 w-3 flex-shrink-0" />
              <div>
                <span className="text-[8px] font-semibold">{c.name}</span>
                <p className="text-[8px] leading-tight text-foreground-500">{c.text}</p>
                <span className="text-[7px] text-foreground-400">{c.ts}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
