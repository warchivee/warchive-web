import secureLocalStorage from 'react-secure-storage';
import UnrecoverableError from 'src/types/error/UnrecoverableError';

// https://www.npmjs.com/package/react-secure-storage

export const LS_USER_KEY = 'user';
export const LS_TOKEN_KEY = 'token';

type LocalStorageValue = string | number | true | object;

const localStorageUtil = {
  save: (
    key: string,
    value: LocalStorageValue,
    secure: boolean = true,
  ): void => {
    if (secure) {
      secureLocalStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },

  get: <T>(key: string, secure: boolean = true): T => {
    let item = null;

    if (secure) {
      item = secureLocalStorage.getItem(key);
    } else {
      const data = localStorage.getItem(key);

      if (data !== null) {
        item = JSON.parse(data);
      }
    }

    if (!item) {
      throw new UnrecoverableError('값이 존재하지 않습니다.');
    }

    return item as T;
  },

  remove: (key: string, secure: boolean = true) => {
    if (secure) {
      secureLocalStorage.removeItem(key);
    } else {
      localStorage.removeItem(key);
    }
  },

  clearAll: () => {
    localStorage.clear();
    secureLocalStorage.clear();
  },
};

export default localStorageUtil;
