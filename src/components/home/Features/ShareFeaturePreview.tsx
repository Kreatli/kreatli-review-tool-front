import { Avatar, Button, Card, CardBody, Chip, Input, Tooltip, cn } from '@heroui/react';
import { Icon } from '../../various/Icon';
import { useState } from 'react';
import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';
import { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';

export const ShareFeaturePreview = () => {
  const { openSignUpModal } = useSignUpModalVisibility();
  const [emails, setEmails] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/share/example-link-id`;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
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
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleSendLink = () => {
    if (emails.length === 0) {
      return;
    }

    openSignUpModal();
  };

  return (
    <Card>
      <CardBody className="flex flex-col gap-4 p-4 min-h-96">
        <div className="flex items-center gap-3">
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024f" size="md" />
          <div className="flex-1 min-w-0">
            <div className="text-lg font-semibold truncate">interview_v2.mp4</div>
            <div className="text-sm text-foreground-500">Vision review - Interviews</div>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-[1fr_280px]">
          <div className="flex flex-col gap-3">
            <div className="aspect-video max-h-64 rounded-lg overflow-hidden relative border border-foreground-200">
              <img
                src="https://picsum.photos/1000/400?random=3"
                alt="File preview"
                className="absolute h-full w-full object-cover"
              />
            </div>
            <div className="flex justify-end">
              <Button
                size="sm"
                variant="solid"
                color="default"
                className="bg-foreground text-content1"
                onClick={openSignUpModal}
              >
                <Icon icon="share" size={18} />
                Share
              </Button>
            </div>
          </div>
          <div className="bg-foreground-50 rounded-large border border-foreground-200 flex flex-col gap-3 p-4 transition-all duration-300">
            <div className="flex items-center justify-between border-b border-foreground-200 pb-3">
              <div className="font-semibold text-base">Share File</div>
            </div>
            <div className="flex flex-col gap-3 overflow-auto flex-1 min-h-0">
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
                        <Button isIconOnly size="sm" variant="light" onClick={handleCopyLink}>
                          <Icon icon={linkCopied ? 'check' : 'copy'} size={16} />
                        </Button>
                      </Tooltip>
                    }
                  />
                </div>
                <div className="relative before:absolute before:bg-foreground-300 before:h-px before:w-full before:top-1/2 before:left-0 before:right-0 text-center">
                  <span className="bg-foreground-50 relative px-2 text-foreground-500 text-xs">or</span>
                </div>
                {emails.length > 0 && (
                  <div className="flex gap-2 gap-y-1.5 flex-wrap">
                    {emails.map((email) => (
                      <Chip
                        key={email}
                        variant="flat"
                        size="sm"
                        isCloseable
                        onClose={() => setEmails(emails.filter((e) => e !== email))}
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
                    description={emails.length >= 5 ? 'Maximum 5 emails' : `${emails.length}/5 emails`}
                    classNames={{
                      description: 'text-xs',
                    }}
                  />
                  <Button
                    size="sm"
                    isDisabled={emails.length === 0}
                    className="text-content1 bg-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSendLink}
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
