import { WataType } from 'src/types/wata.type';

export interface WataCardProps {
  wata: WataType;
  handleBookmark?: () => void;
}
export interface WataCardListProps {
  watas: WataType[];
  selectIndex: number;
}
