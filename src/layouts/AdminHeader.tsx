import Button from '@components/CommonComponents/button';
import { Title } from '@components/CommonComponents/text';
import userUtil from '@utils/user.util';
import { Link } from 'react-router-dom';

export default function AdminHeader() {
  return (
    <header>
      <div className="content">
        <div className="item">
          <Button labelColor="white" size="big">
            <Link to="/admin">데이터 관리</Link>
          </Button>
          <Button labelColor="white" size="big">
            <Link to="/admin/keyword">키워드 관리</Link>
          </Button>
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
