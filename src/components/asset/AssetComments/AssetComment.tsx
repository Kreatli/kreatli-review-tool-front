import { addToast, Avatar, Button, Checkbox, Chip, cn, Tooltip } from '@heroui/react';
import Document from '@tiptap/extension-document';
import Mention from '@tiptap/extension-mention';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { generateHTML } from '@tiptap/react';
import React, { useEffect, useState } from 'react';

import { useFileStateContext } from '../../../contexts/File';
import { useSession } from '../../../hooks/useSession';
import { useDeleteAssetFileIdCommentCommentId, usePatchAssetFileIdCommentCommentId } from '../../../services/hooks';
import { AssetCommentDto, ProjectDto } from '../../../services/types';
import { formatRelativeTime } from '../../../utils/dates';
import { formatDuration } from '../../../utils/formatDuration';
import { useIsBreakpoint } from '../../tiptap/hooks/use-is-breakpoint';
import { Icon } from '../../various/Icon';

interface Props {
  fileId: string;
  project?: ProjectDto;
  comment: AssetCommentDto;
  isResolvable?: boolean;
  isResolved?: boolean;
  onUpdate: () => void;
  onRemove: () => void;
}

export const AssetComment = ({ fileId, project, comment, isResolvable = true, onUpdate, onRemove, ...rest }: Props) => {
  const { user } = useSession();
  const { createdBy, id, content, message, createdAt, timestamp, canvas } = comment;
  const { mutate: updateComment, isPending: isUpdatingComment } = usePatchAssetFileIdCommentCommentId();
  const { mutate: removeComment, isPending: isRemoving } = useDeleteAssetFileIdCommentCommentId();
  const { activeComment, replyingComment, setActiveComment, setReplyingComment } = useFileStateContext();

  const isMdScreen = useIsBreakpoint('max', 768);

  const commentRef = React.useRef<HTMLDivElement>(null);
  const [isResolved, setIsResolved] = useState(comment.isResolved || (rest.isResolved ?? false));

  useEffect(() => {
    setIsResolved(comment.isResolved || (rest.isResolved ?? false));
  }, [comment.isResolved, rest.isResolved]);

  useEffect(() => {
    if (isMdScreen) {
      return;
    }

    if (activeComment?.id === id) {
      commentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeComment, id]);

  const isProjectOwner = user && project?.createdBy?.id === user?.id;
  const isRemovable = user && (user?.id === createdBy.id || isProjectOwner);

  const handleRemove = () => {
    if (replyingComment === comment) {
      setReplyingComment(null);
    }

    if (activeComment === comment) {
      setActiveComment(null);
    }

    removeComment(
      { id: fileId, commentId: id },
      {
        onSuccess: onRemove,
        onError: () => {
          addToast({ title: 'Failed to remove the comment', color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  const handleCheckboxChange = () => {
    setIsResolved((resolved) => !resolved);
    updateComment(
      { id: fileId, commentId: id, requestBody: { isResolved: !isResolved } },
      {
        onSuccess: onUpdate,
      },
    );
  };

  const handleClick = () => {
    if (!comment.canvas) {
      return;
    }

    setActiveComment(comment);
    setReplyingComment(null);
  };

  const handleReply = () => {
    setReplyingComment(replyingComment === comment ? null : comment);
  };

  return (
    <div
      ref={commentRef}
      className={cn(
        'relative rounded-md border border-foreground-200 p-2 transition-[background-color,border,opacity] hover:bg-foreground-50',
        {
          'opacity-50': isResolved || id.includes('placeholder') || isUpdatingComment,
          'border border-foreground-400 bg-foreground-50 opacity-100': activeComment?.id === id,
          'border-primary-400 bg-primary-50 opacity-100 hover:bg-primary-50': comment === replyingComment,
        },
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <Avatar
            src={createdBy.avatar?.url ?? ''}
            size="sm"
            className="!size-6 shrink-0 cursor-pointer"
            fallback={
              <div className="select-none text-xs text-foreground-500">{createdBy.name?.slice(0, 1).toUpperCase()}</div>
            }
          />
          <div className="overflow-hidden text-ellipsis text-xs">{createdBy.name}</div>
          {!createdBy.id && (
            <Chip size="sm" variant="flat" color="primary" className="h-auto p-px">
              Guest
            </Chip>
          )}
        </div>
        <div className="z-10 flex items-center gap-1">
          {isRemovable && (
            <Tooltip content="Delete comment">
              <Button
                variant="light"
                radius="full"
                size="sm"
                isDisabled={project?.status !== 'active'}
                isLoading={isRemoving}
                isIconOnly
                onClick={handleRemove}
              >
                <Icon icon="trash" size={16} />
              </Button>
            </Tooltip>
          )}
          {isResolvable && (
            <Tooltip content={isResolved ? 'Unresolve comment' : 'Resolve comment'} offset={0}>
              <Checkbox
                radius="full"
                size="sm"
                isDisabled={project?.status !== 'active'}
                color="default"
                isSelected={isResolved}
                onChange={handleCheckboxChange}
              />
            </Tooltip>
          )}
        </div>
      </div>
      <button
        type="button"
        className="block whitespace-pre-wrap pb-2 text-left text-sm font-medium after:absolute after:inset-0"
        onClick={handleClick}
      >
        {(canvas?.shapes?.length ?? 0) > 0 && <Icon icon="paint" size={16} className="mr-1 inline text-primary" />}
        {timestamp?.[0] !== undefined && <span className="text-foreground-500">{formatDuration(timestamp[0])} </span>}
        {content ? (
          <div
            dangerouslySetInnerHTML={{
              __html: generateHTML(content, [
                Document,
                Paragraph,
                Text,
                Mention.configure({ HTMLAttributes: { class: 'text-primary bg-primary-50 px-1 rounded-md' } }),
              ]),
            }}
          />
        ) : (
          message
        )}
      </button>
      <div className="relative flex items-end justify-between">
        <button
          type="button"
          disabled={project && project.status !== 'active'}
          className={cn('flex items-center gap-0.5 text-xs text-foreground-500', {
            'text-primary': comment === replyingComment,
          })}
          onClick={handleReply}
        >
          <Icon icon="reply" size={14} />
          Reply
        </button>
        <div className="text-xs text-foreground-500">{formatRelativeTime(createdAt)}</div>
      </div>
    </div>
  );
};
