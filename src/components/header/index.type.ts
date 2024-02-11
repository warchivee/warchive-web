import { IconType } from '@components/icon/index.type';

export interface MenuInfo {
  icon: IconType;
  label?: string;
  type: 'page' | 'button';
  path?: string;
  callback?: () => void;
}

export interface HeaderProps {
  leftMenus?: MenuInfo[];
  rightMenus?: MenuInfo[];
}
