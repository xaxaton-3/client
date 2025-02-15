import { create } from 'zustand';
import { RequestMeta, Request } from '@/types/requests';
import { createRequest, getRequests, removeRequest } from '@/api/requests';

interface RequestsStore {
  requests: Request[];
  isLoading: boolean;
  getRequests: () => Promise<void>;
  createRequest: (meta: RequestMeta) => Promise<void>;
  removeRequest: (id: number) => Promise<void>;
}

export const useRequestsStore = create<RequestsStore>((set) => ({
  requests: [],
  isLoading: false,
  getRequests: async () => {
    set({ isLoading: true });
    try {
      const requests = await getRequests();
      set({ requests });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  createRequest: async (params) => {
    set({ isLoading: true });
    try {
      await createRequest(params);
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  removeRequest: async (id) => {
    set({ isLoading: true });
    try {
      await removeRequest(id);
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
