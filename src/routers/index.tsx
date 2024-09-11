import { RouteObject } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Login/LoginPage';
import OwnerPage from '../pages/Owner/OwnerPage';
import ContactPage from '../pages/Contact/ContactPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
const publicRoutes: RouteObject[] = [
    {
        path: '/dashboard',
        element: <DashboardPage />,
    },
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/chu_nha',
        element: <OwnerPage />,
    },
    {
        path: '/lien_he',
        element: <ContactPage />,
    },
];

const privateRoutes: RouteObject[] = [];

export { publicRoutes, privateRoutes };
