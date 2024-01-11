import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import Button from '@components/button';
import AdminHeader from './header';

export default function AdminMain() {
  const [open, toggleDrawer] = useState(true);

  return (
    <div className="admin">
      <AdminHeader openDrawer={() => toggleDrawer(!open)} />
      <div className="body">
        <div className="side-menu">
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
        </div>
        <div className="article">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
