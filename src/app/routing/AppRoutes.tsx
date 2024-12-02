import {FC} from 'react';
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import {PrivateRoutes} from './PrivateRoutes';
import {ErrorsPage} from '../modules/errors/ErrorsPage';
import {Logout, AuthPage, useAuth} from '../modules/auth';
import {App} from '../App';
import {PortalRoutes} from './PortalRoutes';

const {PUBLIC_URL} = process.env;

const AppRoutes: FC = () => {
  const {currentUser} = useAuth();

  return (
    <BrowserRouter basename={PUBLIC_URL || ''}>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />
          <Route path='/*' element={<PortalRoutes />} />

          {currentUser ? (
            <>
              {/* Các route dành cho người dùng đã đăng nhập */}
              <Route path='manage/*' element={<PrivateRoutes />} />
              <Route path='auth/*' element={<Navigate to='/' />} />
            </>
          ) : (
            <>
              {/* Các route dành cho người dùng chưa đăng nhập */}
              <Route path='auth/*' element={<AuthPage />} />
            </>
          )}

          {/* Fallback route cho các đường dẫn không hợp lệ */}
          <Route path='*' element={<Navigate to={currentUser ? '/' : '/auth/login'} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export {AppRoutes};
