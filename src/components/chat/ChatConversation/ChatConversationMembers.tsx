import { Avatar, AvatarGroup, Tooltip } from '@heroui/react';

import { ChatDto } from '../../../services/types';

interface Props {
  chat: ChatDto;
}

export const ChatConversationMembers = ({ chat }: Props) => {
  return (
    <AvatarGroup max={3} className="ml-4">
      {chat.members
        .filter((member) => member)
        .map((member) => (
          <Tooltip
            key={member.id}
            content={
              <div>
                <div className="font-semibold">{member.name}</div>
                <div>{member.email}</div>
              </div>
            }
            offset={10}
          >
            <Avatar
              src={member.avatar?.url ?? ''}
              size="sm"
              isBordered
              className="data-[hover=true]:-translate-x-0"
              fallback={<div className="select-none text-lg text-foreground-500">{member.name.at(0)}</div>}
            />
          </Tooltip>
        ))}
    </AvatarGroup>
  );
};
