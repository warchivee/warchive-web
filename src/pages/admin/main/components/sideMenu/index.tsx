import Button from '@components/button';
import Drawer from '@components/drawer';
import { Link } from 'react-router-dom';

export default function AdminSideMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <ol>
        <li>
          <Button labelColor="white" size="big">
            <Link to="/admin">데이터 관리</Link>
          </Button>
        </li>
        <li>
          <Button labelColor="white" size="big">
            <Link to="/admin/keyword">키워드 관리</Link>
          </Button>
        </li>
      </ol>
    </Drawer>
  );
}
