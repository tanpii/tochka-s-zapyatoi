import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Modal, Tabs} from '@gravity-ui/uikit';
import {closeAuthPopup, getIsAuthPopupOpen} from '../../model/slice';
import {SignInForm} from '../SignInForm/SignInForm';
import {SignUpForm} from '../SignUpForm/SignUpForm';

import block from 'bem-cn-lite';
import './AuthPopup.scss';
const b = block('authPopup');

export const AuthPopup = () => {
    const [authMode, setAuthMode] = useState('signin');
    const dispatch = useDispatch();
    const isOpen = useSelector(getIsAuthPopupOpen);

    const handleClose = useCallback(() => {
        dispatch(closeAuthPopup());
    }, [dispatch]);

    return (
        <Modal open={isOpen} onClose={handleClose}>
            <div className={b()}>
                <Tabs
                    className={b('tabs')}
                    activeTab={authMode}
                    onSelectTab={setAuthMode}
                    items={[
                        {id: 'signin', title: 'Вход'},
                        {id: 'signup', title: 'Регистрация'},
                    ]}
                    size="l"
                />
                {authMode === 'signin' ? <SignInForm /> : <SignUpForm />}
                <Button onClick={handleClose} view="flat">
                    Закрыть
                </Button>
            </div>
        </Modal>
    );
};

export default AuthPopup;
