import axios from 'axios';

export const getKakaoLoginPageUrl = () =>
  // step 1. 인가 코드 받기 https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-code
  `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
    import.meta.env.VITE_KAKAO_API_KEY
  }&redirect_uri=${import.meta.env.VITE_KAKAO_LOGIN_REDIRECT_URL}`;

export const getKakaoToken = async (authCode: string) => {
  const headers = {
    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  };

  const requestBody = {
    grant_type: 'authorization_code',
    client_id: import.meta.env.VITE_KAKAO_API_KEY,
    redirect_uri: import.meta.env.VITE_KAKAO_LOGIN_REDIRECT_URL,
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

export const getKakaoLoginInfo = async (
  tokenType: string,
  accessToken: string,
) => {
  const headers = {
    Authorization: `${tokenType} ${accessToken}`,
    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  };

  const { data } = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
    headers,
  });

  return data;
};
