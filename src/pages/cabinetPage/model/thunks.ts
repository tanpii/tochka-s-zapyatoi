import { changeSelfUserMutation, ChangeUserParams } from "@/shared/api/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const changeUserInfo = createAsyncThunk(
    'changeUserInfo',
    async (credentials: ChangeUserParams, { dispatch, rejectWithValue }) => {
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

            const {error} = await dispatch(changeSelfUserMutation(formData));
            
            if (error) {
                console.log(error);
                rejectWithValue(error);
            }
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            rejectWithValue(error);
        }
    }
);