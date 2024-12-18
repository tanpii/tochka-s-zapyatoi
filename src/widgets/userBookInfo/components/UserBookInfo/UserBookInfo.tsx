import {Spin, Text} from '@gravity-ui/uikit';
import {BookCard, BookList} from '@/entities/book';
import {Book, BookStatus, useGetUserRentHistoryQuery} from '@/shared/api/book';
import {useNavigate} from 'react-router-dom';
import {Carousel} from '@/shared/components';

import block from 'bem-cn-lite';
import './UserBookInfo.scss';
import {formatDate} from '@/shared/helpers';
import UserBookInfoStub from '../UserBookInfoStub/UserBookInfoStub';
const b = block('userBookInfo');

export interface UserBookInfoProps {
    uuid: string;
    book?: Book;
    dueTime?: string;
}

export const UserBookInfo = ({uuid, book, dueTime}: UserBookInfoProps) => {
    const navigate = useNavigate();

    const {data, isLoading} = useGetUserRentHistoryQuery({
        page: 0,
        uuid,
    });

    return (
        <div className={b()}>
            {!book && (!data || data?.books.length === 0) && <UserBookInfoStub />}
            {book && (
                <div className={b('readingNow')}>
                    <Text className={b('header')} variant="display-1">
                        Читает сейчас
                    </Text>
                    {dueTime &&
                        book &&
                        (book?.status === BookStatus.BOOKED ? (
                            <Text variant="body-2">
                                Нужно забрать из библиотеки до {formatDate(dueTime)}
                            </Text>
                        ) : (
                            <Text variant="body-2">
                                Доступно для чтения дома до {formatDate(dueTime)}
                            </Text>
                        ))}
                    <BookCard book={book} />
                </div>
            )}

            {!!data && data.books.length > 0 && (
                <div className={b('bookHistory')}>
                    <Text className={b('header')} variant="display-1">
                        Последние прочитанные книги
                    </Text>
                    {isLoading ? (
                        <Spin className="loader" />
                    ) : (
                        <Carousel itemCount={20}>
                            <BookList
                                className={b('bookList')}
                                books={data?.books ?? []}
                                onBookClick={(id) => navigate(`book/${id}`)}
                            />
                        </Carousel>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserBookInfo;
