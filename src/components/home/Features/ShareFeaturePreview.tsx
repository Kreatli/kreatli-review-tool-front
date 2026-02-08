import { Avatar, Button, Card, CardBody, Chip, Input, Tooltip } from '@heroui/react';
import { ChangeEvent, FocusEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

import { useIsTouchScreen } from '../../../hooks/useIsTouchScreen';
import { useSession } from '../../../hooks/useSession';
import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';
import { Icon } from '../../various/Icon';

type ShareVariant = 'video' | 'pdf' | 'image';

const SHARE_PREVIEW_CONFIG: Record<
  ShareVariant,
  { filename: string; subtitle: string; previewAlt: string; previewSrc: string; aspectClass: string }
> = {
  video: {
    filename: 'interview_v2.mp4',
    subtitle: 'Vision review - Interviews',
    previewAlt: 'Video file preview ready for sharing',
    previewSrc: 'https://picsum.photos/1000/400?random=3',
    aspectClass: 'aspect-video',
  },
  pdf: {
    filename: 'Kreatli Pitch Deck.pdf',
    subtitle: 'Deck review - Proposals',
    previewAlt: 'PDF file preview ready for sharing',
    previewSrc: 'https://picsum.photos/400/560?random=doc',
    aspectClass: 'aspect-[3/4]',
  },
  image: {
    filename: 'Hero_Banner.png',
    subtitle: 'Campaign review - Branding',
    previewAlt: 'Image file preview ready for sharing',
    previewSrc: 'https://picsum.photos/1000/600?random=brand',
    aspectClass: 'aspect-video',
  },
};

export const ShareFeaturePreview = ({ variant = 'video' }: { variant?: ShareVariant }) => {
  const { openSignUpModal } = useSignUpModalVisibility();
  const { isSignedIn } = useSession();
  const isTouchScreen = useIsTouchScreen();
  const [emails, setEmails] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const config = SHARE_PREVIEW_CONFIG[variant];

  // Animation state
  const [isAnimating, setIsAnimating] = useState(true);
  const isAnimatingRef = useRef(true);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Keep ref in sync with state
  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/share/example-link-id`;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsAnimating(false);
    setInput(event.target.value);
  };

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsAnimating(false);
    const { value } = event.target;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = value.match(emailPattern);

    if (isValidEmail && emails.length < 5) {
      setEmails((prev) => Array.from(new Set([...prev, value])));
      setInput('');
    }
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (event.currentTarget.value) {
        handleInputBlur({ target: { value: event.currentTarget.value } } as FocusEvent<HTMLInputElement>);
        return;
      }
      handleSendLink();
    }
  };

  const handleCopyLink = () => {
    setIsAnimating(false);
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleSendLink = () => {
    setIsAnimating(false);
    if (emails.length === 0) {
      return;
    }

    if (!isSignedIn) {
      openSignUpModal();
    }
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

    const addEmail = (email: string, delay: number) => {
      scheduleAction(() => {
        if (isAnimatingRef.current) {
          setEmails((prev) => {
            if (prev.length < 5) {
              return Array.from(new Set([...prev, email]));
            }
            return prev;
          });
          setInput('');
        }
      }, delay);
    };

    const resetToInitialState = () => {
      setEmails([]);
      setInput('');
      setLinkCopied(false);
    };

    const runAnimationSequence = () => {
      // Start with initial state
      resetToInitialState();

      // Step 1: Type first email (after 1.5s)
      const email1 = 'john.doe@example.com';
      typeText(email1, setInput, 1500, 35);

      // Step 2: Add first email (after 3.5s)
      addEmail(email1, 3500);

      // Step 3: Type second email (after 4.5s)
      const email2 = 'sarah.smith@example.com';
      typeText(email2, setInput, 4500, 35);

      // Step 4: Add second email (after 6.5s)
      addEmail(email2, 6500);

      // Step 5: Copy link (after 8s)
      scheduleAction(() => {
        if (isAnimatingRef.current) {
          setLinkCopied(true);
          setTimeout(() => {
            if (isAnimatingRef.current) {
              setLinkCopied(false);
            }
          }, 2000);
        }
      }, 8000);

      // Step 6: Type third email (after 10s)
      const email3 = 'mike.johnson@example.com';
      typeText(email3, setInput, 10000, 35);

      // Step 7: Add third email (after 12s)
      addEmail(email3, 12000);

      // Step 8: Remove first email (after 14s)
      scheduleAction(() => {
        if (isAnimatingRef.current) {
          setEmails((prev) => prev.filter((e) => e !== email1));
        }
      }, 14000);

      // Step 9: Loop back - reset and restart (after 16s)
      scheduleAction(() => {
        if (isAnimatingRef.current) {
          runAnimationSequence();
        }
      }, 16000);
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
    <Card>
      <CardBody
        className="flex min-h-96 flex-col gap-4 p-4"
        onClick={() => {
          setIsAnimating(false);
        }}
      >
        <div className="flex items-center gap-3">
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024f" size="md" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-lg font-semibold">{config.filename}</div>
            <div className="text-sm text-foreground-500">{config.subtitle}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_280px]">
          <div className="flex flex-col gap-3">
            <div
              className={`relative max-h-64 overflow-hidden rounded-lg border border-foreground-200 ${config.aspectClass}`}
            >
              <img
                src={config.previewSrc}
                alt={config.previewAlt}
                className="absolute h-full w-full object-cover"
              />
            </div>
            <div className="flex justify-end">
              <Button
                size="sm"
                variant="solid"
                color="default"
                className="bg-foreground text-content1"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAnimating(false);
                  if (!isSignedIn) {
                    openSignUpModal();
                  }
                }}
              >
                <Icon icon="share" size={18} />
                Share
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-large border border-foreground-200 bg-foreground-50 p-4 transition-all duration-300">
            <div className="flex items-center justify-between border-b border-foreground-200 pb-3">
              <div className="text-base font-semibold">Share File</div>
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-auto">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <Input
                    value={url}
                    label="Copy shareable link"
                    readOnly
                    size="sm"
                    classNames={{
                      input: 'text-xs',
                    }}
                    endContent={
                      <Tooltip content={linkCopied ? 'Copied!' : 'Copy link'} placement="top">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyLink();
                          }}
                        >
                          <Icon icon={linkCopied ? 'check' : 'copy'} size={16} />
                        </Button>
                      </Tooltip>
                    }
                  />
                </div>
                <div className="relative text-center before:absolute before:left-0 before:right-0 before:top-1/2 before:h-px before:w-full before:bg-foreground-300">
                  <span className="relative bg-foreground-50 px-2 text-xs text-foreground-500">or</span>
                </div>
                {emails.length > 0 && (
                  <div className="flex flex-wrap gap-2 gap-y-1.5">
                    {emails.map((email) => (
                      <Chip
                        key={email}
                        variant="flat"
                        size="sm"
                        isCloseable
                        onClose={() => {
                          setIsAnimating(false);
                          setEmails(emails.filter((e) => e !== email));
                        }}
                        className="transition-all"
                      >
                        {email}
                      </Chip>
                    ))}
                  </div>
                )}
                <div className="flex flex-col gap-2.5">
                  <Input
                    label="Share via email"
                    placeholder="Enter email address"
                    value={input}
                    size="sm"
                    isDisabled={emails.length >= 5}
                    onBlur={handleInputBlur}
                    onKeyDown={handleInputKeyDown}
                    onChange={handleInputChange}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAnimating(false);
                    }}
                    description={emails.length >= 5 ? 'Maximum 5 emails' : `${emails.length}/5 emails`}
                    classNames={{
                      description: 'text-xs',
                    }}
                  />
                  <Button
                    size="sm"
                    isDisabled={emails.length === 0}
                    className="bg-foreground text-content1 transition-all disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSendLink();
                    }}
                  >
                    <Icon icon="send" size={16} />
                    Send link via email
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
