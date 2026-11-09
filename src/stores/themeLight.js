import { create } from "zustand";
import { persist } from "zustand/middleware";


// Function to get the initial theme based on system preference -----------> هام(important)
const getInitialTheme = () => {
    if (typeof window === "undefined") return "light";

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

export const useThemeLight = create(
    persist(
        (set) => ({
            themeLight: getInitialTheme(),  
            toggleThemeLight: () =>
                set((state) => ({
                    themeLight: state.themeLight === "dark" ? "light" : "dark",
                })),
        }),
        {
            name: 'theme-siarna', // unique name
            partialize: (state) => ({ themeLight: state.themeLight }), // only persist the themeLight property
        }
    ))