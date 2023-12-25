import { IconType } from '@components/icon/index.type';

export interface MenuInfo {
  icon: IconType;
  label?: string;
  type: 'popup' | 'page';
  path?: string;
  openPopup?: () => void;
}

export interface HeaderProps {
  leftMenus?: MenuInfo[];
  rightMenus?: MenuInfo[];
}
