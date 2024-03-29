import { WataIdType } from 'src/types/wata.type';

export const COLLEACTIONS_KEY = 'my-warchive-collections';
export const DEFAULT_COLLECTIONS_NAME = '미지정';
export const DEFAULT_COLLECTIONS_KEY = 0;

export const TITLE_LIMIT_LENGTH = 20;

export interface CollectionType {
  title: string;
  items: WataIdType[];
}
