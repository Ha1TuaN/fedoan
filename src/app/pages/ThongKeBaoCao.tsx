import {Navigate, Route, Routes, Outlet} from 'react-router-dom';

const GeneralPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}></Route>
    </Routes>
  );
};

export default GeneralPage;
