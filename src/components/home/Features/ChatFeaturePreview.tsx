import { Avatar, AvatarGroup, Button, Card, CardBody } from '@heroui/react';
import { useEffect, useRef, useState } from 'react';

import { useIsTouchScreen } from '../../../hooks/useIsTouchScreen';
import { useSession } from '../../../hooks/useSession';
import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';
import { Icon } from '../../various/Icon';
import { ChatFeatureMessage } from './ChatFeatureMessage';

interface MessageData {
  message: string;
  user?: string;
  userName: string;
  date: string;
  asset?: string;
}

const initialMessages: MessageData[] = [
  {
    message: 'Hey team! Just uploaded the latest cut of walkthrough. Would love your thoughts before we lock it 🕺',
    user: 'a042581f4e29026024d',
    asset: 'walkthrough_v3.mp4',
    userName: 'Peter R.',
    date: '10:24 AM',
  },
  {
    message: 'Got it, watching now 👀',
    user: 'a042581f4e29026024f',
    userName: 'Martin D.',
    date: '10:25 AM',
  },
];

export const ChatFeaturePreview = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageData[]>(initialMessages);

  const { openSignUpModal } = useSignUpModalVisibility();
  const { isSignedIn } = useSession();
  const isTouchScreen = useIsTouchScreen();

  // Animation state
  const [isAnimating, setIsAnimating] = useState(true);
  const isAnimatingRef = useRef(true);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Keep ref in sync with state
  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    setIsAnimating(false);
    if (messages.length > initialMessages.length) {
      if (!isSignedIn) {
        openSignUpModal();
      }
      return;
    }

    if (!message.trim()) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        message: message.trim(),
        userName: 'Guest',
        date: 'now',
      },
    ]);
    setMessage('');
  };

  // Animation sequence
  useEffect(() => {
    if (!isAnimating || isTouchScreen) return;

    const clearAllTimeouts = () => {
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
      timeoutRefs.current = [];
    };

    const scheduleAction = (callback: () => void, delay: number) => {
      const timeout = setTimeout(() => {
        if (isAnimatingRef.current) {
          callback();
        }
      }, delay);
      timeoutRefs.current.push(timeout);
    };

    const typeText = (text: string, targetSetter: (value: string) => void, delay: number, charDelay: number = 40) => {
      let index = 0;
      const typeChar = () => {
        if (index < text.length && isAnimatingRef.current) {
          targetSetter(text.substring(0, index + 1));
          index++;
          const timeout = setTimeout(typeChar, charDelay);
          timeoutRefs.current.push(timeout);
        }
      };
      scheduleAction(typeChar, delay);
    };

    const resetToInitialState = () => {
      setMessage('');
      setMessages([...initialMessages]);
    };

    const runAnimationSequence = () => {
      // Start with initial state
      resetToInitialState();

      // Step 1: Type first new message (after 2s)
      const message1 = 'This looks great! The transitions are smooth ✨';
      typeText(message1, setMessage, 2000, 35);

      // Step 2: Send first message (after 5.5s)
      scheduleAction(() => {
        if (isAnimatingRef.current) {
          setMessages((prev) => [
            ...prev,
            {
              message: message1,
              userName: 'Guest',
              date: 'now',
            },
          ]);
          setMessage('');
        }
      }, 5500);

      // Step 3: Type second new message (after 7s)
      const message2 = 'Can we adjust the color grading slightly?';
      typeText(message2, setMessage, 7000, 35);

      // Step 4: Send second message (after 10.5s)
      scheduleAction(() => {
        if (isAnimatingRef.current) {
          setMessages((prev) => [
            ...prev,
            {
              message: message2,
              userName: 'Guest',
              date: 'now',
            },
          ]);
          setMessage('');
        }
      }, 10500);

      // Step 5: Add a response from team member (after 12s)
      scheduleAction(() => {
        if (isAnimatingRef.current) {
          setMessages((prev) => [
            ...prev,
            {
              message: "Sure thing! I'll make those adjustments 🎨",
              user: 'a042581f4e29026024d',
              userName: 'Peter R.',
              date: '10:28 AM',
            },
          ]);
        }
      }, 12000);

      // Step 6: Type third new message (after 14.5s)
      const message3 = 'Perfect, thanks! Looking forward to the update 🚀';
      typeText(message3, setMessage, 14500, 35);

      // Step 7: Send third message (after 18s)
      scheduleAction(() => {
        if (isAnimatingRef.current) {
          setMessages((prev) => [
            ...prev,
            {
              message: message3,
              userName: 'Guest',
              date: 'now',
            },
          ]);
          setMessage('');
        }
      }, 18000);

      // Step 8: Loop back - reset and restart (after 20s)
      scheduleAction(() => {
        if (isAnimatingRef.current) {
          runAnimationSequence();
        }
      }, 20000);
    };

    // Start animation after a short delay
    const initialTimeout = setTimeout(() => {
      if (isAnimatingRef.current) {
        runAnimationSequence();
      }
    }, 500);
    timeoutRefs.current.push(initialTimeout);

    return () => {
      clearAllTimeouts();
      clearTimeout(initialTimeout);
    };
  }, [isAnimating, isTouchScreen]);

  return (
    <Card className="group">
      <CardBody
        className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-[auto_1fr] sm:gap-4"
        onClick={() => {
          setIsAnimating(false);
        }}
      >
        <div className="flex gap-2 py-2 sm:flex-col sm:gap-4">
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full bg-foreground-100 outline outline-2 outline-offset-2 outline-foreground-200"
            onClick={(e) => {
              e.stopPropagation();
              setIsAnimating(false);
              if (!isSignedIn) {
                openSignUpModal();
              }
            }}
          >
            <Icon icon="slides" size={20} className="text-foreground-500" />
          </button>
          <Avatar
            as="button"
            type="button"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            onClick={(e) => {
              e.stopPropagation();
              setIsAnimating(false);
              if (!isSignedIn) {
                openSignUpModal();
              }
            }}
          />
          <Avatar
            as="button"
            type="button"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024f"
            onClick={(e) => {
              e.stopPropagation();
              setIsAnimating(false);
              if (!isSignedIn) {
                openSignUpModal();
              }
            }}
          />
          <Button
            variant="faded"
            radius="full"
            isIconOnly
            onClick={(e) => {
              e.stopPropagation();
              setIsAnimating(false);
              if (!isSignedIn) {
                openSignUpModal();
              }
            }}
          >
            <Icon icon="plus" size={20} />
          </Button>
        </div>
        <div className="rounded-large bg-foreground-100 p-2">
          <div className="flex justify-between gap-4 p-2">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-full bg-foreground-100">
                <Icon icon="slides" size={20} className="text-foreground-500" />
              </div>
              <div className="text-medium font-semibold sm:text-large">Project chat</div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="light"
                radius="full"
                isIconOnly
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAnimating(false);
                  if (!isSignedIn) {
                    openSignUpModal();
                  }
                }}
              >
                <Icon icon="search" size={20} />
              </Button>
              <AvatarGroup size="sm" max={2} total={6}>
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024f" />
              </AvatarGroup>
            </div>
          </div>
          <div
            ref={messagesContainerRef}
            className="mb-2 flex max-h-96 flex-col gap-4 overflow-y-auto rounded-medium bg-background px-2 py-4"
          >
            <div className="mx-auto w-fit rounded-medium px-3 py-1 text-sm shadow-small">Today</div>
            {messages.map((msg, index) => (
              <ChatFeatureMessage
                key={index}
                message={msg.message}
                user={msg.user}
                asset={msg.asset}
                userName={msg.userName}
                date={msg.date}
              />
            ))}
          </div>
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => {
                setIsAnimating(false);
                setMessage(e.target.value);
              }}
              className="w-full resize-none bg-transparent p-2 pr-10 text-sm outline-none"
              rows={1}
              maxLength={100}
              placeholder="Type a message..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsAnimating(false);
              }}
            />
            <Button
              size="sm"
              isIconOnly
              radius="full"
              className="absolute bottom-2 right-2 bg-foreground text-content1"
              onClick={(e) => {
                e.stopPropagation();
                handleSendMessage();
              }}
            >
              <Icon icon="send" size={16} />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
