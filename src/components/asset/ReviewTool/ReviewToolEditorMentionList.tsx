import { cn, Listbox, ListboxItem } from '@heroui/react';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { ProjectMemberDto } from '../../../services/types';
import { ProjectMemberItem } from '../../project/ProjectMemberItem';

interface Props {
  items: ProjectMemberDto[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  command: (item: any) => void;
  ref: React.RefObject<{ onKeyDown: (props: { event: React.KeyboardEvent }) => boolean }>;
}

export const ReviewToolEditorMentionList = forwardRef<
  { onKeyDown: (props: { event: React.KeyboardEvent }) => boolean },
  Props
>(({ items, command }, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = items[index];

    if (item) {
      command({ id: item.user?.id, label: item.user?.name });
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + items.length - 1) % items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setSelectedIndex(0), [items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: React.KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        event.stopPropagation();
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="rounded-large bg-background p-1 shadow-medium">
      <Listbox>
        {items.map((item, index) => (
          <ListboxItem
            key={item.id}
            className={cn({ 'bg-foreground-100 outline-focus': selectedIndex === index })}
            onClick={() => selectItem(index)}
          >
            <ProjectMemberItem member={item} />
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
});

ReviewToolEditorMentionList.displayName = 'ReviewToolEditorMentionList';
