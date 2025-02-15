import { Outlet } from 'react-router';
import Header from '@/components/header/Header';
import { message } from 'antd';
import { useEffect } from 'react';
import { NotificationStatus } from '@/types/notifications';
import { NoticeType } from 'antd/es/message/interface';
import { useNotificationsStore } from '@/store/notifications';
import { useUserStore } from '@/store/user';

const types: Record<NotificationStatus, NoticeType> = {
  [NotificationStatus.Success]: 'success',
  [NotificationStatus.Info]: 'info',
  [NotificationStatus.Warning]: 'warning',
  [NotificationStatus.Error]: 'error',
};

const MainLayout = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const notificationsStore = useNotificationsStore();
  const userStore = useUserStore();

  useEffect(() => {
    if (userStore.user) {
      notificationsStore.getNotifications(userStore.user.id, (notifications) => {
        notifications.forEach((notification) => {
          if (!notification.received) {
            messageApi.open({
              type: types[notification.status],
              content: notification.message,
            });
          }
        });
      });
    }
  }, [userStore.user]);

  return (
    <>
      {contextHolder}

      <Header />

      <Outlet context={{ messageApi }} />
    </>
  );
};

export default MainLayout;
