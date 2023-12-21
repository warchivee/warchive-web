import { ColorType } from '@utils/color';
import { IconType } from '@components/icon/index.type';
import { FontSize } from '@components/text/index.util';

export interface IconButtonProps {
  icon?: IconType;
  iconColor?: ColorType;
  label?: string;
  labelColor?: ColorType;
  size?: FontSize;
  align?: 'default' | 'reverse';
  onClick?: () => void;
}
