'use client';

import { Avatar, Button, cn, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import Document from '@tiptap/extension-document';
import Mention from '@tiptap/extension-mention';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { Placeholder } from '@tiptap/extensions';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import { nanoid } from 'nanoid';
import { useMemo, useState } from 'react';
import React from 'react';

import { useFileStateContext } from '../../../contexts/File';
import { useReviewToolCanvasShapesContext, useReviewToolContext } from '../../../contexts/ReviewTool';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useSession } from '../../../hooks/useSession';
import { trackEvent } from '../../../lib/amplitude';
import { usePostAssetFileIdComment } from '../../../services/hooks';
import { getAssetFileIdComments } from '../../../services/services';
import { AssetCommentsResponse, ProjectDto } from '../../../services/types';
import { getIsMediaHtmlElement } from '../../../utils/getIsMediaHtmlElement';
import { Icon } from '../../various/Icon';
import { ReviewToolEditorSubmit } from './ReviewToolEditorSubmit';
import { reviewToolEditorSuggestion } from './reviewToolEditorSuggestion';
import { ReviewToolTextareaAnonymousForm } from './ReviewToolTextareaAnonymousForm';

interface Props {
  shareableLinkId?: string;
  isDisabled?: boolean;
  project?: ProjectDto;
}

export const ReviewToolEditor = ({ shareableLinkId, isDisabled = false, project }: Props) => {
  const { user } = useSession();
  const queryClient = useQueryClient();
  const { mutate } = usePostAssetFileIdComment();

  const { fileRef, compareFileRef, setActiveTool } = useReviewToolContext();
  const { activeFile, compareFile, replyingComment, commentsRef, setActiveComment, setReplyingComment } =
    useFileStateContext();
  const { shapes, resetCanvas } = useReviewToolCanvasShapesContext();

  const [isInvalid, setIsInvalid] = useState(false);
  const [isAnonymousFormVisible, setIsAnonymousFormVisible] = useState(false);

  const [anonymousName, setAnonymousName] = useLocalStorage<string | undefined>({
    key: 'anonymousName',
    defaultValue: undefined,
  });

  const activeRef = activeFile?.id === compareFile?.id ? compareFileRef : fileRef;

  const activeMembers = useMemo(() => {
    return (
      project?.members.filter((member) => member.user && member.status === 'joined' && member.user.id !== user?.id) ??
      []
    );
  }, [project]);

  const handleSubmit = (editor?: Editor | null) => {
    if (!user && !anonymousName) {
      setIsAnonymousFormVisible(true);

      return;
    }

    addComment(user?.name ?? anonymousName, editor);
  };

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Document,
      Placeholder.configure({
        placeholder: 'Click here to start typing or drawing...',
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
          ...reviewToolEditorSuggestion,
        },
        renderText({ options, node }) {
          return `${options.suggestion.char ?? '@'}${node.attrs.label ?? node.attrs.id}`;
        },
      }),
      ReviewToolEditorSubmit,
    ],
    editable: !isDisabled,
    onFocus: () => {
      setIsInvalid(false);
      setActiveComment(null);

      if (getIsMediaHtmlElement(fileRef.current)) {
        fileRef.current.pause();
      }
      if (getIsMediaHtmlElement(compareFileRef.current)) {
        compareFileRef.current.pause();
      }
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(editor);
    }
  };

  const handleAnonymousFormSubmit = (name: string) => {
    setAnonymousName(name);
    setIsAnonymousFormVisible(false);
    addComment(name, editor);
  };

  React.useEffect(() => {
    if (replyingComment && replyingComment.createdBy.name) {
      editor?.commands.setContent(`${replyingComment.createdBy.name}, `);
      editor?.commands.focus();
    }
  }, [editor]);

  const addComment = (name?: string, editor?: Editor | null) => {
    const message = editor?.getText();
    const content = editor?.getJSON();

    if (!activeFile || !message?.trim()) {
      setIsInvalid(true);

      return;
    }

    editor?.commands.setContent('');
    resetCanvas();
    setActiveTool(null);
    setReplyingComment(null);

    if (getIsMediaHtmlElement(fileRef.current)) {
      fileRef.current.play();
    }

    if (getIsMediaHtmlElement(compareFileRef.current)) {
      compareFileRef.current.play();
    }

    const parent = replyingComment?.parent ?? replyingComment?.id;

    const commentPlaceholder = {
      id: `placeholder-${nanoid()}`,
      message,
      content,
      createdAt: new Date().toString(),
      createdBy: user ?? {
        name,
      },
      isResolved: false,
      replies: [],
      parent,
      canvas: { shapes },
      timestamp: getIsMediaHtmlElement(activeRef.current)
        ? [activeRef.current.currentTime, activeRef.current.currentTime]
        : undefined,
    };

    queryClient.setQueryData<AssetCommentsResponse>(
      [getAssetFileIdComments.key, activeFile.id, { shareableLinkId: shareableLinkId ?? '' }],
      (data) => {
        const dataComments = data?.comments ?? [];

        if (commentPlaceholder.parent) {
          const parentComment = dataComments.find((comment) => comment.id === commentPlaceholder.parent);

          return {
            comments: dataComments.map((comment) =>
              parentComment === comment
                ? {
                    ...parentComment,
                    replies: [...parentComment.replies, commentPlaceholder],
                  }
                : comment,
            ),
          };
        }

        return {
          comments: [...dataComments, commentPlaceholder],
        };
      },
    );

    if (!parent) {
      setTimeout(() => {
        commentsRef.current?.scrollTo({ top: commentsRef.current.scrollHeight, behavior: 'smooth' });
      });
    }

    trackEvent('leave_comment_click');

    mutate(
      {
        id: activeFile.id,
        requestBody: {
          message,
          content,
          parent,
          name,
          shareableLinkId,
          timestamp: getIsMediaHtmlElement(activeRef.current)
            ? [activeRef.current.currentTime, activeRef.current.currentTime]
            : undefined,
          ...(shapes.length > 0 && { canvas: { shapes } }),
        },
      },
      {
        onSuccess: () => {
          trackEvent('leave_comment_success');
          queryClient.invalidateQueries({ queryKey: [getAssetFileIdComments.key, activeFile.id] });
        },
        onError: () => {
          trackEvent('leave_comment_failure');
        },
      },
    );
  };

  return (
    <div
      className={cn('relative flex h-14 w-full gap-1 rounded-large bg-foreground-100 p-1.5 transition-colors', {
        'bg-danger-50': isInvalid,
        'bg-primary-50': replyingComment,
      })}
    >
      <div>
        {user ? (
          <Avatar
            src={user.avatar?.url ?? ''}
            size="sm"
            className="pointer-events-none !size-6"
            fallback={
              <div className="select-none text-xs text-foreground-500">{user.name.slice(0, 1).toUpperCase()}</div>
            }
          />
        ) : (
          <div className="flex size-6 items-center justify-center rounded-full bg-foreground-300 text-xs text-foreground-500">
            {anonymousName?.slice(0, 1).toUpperCase() || <Icon icon="user" size={16} />}
          </div>
        )}
      </div>
      <EditorContent
        editor={editor}
        className={cn('h-10 flex-1 overflow-auto [&>div]:h-full', {})}
        onKeyDown={handleKeyDown}
      />
      <div className="self-end">
        <Popover
          isOpen={isAnonymousFormVisible}
          placement="top-end"
          onOpenChange={(open) => (open ? null : setIsAnonymousFormVisible(open))}
        >
          <PopoverTrigger>
            <Button
              size="sm"
              isIconOnly
              isDisabled={isDisabled}
              variant="light"
              radius="full"
              onClick={() => handleSubmit(editor)}
            >
              <Icon icon="send" size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3">
            <ReviewToolTextareaAnonymousForm onSubmit={handleAnonymousFormSubmit} />
          </PopoverContent>
        </Popover>
      </div>
      {replyingComment && (
        <div className="absolute bottom-full left-2 right-2 flex items-center gap-1 pb-0.5 text-primary">
          <Icon icon="reply" size={16} className="shrink-0" />
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xs">{replyingComment.message}</div>
        </div>
      )}
    </div>
  );
};
