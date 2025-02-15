import Logs from '@/components/logs/Logs';
import Notifications from '@/components/notifications/Notifications';
import { Card, Tabs, TabsProps } from 'antd';

const Personal = () => {
  const items: TabsProps['items'] = [
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
    <Card style={{ maxWidth: 500, margin: '0 auto' }}>
      <Tabs
        defaultActiveKey="logs"
        items={items}
      />
    </Card>
  );
};

export default Personal;
