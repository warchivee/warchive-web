import userUtil from '@utils/user.util';
import { Navigate, Outlet } from 'react-router-dom';
import { Permissiontype, permissionLevel } from 'src/types/auth.type';

export default function PermissionRoute({
  access,
}: {
  access: Permissiontype;
}) {
  const loginUser = userUtil.get();

  if (
    permissionLevel[(loginUser?.role || 'USER') as Permissiontype] >=
    permissionLevel[access]
  ) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
}
