import { useMemo } from 'react';

import { useChatContext } from '../../contexts/Chat';
import { useGetProjectIdChats } from '../../services/hooks';
import { ChatConversation } from './ChatConversation';
import { ChatConversations } from './ChatConversations';
import { ChatPaywall } from './ChatPaywall';

export const Chat = () => {
  const { selectedConversationId, project } = useChatContext();

  const { data: chats = [], isPending, isError } = useGetProjectIdChats(project.id);

  const selectedConversation = useMemo(() => {
    return chats.find((chat) => chat.id === selectedConversationId);
  }, [chats, selectedConversationId]);

  const shouldShowPaywall = !project.createdBy?.subscription.isActive;

  return (
    <div className="relative grid max-h-[max(300px,calc(100vh-66px))] min-h-[max(300px,calc(100vh-66px))] flex-1 grid-cols-[auto_1fr] grid-rows-1 overflow-hidden lg:grid-cols-[300px_1fr]">
      <ChatConversations
        chats={chats}
        isDisabled={project.status !== 'active'}
        isPending={isPending}
        isError={isError}
      />
      {selectedConversation && (
        <ChatConversation
          chat={selectedConversation}
          shouldShowPaywall={shouldShowPaywall}
          isDisabled={project.status !== 'active'}
        />
      )}
      {shouldShowPaywall && <ChatPaywall projectOwner={project.createdBy} />}
    </div>
  );
};
