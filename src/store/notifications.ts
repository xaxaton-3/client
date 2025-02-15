import { create } from 'zustand';
import { CreateNotificationParams, Notification } from '@/types/notifications';
import { createNotification, getNotifications } from '@/api/notifications';

interface NotificationsStore {
  notifications: Notification[];
  isLoading: boolean;
  getNotifications: (userId: number) => Promise<void>;
  createNotification: (params: CreateNotificationParams) => Promise<void>;
}

export const useNotificationsStore = create<NotificationsStore>((set) => ({
  notifications: [],
  isLoading: false,
  getNotifications: async (userId) => {
    set({ isLoading: true });
    try {
      const notifications = await getNotifications(userId);
      set({ notifications });
    } catch (error) {
    } finally {
      set({ isLoading: false });
    }
  },
  createNotification: async (params) => {
    set({ isLoading: true });
    try {
      await createNotification(params);
    } catch (error) {
    } finally {
      set({ isLoading: false });
    }
  },
}));
