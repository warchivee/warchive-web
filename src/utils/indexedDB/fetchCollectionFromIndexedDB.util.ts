import { checkLogin } from 'src/services/auth.api';
import moment from 'moment-timezone';
import { getCollectionsApi } from 'src/services/collection.api';
import localStorageUtil from '@utils/localstorage.util';
import { CollectionType } from 'src/types/collections.type';
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
  await indexedDB.clearStore(COLLECTION_STORE);

  const datas = await getCollectionsApi();

  try {
    datas?.forEach(async (item) => {
      await indexedDB.addItem(COLLECTION_STORE, item);
    });
  } catch (error) {
    await indexedDB.clearStore(COLLECTION_STORE);
  }
};

export const fetchCollections = async (): Promise<CollectionType[]> => {
  if (!checkLogin()) {
    return [];
  }

  await syncCollectionFromServer();

  const savedCollections =
    await indexedDB.getItems<CollectionType[]>(COLLECTION_STORE);

  return savedCollections;
};

export default fetchCollections;
