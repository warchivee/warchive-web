import { postData } from '@utils/api/api.util';
import { saveAccessToken } from '@utils/token.util';
import { saveUser } from '@utils/user.util';
import { LoginInfo, LoginResult, TokenResult } from './auth.interface';

export const login = async (loginInfo: LoginInfo) => {
  const result = await postData<LoginResult>(
    `${import.meta.env.VITE_SERVER_HOST}/auth/login`,
    {
      ...loginInfo,
    },
    {
      withCredentials: true,
    },
  );

  saveUser(result.user);
  saveAccessToken(result.token, result.expires_in);
};

export const reissue = async () => {
  const result = await postData<TokenResult>(
    `${import.meta.env.VITE_SERVER_HOST}/auth/reissue`,
    undefined,
    {
      withCredentials: true,
    },
  );

  saveAccessToken(result.token, result.expires_in);
};
