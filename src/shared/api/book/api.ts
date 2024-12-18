
import { bookApiUrl } from '@/shared/config/consts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Book, Genre } from './types';
import { User } from '../user';
import { getBaseQueryWithAuth } from '../base';

type BookPageParams = {
    page: number;
    bookName?: string;
    author?: string;
    genres?: number[];
};

type BookPageResponse = {
    total?: number;
    books: Book[];
};

type BookResponse = {
    book: Book;
    userData?: User;
    self: boolean;
};

type UserRentHistoryParams = {
    uuid: string;
    page: number;
};

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({ baseUrl: bookApiUrl }),
    endpoints: (builder) => ({
        getBookPage: builder.query<BookPageResponse, BookPageParams>({
            query: (params) => ({
                url: 'book/list',
                params,
            }),
        }),
        getGenreList: builder.query<Genre[], void>({
            query: () => `genre`,
        }),
    }),
});

export const bookApiWithAuth = createApi({
    reducerPath: 'bookApiWithAuth',
    baseQuery: getBaseQueryWithAuth(bookApiUrl),
    endpoints: (builder) => ({
        getBookById: builder.query<BookResponse, string>({
            query: (id) => `book/info/${id}`,
        }),
        getUserRentHistory: builder.query<BookPageResponse, UserRentHistoryParams>({
            query: (params) => ({
                url: `rent/${params.uuid}/history`,
                params: { page: params.page},
            }),
        }),
        reserveBook: builder.mutation<void, { bookId: string }>({
            query: ({ bookId, }) => ({
                url: `reservation/${bookId}`,
                method: 'POST',
                body: { dueDate: '2024-12-01' },
            }),
        }),
        cancelBookReservation: builder.mutation<void, void>({
            query: () => ({
                url: 'reservation',
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetBookPageQuery, useGetGenreListQuery } = bookApi;

export const { useGetBookByIdQuery, useReserveBookMutation, useCancelBookReservationMutation, useGetUserRentHistoryQuery } = bookApiWithAuth;