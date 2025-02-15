import { create } from 'zustand';
// import { getLogs } from '@/api/logs';
import { Log } from '@/types/logs';

interface LogsStore {
  logs: Log[];
  isLoading: boolean;
}

export const useLogsStore = create<LogsStore>((set) => ({
  logs: [],
  isLoading: false,
  // getLogs: async () => {
  //   set({ isLoading: true });
  //   try {
  //     const logs = await getLogs();
  //     set({ logs });
  //   } catch (error) {
  //   } finally {
  //     set({ isLoading: false });
  //   }
  // },
}));
