import {lazy, FC, Suspense} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {MasterLayout} from '../../_metronic/layout/MasterLayout';
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper';
import {WithChildren} from '../../_metronic/helpers';
import {useAuth} from 'src/app/modules/auth';

const PrivateRoutes = () => {
  const OwnerPage = lazy(() => import('../pages/manages/OwnerPage'));
  const {currentUser} = useAuth();

  if (!currentUser) {
    // Redirect unauthenticated users to login
    return <Navigate to='/auth/login' />;
  }

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route
          path='owner/*'
          element={
            <SuspensedView>
              <OwnerPage />
            </SuspensedView>
          }
        />
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({children}) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export {PrivateRoutes};
