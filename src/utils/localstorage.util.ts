import UnrecoverableError from 'src/types/error/UnrecoverableError';
import CryptoJS from 'crypto-js';

// https://www.npmjs.com/package/react-secure-storage
// react-secure-storage 라이브러리를 사용했으나, 다른 기기, 다른 탭 등에서 값이 있어도 조회되지 않는 이슈가 있었음.
// 아래 해결책을 참고해 수정했지만 적용되지 않아 직접 암호화하는 방식으로 변경.
// 참고 : https://github.com/sushinpv/react-secure-storage/issues/14#issuecomment-1484430349

export const LS_USER_KEY = 'user';
export const LS_TOKEN_KEY = 'token';

type LocalStorageValue = string | number | true | object;

const secretKey = import.meta.env.VITE_REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY;

const localStorageUtil = {
  save: (
    key: string,
    value: LocalStorageValue,
    secure: boolean = true,
  ): void => {
    let saveValue = JSON.stringify(value);

    if (secure) {
      saveValue = CryptoJS.AES.encrypt(saveValue, secretKey).toString();
    }

    localStorage.setItem(key, saveValue);
  },

  get: <T>(key: string, secure: boolean = true): T => {
    let item: string = localStorage.getItem(key) ?? '';

    if (item === null || item === undefined || item === '') {
      throw new UnrecoverableError('값이 존재하지 않습니다.');
    }

    if (secure) {
      item = CryptoJS.AES.decrypt(item, secretKey).toString(CryptoJS.enc.Utf8);
    }

    item = JSON.parse(item);

    return item as T;
  },

  remove: (key: string) => {
    localStorage.removeItem(key);
  },

  clearAll: () => {
    localStorage.removeItem(LS_USER_KEY);
    localStorage.removeItem(LS_TOKEN_KEY);
  },
};

export default localStorageUtil;
