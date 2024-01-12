import Footer from '@components/footer';
import Header from '@components/header';
import { MenuInfo } from '@components/header/index.type';
import { getUser } from '@utils/user.util';
import { Outlet } from 'react-router-dom';

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
    label: '추천작 제보/문의',
    icon: 'mail',
    type: 'popup',
    openPopup: openReportModal,
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

export default function Main() {
  return (
    <>
      <Header
        leftMenus={getUser().role === 'ADMIN' ? adminMenu : userMenu}
        rightMenus={[
          {
            icon: 'question',
            path: '/about',
            type: 'page',
          },
        ]}
      />
      <Outlet />
      <Footer />
    </>
  );
}
