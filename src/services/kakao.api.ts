import axios from 'axios';
import userUtil from '@utils/user.util';
import UnrecoverableError from 'src/types/error/UnrecoverableError';
import { failLogin, login, withdrawal } from './auth.api';

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

export const getKakaoLoginPageUrl = () => {
  // step 1. 인가 코드 받기 https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-code
  const params = new URLSearchParams(window.location.search);
  const rd = params.get('rd') || '/';
  sessionStorage.setItem('rd', rd);

  return `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
    import.meta.env.VITE_KAKAO_API_KEY
  }&redirect_uri=${window.location.origin}${import.meta.env.VITE_KAKAO_LOGIN_REDIRECT_PATH}`;
};

export const kakaoLogin = async (authCode: string, rd?: string) => {
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

    const redirectUrl = rd || '/';
    window.location.href = redirectUrl;
  } catch (error) {
    failLogin();
    throw error;
  }
};

export const unlinkKakao = async () => {
  const headers = {
    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_ADMIN_KEY}`,
  };

  const kakaoId = userUtil.get()?.kakao_id;

  if (!kakaoId) {
    throw new UnrecoverableError('회원탈퇴 실패. 운영자에게 문의해주세요');
  }

  const requestBody = {
    target_id_type: 'user_id',
    target_id: kakaoId.toString(),
  };

  const params = new URLSearchParams(requestBody).toString();

  try {
    await axios.post('https://kapi.kakao.com/v1/user/unlink', params, {
      headers,
    });

    await withdrawal();
  } catch (error) {
    throw new UnrecoverableError('회원탈퇴 실패. 운영자에게 문의해주세요');
  }
};
