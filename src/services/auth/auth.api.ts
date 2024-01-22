import { postData } from '@utils/api/api.util';
import { removeToken, saveAccessToken } from '@utils/token.util';
import { deleteUser, saveUser } from '@utils/user.util';
import { LoginInfo, LoginResult, TokenResult } from './auth.interface';

export const login = async (loginInfo: LoginInfo) => {
  const result = await postData<LoginResult>(
    'auth/login',
    {
      ...loginInfo,
    },
    {
      withCredentials: true,
    },
  );

  saveAccessToken(result.token, result.expires_in);
  saveUser(result.user);
};

export const reissue = async () => {
  const result = await postData<TokenResult>('auth/reissue', undefined, {
    withCredentials: true,
  });

  saveAccessToken(result.token, result.expires_in);
};

export const failLogin = () => {
  removeToken();
  deleteUser();
};

export const logout = () => {
  removeToken();
  deleteUser();
  window.location.href = '/';
};
