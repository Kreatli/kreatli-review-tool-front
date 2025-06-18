import { ChatMessagesEmptyState } from './ChatMessagesEmptyState';
import React, { useEffect, useLayoutEffect } from 'react';
import { ChatMessagesLoader } from './ChatMessagesLoader';
import { ChatMessagesList } from './ChatMessagesList';
import { getConversationIdMessages, getProjectIdChats } from '../../../services/services';
import { ChatMessageDto } from '../../../services/types';
import { useChatContext } from '../../../contexts/Chat';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  conversationId: string;
}

export const ChatMessages = ({ conversationId }: Props) => {
  const queryClient = useQueryClient();
  const ref = React.useRef<HTMLDivElement>(null);
  const isFetching = React.useRef(false);
  const previousScrollHeight = React.useRef(0);
  const shouldScrollToBottom = React.useRef(false);
  const { webSocketRef, project } = useChatContext();

  const [offset, setOffset] = React.useState(0);
  const [messages, setMessages] = React.useState<ChatMessageDto[]>([]);
  const [messagesCount, setMessagesCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  useLayoutEffect(() => {
    if (!ref.current || messages.length === 0) {
      return;
    }

    if (previousScrollHeight.current === 0) {
      ref.current.scrollTop = ref.current.scrollHeight;
      previousScrollHeight.current = ref.current.scrollHeight;

      return;
    }

    if (shouldScrollToBottom.current) {
      ref.current.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' });
      shouldScrollToBottom.current = false;

      return;
    }

    ref.current.scrollTo({ top: ref.current.scrollHeight - previousScrollHeight.current });

    previousScrollHeight.current = ref.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const loadFirstMessages = async () => {
      setIsLoading(true);
      isFetching.current = true;

      const data = await getConversationIdMessages(conversationId, { limit: 50, offset: 0, search: '' });
      setMessagesCount(data.messagesCount);
      setMessages((prev) => [...prev, ...data.messages]);
      setIsLoading(false);
      isFetching.current = false;
    };

    if (!messages.length) {
      loadFirstMessages();
    }
  }, [conversationId, messages.length]);

  useEffect(() => {
    webSocketRef.current?.emit('join', conversationId);

    return () => {
      webSocketRef.current?.emit('leave', conversationId);
    };
  }, [conversationId, webSocketRef]);

  useEffect(() => {
    webSocketRef.current?.on('message', (message: ChatMessageDto) => {
      setMessages((prev) => [message, ...prev]);
      shouldScrollToBottom.current = true;
      queryClient.invalidateQueries({ queryKey: [getProjectIdChats.key, project.id] });
    });

    return () => {
      webSocketRef.current?.off('message');
    };
  }, []);

  const loadMessages = async (offset: number) => {
    isFetching.current = true;
    const data = await getConversationIdMessages(conversationId, { limit: 50, offset, search: '' });

    setMessagesCount(data.messagesCount);
    setMessages((prev) => [...prev, ...data.messages]);
    isFetching.current = false;
  };

  const handleLoadMore = () => {
    if (isFetching.current) return;

    setOffset(offset + 50);
    loadMessages(offset + 50);
  };

  return (
    <div className="px-2 h-full overflow-hidden">
      <div
        ref={ref}
        className="bg-background px-2 py-4 overflow-auto overscroll-none no-scrollbar rounded-medium h-full"
      >
        {isLoading ? (
          <ChatMessagesLoader />
        ) : messages.length === 0 ? (
          <ChatMessagesEmptyState />
        ) : (
          <ChatMessagesList messages={messages} messagesCount={messagesCount} onLoadMore={handleLoadMore} />
        )}
      </div>
    </div>
  );
};
