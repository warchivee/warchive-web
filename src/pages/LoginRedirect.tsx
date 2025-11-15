import { PageLoader } from '@components/CommonComponents/loader';
import { useEffect } from 'react';
import { kakaoLogin } from 'src/services/kakao.api';

export default function LoginRedirect() {
  const { searchParams } = new URL(window.location.href);

  const code = searchParams.get('code');
  const rd = sessionStorage.getItem('rd') || '/';
  sessionStorage.removeItem('rd');

  useEffect(() => {
    if (code) {
      kakaoLogin(code, rd);
    }
  }, [code, rd]);

  return <PageLoader />;
}
