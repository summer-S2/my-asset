import { emailLogin, googleLogin, logout } from "./../services/firebase";
import type { User } from "firebase/auth";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  loginWithGoogle: () => Promise<void>;
  logoutUser: () => Promise<void>;
  loginWithEmail: (email: string, pw: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  loginWithGoogle: async () => {
    try {
      const user = await googleLogin();
      set({ user });
    } catch (error) {
      throw error;
    }
  },
  loginWithEmail: async (email, pw) => {
    try {
      const user = await emailLogin(email, pw);
      set({ user });
    } catch (error) {
      throw error;
    }
  },

  logoutUser: async () => {
    try {
      await logout();
    } catch (error) {
      throw error;
    }
  },
}));
