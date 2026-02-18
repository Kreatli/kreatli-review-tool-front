import { Button } from '@heroui/react';
import React, { useLayoutEffect } from 'react';

import { useChatContext } from '../../../contexts/Chat';
import { useSession } from '../../../hooks/useSession';
import { AssetFileDto } from '../../../services/types';
import { AssetPicker } from '../../asset/AssetPicker';
import { Icon } from '../../various/Icon';
import { ChatTextareaAssetPreview } from './ChatTextareaAssetPreview';
import { ChatTextareaEmojiPicker } from './ChatTextareaEmojiPicker';

interface Props {
  conversationId: string;
  isDisabled?: boolean;
}

export const ChatTextarea = ({ conversationId, isDisabled = false }: Props) => {
  const { user } = useSession();
  const { project, webSocketRef } = useChatContext();

  const messageRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const [rows, setRows] = React.useState(1);
  const [message, setMessage] = React.useState('');
  const [assets, setAssets] = React.useState<AssetFileDto[]>([]);
  const [cursorPosition, setCursorPosition] = React.useState(0);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRows(Math.ceil((messageRef.current?.scrollHeight ?? 0) / 20) || 1);
  }, [message]);

  const sendMessage = () => {
    if (!message.trim() && assets.length === 0) {
      return;
    }

    webSocketRef.current?.emit('message', {
      chatId: conversationId,
      sender: user?.id,
      content: message.trim(),
      assets: assets.map(({ id }) => id),
    });
    setMessage('');
    setRows(1);
    setAssets([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);
    setCursorPosition(e.target.selectionStart);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => {
      const before = prev.slice(0, cursorPosition);
      const after = prev.slice(cursorPosition);
      return before + emoji + after;
    });

    setTimeout(() => {
      if (textareaRef.current) {
        const newPosition = cursorPosition + emoji.length;
        textareaRef.current.setSelectionRange(newPosition, newPosition);
        setCursorPosition(newPosition);
      }
    }, 0);
  };

  const handleSelectAsset = (asset: AssetFileDto) => {
    if (assets.find((a) => a.id === asset.id)) {
      return;
    }

    setAssets([...assets, asset]);
  };

  const handleRemoveAsset = (asset: AssetFileDto) => {
    setAssets(assets.filter((a) => a.id !== asset.id));
  };

  return (
    <div className="flex items-end gap-2 border-t border-foreground-200 p-2">
      <div className="flex flex-col">
        {assets.length > 0 && (
          <div className="grid grid-cols-2 gap-px gap-y-1">
            {assets.map((asset) => (
              <div className="relative" key={asset.id}>
                <ChatTextareaAssetPreview key={asset.id} asset={asset} width={32} height={32} />
                <button
                  type="button"
                  className="absolute -right-1 -top-1 z-20 flex size-4 items-center justify-center rounded-full border bg-background"
                  onClick={() => handleRemoveAsset(asset)}
                >
                  <Icon icon="cross" size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-px">
          <AssetPicker projectId={project.id} onSelect={handleSelectAsset}>
            <Button variant="light" size="sm" isIconOnly radius="full" isDisabled={assets.length >= 5 || isDisabled}>
              <Icon icon="paperclip" className="text-foreground-500" size={20} />
            </Button>
          </AssetPicker>
          <ChatTextareaEmojiPicker isDisabled={isDisabled} onEmojiSelect={handleEmojiSelect} />
        </div>
      </div>
      <div className="relative flex w-full">
        <textarea
          ref={textareaRef}
          placeholder="Type a message"
          rows={rows}
          disabled={isDisabled}
          value={message}
          className="min-h-[26px] w-full resize-none bg-transparent text-small outline-none placeholder:text-foreground-400"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onSelect={(e) => {
            const target = e.target as HTMLTextAreaElement;
            setCursorPosition(target.selectionStart);
          }}
        />
        <div
          ref={messageRef}
          className="pointer-events-none absolute whitespace-pre-wrap text-small opacity-0"
          aria-hidden="true"
        >
          {message}
        </div>
      </div>
      <Button
        size="sm"
        isIconOnly
        isDisabled={!message.trim() && assets.length === 0}
        radius="full"
        className="bg-foreground text-content1"
        onClick={sendMessage}
      >
        <Icon icon="send" size={16} />
      </Button>
    </div>
  );
};
