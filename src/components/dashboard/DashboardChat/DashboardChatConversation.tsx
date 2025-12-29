import { Chip } from '@heroui/react';
import { useSession } from '../../../hooks/useSession';
import { ChatDto } from '../../../services/types';
import { formatChatMessageDate, formatFullDate, formatRelativeTime } from '../../../utils/dates';
import { ChatAvatar } from '../../chat/ChatAvatar';
import Link from 'next/link';

interface Props {
  projectId: string;
  conversation: ChatDto;
}

export const DashboardChatConversation = ({ projectId, conversation }: Props) => {
  const { user } = useSession();

  const conversationMember =
    conversation.type === 'private' ? conversation.members.find((member) => member.id !== user?.id) : undefined;
  const conversationName = conversation.name || conversationMember?.name;

  const isReadByUser = !conversation.lastMessage || conversation.lastMessage?.readBy.includes(user?.id ?? '');

  return (
    <div className="relative flex items-end justify-between gap-3 rounded-md border border-foreground-200 p-3 transition-colors hover:border-foreground-400">
      <div className="flex items-start gap-2">
        <div>
          <ChatAvatar chat={conversation} />
        </div>
        <div>
          <div className="flex gap-1">
            <Link
              href={`/project/${projectId}/chat?conversationId=${conversation.id}`}
              className="text-medium font-medium after:absolute after:inset-0"
            >
              {conversationName}
            </Link>
            {!isReadByUser && (
              <Chip variant="dot" size="sm" className="pointer-events-none border-none" color="primary">
                You have unread messages
              </Chip>
            )}
          </div>
          <div className="line-clamp-3 text-xs text-foreground-500">
            {conversation.type === 'project' && conversation.lastMessage && (
              <span>{conversation.lastMessage.sender.name}: </span>
            )}
            {conversation.lastMessage
              ? conversation.lastMessage.content || conversation.lastMessage.assets[0]?.name
              : 'No messages'}
          </div>
        </div>
      </div>
      {conversation.lastMessage?.createdAt && (
        <div className="whitespace-nowrap text-sm text-foreground-500">
          {formatRelativeTime(conversation.lastMessage?.createdAt)}
        </div>
      )}
    </div>
  );
};
