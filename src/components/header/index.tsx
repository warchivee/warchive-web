import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import Button from '@components/button';
import Footer from '@components/footer';
import { Text, Title } from '@components/text';
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
  const [isMenuOpen, setMenuOpen] = useState(false);
  const handleHamburgereMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="header-background">
        <header>
          <Link to="/">
            <div className="logo">
              <img src="/images/logo/logo-text.png" alt="와카이브 로고" />
            </div>
          </Link>

          <div className="menus">
            <div className="menu">{renderMenus(leftMenus, pathname)}</div>

            <div className="menu">{renderMenus(rightMenus, pathname)}</div>
          </div>
        </header>
      </div>

      <div className="mobile-header-background">
        <header>
          {/* 햄버거 바 버튼 */}
          <div className="menu-hamburger">
            <Button
              icon="hambuger-menu"
              iconColor="vivid-violet"
              size="big"
              onClick={handleHamburgereMenu}
            />
          </div>
          <Link to="/">
            <div className="logo">
              <img src="/images/logo/logo-text.png" alt="와카이브 로고" />
            </div>
          </Link>
          <div className="menu-collection">
            <Link to="/collections">
              <Button icon="star" iconColor="vivid-violet" size="big" />
            </Link>
          </div>
        </header>
      </div>

      <div className={`mobile-hamburger-side ${isMenuOpen ? 'open' : ''}`}>
        <div className="hamburger-header">
          <div className="close-button">
            <Button
              icon="xmark"
              iconColor="white"
              onClick={handleHamburgereMenu}
            />
          </div>
          <div className="info">
            <div className="logo">
              <img src="/images/logo/logo.png" alt="와카이브 로고" />
            </div>
            <div className="text">
              <Text size="small" color="white">
                여성서사 아카이브 프로젝트
              </Text>
              <Title type="h2" color="white">
                Warchive
              </Title>
            </div>
          </div>
        </div>
        <div className="hamburger-menus">
          {/* 컬렉션 */}
          {/* 추천작 제보/문의 */}
          {/* 와카이브 소개 */}
        </div>
        <div className="hamburger-footer">
          <Footer />
        </div>
      </div>
    </>
  );
}
