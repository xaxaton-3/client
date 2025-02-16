import { getUsers } from '@/api/users';
import Loader from '@/components/Loader';
import { User } from '@/types/user';
import { formatDate } from '@/utils/date';
import { Button, Flex, List, Tag } from 'antd';
import { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const users = await getUsers();
      setUsers(users);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <a
        href={`${import.meta.env.VITE_API_URL}/admin/`}
        target="_blank"
        style={{ display: 'block', marginBottom: 16 }}
      >
        <Button>Кабинет администратора</Button>
      </a>

      <List
        bordered
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <Flex
              vertical
              gap={8}
              style={{ width: '100%' }}
            >
              <Flex justify="space-between">
                <span>{user.email}</span>
                {user.is_superuser && <Tag color="green">Администратор</Tag>}
              </Flex>
              <span>Дата регистрации: {formatDate(user.date_joined)}</span>
            </Flex>
          </List.Item>
        )}
      />
    </>
  );
};

export default Users;
