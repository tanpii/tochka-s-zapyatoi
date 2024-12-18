import {FC, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DatePicker} from '@gravity-ui/date-components';
import {dateTimeParse, DateTime} from '@gravity-ui/date-utils';
import {AppDispatch} from '@/app/store';
import {getIsAuthPopupLoading, signUpUser} from '../../model/slice';
import {Button, TextInput} from '@gravity-ui/uikit';
import {FileUpload} from '@/shared/components';
import {useNavigate} from 'react-router-dom';

import block from 'bem-cn-lite';
import './SignUpForm.scss';
const b = block('signUpForm');

const validateField = (field?: string) => {
    if (!field) return 'Обязательное поле';
    return '';
};

export const SignUpForm: FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthdate, setBirthdate] = useState<DateTime | null>();
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [birthdateError, setBirthdateError] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useSelector(getIsAuthPopupLoading);

    const onEmailChange = useCallback((value: string) => {
        setEmailError('');
        setEmail(value);
    }, []);

    const onNameChange = useCallback((value: string) => {
        setNameError('');
        setName(value);
    }, []);

    const onSurnameChange = useCallback((value: string) => {
        setSurnameError('');
        setSurname(value);
    }, []);

    const onPasswordChange = useCallback((value: string) => {
        setPasswordError('');
        setPassword(value);
    }, []);

    const onBirthdateChange = useCallback((value: DateTime | null) => {
        setBirthdateError('');
        setBirthdate(value);
    }, []);

    const onSubmit = useCallback(() => {
        const usernameValidationError = validateField(email);
        const nameValidationError = validateField(name);
        const surnameValidationError = validateField(surname);
        const passwordValidationError = validateField(password);
        const birthdateValidationError = validateField(birthdate?.toISOString());

        setEmailError(usernameValidationError);
        setNameError(nameValidationError);
        setSurnameError(surnameValidationError);
        setPasswordError(passwordValidationError);
        setBirthdateError(birthdateValidationError);

        if (
            !usernameValidationError &&
            !nameValidationError &&
            !surnameValidationError &&
            !passwordValidationError &&
            !birthdateValidationError
        ) {
            dispatch(
                signUpUser({
                    email,
                    firstName: name,
                    lastName: surname,
                    birthDate: birthdate!.toISOString().slice(0, 10),
                    password,
                    profileImage: profileImage || undefined,
                    navigate,
                }),
            );
        }
    }, [email, name, surname, password, birthdate, dispatch, profileImage]);

    return (
        <div className={b()}>
            <TextInput
                label="Почта"
                value={email}
                onUpdate={onEmailChange}
                error={emailError}
                type="email"
                hasClear
                size="l"
            />
            <TextInput
                label="Имя"
                value={name}
                onUpdate={onNameChange}
                error={nameError}
                hasClear
                size="l"
            />
            <TextInput
                label="Фамилия"
                value={surname}
                onUpdate={onSurnameChange}
                error={surnameError}
                hasClear
                size="l"
            />
            <DatePicker
                label={'Дата рождения'}
                placeholder=" "
                value={dateTimeParse(birthdate)}
                onUpdate={onBirthdateChange}
                validationState={birthdateError ? 'invalid' : undefined}
                errorMessage={birthdateError}
                size="l"
            />
            <TextInput
                label={'Пароль'}
                value={password}
                onUpdate={onPasswordChange}
                type="password"
                error={passwordError}
                hasClear
                size="l"
            />

            <FileUpload
                placeholder="Добавить фото профиля"
                onFileChange={setProfileImage}
                value={profileImage ? URL.createObjectURL(profileImage) : ''}
            />

            <Button onClick={onSubmit} loading={isLoading} type="submit" view="action" size="l">
                Зарегистрироваться
            </Button>
        </div>
    );
};
