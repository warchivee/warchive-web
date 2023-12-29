import { WataType } from '@utils/watas/index.type';

export interface WataCardProps {
  wata: WataType;
  handleBookmark?: () => void;
}
export interface WataCardListProps {
  watas: WataType[];
}
