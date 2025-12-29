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
    <div className="flex size-8 items-center justify-center rounded-full border border-foreground-200 bg-foreground-100 text-foreground-500">
      {chat.type === 'private' ? (
        <div className="select-none text-lg text-foreground-500">
          {conversationMember?.name.slice(0, 1).toUpperCase()}
        </div>
      ) : (
        <Icon icon={chat.type === 'project' ? 'slides' : 'chat'} size={16} />
      )}
    </div>
  );
};
