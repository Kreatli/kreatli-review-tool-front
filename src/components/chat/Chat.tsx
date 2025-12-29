import { Skeleton } from '@heroui/react';
import { useChatContext } from '../../contexts/Chat';
import { useGetProjectIdChats } from '../../services/hooks';
import { ChatConversation } from './ChatConversation';
import { ChatConversations } from './ChatConversations';
import { useMemo } from 'react';

export const Chat = () => {
  const { selectedConversationId, project } = useChatContext();

  const { data: chats = [], isPending, isError } = useGetProjectIdChats(project.id);

  const selectedConversation = useMemo(() => {
    return chats.find((chat) => chat.id === selectedConversationId);
  }, [chats, selectedConversationId]);

  return (
    <div className="grid max-h-[max(300px,calc(100vh-255px))] min-h-[max(300px,calc(100vh-255px))] flex-1 grid-cols-[300px_1fr] grid-rows-1 gap-4 overflow-hidden">
      <ChatConversations
        chats={chats}
        isDisabled={project.status !== 'active'}
        isPending={isPending}
        isError={isError}
      />
      {selectedConversation && (
        <ChatConversation chat={selectedConversation} isDisabled={project.status !== 'active'} />
      )}
      {isPending && <Skeleton className="h-full w-full rounded-medium" />}
    </div>
  );
};
