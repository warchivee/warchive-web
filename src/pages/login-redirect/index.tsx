import { useEffect } from 'react';
import { getKakaoLoginInfo, getKakaoToken } from 'src/services/kakao.api';
import { login } from 'src/services/auth/auth.api';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import ModalUtil from '@utils/modal.util';

const kakaoLogin = async (authCode: string, navigate: NavigateFunction) => {
  // step 2. 토큰 받기 https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token
  const kakaoToken = await getKakaoToken(authCode);

  // step 3. 사용자 로그인 처리
  const loginInfo = await getKakaoLoginInfo(
    kakaoToken.token_type,
    kakaoToken.access_token,
  );

  try {
    await login({
      platform_id: loginInfo.id,
      platform: 'kakao',
    });

    navigate('/');
  } catch (error) {
    ModalUtil.open({
      title: '로그인 실패',
      message: '로그인에 실패하였습니다.',
    });
  }
};

export default function LoginRedirect() {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      kakaoLogin(code, navigate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
