import { Avatar, cn } from '@heroui/react';
import { useSession } from '../../../hooks/useSession';
import { ChatMessageDto } from '../../../services/types';
import { formatChatMessageDate } from '../../../utils/dates';
import { ChatMessagesItemPointer } from './ChatMessagesItemPointer';
import { Icon } from '../../various/Icon';
import { ChatMessagesItemAssetPreview } from './ChatMessagesItemAssetPreview';

interface Props {
  message: ChatMessageDto;
  shouldShowSenderName?: boolean;
}

export const ChatMessagesItem = ({ message, shouldShowSenderName = true }: Props) => {
  const { user } = useSession();

  const isSender = message.sender.id === user?.id;

  return (
    <div className={cn('group flex gap-2 max-w-[80%] w-full', { 'flex-row-reverse ml-auto': isSender })}>
      {shouldShowSenderName ? (
        <Avatar
          size="sm"
          src={message.sender.avatar?.url}
          className="shrink-0"
          fallback={<span className="text-lg text-foreground-500 select-none">{message.sender.name.charAt(0)}</span>}
        />
      ) : (
        <div className="shrink-0 size-8" />
      )}
      <div className={cn('flex flex-col gap-1', { 'pt-0.5': shouldShowSenderName })}>
        {shouldShowSenderName && (
          <div className={cn('text-small', { 'text-end': isSender })}>{message.sender.name}</div>
        )}
        <div className="flex flex-col gap-0.5">
          {message.content && (
            <div
              key={message.id}
              className={cn(
                'relative whitespace-pre-wrap items-end bg-foreground-200 text-small p-2 rounded-medium w-fit max-w-[550px]',
                {
                  'ml-auto bg-primary text-white': isSender,
                },
              )}
            >
              {message.content}
              <span
                className={cn('text-xs text-foreground-500 whitespace-nowrap mt-1 ml-1.5 float-right', {
                  'text-neutral-200': isSender,
                })}
              >
                {formatChatMessageDate(message.createdAt)}
              </span>
              {shouldShowSenderName && (
                <ChatMessagesItemPointer
                  className={cn('absolute top-0 text-foreground-200', {
                    '-right-1.5 -scale-x-100 text-primary': isSender,
                    '-left-1.5': !isSender,
                  })}
                />
              )}
              <button
                type="button"
                disabled
                className={cn(
                  'absolute opacity-0 transition-opacity focus-visible:opacity-100 text-xs text-foreground-400 bottom-1 flex items-center gap-0.5',
                  {
                    '-left-2 -translate-x-full': isSender,
                    '-right-2 translate-x-full': !isSender,
                  },
                )}
              >
                <Icon icon="reply" size={16} />
                Reply
              </button>
            </div>
          )}
          {message.assets.length > 0 && (
            <div className={cn('flex gap-0.5 flex-col', { 'items-end': isSender })}>
              {message.assets.map((asset) => (
                <ChatMessagesItemAssetPreview key={asset.id} asset={asset} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
