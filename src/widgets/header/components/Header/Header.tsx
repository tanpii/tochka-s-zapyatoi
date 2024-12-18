import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Text, Icon} from '@gravity-ui/uikit';
import {Person} from '@gravity-ui/icons';
import {getUserAuthorized, openAuthPopup} from '@/features/authPopup';
import {ThemeToggleButton} from '@/entities/theme';
import block from 'bem-cn-lite';
import './Header.scss';

const b = block('header');

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthorized = useSelector(getUserAuthorized);

    const onUserButtonClick = useCallback(() => {
        if (isAuthorized) {
            navigate('/cabinet');
        } else {
            dispatch(openAuthPopup());
        }
    }, [dispatch, isAuthorized, navigate]);

    const onNavigationClick = (path: string) => {
        navigate(path);
    };

    return (
        <header className={b()}>
            <div className={b('name')} onClick={() => onNavigationClick('/')}>
                <Text variant="header-2">ТОЧКА С ЗАПЯТОЙ;</Text>
                <Text variant="subheader-1">БИБЛИОТЕКА</Text>
            </div>
            <div className={b('buttons')}>
                <Button
                    view="action"
                    size="l"
                    onClick={() => onNavigationClick('/books')}
                    disabled={window.location.pathname === '/books'}
                >
                    Книги
                </Button>
                <Button
                    view="action"
                    size="l"
                    onClick={() => onNavigationClick('/')}
                    disabled={window.location.pathname === '/'}
                >
                    О нас
                </Button>
                <Button
                    view="action"
                    size="l"
                    onClick={onUserButtonClick}
                    disabled={window.location.pathname === '/cabinet'}
                >
                    <Icon data={Person} size={18} /> Кабинет читателя
                </Button>
                <ThemeToggleButton />
            </div>
        </header>
    );
};

export default Header;
