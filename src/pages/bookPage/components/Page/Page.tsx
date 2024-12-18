import {useParams} from 'react-router-dom';
import {Spin} from '@gravity-ui/uikit';
import {useGetBookByIdQuery} from '@/shared/api/book';
import {BookOverview} from '@/widgets/bookOverview';
import block from 'bem-cn-lite';
import './Page.scss';
import {CommentBlock} from '@/widgets/commentBlock';

const b = block('bookPage');

export const Page = () => {
    const {id} = useParams();

    if (!id) {
        return 'Произошла ошибка :(';
    }

    const {data, isLoading, isError, refetch} = useGetBookByIdQuery(id);

    if (isLoading) {
        return <Spin className={'loader'} />;
    }

    if (isError || !data) {
        return 'Произошла ошибка :(';
    }

    return (
        <div className={b()}>
            <BookOverview
                book={data.book}
                self={data.self}
                userData={data.userData}
                refetch={refetch}
            />
            <CommentBlock bookId={data.book.bookId.toString()} />
        </div>
    );
};
