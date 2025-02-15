import { create } from 'zustand';
import { CreateNotificationParams, Notification } from '@/types/notifications';
import { createNotification, getNotifications } from '@/api/notifications';

interface NotificationsStore {
  notifications: Notification[];
  isLoading: boolean;
  getNotifications: (
    userId: number,
    callback?: (notifications: Notification[]) => void,
  ) => Promise<void>;
  createNotification: (params: CreateNotificationParams) => Promise<void>;
}

export const useNotificationsStore = create<NotificationsStore>((set) => ({
  notifications: [],
  isLoading: false,
  getNotifications: async (userId, callback) => {
    set({ isLoading: true });
    try {
      const notifications = await getNotifications(userId);
      const sortedNotifications = notifications.sort((a, b) => b.id - a.id);
      set({ notifications: sortedNotifications });
      callback?.(sortedNotifications);
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  createNotification: async (params) => {
    set({ isLoading: true });
    try {
      await createNotification(params);
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
