import Footer from '@components/footer';
import Header from '@components/header';
import { MenuInfo } from '@components/header/index.type';
import Loader from '@components/loader';
import { getUser } from '@utils/user.util';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { logout } from 'src/services/auth.api';

const openReportModal = () => {
  window.open(
    'https://docs.google.com/forms/d/e/1FAIpQLSfvn7m8JTfXCt57EkJLkXo66a6FB2ra0hzN9PE4CyVNZcuzHg/viewform',
    '_blank',
  );
};

const userMenu: MenuInfo[] = [
  {
    label: '컬렉션',
    icon: 'star',
    path: '/collections',
    type: 'page',
  },
  {
    label: '추천작 제보',
    icon: 'mail',
    type: 'button',
    callback: openReportModal,
  },
];

const adminMenu: MenuInfo[] = [
  ...userMenu,
  {
    label: '관리자',
    icon: 'star',
    type: 'page',
    path: '/admin',
  },
];

const getRightMenu = (isLogin: boolean): MenuInfo[] => {
  const about = {
    icon: 'question',
    path: '/about',
    type: 'page',
  };

  if (isLogin) {
    return [
      {
        label: '로그아웃',
        type: 'button',
        callback: () => logout(),
      },
      about,
    ] as MenuInfo[];
  }

  return [
    {
      path: '/login',
      label: '로그인',
      type: 'page',
    },
    about,
  ] as MenuInfo[];
};

export default function Main() {
  const user = getUser();
  const isAdmin = user?.role === 'ADMIN';
  const isLogin = !!user;

  return (
    <>
      <Header
        leftMenus={isAdmin ? adminMenu : userMenu}
        rightMenus={getRightMenu(isLogin)}
      />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}