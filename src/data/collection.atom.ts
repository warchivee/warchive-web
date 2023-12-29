import { WataIdType } from '@utils/common.type';
import { DefaultValue, atom, selector } from 'recoil';

export const COLLEACTIONS_KEY = 'my-warchive-collections';
export const DEFAULT_COLLECTIONS_NAME = '미지정';
export const DEFAULT_COLLECTIONS_KEY = 0;

export interface CollectionType {
  title: string;
  items: WataIdType[];
}

const getCollectionsToLocalStorage = () => {
  const storedDatas = localStorage.getItem(COLLEACTIONS_KEY);

  const init = () => {
    const newValue = [
      {
        title: DEFAULT_COLLECTIONS_NAME,
        items: [],
      },
    ];

    localStorage.setItem(COLLEACTIONS_KEY, JSON.stringify(newValue));

    return newValue;
  };

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
  key: 'bookmarkListState',
  get: ({ get }) => {
    const stateDatas = get(collectionAtom);
    return stateDatas;
  },
  set: ({ set }, newValue: CollectionType[] | DefaultValue) => {
    set(collectionAtom, newValue);
    localStorage.setItem(COLLEACTIONS_KEY, JSON.stringify(newValue));
  },
});
