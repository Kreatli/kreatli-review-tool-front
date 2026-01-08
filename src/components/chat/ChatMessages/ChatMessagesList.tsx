import { Spinner } from '@heroui/react';
import React, { useCallback, useRef } from 'react';

import { ChatMessageDto } from '../../../services/types';
import { formatChatMessagesGroupDate } from '../../../utils/dates';
import { ChatConversationCloud } from './ChatConversationCloud';
import { ChatMessagesGroup } from './ChatMessagesGroup';

interface Props {
  messages: ChatMessageDto[];
  messagesCount: number;
  loaderPlacement?: 'top' | 'bottom';
  shouldGroupMessages?: boolean;
  onLoadMore: () => void;
}

export const ChatMessagesList = ({
  messages,
  messagesCount,
  loaderPlacement = 'top',
  shouldGroupMessages,
  onLoadMore,
}: Props) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const spinnerRef = useCallback(
    (node: HTMLDivElement) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (node && messagesCount > messages.length) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
              onLoadMore();
            }
          },
          {
            threshold: 0.1,
          },
        );

        observerRef.current.observe(node);
      }
    },
    [messages.length, messagesCount, onLoadMore],
  );

  const groupedMessagesByDate = React.useMemo(() => {
    return [...messages].reverse().reduce<Record<string, ChatMessageDto[]>>((acc, message) => {
      const dateString = formatChatMessagesGroupDate(message.createdAt);

      if (acc[dateString]) {
        return {
          ...acc,
          [dateString]: [...acc[dateString], message],
        };
      }

      return {
        ...acc,
        [dateString]: [message],
      };
    }, {});
  }, [messages]);

  const groups = React.useMemo(() => {
    return Object.entries(groupedMessagesByDate).reduce<Record<string, ChatMessageDto[][]>>(
      (acc, [dateString, messages]) => ({
        ...acc,
        [dateString]: messages.reduce<ChatMessageDto[][]>(
          (acc, message, idx, list) => {
            acc[acc.length - 1].push(message);

            const differenceBetweenMessages = Math.abs(
              list.length - 1 === idx
                ? 0
                : new Date(message.createdAt).getTime() - new Date(list[idx + 1].createdAt).getTime(),
            );

            if (
              list.length - 1 !== idx &&
              (message.sender.id !== list[idx + 1].sender.id || differenceBetweenMessages > 15 * 60 * 1000)
            ) {
              acc[acc.length - 1].reverse();
              acc.push([]);
            }

            if (list.length - 1 === idx) {
              acc[acc.length - 1].reverse();
            }

            return acc;
          },
          [[]],
        ),
      }),
      {},
    );
  }, [groupedMessagesByDate]);

  return (
    <div className="flex flex-col gap-2">
      {loaderPlacement === 'top' && messagesCount > messages.length && (
        <div ref={spinnerRef} key="spinner" className="text-center">
          <Spinner size="sm" />
        </div>
      )}
      <div className="flex flex-col gap-2">
        {Object.entries(groups).map(([dateString, groups]) => (
          <div key={dateString} className="flex flex-col gap-2">
            <ChatConversationCloud className="sticky top-0 mx-auto">{dateString}</ChatConversationCloud>
            <div className="flex flex-col gap-2">
              {groups.map((group) => (
                <ChatMessagesGroup
                  key={group[0].id}
                  messages={[...group].reverse()}
                  shouldGroupMessages={shouldGroupMessages}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {loaderPlacement === 'bottom' && messagesCount > messages.length && (
        <div ref={spinnerRef} key="spinner" className="text-center">
          <Spinner size="sm" />
        </div>
      )}
    </div>
  );
};
