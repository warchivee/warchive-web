import { getAccessToken, isExperisAccessToken } from '@utils/token.util';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { reissue } from 'src/services/auth/auth.api';

export default function PrivateRoute() {
  const [isLogin, setIsLogin] = useState({
    status: 'WAIT',
  });

  const autoLogin = async () => {
    try {
      if (!getAccessToken()) {
        setIsLogin({
          status: 'FAIL',
        });
        return;
      }

      const isExperis = isExperisAccessToken();
      if (isExperis) {
        await reissue();
      }

      setIsLogin({
        status: 'LOGIN',
      });
    } catch (error) {
      setIsLogin({
        status: 'LOGIN',
      });
    }
  };

  useEffect(() => {
    autoLogin();
  }, []);

  if (isLogin.status === 'WAIT') {
    return <>Loding...</>;
  }

  if (isLogin.status === 'LOGIN') {
    return <Outlet />;
  }

  if (isLogin.status === 'ERROR') {
    return <>오류 : 담당자에게 문의주세요.</>;
  }

  return <Navigate to="/login" />;
}
