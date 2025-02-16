import { Alert, AlertProps } from 'antd';
import { useNotificationsStore } from '@/store/notifications';
import { useEffect } from 'react';
import { NotificationStatus } from '@/types/notifications';
import { useUserStore } from '@/store/user';
import Loader from '../Loader';

const types: Record<NotificationStatus, AlertProps['type']> = {
  [NotificationStatus.Success]: 'success',
  [NotificationStatus.Info]: 'info',
  [NotificationStatus.Warning]: 'warning',
  [NotificationStatus.Error]: 'error',
};

const Notifications = () => {
  const notificationsStore = useNotificationsStore();
  const userStore = useUserStore();

  useEffect(() => {
    notificationsStore.getNotifications(userStore.user!.id);
  }, []);

  if (notificationsStore.isLoading) {
    return <Loader />;
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
