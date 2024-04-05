import moment from 'moment-timezone';
import { WataListType, WataType } from 'src/types/wata.type';
import localStorageUtil from '@utils/localStorage/localstorage.util';
import IndexedDBUtil, { KEYWORD_STORE, WATA_STORE } from './indexedDB.util';
import { getData } from '../api.util';

const indexedDB = IndexedDBUtil.getInstance();

const wataUpdatedAtKey = 'WATA_UPDATED_AT';
const dataUpdateAt = import.meta.env.VITE_DATA_UPDATE_AT;

const initStore = async () => {
  await indexedDB.clearStore(WATA_STORE);
  await indexedDB.clearStore(KEYWORD_STORE);
};

const needUpdate = () => {
  try {
    const updatedAt = localStorageUtil.get(wataUpdatedAtKey, false);

    if (updatedAt) {
      const lastUpdateTime = moment(updatedAt).tz('Asia/Seoul');
      const updateTime = moment(dataUpdateAt).tz('Asia/Seoul');

      if (updateTime.isSame(lastUpdateTime)) {
        return false;
      }
    }

    return true;
  } catch (error) {
    return true;
  }
};

const syncWataFromServer = async (): Promise<void> => {
  if (!needUpdate()) {
    return;
  }

  await initStore();

  const { watas, categories } = await getData<WataListType>('publish-wata');

  try {
    watas?.forEach(async (item) => {
      await indexedDB.addItem(WATA_STORE, item);
    });

    categories?.forEach(async (item) => {
      await indexedDB.addItem(KEYWORD_STORE, item);
    });
  } catch (error) {
    initStore();
    console.error(error);
  }

  localStorageUtil.save(wataUpdatedAtKey, dataUpdateAt, false);
};

export const fetchWatas = async (): Promise<WataType[]> => {
  await syncWataFromServer();

  const savedCollections = await indexedDB.getItems<WataType[]>(WATA_STORE);

  return savedCollections;
};

export default fetchWatas;
