import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import Button from '@components/button';
import { Text, Title } from '@components/text';
import { HeaderProps, MenuInfo } from './index.type';

const openReportModal = () => {
  window.open(
    'https://docs.google.com/forms/d/e/1FAIpQLSfvn7m8JTfXCt57EkJLkXo66a6FB2ra0hzN9PE4CyVNZcuzHg/viewform',
    '_blank',
  );
};

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
        iconColor={
          currentPath.includes(menu.path ?? 'noting')
            ? 'lavender'
            : 'vivid-violet'
        }
        labelColor={
          currentPath.includes(menu.path ?? 'noting') ? 'white' : 'gray'
        }
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
        <div className="hamburger-container">
          <div className="hamburger-header">
            <div className="close-button">
              <Button
                icon="xmark"
                iconColor="white"
                size="big"
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
            <div className="menus">
              <Link to="/collections">
                <Button
                  icon="star"
                  iconColor="white"
                  labelColor="white"
                  size="big"
                  onClick={handleHamburgereMenu}
                >
                  북마크 목록
                </Button>
              </Link>
              <Button
                icon="mail"
                iconColor="white"
                labelColor="white"
                size="big"
                onClick={() => {
                  openReportModal();
                  handleHamburgereMenu();
                }}
              >
                추천작 제보/문의
              </Button>
              <Link to="/about">
                <Button
                  icon="question"
                  iconColor="white"
                  labelColor="white"
                  size="big"
                  onClick={handleHamburgereMenu}
                >
                  와카이브 소개
                </Button>
              </Link>
            </div>
          </div>
          <div className="hamburger-footer">
            <footer>
              <div className="connect">
                <a
                  href="https://twitter.com/Womynarchive"
                  target="_blank"
                  aria-label="트위터로 이동"
                  rel="noreferrer"
                >
                  <Button
                    icon="twitter"
                    iconColor="ebony"
                    background="twitter-blue"
                  />
                </a>
              </div>
              <div className="bar" />
              <div className="info">
                <div>
                  <Text color="gray" size="small">
                    연락처
                  </Text>
                  <Text color="gray" size="small">
                    team.warchive@gmail.com
                  </Text>
                </div>

                <div>
                  <Text color="gray" size="small">
                    후원계좌
                  </Text>
                  <Text color="gray" size="small">
                    우리 1002 343 024735 ㅇㅈㅇ
                  </Text>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
