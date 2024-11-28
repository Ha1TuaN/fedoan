import {Navigate, Route, Routes, Outlet} from 'react-router-dom';
import PostPage from './post/PostPage';
import PostCreatePage from './post/PostCreatePage';

//import AdvanceRequestPage from '/Financial/AdvanceRequest/AdvanceRequestPage';

const SystemsPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='post'
          element={
            <>
              <PostPage />
            </>
          }
        />
        <Route
          path='createdpost'
          element={
            <>
              <PostCreatePage />
            </>
          }
        />
        <Route
          path='viewpost/:id'
          element={
            <>
              <PostCreatePage />
            </>
          }
        />

        <Route path='*' element={<Navigate to='/error/404' />} />
        <Route index element={<Navigate to='/dashboard' />} />
      </Route>
    </Routes>
  );
};

export default SystemsPage;
