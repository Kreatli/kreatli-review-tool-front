import { ChatDto } from '../../../services/types';
import { ChatConversationHeader } from './ChatConversationHeader';
import React from 'react';
import { ChatMessages } from '../ChatMessages';
import { ChatTextarea } from '../ChatTextarea';
import { ChatConversationSearchMessages } from './ChatConversationSearchMessages';

interface Props {
  chat: ChatDto;
}

export const ChatConversation = ({ chat }: Props) => {
  const [search, setSearch] = React.useState('');

  return (
    <div key={chat.id} className="bg-foreground-100 rounded-small grid grid-rows-[auto_1fr_auto]">
      <ChatConversationHeader chat={chat} search={search} onSearchChange={setSearch} />
      {!!search ? (
        <ChatConversationSearchMessages search={search} conversationId={chat.id} />
      ) : (
        <>
          <ChatMessages conversationId={chat.id} />
          <ChatTextarea conversationId={chat.id} />
        </>
      )}
    </div>
  );
};
