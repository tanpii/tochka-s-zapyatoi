import {useCallback, useState} from 'react';
import {Button, Modal, TextInput} from '@gravity-ui/uikit';
import {dateTimeParse, DateTime, dateTime} from '@gravity-ui/date-utils';
import {DatePicker} from '@gravity-ui/date-components';
import {ChangeUserParams, User} from '@/shared/api/user';
import {FileUpload} from '@/shared/components';

import block from 'bem-cn-lite';
import './UserEditPopup.scss';
const b = block('userEditPopup');

const validateField = (field?: string) => {
    if (!field) return 'Обязательное поле';
    return '';
};

export interface UserEditPopupProps {
    initialValue: User;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (userData: ChangeUserParams) => void;
}

export const UserEditPopup = ({initialValue, isOpen, onClose, onSubmit}: UserEditPopupProps) => {
    const handleClose = () => {
        onClose();
    };

    const [email, setEmail] = useState(initialValue.email);
    const [name, setName] = useState(initialValue.firstName);
    const [surname, setSurname] = useState(initialValue.lastName);
    const [birthdate, setBirthdate] = useState<DateTime | null>(
        dateTime({input: initialValue.birthDate}),
    );
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState<File | null>();

    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [birthdateError, setBirthdateError] = useState('');

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

    const handleSubmit = useCallback(() => {
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
            onSubmit({
                email,
                firstName: name,
                lastName: surname,
                profileImage: profileImage ?? undefined,
                password,
                birthDate: birthdate!.toISOString().slice(0, 10),
            });
        }
    }, [email, name, surname, password, birthdate, profileImage]);

    return (
        <Modal open={isOpen} onClose={handleClose}>
            <div className={b()}>
                <div className={b('form')}>
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
                        placeholder="Изменить фото профиля"
                        onFileChange={setProfileImage}
                        value={profileImage ? URL.createObjectURL(profileImage) : ''}
                    />
                </div>
                <Button view="action" type="submit" onClick={handleSubmit} size="l">
                    Изменить
                </Button>
                <Button onClick={handleClose} size="l">
                    Закрыть
                </Button>
            </div>
        </Modal>
    );
};

export default UserEditPopup;
