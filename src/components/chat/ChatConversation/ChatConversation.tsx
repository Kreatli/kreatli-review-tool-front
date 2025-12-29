import { ChatDto } from '../../../services/types';
import { ChatConversationHeader } from './ChatConversationHeader';
import React from 'react';
import { ChatMessages } from '../ChatMessages';
import { ChatTextarea } from '../ChatTextarea';
import { ChatConversationSearchMessages } from './ChatConversationSearchMessages';

interface Props {
  chat: ChatDto;
  isDisabled?: boolean;
}

export const ChatConversation = ({ chat, isDisabled = false }: Props) => {
  const [search, setSearch] = React.useState('');

  return (
    <div key={chat.id} className="grid grid-rows-[auto_1fr_auto] rounded-small bg-foreground-100">
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
