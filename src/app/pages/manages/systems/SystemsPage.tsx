import { Navigate, Route, Routes, Outlet } from 'react-router-dom';
import OrganizationUnitsPage from './organizationunits/OrganizationUnitsPage';
import UsersPage from './users/UsersPage';
import RolesPage from './roles/RolesPage';
import AuditLoginsPage from './auditlogins/AuditLoginsPage';
import AuditsPage from './audits/AuditsPage';
//import AdvanceRequestPage from '/Financial/AdvanceRequest/AdvanceRequestPage';



const SystemsPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>

        <Route
          path="organizationunits"
          element={
            <>
              <OrganizationUnitsPage />
            </>
          }
        />

        <Route
          path="users"
          element={
            <>
              <UsersPage />
            </>
          }
        />


        <Route
          path="roles"
          element={
            <>
              <RolesPage />
            </>
          }
        />
        <Route
          path="audits"
          element={
            <>
              <AuditsPage />
            </>
          }
        />
        <Route
          path="auditlogins"
          element={
            <>
              <AuditLoginsPage />
            </>
          }
        />

        <Route path='*' element={<Navigate to='/error/404' />} />
        <Route index element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
};

export default SystemsPage;
