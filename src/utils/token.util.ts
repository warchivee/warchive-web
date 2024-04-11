import localStorageUtil, { LS_TOKEN_KEY } from './localstorage.util';

interface SavedToken {
  token: string;
  expiresDate: number;
}

const tokenUtil = {
  save: (token: string, expiresIn: number) => {
    const expiresDate = Number(Date.now()) + Number(expiresIn);

    localStorageUtil.save(LS_TOKEN_KEY, { token, expiresDate });
  },

  exist: () => {
    try {
      localStorageUtil.get<SavedToken>(LS_TOKEN_KEY);

      return true;
    } catch (error) {
      return false;
    }
  },

  get: (): string | undefined => {
    try {
      const { token } = localStorageUtil.get<SavedToken>(LS_TOKEN_KEY);

      return token;
    } catch (error) {
      return undefined;
    }
  },

  isExperis: () => {
    try {
      const { expiresDate } = localStorageUtil.get<SavedToken>(LS_TOKEN_KEY);

      const currentTime = Date.now();

      return currentTime > expiresDate;
    } catch (error) {
      return true;
    }
  },

  remove: () => {
    localStorageUtil.remove(LS_TOKEN_KEY);
  },
};

export default tokenUtil;
