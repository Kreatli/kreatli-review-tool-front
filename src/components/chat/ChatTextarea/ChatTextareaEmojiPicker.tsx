import { Button, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { Icon } from '../../various/Icon';
import { Emoji, EmojiPicker } from 'frimousse';
import React from 'react';

interface Props {
  onEmojiSelect: (emoji: string) => void;
}

export const ChatTextareaEmojiPicker = ({ onEmojiSelect }: Props) => {
  const handleEmojiSelect = (emoji: Emoji) => {
    onEmojiSelect(emoji.emoji);
  };

  return (
    <Popover placement="top-start" crossOffset={-32}>
      <PopoverTrigger>
        <Button variant="light" size="sm" isIconOnly radius="full">
          <Icon icon="smile" className="text-foreground-500" size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="pt-2">
          <EmojiPicker.Root onEmojiSelect={handleEmojiSelect}>
            <EmojiPicker.Search
              autoFocus
              className="outline-none appearance-none bg-foreground-100 rounded-small p-2 py-1.5 placeholder:text-foreground-500 w-full"
            />
            <EmojiPicker.Viewport className="h-60 overflow-auto">
              <EmojiPicker.Empty className="p-2 flex items-center justify-center text-foreground-500">
                No emoji found.
              </EmojiPicker.Empty>
              <EmojiPicker.List
                components={{
                  CategoryHeader: ({ category, ...props }) => (
                    <div className="px-1.5 py-1 font-medium bg-background text-sm text-foreground-500" {...props}>
                      {category.label}
                    </div>
                  ),
                  Emoji: ({ emoji, ...props }) => (
                    <button
                      className="flex size-8 items-center justify-center rounded-md text-lg data-[active]:bg-neutral-100 dark:data-[active]:bg-neutral-800"
                      {...props}
                    >
                      {emoji.emoji}
                    </button>
                  ),
                }}
              />
            </EmojiPicker.Viewport>
          </EmojiPicker.Root>
        </div>
      </PopoverContent>
    </Popover>
  );
};
