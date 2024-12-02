import {Navigate, Route, Routes} from 'react-router-dom';
import {Registration} from './components/Registration';
import {ForgotPassword} from './components/ForgotPassword';
import {Login} from './components/Login';
import {AuthLayout} from './AuthLayout';
import {useAuth} from './core/Auth';

const AuthPage = () => {
  const {currentUser} = useAuth();

  if (currentUser) {
    // Redirect logged-in users away from AuthPage
    return <Navigate to='/' />;
  }

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='registration' element={<Registration />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route index element={<Login />} />
      </Route>
    </Routes>
  );
};

export {AuthPage};
