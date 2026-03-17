import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  username: string;
  login: (username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  username: '',
  login: (username: string) => set({ isLoggedIn: true, username }),
  logout: () => set({ isLoggedIn: false, username: '' }),
}));
