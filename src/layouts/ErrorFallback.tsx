import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Stack, Typography } from '@mui/joy';
import { AxiosError } from 'axios';
import { logout } from 'src/services/auth.api';

function ErrorFallback({ error }: { error: Error }) {
  // network error
  if (error instanceof AxiosError) {
    const er = error as AxiosError;

    if (er?.code === 'ERR_NETWORK') {
      return (
        <Stack
          alignItems="center"
          gap={3}
          height="100vh"
          justifyContent="center"
          sx={{
            background:
              'linear-gradient(90deg, rgba(22,11,29,1) 0%, rgba(88,0,145,1) 100%)',
            color: 'white',
          }}
        >
          <FontAwesomeIcon size="5x" icon={faRobot} style={{ opacity: 0.8 }} />
          <Typography level="h3" textColor="white" sx={{ opacity: 0.8 }}>
            죄송합니다. 현재 서버 점검 중입니다.
          </Typography>
          <Typography textColor="white" sx={{ opacity: 0.8 }}>
            점검 진행 상황은{' '}
            <a
              href="https://twitter.com/Womynarchive"
              target="_blank"
              rel="noreferrer"
            >
              <Typography sx={{ textDecoration: 'underline' }}>
                트위터 계정
              </Typography>
            </a>
            에서 보실 수 있습니다.
          </Typography>
        </Stack>
      );
    }
    if (er?.response?.status === 401) {
      logout();
      window.location.href = '/';
    }
  }
  // application error
  else {
    return <div>잠시 후 다시 시도해주세요.</div>;
  }
}

export default ErrorFallback;
