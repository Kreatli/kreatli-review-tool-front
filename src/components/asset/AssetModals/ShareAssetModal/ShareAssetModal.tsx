import {
  addToast,
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  Tooltip,
} from '@heroui/react';
import { ChangeEvent, FocusEvent, KeyboardEvent, useEffect, useState } from 'react';

import { EMAIL_PATTERN } from '../../../../constants/validationRules';
import { usePostShareableLink, usePostShareableLinkSendEmail } from '../../../../services/hooks';
import { ProjectFileDto, ProjectFolderDto } from '../../../../services/types';
import { Icon } from '../../../various/Icon';

interface Props {
  asset?: ProjectFolderDto | ProjectFileDto;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareAssetModal = ({ asset, isOpen, onClose }: Props) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const { mutate, data, isPending } = usePostShareableLink();
  const { mutate: sendEmails, isPending: isSendingEmails } = usePostShareableLinkSendEmail();

  const url = `${location.origin}/share/${data?.id}`;

  useEffect(() => {
    if (isOpen && asset) {
      mutate(
        { requestBody: { assetId: asset?.id } },
        {
          onError: () => {
            addToast({ title: 'There was an error generating the link', color: 'danger', variant: 'flat' });
          },
        },
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmails([]);
    }
  }, [isOpen]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const isValidEmail = value.match(EMAIL_PATTERN);

    if (isValidEmail) {
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

  const handleSendLink = () => {
    if (emails.length === 0) {
      return;
    }

    sendEmails(
      { requestBody: { emails, url } },
      {
        onSuccess: () => {
          addToast({ title: 'Shareable link was sent!', color: 'success', variant: 'flat' });
          onClose();
        },
        onError: () => {
          addToast({ title: 'Failed to send link. Please try again later.', color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Share File</ModalHeader>
        <ModalBody className="pb-6">
          <div className="flex flex-col gap-4">
            <Input
              value={isPending ? 'Generating link...' : url}
              label="Copy shareable link"
              readOnly
              endContent={
                isPending ? (
                  <Spinner size="sm" color="default" />
                ) : (
                  <Tooltip content="Copy link">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      startContent={<Icon icon="copy" size={20} className="text-foreground-500" />}
                      onClick={() => {
                        navigator.clipboard.writeText(url);
                      }}
                    />
                  </Tooltip>
                )
              }
            />
            <div className="relative text-center before:absolute before:left-0 before:right-0 before:top-1/2 before:h-px before:w-full before:bg-foreground-300">
              <span className="relative bg-background px-1 text-foreground-500">or</span>
            </div>
            <div className="flex flex-col gap-2">
              {emails.length > 0 && (
                <div className="flex flex-wrap gap-2 gap-y-1">
                  {emails.map((email) => (
                    <Chip
                      key={email}
                      variant="flat"
                      isCloseable
                      onClose={() => setEmails(emails.filter((e) => e !== email))}
                    >
                      {email}
                    </Chip>
                  ))}
                </div>
              )}
              <div className="flex flex-col items-end gap-2">
                <Input
                  label="Share via email"
                  placeholder="Enter email address"
                  value={input}
                  isDisabled={emails.length >= 5 || isPending}
                  onBlur={handleInputBlur}
                  onKeyDown={handleInputKeyDown}
                  onChange={handleInputChange}
                />
                <Button
                  size="sm"
                  isDisabled={emails.length === 0}
                  isLoading={isSendingEmails}
                  className="bg-foreground text-content1"
                  onClick={handleSendLink}
                >
                  Send link via email
                </Button>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
