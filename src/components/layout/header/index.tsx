import { Link, useLocation } from 'react-router-dom';
import Button from '@components/button';
import { HeaderProps, MenuInfo } from './index.type';

const renderMenus = (menus: MenuInfo[], currentPath: string) =>
  menus?.map((menu: MenuInfo, index: number) =>
    menu.type === 'page' ? (
      <Link key={`menu-${index + 1}`} to={menu.path ?? ''}>
        <Button
          icon={menu.icon}
          iconColor={currentPath === menu.path ? 'lavender' : 'vivid-violet'}
          labelColor={currentPath === menu.path ? 'white' : 'gray'}
          size="big"
        >
          {menu.label}
        </Button>
      </Link>
    ) : (
      <Button
        key={`menu-${index + 1}`}
        icon={menu.icon}
        iconColor={currentPath === menu.path ? 'lavender' : 'vivid-violet'}
        labelColor={currentPath === menu.path ? 'white' : 'gray'}
        size="big"
        onClick={menu.openPopup}
      >
        {menu.label}
      </Button>
    ),
  );

export default function Header({
  leftMenus = [],
  rightMenus = [],
}: HeaderProps) {
  const { pathname } = useLocation();
  return (
    <div className="header-background">
      <header>
        <Link to="/">
          <div className="logo">
            <img src="public/images/logo/logo-text.png" alt="와카이브 로고" />
          </div>
        </Link>

        <div className="menus">
          <div className="menu">{renderMenus(leftMenus, pathname)}</div>

          <div className="menu">{renderMenus(rightMenus, pathname)}</div>
        </div>
      </header>
    </div>
  );
}
