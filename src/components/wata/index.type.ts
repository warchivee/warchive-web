import { WataType } from '@utils/common.type';

export interface WataCardProps {
  wata: WataType;
  handleBookmark?: () => void;
}
export interface WataCardListProps {
  watas: WataType[];
}
