import { api } from '@/core/api';
import { Credentials } from '@/types/auth';
import { User } from '@/types/user';

export const login = async (credentials: Credentials) => {
  const { data } = await api.post<{
    token: string;
    user: User;
  }>('/api/login/', credentials);
  return data;
};

export const register = async (credentials: Credentials) => {
  await api.post('/api/register/', credentials);
};

export const auth = async () => {
  const { data } = await api.get<User>('/api/auth/');
  return data;
};
