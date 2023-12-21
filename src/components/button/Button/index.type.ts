import { ColorType } from '@utils/color';
import { FontSize } from '@components/text/index.util';

export interface ButtonProps {
  label?: string;
  labelColor?: ColorType;
  color?: ColorType;
  type?: 'square' | 'round';
  size?: FontSize;
  width?: 'defult' | 'full';
  onClick?: () => void;
}
