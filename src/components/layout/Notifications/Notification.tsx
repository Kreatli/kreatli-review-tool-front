import { cn, Link } from '@heroui/react';
import { Icon, IconType } from '../../various/Icon';
import { formatRelativeTime } from '../../../utils/dates';
import { NotificationDto } from '../../../services/types';
import { useEffect, useMemo, useState } from 'react';
import { useGetNotifications, usePutNotificationId } from '../../../services/hooks';
import { useDebounceCallback } from '../../../hooks/useDebounceCallback';
import NextLink from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { getNotifications } from '../../../services/services';

interface Props {
  notification: NotificationDto;
}

export const Notification = ({ notification }: Props) => {
  const [isRead, setIsRead] = useState(notification.isRead);

  useEffect(() => {
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

  const handleLinkClick = () => {
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
  };

  const notificationTitle = useMemo(() => {
    if (notification.type === 'file_assigned') {
      return 'File assignment';
    }

    if (notification.type === 'file_status_changed') {
      return 'File status changed';
    }

    if (notification.type === 'project_invitation') {
      return 'Project invitation';
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

    if (notification.type === 'project_member_left') {
      return 'Project member left';
    }

    return 'Notification';
  }, [notification.type, notification.data]);

  const notificationDescription = useMemo(() => {
    const { fileId, fileName, projectId, projectName, userId, userName, commentId, commentMessage } = notification.data;

    if (notification.type === 'file_assigned') {
      return (
        <>
          {userName} has assigned you to the{' '}
          <Link
            as={NextLink}
            href={`/project/${projectId}/assets/${fileId}`}
            size="sm"
            className="inline break-all z-10"
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
            className="inline break-all z-10"
            underline="hover"
            onClick={handleLinkClick}
          >
            {fileName}
          </Link>{' '}
          file.
        </>
      );
    }

    if (notification.type === 'project_invitation') {
      return (
        <>
          {userName} has invited you to the{' '}
          <Link
            as={NextLink}
            href={`/project/${projectId}`}
            size="sm"
            className="inline break-all z-10"
            underline="hover"
            onClick={handleLinkClick}
          >
            {projectName}
          </Link>{' '}
          project.
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
            className="inline break-all z-10"
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
            className="inline break-all z-10"
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
            className="inline break-all z-10"
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
            className="inline break-all z-10"
            underline="hover"
            onClick={handleLinkClick}
          >
            {projectName}
          </Link>{' '}
          project.
        </>
      );
    }

    return '';
  }, [notification.type, notification.data]);

  const notificationIcon = useMemo((): IconType => {
    if (notification.type === 'file_assigned') {
      return 'file';
    }

    if (notification.type === 'file_status_changed') {
      return 'file';
    }

    if (notification.type === 'file_comment_added') {
      return 'conversation';
    }

    if (notification.type === 'file_comment_reply') {
      return 'conversation';
    }

    if (notification.type === 'file_comment_resolve') {
      return 'checkCircle';
    }

    if (notification.type === 'project_invitation') {
      return 'userPlus';
    }

    if (notification.type === 'project_member_removed') {
      return 'crossCircle';
    }

    if (notification.type === 'project_member_left') {
      return 'crossCircle';
    }

    return 'bell';
  }, [notification.type]);

  return (
    <div
      className={cn(
        'relative py-3 px-4 last:border-none border-b transition-colors hover:bg-foreground-100 border-foreground-200',
        {
          'text-foreground-500': isRead,
        },
      )}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className={cn('text-primary transition-colors', { 'text-foreground-400': isRead })}>
          <Icon icon={notificationIcon} size={16} />
        </div>
        <div className="text-small font-semibold">{notificationTitle}</div>
        <div className="ml-auto">
          <button
            type="button"
            className="size-3 after:absolute after:inset-0 flex items-center justify-center rounded-full border-2 border-foreground-200"
            onClick={handleClick}
          >
            <div className={cn('size-1.5 transition-colors bg-danger rounded-full', { 'bg-foreground-200': isRead })} />
          </button>
        </div>
      </div>
      <div className="text-small break-words">{notificationDescription}</div>
      <div className="text-tiny text-foreground-500 mt-1.5">{formatRelativeTime(notification.createdAt)}</div>
    </div>
  );
};
