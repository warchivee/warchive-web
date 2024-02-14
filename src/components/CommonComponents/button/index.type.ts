import { ColorType } from '@utils/color.util';
import { IconType } from '@components/CommonComponents/icon/index.type';
import { FontSizeType } from '@components/CommonComponents/text/index.type';

export interface ButtonProps {
  children?: React.ReactNode;
  icon?: IconType;
  iconColor?: ColorType;
  labelColor?: ColorType;
  background?: ColorType;
  border?: 'default' | 'round';
  size?: FontSizeType;
  align?: 'default' | 'reverse';
  width?: 'default' | 'full';
  isLoading?: boolean;
  onClick?: () => void;
}
