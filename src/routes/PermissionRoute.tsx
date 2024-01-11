import ModalUtil from '@utils/modal.util';
import { getUser } from '@utils/user.util';
import { Navigate, Outlet } from 'react-router-dom';
import {
  Permissiontype,
  permissionLevel,
} from 'src/services/auth/auth.interface';

export default function PermissionRoute({
  access,
}: {
  access: Permissiontype;
}) {
  const loginUser = getUser();

  if (
    permissionLevel[loginUser.role as Permissiontype] >= permissionLevel[access]
  ) {
    return <Outlet />;
  }

  ModalUtil.open({
    title: '권한 없음',
    message: '해당 회원은 권한이 없습니다.',
  });
  return <Navigate to="/" />;
}
