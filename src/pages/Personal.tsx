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
        children: <User />,
      },
      {
        key: 'logs',
        label: 'История',
        children: <Logs />,
      },
      {
        key: 'notifications',
        label: 'Уведомления',
        children: <Notifications />,
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
