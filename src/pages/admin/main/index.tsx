import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import AdminHeader from './components/header';
import AdminSideMenu from './components/sideMenu';

export default function AdminMain() {
  const [open, toggleDrawer] = useState(false);

  return (
    <div className="admin">
      <AdminHeader openDrawer={() => toggleDrawer(true)} />
      <div className="body">
        <AdminSideMenu
          isOpen={open}
          onClose={() => {
            toggleDrawer(false);
          }}
        />
        <article>
          <Outlet />
        </article>
      </div>
    </div>
  );
}
