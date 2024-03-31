import { postData } from '@utils/api.util';
import { removeToken, saveAccessToken } from '@utils/token.util';
import { deleteUser, getUser, saveUser } from '@utils/user.util';
import { wataLocalStorageKey } from 'src/stores/wata.atom';
import { collectionLocalStorageKey } from 'src/stores/collectionList.atom';
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
  localStorage.removeItem(wataLocalStorageKey);
  localStorage.removeItem(collectionLocalStorageKey);
  window.location.href = '/';
};

export const isLogin = () => !!getUser();
