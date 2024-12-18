import {BookCard} from '@/entities/book';
import {Book} from '@/shared/api/book';
import {WithClassName} from '@/shared/types';

export interface BookListProps extends WithClassName {
    books: Book[];
    onBookClick?: (bookId: string) => void;
}

export const BookList = ({className, books, onBookClick}: BookListProps) => {
    return (
        <div className={className}>
            {books.map((book) => (
                <BookCard key={book.bookId} book={book} onClick={onBookClick} />
            ))}
        </div>
    );
};

export default BookList;
