import { Skeleton } from '@heroui/react';
import { useChatContext } from '../../contexts/Chat';
import { useGetProjectIdChats } from '../../services/hooks';
import { ChatConversation } from './ChatConversation';
import { ChatConversations } from './ChatConversations';

export const Chat = () => {
  const { selectedConversation, project } = useChatContext();

  const { data: chats = [], isPending, isError } = useGetProjectIdChats(project.id);

  return (
    <div className="grid grid-cols-[300px_1fr] grid-rows-1 gap-4 flex-1 max-h-[max(300px,calc(100vh-255px))] min-h-[max(300px,calc(100vh-255px))] overflow-hidden">
      <ChatConversations chats={chats} isPending={isPending} isError={isError} />
      {selectedConversation && <ChatConversation chat={selectedConversation} />}
      {isPending && <Skeleton className="h-full w-full rounded-medium" />}
    </div>
  );
};
