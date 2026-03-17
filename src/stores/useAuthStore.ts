import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  username: string;
  login: (username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      username: '',
      login: (username: string) => set({ isLoggedIn: true, username }),
      logout: () => set({ isLoggedIn: false, username: '' }),
    }),
    { name: 'auth-storage' }
  )
);
