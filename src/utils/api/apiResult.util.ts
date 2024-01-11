import ModalUtil from '@utils/modal.util';
import { AxiosError, AxiosResponse } from 'axios';

export const handlerApiError = (error: AxiosError): void => {
  if (error.response?.status === 401) {
    ModalUtil.open({
      title: '요청 실패',
      message:
        '장시간 로그인하지 않아 로그인이 해제되었습니다. 로그인 해주세요.',
    });
    return;
  }

  ModalUtil.open({
    title: '요청 실패',
    message: `${error}`,
  });
};

export const handleApiResult = <T>(response: AxiosResponse<T, unknown>) =>
  response.data;
