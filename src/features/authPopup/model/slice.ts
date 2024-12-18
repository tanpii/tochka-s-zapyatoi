import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { LocalStorageKey } from '@/shared/config/consts';
import { SignInParams, signInUserMutation, SignUpParams, signUpUserMutation } from '@/shared/api/auth';
import { NavigateFunction } from 'react-router-dom';

interface AuthorizationState {
    isOpen: boolean;
    isLoading: boolean;
    isAuthorized: boolean;
}

const initialState: AuthorizationState = {
    isOpen: false,
    isLoading: false,
    isAuthorized: false,
};

export const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        openAuthPopup(state) {
            state.isOpen = true;
        },
        closeAuthPopup(state) {
            state.isOpen = false;
        },
        setIsAuthorized(state, action: PayloadAction<boolean>) {
            state.isAuthorized = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signInUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(signInUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthorized = true;
            state.isOpen = false;
            action.meta.arg.navigate('/cabinet');
        });
        builder.addCase(signInUser.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(signUpUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(signUpUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthorized = true;
            state.isOpen = false;
            action.meta.arg.navigate('/cabinet');
        });
        builder.addCase(signUpUser.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export const signInUser = createAsyncThunk(
    'signInUser',
    async (credentials: SignInParams & { navigate: NavigateFunction }, { dispatch, rejectWithValue }) => {
        try {
            const response = await dispatch(signInUserMutation(credentials));
            const { error, data } = response;
            if (error) {
                console.log(error);
                return rejectWithValue(error);
            }

            localStorage.setItem(LocalStorageKey.AuthToken, data.token);
            
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const signUpUser = createAsyncThunk(
    'signUpUser',
    async (credentials: SignUpParams & { navigate: NavigateFunction }, { dispatch, rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('email', credentials.email);
            formData.append('password', credentials.password);
            formData.append('firstName', credentials.firstName);
            formData.append('lastName', credentials.lastName);
            formData.append('birthDate', credentials.birthDate);
            if (credentials.profileImage) {
                formData.append('profileImage', credentials.profileImage);
            }

            const response = await dispatch(signUpUserMutation(formData));
            const { error, data } = response;
            if (error) {
                console.log(error);
                return rejectWithValue(error);
            }

            localStorage.setItem(LocalStorageKey.AuthToken, data.token);
            return data;
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            return rejectWithValue(error);
        }
    }
);

export const getIsAuthPopupOpen = (state: RootState) => state.authorization.isOpen;

export const getIsAuthPopupLoading = (state: RootState) => state.authorization.isLoading;

export const getUserAuthorized = (state: RootState) => state.authorization.isAuthorized;

export const {
    openAuthPopup,
    closeAuthPopup,
    setIsAuthorized,
    setIsLoading,
} = authorizationSlice.actions;
