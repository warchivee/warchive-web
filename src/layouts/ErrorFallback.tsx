import { AxiosError } from 'axios';

function ErrorFallback({ error, resetErrorBoundary }) {
  if (error instanceof AxiosError) {
    const er = error as AxiosError;

    if (er?.code === 'ERR_NETWORK') {
      return <div>서버 점검 중입니다.</div>;
    }
  } else {
    return <div>잠시 후 다시 시도해주세요.</div>;
  }
}

export default ErrorFallback;
