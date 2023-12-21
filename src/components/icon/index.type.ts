import { ColorType } from '@utils/color';
import { FontSize } from '@components/text/index.util';

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

export interface IconProps {
  type: IconType;
  color: ColorType;
  size: FontSize;
}
