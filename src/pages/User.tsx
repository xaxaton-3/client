import { getUser } from '@/api/users';
import Container from '@/components/Container';
import Loader from '@/components/Loader';
import Logs from '@/components/logs/Logs';
import Notifications from '@/components/notifications/Notifications';
import User from '@/components/user/User';
import { User as IUser } from '@/types/user';
import { LeftOutlined } from '@ant-design/icons';
import { Button, Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router';

const UserPage = () => {
  const params = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const id = Number(params.id);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const user = await getUser(id);
      setUser(user);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const items: TabsProps['items'] = [
    {
      key: 'user',
      label: 'Пользователь',
      children: <User email={user?.email || ''} />,
    },
    {
      key: 'logs',
      label: 'История',
      children: <Logs userId={id} />,
    },
    {
      key: 'notifications',
      label: 'Уведомления',
      children: <Notifications userId={id} />,
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <NavLink to="/personal">
        <Button
          type="primary"
          shape="circle"
          icon={<LeftOutlined />}
        />
      </NavLink>

      <Tabs
        defaultActiveKey="user"
        items={items}
      />
    </Container>
  );
};

export default UserPage;
