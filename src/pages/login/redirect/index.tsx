import { Text } from '@components/text';
import { useEffect } from 'react';
import { kakaoLogin } from 'src/services/kakao.api';

export default function LoginRedirect() {
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    if (code) {
      kakaoLogin(code);
    }
  }, [code]);

  return <Text color="gray">로그인 중입니다...</Text>;
}
