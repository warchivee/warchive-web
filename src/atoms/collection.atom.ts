import {
  COLLEACTIONS_KEY, //
  COLLECTION_KEY,
  COLLECTION_LIST_KEY,
  CollectionType,
  DEFAULT_COLLECTIONS_NAME,
} from 'src/types/collection.type';
import { DefaultValue, atom, selector } from 'recoil';
import { api } from '@utils/api.util';
import { WataIdType } from 'src/types/wata.type';

export const getCollection = async (
  page: number = 1,
  size: number = 18,
  id: string,
) => {
  try {
    id = id.replace(/&/g, '%26');
    id = id.replace(/\+/g, '%2B');
    id = id.replace(/=/g, '%3D');
    const response = await api.get(
      `https://admin-warchive.koyeb.app/api/v1/collection?page=${page}&page_size=${size}&id=${id}`,
    );
    const collection: CollectionType = {
      title: response.data.result.collection_info.title,
      items: response.data.result.collection_items,
      item_count: response.data.result.items_total_count,
    };
    // console.log('get collection by id result: ', collection); // DEBUG
    return collection;
  } catch (error) {
    console.error('get collection by id error', error); // ERROR
    throw error;
  }
};

export const removeFromCollection = async (
  selectIndex: number,
  id: WataIdType,
) => {};

// todo: 기존 와카이브 북마크 연동
const init = () => {
  const newValue = [
    {
      id: 0,
      title: DEFAULT_COLLECTIONS_NAME,
      note: '',
      shared_id: '',
      items: [],
    },
  ];

  localStorage.setItem(COLLEACTIONS_KEY, JSON.stringify(newValue));

  return newValue;
};

const getCollectionsToLocalStorage = () => {
  const storedDatas = localStorage.getItem(COLLEACTIONS_KEY);

  try {
    if (storedDatas) {
      const datas = JSON.parse(storedDatas);

      if (datas && datas instanceof Array && datas.length !== 0) {
        return datas;
      }
      return init();
    }

    return init();
  } catch (e) {
    return init();
  }
};

export const collectionAtom = atom<CollectionType[]>({
  key: 'collectionAtom',
  default: getCollectionsToLocalStorage(),
});

export const collectionSelector = selector<CollectionType[]>({
  key: 'collectionSelector',
  get: ({ get }) => {
    init();
    const stateDatas = get(collectionAtom);
    return stateDatas;
  },
  set: ({ set }, newValue: CollectionType[] | DefaultValue) => {
    set(collectionAtom, newValue);
    localStorage.setItem(COLLECTION_LIST_KEY, JSON.stringify(newValue));
  },
});
