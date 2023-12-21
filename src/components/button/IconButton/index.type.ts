import { ColorType } from '@utils/color';
import { IconType, IconSizeType } from '@components/icon/index.type';

export interface IconButtonProps {
  icon?: IconType;
  iconColor?: ColorType;
  label?: string;
  labelColor?: ColorType;
  size?: IconSizeType;
  align?: 'default' | 'reverse';
  onClick?: () => void;
}
