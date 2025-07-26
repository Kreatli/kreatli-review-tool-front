import { Badge, Button, Popover, PopoverContent, PopoverTrigger, Spinner } from '@heroui/react';
import { Icon } from '../../various/Icon';
import { Notification } from './Notification';
import { useEffect, useMemo, useState } from 'react';
import { useGetNotifications, usePutNotificationsMarkAllAsRead } from '../../../services/hooks';
import { getNotifications } from '../../../services/services';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from '../../../hooks/useSession';
import { io } from 'socket.io-client';
import { NotificationsDto } from '../../../services/types';
import { EmptyState } from '../../various/EmptyState';

const NOTIFICATIONS_PARAMS = {
  limit: 50,
  offset: 0,
};

export const Notifications = () => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const { user } = useSession();
  const { data, isPending } = useGetNotifications(NOTIFICATIONS_PARAMS);
  const { mutate: markAllAsRead } = usePutNotificationsMarkAllAsRead();

  const queryClient = useQueryClient();

  const notifications = useMemo(() => {
    return data?.notifications ?? [];
  }, [data]);

  const unreadNotificationsCount = data?.unreadCount ?? 0;

  useEffect(() => {
    if (!user) {
      return;
    }

    const newSocket = io(`${process.env.API_URL}/notifications`, {
      path: '/socket.io',
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      auth: {
        userId: user.id,
      },
    });

    newSocket.on('connect', () => {
      console.log('connected');
    });

    newSocket.on('notification', (notification) => {
      queryClient.setQueryData([getNotifications.key, NOTIFICATIONS_PARAMS], (oldData: NotificationsDto) => {
        if (!oldData) {
          return oldData;
        }

        const shouldAdd = !oldData.notifications.some(({ id }) => id === notification.id);

        return {
          ...oldData,
          notifications: shouldAdd ? [notification, ...oldData.notifications] : oldData.notifications,
        };
      });
    });

    newSocket.on('unreadCount', (unreadCount: number) => {
      queryClient.setQueryData([getNotifications.key, NOTIFICATIONS_PARAMS], (oldData: any) => {
        if (!oldData) {
          return oldData;
        }

        return {
          ...oldData,
          unreadCount,
        };
      });
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  const handleMarkAllAsRead = () => {
    markAllAsRead(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getNotifications.key] });
        },
      },
    );
  };

  return (
    <Popover isOpen={isPopoverVisible} onOpenChange={setIsPopoverVisible} placement="bottom-end">
      <PopoverTrigger>
        <Button isIconOnly variant="light" radius="full" className="-mr-2">
          <Badge
            size="sm"
            color="danger"
            content={unreadNotificationsCount}
            isInvisible={unreadNotificationsCount === 0}
          >
            <Icon icon="bell" size={18} />
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 max-w-full p-0 items-start overflow-hidden">
        <div className="py-2 flex items-center justify-between pl-4 pr-2 w-full border-b border-foreground-200">
          <h4 className="text-large font-semibold">Notifications</h4>
          <div className="flex gap-2">
            <Button size="sm" variant="flat" isDisabled={unreadNotificationsCount === 0} onClick={handleMarkAllAsRead}>
              <Icon icon="check" size={16} />
              Mark all as read
            </Button>
            <Button size="sm" isIconOnly variant="light" radius="full" onClick={() => setIsPopoverVisible(false)}>
              <Icon icon="cross" size={20} className="text-foreground-500" />
            </Button>
          </div>
        </div>
        {isPending ? (
          <div className="w-full flex justify-center items-center p-4 min-h-32">
            <Spinner size="sm" />
          </div>
        ) : notifications.length > 0 ? (
          <div className="max-h-[min(calc(100vh-120px),500px)] w-full overflow-auto">
            {notifications.map((notification) => (
              <Notification key={notification.id} notification={notification} />
            ))}
          </div>
        ) : (
          <EmptyState size="sm" icon="bell" title="No notifications" text="You have no notifications" />
        )}
      </PopoverContent>
    </Popover>
  );
};
