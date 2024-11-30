import { lazy, FC, Suspense } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { MasterLayout } from '../../_metronic/layout-portal/MasterLayout';
import TopBarProgress from 'react-topbar-progress-indicator';
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils';
import { WithChildren } from '../../_metronic/helpers';
const PortalRoutes = () => {
  const DashboardCustomer = lazy(() => import('../pages/portals/dashboard/DashboardCustomer'));
  const HousePage = lazy(() => import('../pages/portals/houses/HousePage'));

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='/' element={<DashboardCustomer />} />
        <Route
          path='house/*'
          element={
            <SuspensedView>
              <HousePage />
            </SuspensedView>
          }
        />

        <Route index element={<Navigate to='/' />} />
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

export { PortalRoutes };
