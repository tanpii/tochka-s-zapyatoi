import {useState, useCallback} from 'react';
import {Button, Spin} from '@gravity-ui/uikit';
import {ChangeUserParams, useGetSelfUserQuery} from '@/shared/api/user';
import {UserDetailedInfo} from '@/entities/user';
import {UserEditPopup} from '@/features/userEditPopup';
import {changeUserInfo} from '../../model/thunks';

import block from 'bem-cn-lite';
import './Page.scss';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@/app/store';
import {UserBookInfo} from '@/widgets/userBookInfo';
import {LocalStorageKey} from '@/shared/config/consts';
import {useNavigate} from 'react-router-dom';

const b = block('cabinetPage');

export const Page = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const {data, isLoading, isError, refetch} = useGetSelfUserQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleModalSubmit = useCallback(async (user: ChangeUserParams) => {
        handleCloseModal();
        await dispatch(changeUserInfo(user));
        refetch();
    }, []);

    const handleLogOut = useCallback(() => {
        localStorage.removeItem(LocalStorageKey.AuthToken);
        navigate('/');
        window.location.reload();
    }, []);

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
                    <UserDetailedInfo self userData={data.userData} />
                    <Button view="action" onClick={handleOpenModal} size="l">
                        Изменить данные
                    </Button>
                    <Button view="normal" onClick={handleLogOut} size="l">
                        Выйти из аккаунта
                    </Button>
                </div>
                <UserBookInfo
                    uuid={data.userData.uuid}
                    book={data.bookInfo?.book}
                    dueTime={data.bookInfo?.dueDate}
                />
            </div>
            <UserEditPopup
                initialValue={data?.userData}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleModalSubmit}
            />
        </>
    );
};

export default Page;
