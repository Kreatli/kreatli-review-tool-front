import React from 'react';

import { ChatDto } from '../../../services/types';
import { ChatMessages } from '../ChatMessages';
import { ChatTextarea } from '../ChatTextarea';
import { ChatConversationHeader } from './ChatConversationHeader';
import { ChatConversationSearchMessages } from './ChatConversationSearchMessages';

interface Props {
  chat: ChatDto;
  shouldShowPaywall?: boolean;
  isDisabled?: boolean;
}

export const ChatConversation = ({ chat, shouldShowPaywall = false, isDisabled = false }: Props) => {
  const [search, setSearch] = React.useState('');

  if (shouldShowPaywall) {
    return (
      <div key={chat.id} className="grid grid-rows-[auto_1fr_auto]">
        <ChatConversationHeader chat={chat} isDisabled={isDisabled} search={search} onSearchChange={setSearch} />
        <div />
        <div />
      </div>
    );
  }

  return (
    <div key={chat.id} className="grid grid-rows-[auto_1fr_auto]">
      <ChatConversationHeader chat={chat} isDisabled={isDisabled} search={search} onSearchChange={setSearch} />
      {!!search ? (
        <ChatConversationSearchMessages search={search} conversationId={chat.id} />
      ) : (
        <>
          <ChatMessages conversationId={chat.id} />
          <ChatTextarea isDisabled={isDisabled} conversationId={chat.id} />
        </>
      )}
    </div>
  );
};
