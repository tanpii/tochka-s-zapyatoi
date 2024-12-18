export type Book = {
    bookId: number;
    bookName: string;
    authorId: number;
    authorName: string;
    authorPhotoUrl: string;
    releaseYear: number;
    ageLimit: number;
    description: string;
    photoUrl: string;
    rating: number;
    status: BookStatus;
    genres: Genre[];
};

export type Genre = {
    genreId: number;
    genreName: string;
};

export enum BookStatus {
    AVAILABLE = "AVAILABLE",
    BOOKED = "BOOKED",
    READING = "READING",
    NOT_AVAILABLE = "NOT_AVAILABLE"
}
