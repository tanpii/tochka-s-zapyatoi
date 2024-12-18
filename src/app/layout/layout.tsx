import {AuthPopup} from '@/features/authPopup';
import {setIsAuthorized} from '@/features/authPopup/model/slice';
import {LocalStorageKey} from '@/shared/config/consts';
import {Header} from '@/widgets/header';
import {Footer} from '@gravity-ui/navigation';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Outlet} from 'react-router-dom';

const Layout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem(LocalStorageKey.AuthToken)) {
            dispatch(setIsAuthorized(true));
        }
    }, []);

    return (
        <>
            <Header />
            <Outlet />
            <Footer copyright={`@ ${new Date().getFullYear()} "Точка с запятой"`} view="clear" />
            <AuthPopup />
        </>
    );
};

export default Layout;
