import { postData } from '@utils/api/api.util';
import { removeToken, saveAccessToken } from '@utils/token.util';
import { deleteUser, saveUser } from '@utils/user.util';
import { LoginInfo, LoginResult } from '../types/auth.type';

export const login = async (loginInfo: LoginInfo) => {
  const result = await postData<LoginResult>('auth/login', {
    ...loginInfo,
  });

  saveAccessToken(result.token, result.expires_in);
  saveUser(result.user);
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
