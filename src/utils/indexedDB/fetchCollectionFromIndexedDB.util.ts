import { isLogin } from 'src/services/auth.api';
import moment from 'moment-timezone';
import { getCollectionsApi } from 'src/services/collection.api';
import { CollectionType } from 'src/types/collection.type';
import localStorageUtil from '@utils/localStorage/localstorage.util';
import IndexedDBUtil, { COLLECTION_STORE } from './indexedDB.util';

export const collectionUpdatedAtKey = 'COLLECTION_UPDATE_AT';

const indexedDB = IndexedDBUtil.getInstance();

const needUpdate = () => {
  try {
    const updateAt = localStorageUtil.get(collectionUpdatedAtKey, false);

    if (updateAt) {
      const currnet = moment().tz('Asia/Seoul');
      const updateTime = moment(updateAt).tz('Asia/Seoul');

      if (currnet.isBefore(updateTime)) {
        return false;
      }
    }

    return true;
  } catch (error) {
    return true;
  }
};

const syncCollectionFromServer = async () => {
  if (!needUpdate()) {
    return;
  }

  await indexedDB.clearStore(COLLECTION_STORE);

  const datas = await getCollectionsApi();

  try {
    datas?.forEach(async (item) => {
      await indexedDB.addItem(COLLECTION_STORE, item);
    });

    localStorageUtil.save(
      collectionUpdatedAtKey,
      moment().tz('Asia/Seoul').add(1, 'd'),
      false,
    );
  } catch (error) {
    await indexedDB.clearStore(COLLECTION_STORE);
    console.error(error);
  }
};

export const fetchCollections = async (): Promise<CollectionType[]> => {
  if (!isLogin()) {
    return [];
  }

  await syncCollectionFromServer();

  const savedCollections =
    await indexedDB.getItems<CollectionType[]>(COLLECTION_STORE);

  return savedCollections;
};

export default fetchCollections;
