import Button from '@components/button';
import { Title } from '@components/text';
import { getUser } from '@utils/user.util';
import { Link } from 'react-router-dom';

export default function AdminHeader({
  openDrawer,
}: {
  openDrawer: () => void;
}) {
  return (
    <div className="header">
      <div className="body">
        <div className="left">
          {/* <Button onClick={() => openDrawer()} labelColor="white" size="big">
            메뉴
          </Button> */}
          <Button labelColor="white" size="big">
            <Link to="/admin">데이터 관리</Link>
          </Button>
          <Button labelColor="white" size="big">
            <Link to="/admin/keyword">키워드 관리</Link>
          </Button>
        </div>

        <div className="right">
          <Title type="h4" color="selago">
            {getUser()?.nickname}
          </Title>
        </div>
      </div>
    </div>
  );
}
