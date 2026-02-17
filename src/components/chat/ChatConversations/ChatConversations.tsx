import { Tab, Tabs } from '@heroui/react';
import { useRouter } from 'next/router';

import { useChatContext } from '../../../contexts/Chat';
import { ChatDto } from '../../../services/types';
import { ChatConversation } from './ChatConversation';
import { ChatConversationCreateButton } from './ChatConversationCreateButton';
import { ChatConversationsLoader } from './ChatConversationsLoader';

interface ChatConversationsProps {
  chats: ChatDto[];
  isPending: boolean;
  isError: boolean;
  isDisabled?: boolean;
}

export const ChatConversations = ({ chats, isPending, isError, isDisabled = false }: ChatConversationsProps) => {
  const { selectedConversationId, setSelectedConversationId } = useChatContext();
  const router = useRouter();

  if (isPending) {
    return <ChatConversationsLoader />;
  }

  if (isError) {
    return 'Error loading chats';
  }

  const handleSelectionChange = (key: string | number) => {
    const chat = chats.find((chat) => chat.id === key);
    if (chat) {
      setSelectedConversationId(chat.id);
      router.push(`${location.pathname}?conversationId=${chat.id}`);
    }
  };

  return (
    <div className="relative h-full max-h-full">
      <Tabs
        isVertical
        selectedKey={selectedConversationId}
        classNames={{
          base: 'w-full border-r border-foreground-200',
          tabWrapper: 'h-full',
          tabList: 'w-full h-full bg-background p-2',
          tab: 'justify-start h-auto px-1 lg:px-3',
          tabContent: 'max-w-full',
        }}
        onSelectionChange={handleSelectionChange}
      >
        {chats.map((chat) => (
          <Tab key={chat.id} title={<ChatConversation chat={chat} />} />
        ))}
      </Tabs>
      <ChatConversationCreateButton isDisabled={isDisabled} />
    </div>
  );
};
