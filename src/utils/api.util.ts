/* eslint no-underscore-dangle: 0 */

import axios, { AxiosResponse } from 'axios';
import { TokenResult } from 'src/types/auth.type';
import tokenUtil from './token.util';

export interface ApiResult<T> {
  success: boolean;
  result: T;
}

const handleApiResult = <T>(
  response: AxiosResponse<ApiResult<T>, unknown>,
): T => response.data.result;

export const reissueApi = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_HOST}/`,
  headers: {
    Authorization: `Bearer ${tokenUtil.get()}`,
  },
  withCredentials: true,
});

const reissueToken = async () => {
  const response = await reissueApi.get<ApiResult<TokenResult>>('auth/reissue');
  const result = handleApiResult(response);

  tokenUtil.save(result.token, result.expires_in);
};

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_HOST}/`,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const newConfig = { ...config };

    if (
      newConfig.url === 'auth/login' ||
      newConfig.url === 'publish-wata' ||
      newConfig.url?.includes('collection/shared')
    ) {
      return newConfig;
    }

    if (tokenUtil.isExperis()) {
      try {
        await reissueToken(); // 토큰 재발급 요청
      } catch (reissueError) {
        window.location.href = '/login';
        return Promise.reject(reissueError); // 에러 반환
      }
    }

    newConfig.headers.Authorization = `Bearer ${tokenUtil.get()}`;

    return newConfig;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await reissueToken();
        originalRequest.headers.Authorization = `Bearer ${tokenUtil.get()}`;
        return await api(originalRequest);
      } catch (reissueError) {
        window.location.href = '/login';
        return Promise.reject(reissueError);
      }
    } else {
      delete originalRequest._retry;
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

export const deleteData = async <T>(
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any,
): Promise<T> => {
  const response = await api.delete<ApiResult<T>>(
    path,
    params ? { data: params } : undefined,
  );

  return handleApiResult(response);
};
