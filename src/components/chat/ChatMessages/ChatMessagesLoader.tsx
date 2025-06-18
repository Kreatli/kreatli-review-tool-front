import { cn, Skeleton } from '@heroui/react';

interface Props {
  isSender: boolean;
}

const ChatMessageLoaderItem = ({ isSender }: Props) => {
  return (
    <div className={cn('flex gap-2', { 'flex-row-reverse': isSender })}>
      <Skeleton className="size-8 rounded-full" />
      <div className={cn('flex flex-col gap-1 pt-2', { 'items-end': isSender })}>
        <Skeleton className="h-4 w-20 rounded-small" />
        <Skeleton className="h-8 w-32 rounded-small" />
      </div>
    </div>
  );
};

export const ChatMessagesLoader = () => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 10 }).map((_, idx) => (
        <ChatMessageLoaderItem key={idx} isSender={idx % 2 === 0} />
      ))}
    </div>
  );
};
