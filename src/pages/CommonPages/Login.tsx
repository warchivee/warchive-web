import { Text, Title } from '@components/CommonComponents/text';
import { getKakaoLoginPageUrl } from 'src/services/kakao.api';

export default function Login() {
  return (
    <div className="login">
      <div className="logo">
        <img src="/images/logo/sh-logo.png" alt="로고" />
      </div>

      <div className="title">
        <Title type="h1">로그인하기</Title>
        <Text color="gray">
          별도의 회원가입 없이 소셜 계정으로 로그인하세요. 로그인 시 컬렉션
          기능을 사용할 수 있습니다.
        </Text>
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
