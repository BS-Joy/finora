import { supabase } from "@/lib/supabase";
import { create } from "zustand";
import type { User, UserMetadata } from "@supabase/supabase-js";

type AuthState = {
  user: User | UserMetadata | null;
  setUser: (userData: User | UserMetadata | null) => void;
  getUser: () => Promise<void>;
};      

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),

  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error(error);
      return;
    }

    set({ user: data.user });
  },
}));