
import { commentApiUrl } from '@/shared/config/consts';
import { createApi } from '@reduxjs/toolkit/query/react';
import { Comment } from './types';
import { getBaseQueryWithAuth } from '../base';

type BookCommentParams = {
    bookId: string;
    page: number;
};

type UserCommentParams = {
    page: number;
};

type AddCommentParams = {
    bookId: string;
    comment: string;
    rating: number;
}

type BookCommentResponse = {
    total?: number;
    comments: Comment[];
};

export const commentApiWithAuth = createApi({
    reducerPath: 'commentApiWithAuth',
    baseQuery: getBaseQueryWithAuth(commentApiUrl),
    endpoints: (builder) => ({
        getBookComments: builder.query<BookCommentResponse, BookCommentParams>({
            query: (params) => ({
                url: `${params.bookId}`,
                params: { page: params.page},
            }),
        }),
        getUserComments: builder.query<BookCommentResponse, UserCommentParams>({
            query: () => 'user',
        }),
        addComment: builder.mutation<void, AddCommentParams>({
            query: ({ bookId, comment, rating }) => ({
                url: `${bookId}`,
                method: 'POST',
                body: { comment, rating },
            }),
        }),
        deleteComment: builder.mutation<void, { commentId: string }>({
            query: ({ commentId }) => ({
                url: `${commentId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetBookCommentsQuery, useAddCommentMutation, useDeleteCommentMutation } = commentApiWithAuth;