import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { LocalStorageKey } from "../config/consts";

export const getBaseQueryWithAuth = (baseUrl: string) => {
    return fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: async (headers) => {
            const accessToken = localStorage.getItem(LocalStorageKey.AuthToken);

            if (accessToken) {
                headers.set('authorization', `Bearer ${accessToken}`);
            }

            return headers;
        },
    });
}