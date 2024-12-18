import {Spin} from '@gravity-ui/uikit';
import {useGetUserQuery} from '@/shared/api/user';
import {UserDetailedInfo} from '@/entities/user';
import {UserBookInfo} from '@/widgets/userBookInfo';
import {useParams} from 'react-router-dom';

import block from 'bem-cn-lite';
import './Page.scss';
const b = block('userPage');

export const Page = () => {
    const {id} = useParams();

    if (!id) {
        return 'Произошла ошибка :(';
    }

    const {data, isLoading, isError} = useGetUserQuery(id);

    if (isLoading) {
        return <Spin className={'loader'} />;
    }

    if (isError || !data) {
        return 'Произошла ошибка :(';
    }

    return (
        <>
            <div className={b()}>
                <div className={b('userInfo')}>
                    <UserDetailedInfo userData={data.userData} />
                </div>
                <UserBookInfo
                    uuid={data.userData.uuid}
                    book={data.bookInfo?.book}
                    dueTime={data.bookInfo?.dueDate}
                />
            </div>
        </>
    );
};

export default Page;
