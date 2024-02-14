import Footer from 'src/layouts/Footer';
import Header, { MenuInfo } from 'src/layouts/Header';
import { PageLoader } from '@components/CommonComponents/loader';
import { getUser } from '@utils/user.util';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const userMenus: MenuInfo[] = [
  {
    label: '컬렉션',
    icon: 'star',
    path: '/collections',
  },
  {
    label: '추천작 제보',
    icon: 'mail',
    callback: () => {
      window.open(
        'https://docs.google.com/forms/d/e/1FAIpQLSfvn7m8JTfXCt57EkJLkXo66a6FB2ra0hzN9PE4CyVNZcuzHg/viewform',
        '_blank',
      );
    },
  },
];

const adminMenus: MenuInfo[] = [
  ...userMenus,
  {
    label: '관리자',
    icon: 'star',
    path: '/admin',
  },
];

export default function CommonLayout() {
  const user = getUser();
  const isAdmin = user?.role === 'ADMIN';
  const isLogin = !!user;

  return (
    <div className="layout">
      <Header isLogin={isLogin} menus={isAdmin ? adminMenus : userMenus} />

      <div className="page">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
