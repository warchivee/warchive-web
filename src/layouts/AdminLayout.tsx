import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="admin">
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
