import { ColorType } from '@utils/color';
import { IconType } from '@components/icon/index.type';
import { FontSizeType } from '@components/text/index.type';

export interface ButtonProps {
  children?: React.ReactNode;
  icon?: IconType;
  iconColor?: ColorType;
  labelColor?: ColorType;
  background?: ColorType;
  type?: 'default' | 'round';
  size?: FontSizeType;
  align?: 'default' | 'reverse';
  width?: 'default' | 'full';
  onClick?: () => void;
}
