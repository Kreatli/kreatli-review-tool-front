import { addToast, Avatar, Button, cn, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import Document from '@tiptap/extension-document';
import Mention from '@tiptap/extension-mention';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { generateHTML } from '@tiptap/react';
import { nanoid } from 'nanoid';
import { useState } from 'react';

import { useSession } from '../../../hooks/useSession';
import { useDeleteTaskIdCommentCommentId, usePostTaskIdComment } from '../../../services/hooks';
import { getTaskIdComments } from '../../../services/services';
import { TaskCommentDto, TaskCommentsResponse, UserDto } from '../../../services/types';
import { formatRelativeTime } from '../../../utils/dates';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { TaskCommentsEditor } from './TaskCommentsEditor';

interface Props {
  id: string;
  content: Record<string, unknown>;
  createdAt: string;
  user?: UserDto;
  projectId: string;
  taskId: string;
  replies?: TaskCommentDto[];
  parentCommentId?: string;
  onReply?: () => void;
}

export const TaskComment = ({
  id,
  projectId,
  taskId,
  content,
  createdAt,
  user,
  replies = [],
  parentCommentId,
  onReply,
}: Props) => {
  const { user: sessionUser } = useSession();
  const queryClient = useQueryClient();

  const [isReplying, setIsReplying] = useState(false);
  const [isDeletePopoverOpen, setIsDeletePopoverOpen] = useState(false);

  const { mutate: deleteComment, isPending: isDeletingComment } = useDeleteTaskIdCommentCommentId();
  const { mutate: createReply, isPending: isCreatingReply } = usePostTaskIdComment();

  const handleDelete = () => {
    deleteComment(
      { id: taskId, commentId: id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getTaskIdComments.key, taskId] });
          setIsDeletePopoverOpen(false);
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  const handleSubmitReply = (content: Record<string, unknown>) => {
    const commentPlaceholder = {
      id: `placeholder-${nanoid()}`,
      content,
      createdAt: new Date().toString(),
      createdBy: sessionUser,
      isResolved: false,
      replies: [],
      parent: parentCommentId,
    };

    queryClient.setQueryData<TaskCommentsResponse>([getTaskIdComments.key, taskId], (data) => {
      const dataComments = data?.comments ?? [];

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
    });

    requestAnimationFrame(() => {
      setIsReplying(false);
    });

    createReply(
      { id: taskId, requestBody: { content, parent: parentCommentId } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getTaskIdComments.key, taskId] });
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  const isSaving = id.includes('placeholder');

  return (
    <div className={cn('flex items-start gap-2', { 'opacity-50': isSaving })}>
      <Avatar
        src={user?.avatar?.url}
        size="sm"
        name={user?.name}
        className="shrink-0"
        getInitials={(name) => name.charAt(0).toUpperCase()}
      />
      <div className="w-full">
        <div className="flex items-baseline gap-1">
          <div className="text-sm font-semibold">{user?.name}</div>
          <div className="text-xs text-foreground-500">{formatRelativeTime(createdAt)}</div>
        </div>
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html: generateHTML(content, [
              Document,
              Paragraph,
              Text,
              Mention.configure({ HTMLAttributes: { class: 'text-primary bg-primary-50 px-1 rounded-md' } }),
            ]),
          }}
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isSaving}
            className={cn(
              'flex items-center gap-1 text-xs text-foreground-500 underline-offset-2 hover:text-foreground hover:underline',
              {
                underline: isReplying,
              },
            )}
            onClick={onReply ?? (() => setIsReplying((replying) => !replying))}
          >
            {isReplying ? 'Cancel' : 'Reply'}
          </button>
          <Popover
            placement="right-start"
            backdrop="opaque"
            isOpen={isDeletePopoverOpen}
            onOpenChange={setIsDeletePopoverOpen}
          >
            <PopoverTrigger>
              <button
                type="button"
                disabled={isSaving}
                className="flex items-center gap-1 text-xs text-foreground-500 underline-offset-2 hover:text-foreground hover:underline"
              >
                Delete
              </button>
            </PopoverTrigger>
            <PopoverContent className="px-4 py-3">
              <div className="mb-4 text-medium font-semibold">Are you sure you want to delete this comment?</div>
              <div className="flex w-full justify-end gap-2">
                <Button variant="light" onClick={() => setIsDeletePopoverOpen(false)}>
                  Cancel
                </Button>
                <Button color="danger" variant="flat" isLoading={isDeletingComment} onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {replies.length > 0 && (
          <div className="flex flex-col gap-2 pt-2">
            {replies.map((reply) => (
              <TaskComment
                key={reply.id}
                id={reply.id}
                projectId={projectId}
                taskId={taskId}
                content={reply.content}
                createdAt={reply.createdAt}
                user={reply.createdBy}
                onReply={() => setIsReplying(true)}
              />
            ))}
          </div>
        )}
        {isReplying && (
          <div className="w-full pt-2">
            <TaskCommentsEditor
              projectId={projectId}
              autoFocus
              isLoading={isCreatingReply}
              onSubmit={handleSubmitReply}
            />
          </div>
        )}
      </div>
    </div>
  );
};
