import { Title } from '@components/CommonComponents/text';
import userUtil from '@utils/user.util';
import { Link } from 'react-router-dom';

export default function AdminHeader() {
  return (
    <header>
      <div className="content">
        <div className="item">
          <Link to="/admin">데이터 관리</Link>
        </div>

        <div className="item">
          <Title type="h4" color="selago">
            {userUtil.get()?.nickname}
          </Title>
        </div>
      </div>
    </header>
  );
}
