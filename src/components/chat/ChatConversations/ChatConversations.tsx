import { Button, Tab, Tabs } from '@heroui/react';
import { ChatDto } from '../../../services/types';
import { ChatConversation } from './ChatConversation';
import { ChatConversationsLoader } from './ChatConversationsLoader';
import { Icon } from '../../various/Icon';
import { useChatContext } from '../../../contexts/Chat';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { ChatConversationCreateButton } from './ChatConversationCreateButton';

interface ChatConversationsProps {
  chats: ChatDto[];
  isPending: boolean;
  isError: boolean;
}

export const ChatConversations = ({ chats, isPending, isError }: ChatConversationsProps) => {
  const { selectedConversation, setSelectedConversation } = useChatContext();
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
      setSelectedConversation(chat);
      router.push(`${location.pathname}?conversationId=${chat.id}`);
    }
  };

  return (
    <div className="relative h-full max-h-full">
      <Tabs
        isVertical
        selectedKey={selectedConversation?.id ?? null}
        classNames={{
          base: 'w-full',
          tabWrapper: 'h-full',
          tabList: 'w-full h-full',
          tab: 'justify-start h-auto',
          tabContent: 'max-w-full',
        }}
        onSelectionChange={handleSelectionChange}
      >
        {chats.map((chat) => (
          <Tab key={chat.id} title={<ChatConversation chat={chat} />} />
        ))}
      </Tabs>
      <ChatConversationCreateButton />
    </div>
  );
};
