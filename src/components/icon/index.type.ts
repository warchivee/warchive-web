import { FontSizeType } from '@components/text/index.type';
import { ColorType } from '@utils/color.util';

export type IconType =
  | 'angles-up'
  | 'angles-left'
  | 'angles-right'
  | 'bars'
  | 'download'
  | 'facebook'
  | 'hambuger-menu'
  | 'instagram'
  | 'link'
  | 'mail'
  | 'minus'
  | 'plus'
  | 'question'
  | 'star'
  | 'twitter'
  | 'write'
  | 'xmark'
  | 'search'
  | 'share-up'
  | 'up'
  | 'down'
  | 'folder-plus'
  | 'share';

export interface IconProps {
  type: IconType;
  color: ColorType;
  size: FontSizeType;
}
