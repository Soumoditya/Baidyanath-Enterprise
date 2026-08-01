import { create } from "zustand";
import { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setAdmin: (isAdmin: boolean) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  isLoading: true,
  setUser: (user) => set({ user }),
  setAdmin: (isAdmin) => set({ isAdmin }),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set({ user: null, isAdmin: false, isLoading: false }),
}));
