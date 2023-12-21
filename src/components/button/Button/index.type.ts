import { FontSizeType } from '@components/text/index.type';
import { ColorType } from '@utils/color';

export interface ButtonProps {
  children?: React.ReactNode;
  labelColor?: ColorType;
  color?: ColorType;
  type?: 'default' | 'round';
  size?: FontSizeType;
  width?: 'default' | 'full';
  onClick?: () => void;
}
