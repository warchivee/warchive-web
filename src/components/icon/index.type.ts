import { FontSizeType } from '@components/text/index.type';
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
  | 'xmark'
  | 'search';

export interface IconProps {
  type: IconType;
  color: ColorType;
  size: FontSizeType;
}
