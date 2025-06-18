import { Button } from '@heroui/react';
import { Icon } from '../../various/Icon';
import React, { useEffect, useLayoutEffect } from 'react';
import { useChatContext } from '../../../contexts/Chat';
import { useSession } from '../../../hooks/useSession';
import { ChatTextareaEmojiPicker } from './ChatTextareaEmojiPicker';
import { ChatTextareaAssetPicker } from './ChatTextareaAssetPicker';
import { AssetDto } from '../../../services/types';
import { ChatTextareaAssetPreview } from './ChatTextareaAssetPreview';

const MAX_ROWS = 10;

interface Props {
  conversationId: string;
}

export const ChatTextarea = ({ conversationId }: Props) => {
  const { user } = useSession();
  const { webSocketRef } = useChatContext();

  const messageRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const [rows, setRows] = React.useState(1);
  const [message, setMessage] = React.useState('');
  const [assets, setAssets] = React.useState<AssetDto[]>([]);
  const [cursorPosition, setCursorPosition] = React.useState(0);

  useLayoutEffect(() => {
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

  const handleSelectAsset = (asset: AssetDto) => {
    if (assets.find((a) => a.id === asset.id)) {
      return;
    }

    setAssets([...assets, asset]);
  };

  const handleRemoveAsset = (asset: AssetDto) => {
    setAssets(assets.filter((a) => a.id !== asset.id));
  };

  return (
    <div className="flex items-end p-2 gap-2">
      <div className="flex flex-col">
        {assets.length > 0 && (
          <div className="grid grid-cols-2 gap-y-1 gap-px">
            {assets.map((asset) => (
              <div className="relative" key={asset.id}>
                <ChatTextareaAssetPreview key={asset.id} asset={asset} width={32} height={32} />
                <button
                  type="button"
                  className="size-4 flex items-center justify-center absolute -right-1 -top-1 z-20 border rounded-full bg-background"
                  onClick={() => handleRemoveAsset(asset)}
                >
                  <Icon icon="cross" size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-px">
          <ChatTextareaAssetPicker isDisabled={assets.length >= 5} onSelect={handleSelectAsset} />
          <ChatTextareaEmojiPicker onEmojiSelect={handleEmojiSelect} />
        </div>
      </div>
      <div className="flex relative w-full">
        <textarea
          ref={textareaRef}
          placeholder="Type a message"
          rows={rows}
          value={message}
          className="min-h-[26px] placeholder:text-foreground-400 text-small resize-none w-full bg-transparent outline-none"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onSelect={(e) => {
            const target = e.target as HTMLTextAreaElement;
            setCursorPosition(target.selectionStart);
          }}
        />
        <div
          ref={messageRef}
          className="text-small whitespace-pre-wrap absolute opacity-0 pointer-events-none"
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
