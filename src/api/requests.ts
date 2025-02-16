import { api } from '@/core/api';
import { Request, RequestMeta } from '@/types/requests';

export const getRequests = async () => {
  const { data } = await api.get<Request[]>('/api/content/forms/list/');
  return data;
};

export const createRequest = async (meta: RequestMeta) => {
  const { data } = await api.post('/api/content/forms/create/', { meta });
  return data;
};

export const removeRequest = async (id: number) => {
  await api.post('/api/content/forms/delete/', { defender_id: id });
};
