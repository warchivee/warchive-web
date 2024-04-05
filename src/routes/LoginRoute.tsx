import { Navigate, Outlet } from 'react-router-dom';
import { checkLogin } from 'src/services/auth.api';

export default function LoginRoute() {
  if (checkLogin()) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
}
