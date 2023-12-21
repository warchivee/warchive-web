import { ColorType } from '@utils/color';

export type IconType =
  | 'angles-up'
  | 'bars'
  | 'download'
  | 'facebook'
  | 'instagram'
  | 'mail'
  | 'minus'
  | 'plus'
  | 'question'
  | 'star'
  | 'twitter'
  | 'write'
  | 'xmark';

export type IconSizeType = 'big' | 'normal' | 'small';

export interface IconProps {
  type: IconType;
  color: ColorType;
  size: IconSizeType;
}
