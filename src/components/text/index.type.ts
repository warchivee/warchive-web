import { ColorType } from '@utils/color.util';

export type FontSizeType = 'small' | 'normal' | 'big';

export type TitleType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

export interface TextProps {
  children?: React.ReactNode;
  size?: FontSizeType;
  color?: ColorType;
}

export interface TitleProps {
  children?: React.ReactNode;
  type: TitleType;
  color?: ColorType;
}

export interface CaptionProps {
  children?: React.ReactNode;
  color?: ColorType;
}
