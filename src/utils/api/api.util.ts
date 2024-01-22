import axios, {
  AxiosHeaders,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from 'axios';
import { getAccessToken } from '@utils/token.util';
import { ApiResult, handleApiResult, handlerApiError } from './apiResult.util';

interface ApiConfig extends AxiosRequestConfig {
  headers?: RawAxiosRequestHeaders | AxiosHeaders;
  withCredentials?: boolean;
}

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_HOST}/`,
});

export const getData = async <T>(
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any,
  noAuth?: boolean,
): Promise<T> => {
  try {
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

    const response = await api.get<ApiResult<T>>(
      `${path}${queryString}`,
      noAuth
        ? {}
        : {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          },
    );

    return handleApiResult(response);
  } catch (error) {
    handlerApiError(error);
    throw error;
  }
};

export const postData = async <T>(
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any,
  options?: ApiConfig,
  noAuth?: boolean,
): Promise<T> => {
  try {
    const response = await api.post<ApiResult<T>>(
      path,
      params,
      noAuth
        ? {
            ...options,
            headers: {
              ...options?.headers,
            },
          }
        : {
            ...options,
            headers: {
              ...options?.headers,
              Authorization: `Bearer ${getAccessToken()}`,
            },
          },
    );

    return handleApiResult(response);
  } catch (error) {
    handlerApiError(error);
    throw error;
  }
};

export const putData = async <T>(
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any,
  options?: ApiConfig,
): Promise<T> => {
  try {
    const response = await api.put<ApiResult<T>>(path, params, {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any,
  options?: ApiConfig,
): Promise<T> => {
  try {
    const response = await api.patch<ApiResult<T>>(path, params, {
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
    const response = await api.delete<ApiResult<T>>(path, {
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
