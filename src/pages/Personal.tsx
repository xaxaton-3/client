import { useMemo } from 'react';
import Container from '@/components/Container';
import Logs from '@/components/logs/Logs';
import Notifications from '@/components/notifications/Notifications';
import User from '@/components/user/User';
import { Tabs, TabsProps } from 'antd';
import { useUserStore } from '@/store/user';
import Users from '@/components/user/Users';

const Personal = () => {
  const userStore = useUserStore();

  const items = useMemo(() => {
    const items: TabsProps['items'] = [
      {
        key: 'user',
        label: 'Пользователь',
        children: <User email={userStore.user!.email} />,
      },
      {
        key: 'logs',
        label: 'История',
        children: <Logs userId={userStore.user!.id} />,
      },
      {
        key: 'notifications',
        label: 'Уведомления',
        children: <Notifications userId={userStore.user!.id} />,
      },
    ];

    if (userStore.user?.is_superuser) {
      items.push({
        key: 'users',
        label: 'Пользователи',
        children: <Users />,
      });
    }

    return items;
  }, [userStore.user]);

  return (
    <Container>
      <Tabs
        defaultActiveKey="user"
        items={items}
      />
    </Container>
  );
};

export default Personal;
