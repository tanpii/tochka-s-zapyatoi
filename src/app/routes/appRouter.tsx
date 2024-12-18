import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from '../layout/layout';
import {BooksPage} from '@/pages/booksPage';
import {MainPage} from '@/pages/mainPage';
import {BookPage} from '@/pages/bookPage';
import {CabinetPage} from '@/pages/cabinetPage';
import {UserPage} from '@/pages/userPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: '/books',
                element: <BooksPage />,
            },
            {
                path: '/book/:id',
                element: <BookPage />,
            },
            {
                path: '/user/:id',
                element: <UserPage />,
            },
            {
                path: '/cabinet',
                element: <CabinetPage />,
            },
        ],
    },
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};
