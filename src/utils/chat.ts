import { ChatDto, UserDto } from '../services/types';

export const getPrivateConversationMember = (chat: ChatDto, user: UserDto | undefined) => {
  return chat.members.find((member) => member.id !== user?.id);
};
