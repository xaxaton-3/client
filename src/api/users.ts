import { api } from '@/core/api';
import { User } from '@/types/users';

export const getUsers = async () => {
  const { data } = await api.get<User[]>('/users');
  return data;
};
