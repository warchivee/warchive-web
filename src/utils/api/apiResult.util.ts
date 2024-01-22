import ModalUtil from '@utils/modal.util';
import { AxiosError, AxiosResponse } from 'axios';

export interface ApiResult<T> {
  success: boolean;
  result: T;
}

export const handlerApiError = (error: unknown): void => {
  if ((error as AxiosError).response?.status === 401) {
    window.location.href = '/login';
    return;
  }

  ModalUtil.open({
    title: '요청 실패',
    message: `${error}`,
  });
};

export const handleApiResult = <T>(
  response: AxiosResponse<ApiResult<T>, unknown>,
): T => response.data.result;
