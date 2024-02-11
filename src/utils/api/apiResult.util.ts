import { AxiosResponse } from 'axios';

export interface ApiResult<T> {
  success: boolean;
  result: T;
}

export const handleApiResult = <T>(
  response: AxiosResponse<ApiResult<T>, unknown>,
): T => response.data.result;
