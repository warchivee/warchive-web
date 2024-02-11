import {
  COLLEACTIONS_KEY,
  CollectionType,
  DEFAULT_COLLECTIONS_NAME,
} from 'src/types/collection.type';
import { DefaultValue, atom, selector } from 'recoil';

// todo: 기존 와카이브 북마크 연동
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
    const stateDatas = get(collectionAtom);
    return stateDatas;
  },
  set: ({ set }, newValue: CollectionType[] | DefaultValue) => {
    set(collectionAtom, newValue);
    localStorage.setItem(COLLEACTIONS_KEY, JSON.stringify(newValue));
  },
});
