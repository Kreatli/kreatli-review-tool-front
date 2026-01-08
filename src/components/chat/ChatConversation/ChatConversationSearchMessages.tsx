import React, { useEffect } from 'react';

import { getConversationIdMessages } from '../../../services/services';
import { ChatMessageDto } from '../../../services/types';
import { EmptyState } from '../../various/EmptyState';
import { ChatConversationCloud } from '../ChatMessages/ChatConversationCloud';
import { ChatMessagesList } from '../ChatMessages/ChatMessagesList';
import { ChatMessagesLoader } from '../ChatMessages/ChatMessagesLoader';

interface Props {
  search: string;
  conversationId: string;
}

export const ChatConversationSearchMessages = ({ search, conversationId }: Props) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [offset, setOffset] = React.useState(0);
  const [messages, setMessages] = React.useState<ChatMessageDto[]>([]);
  const [messagesCount, setMessagesCount] = React.useState(0);
  const isFetching = React.useRef(false);

  useEffect(() => {
    const loadFirstMessages = async () => {
      setIsLoading(true);
      isFetching.current = true;

      const data = await getConversationIdMessages(conversationId, { limit: 50, offset: 0, search });
      setMessagesCount(data.messagesCount);
      setMessages([...data.messages].reverse());
      setIsLoading(false);
      isFetching.current = false;
    };

    loadFirstMessages();
  }, [conversationId, search]);

  const loadMessages = async (offset: number) => {
    isFetching.current = true;
    const data = await getConversationIdMessages(conversationId, { limit: 50, offset, search });

    setMessagesCount(data.messagesCount);
    setMessages((prev) => [...[...data.messages].reverse(), ...prev]);
    isFetching.current = false;
  };

  const handleLoadMore = () => {
    if (isFetching.current) return;

    setOffset(offset + 50);
    loadMessages(offset + 50);
  };

  return (
    <div className="h-full overflow-hidden px-2 pb-2">
      <div className="flex h-full flex-col rounded-medium bg-background">
        {isLoading ? (
          <div className="p-2">
            <ChatMessagesLoader />
          </div>
        ) : messages.length === 0 ? (
          <EmptyState title={`No messages found with "${search}"`} />
        ) : (
          <>
            <ChatConversationCloud className="sticky top-0 mx-auto mt-2 text-small">
              {messagesCount} message{messagesCount > 1 ? 's' : ''} found with "{search}"
            </ChatConversationCloud>
            <div className="h-full overflow-auto p-2">
              <ChatMessagesList
                messages={messages}
                messagesCount={messagesCount}
                shouldGroupMessages={false}
                loaderPlacement="bottom"
                onLoadMore={handleLoadMore}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
