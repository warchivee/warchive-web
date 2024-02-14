import { PageLoader } from '@components/CommonComponents/loader';
import { useEffect } from 'react';
import { kakaoLogin } from 'src/services/kakao.api';

export default function LoginRedirect() {
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    if (code) {
      kakaoLogin(code);
    }
  }, [code]);

  return <PageLoader />;
}
