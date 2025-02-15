import { api } from '@/core/api';
import { CreateLogParams, Log } from '@/types/logs';

export const getLogs = async (userId: number) => {
  const { data } = await api.get<Log[]>(`/logs/list/${userId}/`);
  return data;
};

export const createLog = async (params: CreateLogParams) => {
  await api.post(`/logs/create/`, params);
};
