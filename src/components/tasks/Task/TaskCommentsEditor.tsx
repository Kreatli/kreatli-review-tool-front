'use client';

import { Avatar, Button, cn } from '@heroui/react';
import Document from '@tiptap/extension-document';
import Mention from '@tiptap/extension-mention';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { Placeholder } from '@tiptap/extensions';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import React, { useState } from 'react';

import { useSession } from '../../../hooks/useSession';
import { useGetProjectId } from '../../../services/hooks';
import { editorSuggestion } from '../../../utils/editor';
import { EditorSubmit } from '../../editor/EditorSubmit';
import { getSanitizedContent } from '../../tiptap/lib/tiptap-utils';
import { Icon } from '../../various/Icon';

const isDisabled = false;

interface Props {
  projectId: string;
  autoFocus?: boolean;
  isLoading?: boolean;
  onSubmit: (content: Record<string, unknown>) => void;
}

export const TaskCommentsEditor = ({ projectId, autoFocus = false, isLoading, onSubmit }: Props) => {
  const { user } = useSession();
  const { data: project } = useGetProjectId(projectId, { refetchOnMount: false });

  const [isInvalid, setIsInvalid] = useState(false);

  const activeMembers =
    project?.members.filter((member) => member.user && member.status === 'joined' && member.user.id !== user?.id) ?? [];

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Document,
      Placeholder.configure({
        placeholder: 'Add a comment...',
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: '!text-small !m-0',
        },
      }),
      Text.configure({}),
      Mention.configure({
        HTMLAttributes: {
          class: '',
        },
        suggestion: {
          items: ({ query }: { query: string }) => {
            return activeMembers
              .filter(
                (member) =>
                  member.user?.name.toLowerCase().includes(query.toLowerCase()) ||
                  member.user?.email.toLowerCase().includes(query.toLowerCase()),
              )
              .slice(0, 5);
          },
          ...editorSuggestion,
        },
        renderText({ options, node }) {
          return `${options.suggestion.char ?? '@'}${node.attrs.label ?? node.attrs.id}`;
        },
      }),
      EditorSubmit,
    ],
    editable: !isDisabled,
    onFocus: () => {
      setIsInvalid(false);
    },
    autofocus: autoFocus,
  });

  const handleSubmit = (editor?: Editor | null) => {
    const message = editor?.getText();

    if (!message?.trim()) {
      setIsInvalid(true);

      return;
    }

    const content = getSanitizedContent(editor?.getJSON());

    if (!content) {
      setIsInvalid(true);

      return;
    }

    editor?.commands.setContent('');

    onSubmit(content);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(editor);
    }
  };

  return (
    <div
      className={cn('relative flex min-h-14 gap-1 rounded-large bg-foreground-100 p-1.5 transition-colors', {
        'bg-danger-50': isInvalid,
      })}
    >
      <div>
        <Avatar
          src={user?.avatar?.url ?? ''}
          size="sm"
          className="pointer-events-none !size-6"
          name={user?.name}
          getInitials={(name) => name.charAt(0).toUpperCase()}
        />
      </div>
      <EditorContent
        editor={editor}
        className={cn('h-auto flex-1 overflow-auto [&>div]:h-full', {})}
        onKeyDown={handleKeyDown}
      />
      <div className="self-end">
        <Button
          size="sm"
          isIconOnly
          isDisabled={isDisabled}
          isLoading={isLoading}
          variant="light"
          radius="full"
          onClick={() => handleSubmit(editor)}
        >
          <Icon icon="send" size={20} />
        </Button>
      </div>
    </div>
  );
};
