import { Input } from '@heroui/react';
import React from 'react';

import { useChatContext } from '../../../contexts/Chat';
import { ChatDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { ChatAvatar } from '../ChatAvatar';
import { ChatConversationMembers } from './ChatConversationMembers';
import { ChatConversationName } from './ChatConversationName';
import { ChatConversationOptions } from './ChatConversationOptions';

interface Props {
  search: string;
  chat: ChatDto;
  isDisabled?: boolean;
  onSearchChange: (search: string) => void;
}

export const ChatConversationHeader = ({ isDisabled = false, chat, search, onSearchChange }: Props) => {
  const { isUserProjectOwner } = useChatContext();

  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  const isSearchActive = isSearchFocused || search.length > 0;

  return (
    <div className="flex items-center justify-between gap-2 border-b border-foreground-200 p-3 xs:pr-6">
      <div className="flex items-center gap-2">
        <ChatAvatar chat={chat} />
        <ChatConversationName chat={chat} />
        {chat.type === 'project' && isUserProjectOwner && (
          <ChatConversationOptions isDisabled={isDisabled} chat={chat} />
        )}
      </div>
      <div className="flex items-center gap-2">
        <label className="hidden md:block">
          <Input
            value={search}
            placeholder="Search"
            startContent={<Icon icon="search" size={20} />}
            size="sm"
            style={{ width: isSearchActive ? '200px' : '0px', transition: 'width 0.2s ease-in-out' }}
            variant="underlined"
            onClear={isSearchActive ? () => onSearchChange('') : undefined}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </label>
        {chat.type === 'project' && <ChatConversationMembers chat={chat} />}
      </div>
    </div>
  );
};
