import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';

export default function AdminLayout() {
  return (
    <div className="admin">
      <AdminHeader />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
