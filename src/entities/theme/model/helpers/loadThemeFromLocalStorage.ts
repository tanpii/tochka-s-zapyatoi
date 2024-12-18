import { LocalStorageKey } from "@/shared/config/consts";
import { Theme } from "../types";

export const loadThemeFromLocalStorage = (): Theme => {
    const storedTheme = localStorage.getItem(LocalStorageKey.Theme);
    if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};