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
    <div className={cn('group flex w-full max-w-[80%] gap-2', { 'ml-auto flex-row-reverse': isSender })}>
      {shouldShowSenderName ? (
        <Avatar
          size="sm"
          src={message.sender.avatar?.url}
          className="shrink-0"
          fallback={<span className="select-none text-lg text-foreground-500">{message.sender.name.charAt(0)}</span>}
        />
      ) : (
        <div className="size-8 shrink-0" />
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
                'relative w-fit max-w-[550px] items-end whitespace-pre-wrap rounded-medium bg-foreground-200 p-2 text-small',
                {
                  'ml-auto bg-primary text-white': isSender,
                },
              )}
            >
              {message.content}
              <span
                className={cn('float-right ml-1.5 mt-1 whitespace-nowrap text-xs text-foreground-500', {
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
                  'absolute bottom-1 flex items-center gap-0.5 text-xs text-foreground-400 opacity-0 transition-opacity focus-visible:opacity-100',
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
            <div className={cn('flex flex-col gap-0.5', { 'items-end': isSender })}>
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
