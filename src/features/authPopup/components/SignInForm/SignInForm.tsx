import {FC, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getIsAuthPopupLoading, signInUser} from '../../model/slice';
import {Button, TextInput} from '@gravity-ui/uikit';
import {AppDispatch} from '@/app/store';

import block from 'bem-cn-lite';
import './SignInForm.scss';
const b = block('signInForm');

const validateEmail = (email: string) => {
    if (!email) return 'Обязательное поле';
    return '';
};

const validatePassword = (password: string) => {
    if (!password) return 'Обязательное поле';
    return '';
};

export const SignInForm: FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useSelector(getIsAuthPopupLoading);

    const onSubmit = useCallback(() => {
        const emailValidationError = validateEmail(email);
        const passwordValidationError = validatePassword(password);

        setEmailError(emailValidationError);
        setPasswordError(passwordValidationError);

        if (!emailValidationError && !passwordValidationError) {
            dispatch(signInUser({email, password, navigate}));
        }
    }, [email, password, dispatch]);

    return (
        <div className={b()}>
            <TextInput
                label={'Почта'}
                value={email}
                onUpdate={setEmail}
                type="email"
                errorMessage={emailError}
                hasClear
                size="l"
            />
            <TextInput
                label={'Пароль'}
                value={password}
                onUpdate={setPassword}
                type="password"
                errorMessage={passwordError}
                hasClear
                size="l"
            />
            <Button onClick={onSubmit} loading={isLoading} type="submit" view="action" size="l">
                Войти
            </Button>
        </div>
    );
};
