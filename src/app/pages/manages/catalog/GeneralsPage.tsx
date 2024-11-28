import { Navigate, Route, Routes, Outlet } from 'react-router-dom';
import CategoryGroupsPage from './categorygroups/CategoryGroupsPage';
import CategoriesPage from './categories/CategoriesPage';
import DepartmentTypePage from './departmenttypes/DepartmentTypePage';
import ProgramPage from './programs/ProgramPage';
import BudgetaryResourcePage from './budgetaryresources/BudgetaryResourcePage';
import SpecializationPage from './specializations/SpecializationPage';
import DocumentTypePage from './documenttypes/DocumentTypePage';
import ScientificTaskTypePage from './scientifictasktypes/ScientificTaskTypePage';

const GeneralPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {/* <Route path="dashboard" element={<DashboardWrapper />} /> */}
        <Route
          path='scientifictasktypes'
          element={
            <>
              <ScientificTaskTypePage />
            </>
          }
        />
        <Route
          path='categorygroups'
          element={
            <>
              <CategoryGroupsPage />
            </>
          }
        />
        <Route
          path='categories'
          element={
            <>
              <CategoriesPage />
            </>
          }
        />
        <Route
          path='departmenttypes'
          element={
            <>
              <DepartmentTypePage />
            </>
          }
        />
        <Route
          path='programs'
          element={
            <>
              <ProgramPage />
            </>
          }
        />

        <Route
          path='budgetaryresources'
          element={
            <>
              <BudgetaryResourcePage />
            </>
          }
        />
        <Route
          path='specializations'
          element={
            <>
              <SpecializationPage />
            </>
          }
        />
        <Route
          path='documenttypes'
          element={
            <>
              <DocumentTypePage />
            </>
          }
        />
        {/* <Route path='*' element={<Navigate to='/error/404' />} />
        <Route index element={<Navigate to="/dashboard" />} /> */}
      </Route>

    </Routes>

  );
};

export default GeneralPage;
