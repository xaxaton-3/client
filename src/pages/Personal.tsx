import Container from '@/components/Container';
import Logs from '@/components/logs/Logs';
import Notifications from '@/components/notifications/Notifications';
import User from '@/components/user/User';
import { Tabs, TabsProps } from 'antd';

const Personal = () => {
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
