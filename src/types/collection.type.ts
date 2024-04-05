import { WataIdType } from 'src/types/wata.type';

export const TITLE_LIMIT_LENGTH = 50;
export const COMMENT_LIMIT_LENGTH = 200;

export interface CollectionType {
  id: number;
  shared_id: string;
  title: string;
  note: string;
  items: WataIdType[];
}
