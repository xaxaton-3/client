import { auth, login, register } from '@/api/auth';
import { Credentials } from '@/types/auth';
import { User } from '@/types/user';
import { create } from 'zustand';

interface UserStore {
  user: User | null;
  isLoading: boolean;
  login: (credentials: Credentials) => Promise<void>;
  register: (credentials: Credentials) => Promise<void>;
  auth: () => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,
  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const { token, user } = await login(credentials);
      localStorage.setItem('token', token);
      set({ user });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  register: async (credentials) => {
    set({ isLoading: true });
    try {
      await register(credentials);
    } catch (error) {
    } finally {
      set({ isLoading: false });
    }
  },
  auth: async () => {
    set({ isLoading: true });
    try {
      const user = await auth();
      set({ user });
    } catch (error) {
    } finally {
      set({ isLoading: false });
    }
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem('token');
  },
}));
