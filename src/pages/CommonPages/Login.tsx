import { Text } from '@components/CommonComponents/text';
import { Typography } from '@mui/joy';
import { getKakaoLoginPageUrl } from 'src/services/kakao.api';

export default function Login() {
  return (
    <div className="login">
      <div className="logo">
        <img src="/images/logo/sh-logo.png" alt="로고" />
        <Typography level="h2" textAlign="center">
          로그인하기
        </Typography>
      </div>

      <div className="title">
        <Typography level="body-sm" textAlign="center">
          별도의 회원가입 없이 소셜 계정으로 로그인하세요.
          <br /> 로그인 시 컬렉션을 사용할 수 있습니다.
        </Typography>
      </div>

      <div className="driven" />

      <div className="buttons">
        <a href={getKakaoLoginPageUrl()}>
          <div className="button" style={{ background: '#FEE500' }}>
            <img src="/images/login/kakao.png" alt="카카오 로그인" />
          </div>
        </a>
      </div>

      <div className="infos">
        <Text size="small">이용약관</Text>
        <Text size="small">개인정보처리방침</Text>
      </div>
    </div>
  );
}
