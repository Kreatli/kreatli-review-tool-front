import { Button, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { Emoji, EmojiPicker } from 'frimousse';
import React from 'react';

import { Icon } from '../../various/Icon';

interface Props {
  isDisabled?: boolean;
  onEmojiSelect: (emoji: string) => void;
}

export const ChatTextareaEmojiPicker = ({ isDisabled, onEmojiSelect }: Props) => {
  const handleEmojiSelect = (emoji: Emoji) => {
    onEmojiSelect(emoji.emoji);
  };

  return (
    <Popover placement="top-start" crossOffset={-32}>
      <PopoverTrigger>
        <Button variant="light" isDisabled={isDisabled} size="sm" isIconOnly radius="full">
          <Icon icon="smile" className="text-foreground-500" size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="pt-2">
          <EmojiPicker.Root onEmojiSelect={handleEmojiSelect}>
            <EmojiPicker.Search
              autoFocus
              className="w-full appearance-none rounded-small bg-foreground-100 p-2 py-1.5 outline-none placeholder:text-foreground-500"
            />
            <EmojiPicker.Viewport className="h-60 overflow-auto">
              <EmojiPicker.Empty className="flex items-center justify-center p-2 text-foreground-500">
                No emoji found.
              </EmojiPicker.Empty>
              <EmojiPicker.List
                components={{
                  CategoryHeader: ({ category, ...props }) => (
                    <div className="bg-background px-1.5 py-1 text-sm font-medium text-foreground-500" {...props}>
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
