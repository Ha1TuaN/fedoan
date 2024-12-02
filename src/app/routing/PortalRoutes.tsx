import {lazy, FC, Suspense} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {MasterLayout} from '../../_metronic/layout-portal/MasterLayout';
import TopBarProgress from 'react-topbar-progress-indicator';
import {WithChildren} from '../../_metronic/helpers';
import {useAuth} from 'src/app/modules/auth';
const PortalRoutes = () => {
  const DashboardCustomer = lazy(() => import('../pages/portals/dashboard/DashboardCustomer'));
  const HousePage = lazy(() => import('../pages/portals/houses/HousePage'));

  return (
    <Routes>
      {/* MasterLayout áp dụng cho DashboardCustomer và các route khác */}
      <Route element={<MasterLayout />}>
        {/* Route gốc hiển thị DashboardCustomer */}
        <Route
          path='/'
          element={
            <SuspensedView>
              <DashboardCustomer />
            </SuspensedView>
          }
        />
        {/* Route con cho HousePage */}
        <Route
          path='house/*'
          element={
            <SuspensedView>
              <HousePage />
            </SuspensedView>
          }
        />
        {/* Route xử lý lỗi */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({children}) => {
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export {PortalRoutes};
