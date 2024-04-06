import { useLocation, useNavigate } from 'react-router-dom';
import { cloneElement, startTransition, useEffect, useState } from 'react';
import { checkLogin, logout } from 'src/services/auth.api';
import Drawer from '@components/CommonComponents/drawer';
import { Text, Title } from '@components/CommonComponents/text';
import userUtil from '@utils/user.util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBookBookmark,
  faCircleQuestion,
  faEnvelope,
  faHammer,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faUser as faUserSolid } from '@fortawesome/free-regular-svg-icons';
import { IconButton, Typography } from '@mui/joy';
import Footer from './Footer';

export interface MenuInfo {
  icon: JSX.Element;
  label: string;
  path?: string;
  callback: () => void;
}

interface HeaderProps {
  menus?: MenuInfo[];
  isLogin: boolean;
}

const renderMenus = (menus: MenuInfo[], currentPath: string) =>
  menus?.map((menu: MenuInfo, index: number) => {
    const isCurrent = currentPath === menu.path;
    const iconColor = isCurrent ? '#b169dd' : '#783b99';
    const labelColor = isCurrent ? 'white' : '#A29EA5';

    return (
      <IconButton
        size="sm"
        key={`menu-${index + 1}`}
        sx={{
          gap: '0.5rem',
        }}
        onClick={() => {
          startTransition(() => {
            menu.callback();
          });
        }}
      >
        {cloneElement(menu.icon, { color: iconColor })}
        <Typography textColor={labelColor}>{menu.label}</Typography>
      </IconButton>
    );
  });
function LoginButton({
  isLogin,
  callback,
  mobile = false,
}: {
  isLogin: boolean;
  callback?: () => void;
  mobile?: boolean;
}) {
  const navigate = useNavigate();

  if (isLogin) {
    return (
      <IconButton
        sx={{
          gap: '0.5rem',
        }}
        onClick={() => {
          startTransition(() => {
            if (callback) {
              callback();
            }
            logout();
          });
        }}
      >
        <FontAwesomeIcon style={{ color: '#b169dd' }} icon={faUser} />
        {mobile && <Typography textColor="white">로그아웃</Typography>}
      </IconButton>
    );
  }

  return (
    <IconButton
      sx={{
        gap: '0.5rem',
      }}
      onClick={() => {
        startTransition(() => {
          if (callback) {
            callback();
          }
          navigate('/login');
        });
      }}
    >
      <FontAwesomeIcon style={{ color: '#b169dd' }} icon={faUserSolid} />
      {mobile && <Typography textColor="white">로그인</Typography>}
    </IconButton>
  );
}

function Logo() {
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => {
        startTransition(() => {
          navigate('/');
        });
      }}
    >
      <div className="logo">
        <img src="/images/logo/logo-text.png" alt="와카이브 로고" />
      </div>
    </IconButton>
  );
}

function AboutButton() {
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => {
        startTransition(() => {
          navigate('/about');
        });
      }}
    >
      <FontAwesomeIcon style={{ color: '#b169dd' }} icon={faCircleQuestion} />
    </IconButton>
  );
}

function MobileMenuDrawer({
  menus = [],
  isLogin,
  isOpen,
  onClose,
}: {
  menus?: MenuInfo[];
  isLogin: boolean;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { pathname } = useLocation();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} background="ebony">
      <div className="mobile-menu">
        <div>
          <div className="header">
            <IconButton onClick={onClose}>
              <FontAwesomeIcon style={{ color: 'white' }} icon={faXmark} />
            </IconButton>

            <div className="logo">
              <img src="/images/logo/logo.png" alt="와카이브 로고" />
            </div>

            <Text size="small" color="white">
              여성서사 아카이브 프로젝트
            </Text>
            <Title type="h2" color="white">
              Warchive
            </Title>
          </div>
          <div className="menus">
            {renderMenus(
              [
                ...menus,
                {
                  label: '와카이브 소개',
                  icon: <FontAwesomeIcon icon={faCircleQuestion} />,
                  path: '/about',
                } as MenuInfo,
              ].map((menu) => ({
                ...menu,
                callback: () => {
                  onClose();

                  if (menu.callback) {
                    menu.callback();
                  }
                },
              })),
              pathname,
            )}
          </div>
          <div className="menus">
            <LoginButton isLogin={isLogin} callback={onClose} mobile />
          </div>
        </div>

        <Footer mobile />
      </div>
    </Drawer>
  );
}

function MobileHeader({ menus, isLogin }: HeaderProps) {
  const [isOpenMobileMenu, toggleMobileMenu] = useState(false);

  return (
    <div className="content mobile">
      <IconButton onClick={() => toggleMobileMenu(true)}>
        <FontAwesomeIcon style={{ color: '#b169dd' }} icon={faBars} />
      </IconButton>
      <Logo />
      <AboutButton />

      <MobileMenuDrawer
        menus={menus}
        isLogin={isLogin}
        isOpen={isOpenMobileMenu}
        onClose={() => {
          toggleMobileMenu(false);
        }}
      />
    </div>
  );
}

function PCHeader({ menus = [], isLogin }: HeaderProps) {
  const { pathname } = useLocation();

  return (
    <div className="content pc">
      <Logo />

      <nav>
        <div className="menus">{renderMenus(menus, pathname)}</div>
        <div className="menus">
          <LoginButton isLogin={isLogin} />
          <AboutButton />
        </div>
      </nav>
    </div>
  );
}

export default function Header() {
  const [login, setLogin] = useState(false);
  const [menus, setMenus] = useState<MenuInfo[]>([]);

  const navigate = useNavigate();
  const userMenus: MenuInfo[] = [
    {
      label: '컬렉션',
      icon: <FontAwesomeIcon color="white" icon={faBookBookmark} />,
      path: '/collections',
      callback: () => {
        navigate('/collections');
      },
    },
    {
      label: '추천작 제보',
      icon: <FontAwesomeIcon icon={faEnvelope} />,
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
      icon: <FontAwesomeIcon icon={faHammer} />,
      path: '/admin',
      callback: () => {
        navigate('/admin');
      },
    },
  ];

  useEffect(() => {
    setLogin(checkLogin());
    setMenus(userUtil.isAdmin() ? adminMenus : userMenus);
  }, []);

  return (
    <header>
      <PCHeader isLogin={login} menus={menus} />
      <MobileHeader isLogin={login} menus={menus} />
    </header>
  );
}
