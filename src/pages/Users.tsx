import { useEffect } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Card } from 'primereact/card';
import { useUsersStore } from '@/store/users';

const Users = () => {
  const users = useUsersStore((state) => state.users);
  const isLoading = useUsersStore((state) => state.isLoading);
  const getUsers = useUsersStore((state) => state.getUsers);

  useEffect(() => {
    getUsers();
  }, []);

  if (isLoading) {
    return <ProgressSpinner />;
  }

  return (
    <div className="flex flex-column gap-2">
      {users.map((user) => (
        <Card key={user.id}>
          {user.name} {user.username} {user.email}
        </Card>
      ))}
    </div>
  );
};

export default Users;
