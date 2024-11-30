import { lazy, FC, Suspense } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { MasterLayout } from '../../_metronic/layout/MasterLayout';
import TopBarProgress from 'react-topbar-progress-indicator';
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper';
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils';
import { WithChildren } from '../../_metronic/helpers';
import { useAuth } from 'src/app/modules/auth';
import { CheckRole } from 'src/utils/utils';

const PrivateRoutes = () => {
  const OwnerPage = lazy(() => import('../pages/manages/OwnerPage'));

  const { currentUser, currentPermissions } = useAuth();

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after successful login/registration */}
        <Route path='dashboard' element={<DashboardWrapper />} />

        {/* Nested Routes */}
        <Route element={<Outlet />}>
          <Route
            path='owner/*'
            element={
              <SuspensedView>
                <OwnerPage />
              </SuspensedView>
            }
          />
        </Route>

        {/* Fallback route for unknown paths */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--kt-primary');
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
