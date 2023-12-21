import { ColorType } from '@utils/color';
import { IconType } from '@components/icon/index.type';
import { FontSizeType } from '@components/text/index.type';

export interface IconButtonProps {
  children?: React.ReactNode;
  icon?: IconType;
  iconColor?: ColorType;
  labelColor?: ColorType;
  size?: FontSizeType;
  align?: 'default' | 'reverse';
  onClick?: () => void;
}
