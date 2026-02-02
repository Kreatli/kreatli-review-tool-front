import { cn, Link } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import NextLink from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useDebounceCallback } from '../../../hooks/useDebounceCallback';
import { usePutNotificationId } from '../../../services/hooks';
import { getNotifications } from '../../../services/services';
import { NotificationDto } from '../../../services/types';
import { formatRelativeTime } from '../../../utils/dates';
import { Icon, IconType } from '../../various/Icon';

interface Props {
  notification: NotificationDto;
}

export const Notification = ({ notification }: Props) => {
  const [isRead, setIsRead] = useState(notification.isRead);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsRead(notification.isRead);
  }, [notification.isRead]);

  const queryClient = useQueryClient();
  const { mutate: updateNotification } = usePutNotificationId();

  const debouncedUpdateNotification = useDebounceCallback(updateNotification, 300);

  const handleClick = () => {
    setIsRead(!isRead);

    debouncedUpdateNotification(
      { id: notification.id, requestBody: { isRead: !isRead } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getNotifications.key] });
        },
      },
    );
  };

  const handleLinkClick = useCallback(() => {
    if (!isRead) {
      setIsRead(true);

      updateNotification(
        { id: notification.id, requestBody: { isRead: true } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [getNotifications.key] });
          },
        },
      );
    }
  }, [isRead, notification.id, queryClient, updateNotification]);

  const notificationTitle = useMemo(() => {
    if (notification.type === 'file_assigned') {
      return 'File assignment';
    }

    if (notification.type === 'file_status_changed') {
      return 'File status changed';
    }

    if (notification.type === 'project_member_removed') {
      return 'Removed from project';
    }

    if (notification.type === 'file_comment_added') {
      return 'Comment added';
    }

    if (notification.type === 'file_comment_reply') {
      return 'Comment reply';
    }

    if (notification.type === 'file_comment_resolve') {
      return 'Comment resolved';
    }

    if (notification.type === 'file_comment_mention') {
      return 'Mention in comment';
    }

    if (notification.type === 'project_member_left') {
      return 'Project member left';
    }

    if (notification.type === 'chat_message_unread') {
      return 'You have unread messages';
    }

    if (notification.type === 'project_member_joined') {
      return 'New project member';
    }

    if (notification.type === 'file_new_version_uploaded') {
      return 'New version uploaded';
    }

    return 'Notification';
  }, [notification.type]);

  const notificationDescription = useMemo(() => {
    const { fileId, fileName, projectId, projectName, userName, commentMessage, chatId, chatName, commentId } =
      notification.data;

    if (notification.type === 'file_assigned') {
      return (
        <>
          {userName} has assigned you to the{' '}
          <Link
            as={NextLink}
            href={`/project/${projectId}/assets/${fileId}`}
            size="sm"
            className="z-10 inline break-all"
            underline="hover"
            onClick={handleLinkClick}
          >
            {fileName}
          </Link>{' '}
          file.
        </>
      );
    }

    if (notification.type === 'file_status_changed') {
      return (
        <>
          {userName} has changed the status of the{' '}
          <Link
            as={NextLink}
            href={`/project/${projectId}/assets/${fileId}`}
            size="sm"
            className="z-10 inline break-all"
            underline="hover"
            onClick={handleLinkClick}
          >
            {fileName}
          </Link>{' '}
          file.
        </>
      );
    }

    if (notification.type === 'project_member_removed') {
      return <>You were removed from the "{projectName}" project.</>;
    }

    if (notification.type === 'file_comment_added') {
      const commentMessagePreview =
        commentMessage && commentMessage.length > 25 ? `${commentMessage.slice(0, 25)}...` : commentMessage;

      return (
        <>
          {userName} has added a comment to the{' '}
          <Link
            as={NextLink}
            href={`/project/${projectId}/assets/${fileId}`}
            size="sm"
            className="z-10 inline break-all"
            underline="hover"
            onClick={handleLinkClick}
          >
            {fileName}
          </Link>{' '}
          file: "{commentMessagePreview}".
        </>
      );
    }

    if (notification.type === 'file_comment_reply') {
      const commentMessagePreview =
        commentMessage && commentMessage.length > 25 ? `${commentMessage.slice(0, 25)}...` : commentMessage;

      return (
        <>
          {userName} has replied to comment "{commentMessagePreview}" on the{' '}
          <Link
            as={NextLink}
            href={`/project/${projectId}/assets/${fileId}`}
            size="sm"
            className="z-10 inline break-all"
            underline="hover"
            onClick={handleLinkClick}
          >
            {fileName}
          </Link>{' '}
          file.
        </>
      );
    }

    if (notification.type === 'file_comment_resolve') {
      const commentMessagePreview =
        commentMessage && commentMessage.length > 25 ? `${commentMessage.slice(0, 25)}...` : commentMessage;

      return (
        <>
          {userName} has resolved comment "{commentMessagePreview}" on the{' '}
          <Link
            as={NextLink}
            href={`/project/${projectId}/assets/${fileId}`}
            size="sm"
            className="z-10 inline break-all"
            underline="hover"
            onClick={handleLinkClick}
          >
            {fileName}
          </Link>{' '}
          file.
        </>
      );
    }

    if (notification.type === 'file_comment_mention') {
      return (
        <>
          {userName} mentioned you in a comment on the{' '}
          <Link
            as={NextLink}
            href={`/project/${projectId}/assets/${fileId}?commentId=${commentId}`}
            size="sm"
            className="z-10 inline break-all"
            underline="hover"
            onClick={handleLinkClick}
          >
            {fileName}
          </Link>{' '}
          file.
        </>
      );
    }

    if (notification.type === 'project_member_left') {
      return (
        <>
          {userName} has left the{' '}
          <Link
            as={NextLink}
            href={`/project/${projectId}`}
            size="sm"
            className="z-10 inline break-all"
            underline="hover"
            onClick={handleLinkClick}
          >
            {projectName}
          </Link>{' '}
          project.
        </>
      );
    }

    if (notification.type === 'chat_message_unread') {
      return (
        <>
          {userName} has sent a new message in the{' '}
          <Link
            as={NextLink}
            href={`/project/${projectId}/chat?conversationId=${chatId}`}
            size="sm"
            className="z-10 inline break-all"
            underline="hover"
            onClick={handleLinkClick}
          >
            {chatName || 'chat'}
          </Link>
          .
        </>
      );
    }

    if (notification.type === 'project_member_joined') {
      return (
        <>
          {userName} just accepted your invitation and joined the{' '}
          <Link
            as={NextLink}
            href={`/project/${projectId}`}
            size="sm"
            className="z-10 inline break-all"
            underline="hover"
            onClick={handleLinkClick}
          >
            {projectName}
          </Link>{' '}
          project.
        </>
      );
    }

    if (notification.type === 'file_new_version_uploaded') {
      return (
        <>
          {userName} uploaded new file version{' '}
          <Link
            as={NextLink}
            href={`/project/${projectId}/assets/${fileId}`}
            size="sm"
            className="z-10 inline break-all"
            underline="hover"
            onClick={handleLinkClick}
          >
            {fileName}
          </Link>
        </>
      );
    }

    return '';
  }, [notification.data, notification.type, handleLinkClick]);

  const notificationIcon = useMemo((): IconType => {
    if (notification.type === 'file_assigned') {
      return 'file';
    }

    if (notification.type === 'file_status_changed') {
      return 'file';
    }

    if (notification.type === 'file_comment_added') {
      return 'chat';
    }

    if (notification.type === 'file_comment_reply') {
      return 'chat';
    }

    if (notification.type === 'file_comment_resolve') {
      return 'checkCircle';
    }

    if (notification.type === 'file_comment_mention') {
      return 'chat';
    }

    if (notification.type === 'project_member_removed') {
      return 'crossCircle';
    }

    if (notification.type === 'project_member_left') {
      return 'crossCircle';
    }

    if (notification.type === 'project_member_joined') {
      return 'userPlus';
    }

    if (notification.type === 'chat_message_unread') {
      return 'chat';
    }

    if (notification.type === 'file_new_version_uploaded') {
      return 'versions';
    }

    return 'bell';
  }, [notification.type]);

  return (
    <div
      className={cn(
        'relative border-b border-foreground-200 px-4 py-3 transition-colors last:border-none hover:bg-foreground-100',
        {
          'text-foreground-500': isRead,
        },
      )}
    >
      <div className="mb-1 flex items-center gap-2">
        <div className={cn('text-primary transition-colors', { 'text-foreground-400': isRead })}>
          <Icon icon={notificationIcon} size={16} />
        </div>
        <div className="text-small font-semibold">{notificationTitle}</div>
        <div className="ml-auto">
          <button
            type="button"
            className="flex size-3 items-center justify-center rounded-full border-2 border-foreground-200 after:absolute after:inset-0"
            onClick={handleClick}
          >
            <div className={cn('size-1.5 rounded-full bg-danger transition-colors', { 'bg-foreground-200': isRead })} />
          </button>
        </div>
      </div>
      <div className="break-words text-small">{notificationDescription}</div>
      <div className="mt-1.5 text-tiny text-foreground-500">{formatRelativeTime(notification.createdAt)}</div>
    </div>
  );
};
