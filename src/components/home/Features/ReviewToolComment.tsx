import { Avatar } from '@heroui/react';

import { Icon } from '../../various/Icon';

interface Props {
  user?: string;
  userName: string;
  comment: string;
  timestamp: string;
  hasDrawings?: boolean;
  date: string;
}

export const ReviewToolComment = ({ user, userName, comment, timestamp, hasDrawings, date }: Props) => {
  return (
    <div className="flex flex-col gap-2 border-foreground-200 pb-2 [&:not(:last-child)]:border-b">
      <div className="flex justify-between gap-2">
        <div className="flex items-center gap-2">
          <Avatar
            src={user ? `https://i.pravatar.cc/150?u=${user}` : undefined}
            fallback="G"
            isBordered
            className="size-4"
          />
          <div className="text-sm font-semibold">{userName}</div>
        </div>
        <div className="text-xs text-foreground-500">{date}</div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-sm">
          {hasDrawings && <Icon icon="paint" className="inline text-primary" size={16} />}
          <span className="font-semibold text-foreground-500"> {timestamp} </span>
          {comment}
        </div>
      </div>
    </div>
  );
};
