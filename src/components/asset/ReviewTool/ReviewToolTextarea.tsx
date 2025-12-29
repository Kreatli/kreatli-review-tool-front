/* eslint-disable @typescript-eslint/indent */
import { Avatar, Button, Popover, PopoverContent, PopoverTrigger, Textarea } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import React, { useRef, useState } from 'react';

import { useReviewToolCanvasShapesContext, useReviewToolContext } from '../../../contexts/ReviewTool';
import { useSession } from '../../../hooks/useSession';
import { usePostAssetFileIdComment } from '../../../services/hooks';
import { getAssetFileIdComments } from '../../../services/services';
import { AssetCommentsResponse } from '../../../services/types';
import { getIsMediaHtmlElement } from '../../../utils/getIsMediaHtmlElement';
import { Icon } from '../../various/Icon';
import { useFileStateContext } from '../../../contexts/File';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { ReviewToolTextareaAnonymousForm } from './ReviewToolTextareaAnonymousForm';

interface Props {
  shareableLinkId?: string;
  isDisabled?: boolean;
}

export const ReviewToolTextarea = ({ shareableLinkId, isDisabled = false }: Props) => {
  const [anonymousName, setAnonymousName] = useLocalStorage<string | undefined>({
    key: 'anonymousName',
    defaultValue: undefined,
  });
  const [isAnonymousFormVisible, setIsAnonymousFormVisible] = useState(false);
  const [message, setMessage] = React.useState('');
  const { fileRef, compareFileRef, setActiveTool } = useReviewToolContext();
  const { activeFile, compareFile, replyingComment, commentsRef, setActiveComment, setReplyingComment } =
    useFileStateContext();
  const { shapes, resetCanvas } = useReviewToolCanvasShapesContext();

  const { user } = useSession();
  const queryClient = useQueryClient();
  const { mutate } = usePostAssetFileIdComment();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isInvalid, setIsInvalid] = useState(false);

  const activeRef = activeFile?.id === compareFile?.id ? compareFileRef : fileRef;

  React.useEffect(() => {
    if (replyingComment && replyingComment.createdBy.name) {
      setMessage(`${replyingComment.createdBy.name}, `);
      textareaRef.current?.focus();
    }
  }, [replyingComment]);

  const handleSubmit = () => {
    if (!user && !anonymousName) {
      setIsAnonymousFormVisible(true);

      return;
    }

    addComment(user?.name ?? anonymousName);
  };

  const addComment = (name?: string) => {
    if (!activeFile || !message) {
      setIsInvalid(true);

      return;
    }

    setMessage('');
    resetCanvas();
    setActiveTool(null);
    setReplyingComment(null);
    textareaRef.current?.blur();

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

    mutate(
      {
        id: activeFile.id,
        requestBody: {
          message,
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
          queryClient.invalidateQueries({ queryKey: [getAssetFileIdComments.key, activeFile.id] });
        },
      },
    );
  };

  const handleTextareaKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleFocus = () => {
    setIsInvalid(false);
    setActiveComment(null);

    if (getIsMediaHtmlElement(fileRef.current)) {
      fileRef.current.pause();
    }
    if (getIsMediaHtmlElement(compareFileRef.current)) {
      compareFileRef.current.pause();
    }
  };

  const handleAnonymousFormSubmit = (name: string) => {
    setAnonymousName(name);
    setIsAnonymousFormVisible(false);
    addComment(name);
  };

  return (
    <form className="relative w-full max-w-screen-xl" onSubmit={handleSubmit}>
      <Textarea
        value={message}
        ref={textareaRef}
        classNames={{ input: 'ml-6 text-foreground' }}
        color={replyingComment ? 'primary' : 'default'}
        placeholder="Click here to start typing or drawing"
        isInvalid={isInvalid}
        rows={2}
        disabled={isDisabled}
        maxRows={2}
        onKeyDown={handleTextareaKeyDown}
        onFocus={handleFocus}
        onChange={(e) => setMessage(e.target.value)}
      />
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
            className="absolute bottom-1 right-1"
            onClick={handleSubmit}
          >
            <Icon icon="send" size={20} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3">
          <ReviewToolTextareaAnonymousForm onSubmit={handleAnonymousFormSubmit} />
        </PopoverContent>
      </Popover>
      {user ? (
        <Avatar
          src={user.avatar?.url ?? ''}
          size="sm"
          className="pointer-events-none absolute left-1.5 top-1.5 !size-6"
          fallback={
            <div className="select-none text-xs text-foreground-500">{user.name.slice(0, 1).toUpperCase()}</div>
          }
        />
      ) : (
        <div className="absolute left-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-foreground-300 text-xs text-foreground-500">
          {anonymousName?.slice(0, 1).toUpperCase() || <Icon icon="user" size={16} />}
        </div>
      )}
      {replyingComment && (
        <div className="absolute bottom-full left-2 right-2 flex items-center gap-1 pb-0.5 text-primary">
          <Icon icon="reply" size={16} className="shrink-0" />
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xs">{replyingComment.message}</div>
        </div>
      )}
    </form>
  );
};
