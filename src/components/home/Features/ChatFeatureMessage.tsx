import { Avatar, Chip, cn, Image } from '@heroui/react';

interface Props {
  message: string;
  user?: string;
  userName: string;
  date: string;
  asset?: string;
}

export const ChatFeatureMessage = ({ message, user, userName, date, asset }: Props) => {
  const isGuest = userName === 'Guest';

  return (
    <div className="flex flex-col gap-2">
      <div className={cn('flex items-start gap-2', isGuest && 'flex-row-reverse')}>
        <div>
          <Avatar
            size="sm"
            src={user ? `https://i.pravatar.cc/150?u=${user}` : undefined}
            fallback={userName.charAt(0)}
          />
        </div>
        <div className={cn('flex flex-col gap-1', isGuest && 'items-end')}>
          <div className={`text-sm ${isGuest ? 'text-right' : ''}`}>
            {userName}
            {!isGuest && <span className="text-xs text-foreground-500"> {date}</span>}
          </div>
          <div className="bg-foreground-100 max-w-[max(80%,400px)] rounded-medium text-sm sm:text-medium p-2">
            {message}
          </div>
        </div>
      </div>
      {asset && (
        <div className="pl-10">
          <div className="relative">
            <Image src="https://picsum.photos/600/400" width={350} />
            <Chip className="absolute top-2 left-2 z-10" size="sm" variant="faded">
              {asset}
            </Chip>
            <Chip className="absolute bottom-2 left-2 z-10 bg-foreground-100" size="sm" variant="dot" color="warning">
              Review needed
            </Chip>
          </div>
        </div>
      )}
    </div>
  );
};
