import { api } from '@/core/api';
import { User } from '@/types/user';

export const getUsers = async () => {
  const { data } = await api.get<User[]>('/api/users/list/');
  return data;
};
