import {
  COLLECTION_LIST_KEY,
  CollectionListType,
  DEFAULT_COLLECTIONS_NAME,
} from 'src/types/collection.type';
import { DefaultValue, atom, selector } from 'recoil';
import { api } from '@utils/api.util';

const init = async () => {
  try {
    const collectionsResponse = await api.get(
      'https://admin-warchive.koyeb.app/api/v1/collection/list?page=1&page_size=100',
    );
    const collections = collectionsResponse.data.result.result;

    const newValue = [
      {
        id: 0,
        title: DEFAULT_COLLECTIONS_NAME,
        note: '',
        shared_id: '',
        created_at: '',
        updated_at: '',
      },
    ];

    newValue.push(...collections);
    localStorage.setItem(COLLECTION_LIST_KEY, JSON.stringify(newValue));

    console.log('saved collection lists: ', newValue); // DEBUG
    return newValue;
  } catch (error) {
    console.error('getting collection lists error: ', error); // ERROR
    throw error;
  }
};

const getCollectionListsToLocalStorage = () => {
  const storedDatas = localStorage.getItem(COLLECTION_LIST_KEY);

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

export const collectionListAtom = atom<CollectionListType[]>({
  key: 'collectionListAtom',
  default: getCollectionListsToLocalStorage(),
});

export const collectionListSelector = selector<CollectionListType[]>({
  key: 'collectionListSelector',
  get: ({ get }) => {
    init();
    const stateDatas = get(collectionListAtom);
    return stateDatas;
  },
  set: ({ set }, newValue: CollectionListType[] | DefaultValue) => {
    set(collectionListAtom, newValue);
    localStorage.setItem(COLLECTION_LIST_KEY, JSON.stringify(newValue));
  },
});
