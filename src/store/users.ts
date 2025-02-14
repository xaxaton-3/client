import { create } from 'zustand';
import { getUsers } from '@/api/users';
import { User } from '@/types/users';

interface UsersStore {
  users: User[];
  isLoading: boolean;
  getUsers: () => Promise<void>;
}

export const useUsersStore = create<UsersStore>((set) => ({
  users: [],
  isLoading: false,
  getUsers: async () => {
    set({ isLoading: true });
    try {
      const users = await getUsers();
      set({ users });
    } catch (error) {
    } finally {
      set({ isLoading: false });
    }
  },
}));
