import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
    persist((set) => {
        return {
            accessToken: null,
            setAccessToken: (accessToken) => set({ accessToken }),
            clearAccessToken: () => set({ accessToken: null }),
        }
    },
        {
            name: "sairna-auth"
        }
    )
)