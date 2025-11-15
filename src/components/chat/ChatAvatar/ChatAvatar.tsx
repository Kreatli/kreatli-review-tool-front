import { Image } from '@heroui/react';
import { ChatDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { useSession } from '../../../hooks/useSession';

interface ChatAvatarProps {
  chat: ChatDto;
}

export const ChatAvatar = ({ chat }: ChatAvatarProps) => {
  const { user } = useSession();

  const conversationMember =
    chat.type === 'private' ? chat.members.find((member) => member.id !== user?.id) : undefined;
  const avatarUrl = conversationMember?.avatar?.url ?? chat.cover?.url;

  if (avatarUrl) {
    return <Image src={avatarUrl} width={32} height={32} radius="full" className="object-cover" />;
  }

  return (
    <div className="size-8 bg-foreground-100 border border-foreground-200 text-foreground-500 rounded-full flex items-center justify-center">
      {chat.type === 'private' ? (
        <div className="text-lg text-foreground-500 select-none">
          {conversationMember?.name.slice(0, 1).toUpperCase()}
        </div>
      ) : (
        <Icon icon={chat.type === 'project' ? 'slides' : 'chat'} size={16} />
      )}
    </div>
  );
};
