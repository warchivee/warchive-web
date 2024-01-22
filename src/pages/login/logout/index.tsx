import { Text } from '@components/text';
import { useEffect } from 'react';
import { logout } from 'src/services/auth/auth.api';

export default function Logout() {
  useEffect(() => {
    logout();
  }, []);

  return <Text color="gray">로그아웃 중입니다...</Text>;
}
