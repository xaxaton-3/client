import { Alert, AlertProps, Flex, Spin } from 'antd';
import { formatDateWithTime } from '@/utils/date';
import { useNotificationsStore } from '@/store/notifications';
import { useEffect } from 'react';
import { NotificationStatus } from '@/types/notifications';

const types: Record<NotificationStatus, AlertProps['type']> = {
  [NotificationStatus.Success]: 'success',
  [NotificationStatus.Info]: 'info',
  [NotificationStatus.Warning]: 'warning',
  [NotificationStatus.Error]: 'error',
};

const Notifications = () => {
  const notificationsStore = useNotificationsStore();

  useEffect(() => {
    notificationsStore.getNotifications(1);
  }, []);

  if (notificationsStore.isLoading) {
    return <Spin size="large" />;
  }

  if (!notificationsStore.notifications.length) {
    return (
      <div>
        {Array.from({ length: 10 }).map((_, i) => (
          <Alert
            message={
              <Flex justify="space-between">
                <span>{i % 2 ? 'Ваша заявка одобрена' : 'Ваша заявка отклонена'}</span>
                <span>{formatDateWithTime(undefined)}</span>
              </Flex>
            }
            type={i % 2 ? 'success' : 'error'}
            style={{ marginBottom: 8 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      {notificationsStore.notifications.map((notification) => (
        <Alert
          message={
            <Flex justify="space-between">
              <span>{notification.message}</span>
              <span>{formatDateWithTime(undefined)}</span>
            </Flex>
          }
          type={types[notification.status]}
          style={{ marginBottom: 8 }}
        />
      ))}
    </div>
  );
};

export default Notifications;
