import { Alert, AlertProps } from 'antd';
import { useNotificationsStore } from '@/store/notifications';
import { FC, useEffect } from 'react';
import { NotificationStatus } from '@/types/notifications';
import Loader from '../Loader';

const types: Record<NotificationStatus, AlertProps['type']> = {
  [NotificationStatus.Success]: 'success',
  [NotificationStatus.Info]: 'info',
  [NotificationStatus.Warning]: 'warning',
  [NotificationStatus.Error]: 'error',
};

const Notifications: FC<{ userId: number }> = ({ userId }) => {
  const notificationsStore = useNotificationsStore();

  useEffect(() => {
    notificationsStore.getNotifications(userId);
  }, []);

  if (notificationsStore.isLoading) {
    return <Loader />;
  }

  if (!notificationsStore.notifications.length) {
    return 'Уведомлений нет';
  }

  return (
    <div>
      {notificationsStore.notifications.map((notification) => (
        <Alert
          key={notification.id}
          message={notification.message}
          type={types[notification.status]}
          style={{ marginBottom: 8 }}
        />
      ))}
    </div>
  );
};

export default Notifications;
