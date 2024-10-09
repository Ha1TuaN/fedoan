import { RouteObject } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Login/LoginPage';
import OwnerPage from '../pages/Owner/OwnerPage';
import ContactPage from '../pages/Contact/ContactPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import HousePage from '../pages/House/HousePage';
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
        path: '/house',
        element: <HousePage />,
    },
    {
        path: '/owner',
        element: <OwnerPage />,
    },
    {
        path: '/contact',
        element: <ContactPage />,
    },
];

const privateRoutes: RouteObject[] = [];

export { publicRoutes, privateRoutes };
