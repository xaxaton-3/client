import { useUserStore } from '@/store/user';

const User = () => {
  const userStore = useUserStore();

  return <div>{userStore.user?.email}</div>;
};

export default User;
