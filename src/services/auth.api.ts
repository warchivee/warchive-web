import { postData } from '@utils/api.util';
import { wataLocalStorageKey } from 'src/stores/wata.atom';
import { collectionLocalStorageKey } from 'src/stores/collectionList.atom';
import tokenUtil from '@utils/token.util';
import userUtil from '@utils/user.util';
import localStorageUtil from '@utils/localStorage/localstorage.util';
import { LoginInfo, LoginResult } from '../types/auth.type';

export const login = async (loginInfo: LoginInfo) => {
  const result = await postData<LoginResult>('auth/login', {
    ...loginInfo,
  });

  tokenUtil.save(result.token, result.expires_in);
  userUtil.save(result.user);
};

export const failLogin = () => {
  tokenUtil.remove();
  userUtil.remove();
};

export const logout = () => {
  localStorageUtil.clearAll();
  window.location.href = '/';
};

export const isLogin = () => userUtil.exist();
