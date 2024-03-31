import { Navigate, Outlet } from 'react-router-dom';
import { isLogin } from 'src/services/auth.api';

export default function LoginRoute() {
  if (isLogin()) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
}
