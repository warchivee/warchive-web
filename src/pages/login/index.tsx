import { getKakaoLoginPageUrl } from 'src/services/kakao.api';

export default function Login() {
  return (
    <div className="page">
      <a href={getKakaoLoginPageUrl()}>
        <img src="/images/login/kakao.png" alt="카카오 로그인" />
      </a>
    </div>
  );
}
