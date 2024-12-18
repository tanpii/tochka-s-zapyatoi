import {useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Icon, TextInput} from '@gravity-ui/uikit';
import {Magnifier} from '@gravity-ui/icons';
import {setBookTitle, setAuthorName, setGenres, resetFilters} from '../../model/slice';
import {getBookTitleFilter, getAuthorNameFilter, getGenresFilter} from '../../model/slice';
import GenreFilter from '../GenreFilter/GenreFilter';

import block from 'bem-cn-lite';
import './BooksFilter.scss';
const b = block('booksFilter');

export interface BooksFilterProps {
    onConfirm: (filters: {bookTitle?: string; author?: string; genreIds?: number[]}) => void;
}

export const BooksFilter = ({onConfirm}: BooksFilterProps) => {
    const dispatch = useDispatch();

    const bookTitle = useSelector(getBookTitleFilter);
    const authorName = useSelector(getAuthorNameFilter);
    const genres = useSelector(getGenresFilter);
    const [bookTitleLocal, setBookTitleLocal] = useState(bookTitle);
    const [authorNameLocal, setAuthorNameLocal] = useState(authorName);

    const [genresLocal, setGenresLocal] = useState(genres);

    const handleConfirm = useCallback(() => {
        dispatch(setBookTitle(bookTitleLocal));
        dispatch(setAuthorName(authorNameLocal));
        dispatch(setGenres(genresLocal));

        onConfirm({bookTitle: bookTitleLocal, author: authorNameLocal, genreIds: genresLocal});
    }, [bookTitleLocal, authorNameLocal, genresLocal, dispatch, onConfirm]);

    const handleReset = useCallback(() => {
        setBookTitleLocal('');
        setAuthorNameLocal('');
        setGenresLocal([]);
        dispatch(resetFilters());
    }, [dispatch]);

    return (
        <div className={b()}>
            <div className={b('filters')}>
                <TextInput
                    placeholder={'Название книги'}
                    startContent={<Icon data={Magnifier} />}
                    value={bookTitleLocal}
                    onChange={(e) => setBookTitleLocal(e.target.value)}
                    hasClear
                />
                <TextInput
                    placeholder={'Автор'}
                    startContent={<Icon data={Magnifier} />}
                    value={authorNameLocal}
                    onChange={(e) => setAuthorNameLocal(e.target.value)}
                    hasClear
                />
                <div className={b('genres_container')}>
                    <GenreFilter selectedGenres={genresLocal} onChange={setGenresLocal} />
                </div>
            </div>
            <div className={b('buttons')}>
                <Button onClick={handleConfirm} view="action" type="submit">
                    Применить
                </Button>
                <Button onClick={handleReset} view="action" type="reset">
                    Сбросить
                </Button>
            </div>
        </div>
    );
};

export default BooksFilter;
