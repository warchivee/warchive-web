import { loadLocalStorage, saveLocalstorage } from '@utils/localStorage';
import moment from 'moment-timezone';
import { atom, selector } from 'recoil';
import { getCollectionsApi } from 'src/services/collection.api';
import { CollectionType } from 'src/types/collection.type';

export const collectionLocalStorageKey = 'SAVED_COLLECTION';

interface SavedCollectionType {
  updated_at: Date;
  collections: CollectionType[];
}

const updateCollections = async (updateAt: moment.Moment) => {
  const datas = await getCollectionsApi();
  saveLocalstorage(collectionLocalStorageKey, {
    updated_at: updateAt,
    collections: datas,
  });
};

const getCollections = () =>
  loadLocalStorage(collectionLocalStorageKey) as SavedCollectionType | null;

const initCollections = async () => {
  const savedCollections = getCollections();

  const updateTime = moment(import.meta.env.VITE_DATA_UPDATE_AT).tz(
    'Asia/Seoul',
  );

  if (
    !savedCollections ||
    !savedCollections?.updated_at ||
    !savedCollections?.collections
  ) {
    await updateCollections(updateTime);
  }

  const lastUpdateTime = moment(savedCollections?.updated_at).tz('Asia/Seoul');

  if (!updateTime.isSame(lastUpdateTime)) {
    await updateCollections(updateTime);
  }

  return getCollections()?.collections as CollectionType[];
};

export const collectionAtom = atom<CollectionType[]>({
  key: 'collectionAtom',
  default: initCollections(),
});

export const collectionSelector = selector<CollectionType[]>({
  key: 'collectionSelector',
  get: ({ get }) => get(collectionAtom),
  set: ({ set }, newValue) => {
    saveLocalstorage(collectionLocalStorageKey, {
      ...getCollections(),
      collections: newValue,
    });
    set(collectionAtom, newValue);
  },
});

export const selectCollectionIndexState = atom<number>({
  key: 'selectCollectionIndexState',
  default: 0,
});
