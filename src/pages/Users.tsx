import { useEffect } from 'react';
import { useUsersStore } from '@/store/users';

const Users = () => {
  const users = useUsersStore((state) => state.users);
  const isLoading = useUsersStore((state) => state.isLoading);
  const getUsers = useUsersStore((state) => state.getUsers);

  useEffect(() => {
    getUsers();
  }, []);

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} {user.username} {user.email}
        </li>
      ))}
    </ul>
  );
};

export default Users;
