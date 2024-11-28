import {Navigate, Route, Routes, Outlet} from 'react-router-dom';
import ListHousePage from './listhouse/ListHousePage';
import DetailHouse from './listhouse/DetailHouse';
const HousePage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='listhouse'
          element={
            <>
              <ListHousePage />
            </>
          }
        />
        <Route
          path='detail/:id'
          element={
            <>
              <DetailHouse />
            </>
          }
        />

        <Route path='*' element={<Navigate to='/error/404' />} />
        <Route index element={<Navigate to='/house/listhouse' />} />
      </Route>
    </Routes>
  );
};

export default HousePage;
