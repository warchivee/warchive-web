import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Button from '@components/CommonComponents/button';
import { logout } from 'src/services/auth.api';
import { IconType } from '@components/CommonComponents/icon/index.type';
import { Permissiontype } from 'src/types/auth.type';
import Drawer from '@components/CommonComponents/drawer';
import { Text, Title } from '@components/CommonComponents/text';
import Footer from './Footer';

export interface MenuInfo {
  icon: IconType;
  label: string;
  path?: string;
  callback?: () => void;
}

interface HeaderProps {
  menus?: MenuInfo[];
  isLogin: boolean;
}

const renderMenus = (menus: MenuInfo[], currentPath: string) =>
  menus?.map((menu: MenuInfo, index: number) => {
    const isCurrent = currentPath.includes(menu.path ?? 'noting');
    const iconColor = isCurrent ? 'lavender' : 'vivid-violet';
    const labelCOlor = isCurrent ? 'white' : 'gray';

    if (menu.path) {
      return (
        <Link key={`menu-${index + 1}`} to={menu.path}>
          <Button
            icon={menu.icon}
            iconColor={iconColor}
            labelColor={labelCOlor}
            size="big"
            onClick={() => {
              if (menu.callback) {
                menu.callback();
              }
            }}
          >
            {menu.label}
          </Button>
        </Link>
      );
    }

    return (
      <Button
        key={`menu-${index + 1}`}
        icon={menu.icon}
        iconColor={iconColor}
        labelColor={labelCOlor}
        size="big"
        onClick={() => {
          if (menu.callback) {
            menu.callback();
          }
        }}
      >
        {menu.label}
      </Button>
    );
  });

const LoginButton = ({ isLogin }: { isLogin: boolean }) => {
  if (isLogin) {
    return (
      <Button onClick={logout} labelColor="gray" size="big">
        로그아웃
      </Button>
    );
  }

  return (
    <Link to={'/login'}>
      <Button labelColor="gray" size="big">
        로그인
      </Button>
    </Link>
  );
};

const Logo = () => {
  return (
    <Link to="/">
      <div className="logo">
        <img src="/images/logo/logo-text.png" alt="와카이브 로고" />
      </div>
    </Link>
  );
};

const AboutButton = () => {
  return (
    <Link to={'/about'}>
      <Button icon="question" iconColor="vivid-violet" size="big" />
    </Link>
  );
};

const MobileMenuDrawer = ({
  menus = [],
  isLogin,
  isOpen,
  onClose,
}: {
  menus?: MenuInfo[];
  isLogin: boolean;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { pathname } = useLocation();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} background={'ebony'}>
      <div className="mobile-menu">
        <div>
          <div className="header">
            <Button
              icon="xmark"
              iconColor="white"
              size="big"
              onClick={onClose}
            />

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
                  icon: 'question',
                  path: '/about',
                } as MenuInfo,
              ].map((menu) => {
                return {
                  ...menu,
                  callback: () => {
                    onClose();

                    if (menu.callback) {
                      menu.callback();
                    }
                  },
                };
              }),
              pathname,
            )}
          </div>
          <div>
            <LoginButton isLogin={isLogin} />
          </div>
        </div>

        <Footer />
      </div>
    </Drawer>
  );
};

const MobileHeader = ({ menus, isLogin }: HeaderProps) => {
  const [isOpenMobileMenu, toggleMobileMenu] = useState(false);

  return (
    <div className="content mobile">
      <Button
        icon="hambuger-menu"
        iconColor="vivid-violet"
        size="big"
        onClick={() => toggleMobileMenu(true)}
      />
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
};

const PCHeader = ({ menus = [], isLogin }: HeaderProps) => {
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
};

export default function Header({ isLogin, menus = [] }: HeaderProps) {
  return (
    <header>
      <PCHeader isLogin={isLogin} menus={menus} />
      <MobileHeader isLogin={isLogin} menus={menus} />
    </header>
  );
}
