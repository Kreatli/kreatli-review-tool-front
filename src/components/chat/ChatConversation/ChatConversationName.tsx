import { useSession } from '../../../hooks/useSession';
import { ChatDto } from '../../../services/types';
import { getPrivateConversationMember } from '../../../utils/chat';

interface Props {
  chat: ChatDto;
}

export const ChatConversationName = ({ chat }: Props) => {
  const { user } = useSession();

  if (chat.type === 'private') {
    return <div className="text-medium font-semibold">{getPrivateConversationMember(chat, user)?.name}</div>;
  }

  return <div className="text-medium font-semibold">{chat.name}</div>;
};
