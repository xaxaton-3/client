import { create } from 'zustand';
import { CreateLogParams, Log } from '@/types/logs';
import { createLog, getLogs } from '@/api/logs';

interface LogsStore {
  logs: Log[];
  isLoading: boolean;
  getLogs: (userId: number) => Promise<void>;
  createLog: (params: CreateLogParams) => Promise<void>;
}

export const useLogsStore = create<LogsStore>((set) => ({
  logs: [],
  isLoading: false,
  getLogs: async (userId) => {
    set({ isLoading: true });
    try {
      const logs = await getLogs(userId);
      set({ logs });
    } catch (error) {
    } finally {
      set({ isLoading: false });
    }
  },
  createLog: async (params) => {
    set({ isLoading: true });
    try {
      await createLog(params);
    } catch (error) {
    } finally {
      set({ isLoading: false });
    }
  },
}));
