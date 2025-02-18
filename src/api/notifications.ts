import { api } from '@/core/api';
import { CreateNotificationParams, Notification } from '@/types/notifications';

export const getNotifications = async (userId: number) => {
  const { data } = await api.get<Notification[]>(`/api/notification/list/${userId}/`);
  return data;
};

export const createNotification = async (params: CreateNotificationParams) => {
  await api.post(`/api/notification/create/`, params);
};
