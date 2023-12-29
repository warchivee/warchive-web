import { WataIdType } from '@utils/watas/index.type';

export const COLLEACTIONS_KEY = 'my-warchive-collections';
export const DEFAULT_COLLECTIONS_NAME = '미지정';
export const DEFAULT_COLLECTIONS_KEY = 0;

export interface CollectionType {
  title: string;
  items: WataIdType[];
}
