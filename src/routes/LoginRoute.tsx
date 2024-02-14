import ModalUtil from '@utils/modal.util';
import { getUser } from '@utils/user.util';
import { Navigate, Outlet } from 'react-router-dom';

export default function LoginRoute() {
  const loginUser = getUser();

  if (loginUser) {
    return <Outlet />;
  }

  ModalUtil.open({
    title: '로그인 필요',
    message: '해당 서비스는 로그인이 필요합니다',
  });

  return <Navigate to="/login" />;
}
