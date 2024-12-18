import { User } from "../user";

export type Comment = {
    commentId: number,
    userData: User,
    comment: string,
    rating: number,
    bookId: number,
    self: boolean,
};
