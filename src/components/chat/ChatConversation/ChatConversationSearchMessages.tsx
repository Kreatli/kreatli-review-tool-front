import React, { useEffect } from 'react';
import { ChatMessagesEmptyState } from '../ChatMessages/ChatMessagesEmptyState';
import { ChatMessagesList } from '../ChatMessages/ChatMessagesList';
import { ChatMessagesLoader } from '../ChatMessages/ChatMessagesLoader';
import { ChatMessageDto } from '../../../services/types';
import { getConversationIdMessages } from '../../../services/services';
import { ChatConversationCloud } from '../ChatMessages/ChatConversationCloud';
import { EmptyState } from '../../various/EmptyState';

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
    <div className="px-2 pb-2 overflow-hidden h-full">
      <div className="bg-background rounded-medium h-full flex flex-col">
        {isLoading ? (
          <div className="p-2">
            <ChatMessagesLoader />
          </div>
        ) : messages.length === 0 ? (
          <EmptyState title={`No messages found with "${search}"`} />
        ) : (
          <>
            <ChatConversationCloud className="sticky top-0 text-small mt-2 mx-auto">
              {messagesCount} message{messagesCount > 1 ? 's' : ''} found with "{search}"
            </ChatConversationCloud>
            <div className="overflow-auto h-full p-2">
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
