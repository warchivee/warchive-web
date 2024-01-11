import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { getAccessToken } from '@utils/token.util';
import { handleApiResult, handlerApiError } from './apiResult.util';

interface ApiConfig extends AxiosRequestConfig {
  headers?: AxiosHeaders;
  withCredentials?: boolean;
}

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_HOST}`,
});

export const getData = async <T>(
  path: string,
  params: Record<string, string | number>,
): Promise<T> => {
  try {
    const queryString = Object.keys(params)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
      )
      .join('&');

    const response = await api.get<T>(`${path}?${queryString}`);

    return handleApiResult(response);
  } catch (error) {
    handlerApiError(error);
    throw error;
  }
};

export const postData = async <T>(
  path: string,
  params?: Record<string, string | number>,
  options?: ApiConfig,
): Promise<T> => {
  try {
    const response = await api.post<T>(path, params, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return handleApiResult(response);
  } catch (error) {
    handlerApiError(error);
    throw error;
  }
};

export const patchData = async <T>(
  path: string,
  params?: Record<string, string | number>,
  options?: ApiConfig,
): Promise<T> => {
  try {
    const response = await api.patch<T>(path, params, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return handleApiResult(response);
  } catch (error) {
    handlerApiError(error);
    throw error;
  }
};

export const deleteData = async <T>(
  path: string,
  options?: ApiConfig,
): Promise<T> => {
  try {
    const response = await api.delete<T>(path, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return handleApiResult(response);
  } catch (error) {
    handlerApiError(error);
    throw error;
  }
};
