import { Avatar, AvatarGroup, Button, Card, CardBody } from '@heroui/react';
import { Icon } from '../../various/Icon';
import { ChatFeatureMessage } from './ChatFeatureMessage';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const ChatFeaturePreview = () => {
  const router = useRouter();

  const [message, setMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage) {
      router.push('/sign-up');

      return;
    }

    if (!message.trim()) {
      return;
    }

    setMessage('');
    setNewMessage(message.trim());
  };

  return (
    <Card>
      <CardBody className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-2 sm:gap-4 p-4">
        <div className="flex sm:flex-col gap-2 sm:gap-4 py-2">
          <div className="bg-foreground-100 size-10 flex items-center outline-2 outline-foreground-200 outline outline-offset-2 justify-center rounded-full">
            <Icon icon="slides" size={20} className="text-foreground-500" />
          </div>
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024f" />
          <Button as={Link} href="/sign-up" variant="faded" radius="full" isIconOnly>
            <Icon icon="plus" size={20} />
          </Button>
        </div>
        <div className="bg-foreground-100 rounded-large p-2">
          <div className="flex justify-between gap-4 p-2">
            <div className="flex items-center gap-2">
              <div className="bg-foreground-100 size-6 flex items-center justify-center rounded-full">
                <Icon icon="slides" size={20} className="text-foreground-500" />
              </div>
              <div className="text-medium sm:text-large font-semibold">Project chat</div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="light" radius="full" isIconOnly>
                <Icon icon="search" size={20} />
              </Button>
              <AvatarGroup size="sm" max={2} total={6}>
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024f" />
              </AvatarGroup>
            </div>
          </div>
          <div className="bg-background rounded-medium px-2 py-4 flex flex-col gap-4 mb-2">
            <div className="shadow-small text-sm mx-auto rounded-medium px-3 py-1 w-fit">Today</div>
            <ChatFeatureMessage
              message="Hey team! Just uploaded the latest cut of walkthrough. Would love your thoughts before we lock it 🕺"
              user="a042581f4e29026024d"
              asset="walkthrough_v3.mp4"
              userName="Peter R."
              date="10:24 AM"
            />
            <ChatFeatureMessage
              message="Got it, watching now 👀"
              user="a042581f4e29026024f"
              userName="Martin D."
              date="10:25 AM"
            />
            {newMessage && <ChatFeatureMessage message={newMessage} userName="Guest" date="now" />}
          </div>
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-transparent resize-none w-full text-sm p-2 outline-none pr-10"
              rows={1}
              maxLength={100}
              placeholder="Type a message..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();

                  if (!newMessage) {
                    handleSendMessage();
                  }
                }
              }}
            />
            <Button
              size="sm"
              isIconOnly
              radius="full"
              className="text-content1 bg-foreground absolute right-2 bottom-2"
              onClick={handleSendMessage}
            >
              <Icon icon="send" size={16} />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
