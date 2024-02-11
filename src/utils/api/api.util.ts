/* eslint no-underscore-dangle: 0 */

import axios from 'axios';
import { getAccessToken, saveAccessToken } from '@utils/token.util';
import { TokenResult } from 'src/types/auth.type';
import { ApiResult, handleApiResult } from './apiResult.util';

export const reissueApi = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_HOST}/`,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
  withCredentials: true,
});

const reissueToken = async () => {
  const response = await reissueApi.get<ApiResult<TokenResult>>('auth/reissue');
  const result = handleApiResult(response);
  saveAccessToken(result.token, result.expires_in);
};

// todo 요청 줄이기 위해 유효기간 지낫는지 한번 체크하는 로직 추가...
// const autoLogin = async () => {
//   const hasAccessToken = getAccessToken() !== null;
//   const isExperis = isExperisAccessToken();

//   if (!hasAccessToken || isExperis) {
//     try {
//       await reissueToken();
//     } catch (error) {
//       window.location.href = '/';
//     }
//   }
// };

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_HOST}/`,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await reissueToken();
        originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;
        return await api(originalRequest);
      } catch (reissueError) {
        window.location.href = '/login';
        return Promise.reject(reissueError);
      }
    }

    return Promise.reject(error);
  },
);

export const getData = async <T>(
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any,
): Promise<T> => {
  let queryString = '';
  if (params) {
    queryString += '?';
    queryString += Object.keys(params)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
      )
      .join('&');
  }

  const response = await api.get<ApiResult<T>>(`${path}${queryString}`);

  return handleApiResult(response);
};

export const postData = async <T>(
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any,
): Promise<T> => {
  const response = await api.post<ApiResult<T>>(path, params);

  return handleApiResult(response);
};

export const putData = async <T>(
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any,
): Promise<T> => {
  const response = await api.put<ApiResult<T>>(path, params);

  return handleApiResult(response);
};

export const patchData = async <T>(
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any,
): Promise<T> => {
  const response = await api.patch<ApiResult<T>>(path, params);

  return handleApiResult(response);
};

export const deleteData = async <T>(path: string): Promise<T> => {
  const response = await api.delete<ApiResult<T>>(path);

  return handleApiResult(response);
};
