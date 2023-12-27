import { FontSizeType } from '@components/text/index.type';
import { ColorType } from '@utils/color';

export type IconType =
  | 'angles-up'
  | 'angles-left'
  | 'angles-right'
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
  | 'search'
  | 'up'
  | 'down'
  | 'folder-plus';

export interface IconProps {
  type: IconType;
  color: ColorType;
  size: FontSizeType;
}
