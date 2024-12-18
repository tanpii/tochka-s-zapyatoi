
import { authApiUrl } from '@/shared/config/consts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type SignInParams = {
    email: string;
    password: string;
};

type SignInResponse = {
    token: string;
};

export type SignUpParams = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    profileImage?: File,
};

type SignUpResponse = {
    token: string;
};

export const authorizationApi = createApi({
    reducerPath: 'authorizationApi',
    baseQuery: fetchBaseQuery({ baseUrl: authApiUrl }),
    endpoints: (builder) => ({
        signInUser: builder.mutation<SignInResponse, SignInParams>(
            {
                query: (credentials) => ({
                    url: 'signin',
                    method: 'POST',
                    body: credentials,
                }),
            }
        ),
        signUpUser: builder.mutation<SignUpResponse, FormData>(
            {
                query: (credentials) => ({
                    url: 'signup',
                    method: 'POST',
                    body: credentials,
                }),
            }
        ),
    }),
});

export const signInUserMutation = authorizationApi.endpoints.signInUser.initiate;
export const signUpUserMutation = authorizationApi.endpoints.signUpUser.initiate;