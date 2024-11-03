import { useLocation, useNavigate } from 'react-router-dom';
import { cloneElement, startTransition, useState } from 'react';
import { checkLogin, logout } from 'src/services/auth.api';
import { Text, Title } from '@components/CommonComponents/text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBookBookmark,
  faCircleQuestion,
  faEnvelope,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faUser as faUserSolid } from '@fortawesome/free-regular-svg-icons';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  ModalClose,
  Stack,
  Typography,
} from '@mui/joy';
import useModal from 'src/hooks/useModal';
import MailModal from './MailModal';

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
  const [openModal] = useModal();

  if (isLogin) {
    return (
      <IconButton
        sx={{
          gap: '0.5rem',
        }}
        onClick={() => {
          openModal({
            title: '로그아웃하기',
            message: '로그아웃하시겠습니까?',
            onConfirm: () => {
              startTransition(() => {
                if (callback) {
                  callback();
                }
                logout();
              });
            },
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
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => {
        startTransition(() => {
          if (pathname === '/') {
            window.location.href = '/';
          } else {
            navigate('/');
          }
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
  const navigate = useNavigate();

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      size="md"
      sx={{
        '& .MuiDrawer-content': {
          background: '#170C1E',
        },
      }}
    >
      <Box role="presentation">
        <Stack
          justifyContent="center"
          alignItems="center"
          padding="2rem 1rem 2rem 1rem"
          gap={1}
          sx={{ background: '#9023D5' }}
        >
          <ModalClose color="primary" />

          <Box height="45px" width="45px">
            <img
              src="/images/logo/logo.png"
              alt="와카이브 로고"
              height="100%"
              width="100%"
            />
          </Box>

          <Text size="small" color="white">
            여성서사 아카이브 프로젝트
          </Text>
          <Title type="h2" color="white">
            Warchive
          </Title>
        </Stack>
        <Stack
          alignItems="flex-start"
          divider={<Divider sx={{ background: '#ffffff40' }} />}
        >
          <Stack alignItems="flex-start" gap={1} padding="1rem">
            {renderMenus(
              [
                ...menus,
                {
                  label: '와카이브 소개',
                  icon: <FontAwesomeIcon icon={faCircleQuestion} />,
                  path: '/about',
                  callback: () => {
                    navigate('/about');
                  },
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
          </Stack>
          <Stack alignItems="flex-start" gap={1} padding="1rem">
            <LoginButton isLogin={isLogin} callback={onClose} mobile />
          </Stack>
        </Stack>
      </Box>
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
  const navigate = useNavigate();

  const [openMail, setOpenMail] = useState(false);

  const userMenus: MenuInfo[] = [
    {
      label: '스크랩북',
      icon: <FontAwesomeIcon color="white" icon={faBookBookmark} />,
      path: '/scrapbooks',
      callback: () => {
        navigate('/scrapbooks');
      },
    },
    {
      label: '추천작 제보',
      icon: <FontAwesomeIcon icon={faEnvelope} />,
      callback: () => {
        // window.open(
        //   'https://docs.google.com/forms/d/e/1FAIpQLSfvn7m8JTfXCt57EkJLkXo66a6FB2ra0hzN9PE4CyVNZcuzHg/viewform',
        //   '_blank',
        // );

        setOpenMail(true);
      },
    },
  ];

  return (
    <header>
      <PCHeader isLogin={checkLogin()} menus={userMenus} />
      <MobileHeader isLogin={checkLogin()} menus={userMenus} />

      <MailModal open={openMail} onClose={() => setOpenMail(false)} />
    </header>
  );
}
