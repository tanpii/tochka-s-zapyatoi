import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Theme } from './types';
import { RootState } from '@/app/store';
import { loadThemeFromLocalStorage } from './helpers/loadThemeFromLocalStorage';
import { LocalStorageKey } from '@/shared/config/consts';

type ThemeSliceState = {
    currentTheme: Theme;
};

const saveThemeToLocalStorage = (theme: Theme) => {
    localStorage.setItem(LocalStorageKey.Theme, theme);
};

const initialState: ThemeSliceState = {
    currentTheme: loadThemeFromLocalStorage(),
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<Theme>) => {
            state.currentTheme = action.payload;
            saveThemeToLocalStorage(action.payload);
            console.log('Current Theme:', state.currentTheme);
        },
    },
});

export const selectCurrentTheme = (state: RootState) => state.theme.currentTheme;

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;