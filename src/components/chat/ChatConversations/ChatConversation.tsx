import { ChatDto } from '../../../services/types';
import { ChatAvatar } from '../ChatAvatar';
import { useSession } from '../../../hooks/useSession';

interface ChatConversationProps {
  chat: ChatDto;
}

export const ChatConversation = ({ chat }: ChatConversationProps) => {
  const { user } = useSession();

  const conversationMember =
    chat.type === 'private' ? chat.members.find((member) => member.id !== user?.id) : undefined;

  return (
    <div className="relative flex items-center gap-2">
      <div className="shrink-0">
        <ChatAvatar chat={chat} />
      </div>
      <div className="overflow-hidden text-start">
        <div className="overflow-hidden text-ellipsis font-semibold">{chat.name || conversationMember?.name}</div>
        <div className="overflow-hidden text-ellipsis text-foreground-500">
          {chat.lastMessage ? chat.lastMessage.content || chat.lastMessage.assets[0]?.name : 'No messages'}
        </div>
      </div>
      {user && chat.lastMessage && !chat.lastMessage.readBy.includes(user.id) && (
        <div className="absolute -right-2.5 top-0 size-2 rounded-full bg-primary" />
      )}
    </div>
  );
};
