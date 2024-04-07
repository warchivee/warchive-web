import axios from 'axios';
import { failLogin, login } from './auth.api';

const getKakaoToken = async (authCode: string) => {
  const headers = {
    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  };

  const requestBody = {
    grant_type: 'authorization_code',
    client_id: import.meta.env.VITE_KAKAO_API_KEY,
    redirect_uri: `${window.location.origin}${import.meta.env.VITE_KAKAO_LOGIN_REDIRECT_PATH}`,
    code: authCode,
  };

  const params = new URLSearchParams(requestBody).toString();

  const { data } = await axios.post(
    `https://kauth.kakao.com/oauth/token`,
    params,
    { headers },
  );

  return data;
};

const getKakaoLoginInfo = async (tokenType: string, accessToken: string) => {
  const headers = {
    Authorization: `${tokenType} ${accessToken}`,
    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  };

  const { data } = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
    headers,
  });

  return data;
};

export const getKakaoLoginPageUrl = () =>
  // step 1. 인가 코드 받기 https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-code
  `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
    import.meta.env.VITE_KAKAO_API_KEY
  }&redirect_uri=${window.location.origin}${import.meta.env.VITE_KAKAO_LOGIN_REDIRECT_PATH}`;

export const kakaoLogin = async (authCode: string) => {
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

    window.location.href = '/';
  } catch (error) {
    console.error(error);
    failLogin();
  }
};
