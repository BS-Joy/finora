import { supabase } from "@/lib/supabase";
import { create } from "zustand";
import type { User, UserMetadata } from "@supabase/supabase-js";
import { currencies } from "@/utils";

interface UserInterface extends UserMetadata {
  id: string;
}

interface Profile {
  id: string;
  user_id: string;
  currency: string;
  created_at: string;
}

type AuthState = {
  user: User | UserMetadata | UserInterface | null;
  setUser: (userData: User | UserMetadata | UserInterface | null) => void;
  getUser: () => Promise<void>;
  createUserProfile: () => Promise<void>;
  userProfile: Profile | null;
  setUserProfile: (profile: Profile | null) => void;
};      

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  userProfile: null,
  setUserProfile: (profile) => set({ userProfile: profile }),
  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error(error);
      return;
    }

    set({ user: data.user });
  },
  createUserProfile: async () => {
    const {user} = get();
    const {data, error} = await supabase.from('profiles').select('*').eq('user_id', user?.id);

    if (error) {
      console.error(error);
      return;
    }

    if (!data || data.length === 0) {
      // create profile
      const { error: insertError } = await supabase.from('profiles').insert({
        user_id: user?.id,
        currency: currencies[0].code,
      });

      if (insertError) {
        console.error(insertError);
      }
    }
  }
}));