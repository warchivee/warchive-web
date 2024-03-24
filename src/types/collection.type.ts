import { WataIdType } from 'src/types/wata.type';

export const COLLEACTIONS_KEY = 'my-warchive-collections'; //
export const COLLECTION_KEY = 'my-warchive-collection';
export const COLLECTION_LIST_KEY = 'my-warchive-collection-list';
export const DEFAULT_COLLECTIONS_NAME = '미지정';
export const DEFAULT_COLLECTIONS_KEY = 0;

export const TITLE_LIMIT_LENGTH = 50;
export const COMMENT_LIMIT_LENGTH = 200;

export interface CollectionType {
  id: number;
  title: string;
  note: string;
  shared_id: string;
  items: WataIdType[];
}

// export interface CollectionType {
//   collection_info: CollectionListType;
//   items: WataIdType[];
//   item_count: number;
// }

export interface CollectionListType {
  id: number;
  title: string;
  note: string;
  shared_id: string;
  created_at: string;
  updated_at: string;
}
