import moment from 'moment-timezone';
import { WataListType, WataType } from 'src/types/wata.type';
import localStorageUtil from '@utils/localstorage.util';
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

  const allCategory = categories[0];

  try {
    watas?.forEach(async (item) => {
      await indexedDB.addItem(WATA_STORE, {
        ...item,
        category: {
          ...item.category,
          name: categories?.find((c) => c.id === item.category.id)?.name ?? '',
        },
        genre: {
          ...item.genre,
          name:
            allCategory?.genres.find((g) => g.id === item.genre.id)?.name ?? '',
        },
        keywords: item.keywords
          .map((ik) => ({
            ...ik,
            name: allCategory.keywords.find((k) => k.id === ik.id)?.name ?? '',
          }))
          ?.sort((a, b) => a.name.localeCompare(b.name, 'ko')),
        cautions: item.cautions
          .map((ic) => ({
            ...ic,
            name: allCategory.cautions.find((c) => c.id === ic.id)?.name ?? '',
          }))
          ?.sort((a, b) => a.name.localeCompare(b.name, 'ko')),
        platforms: item.platforms
          .map((ip) => ({
            ...ip,
            name: allCategory.platforms.find((p) => p.id === ip.id)?.name ?? '',
          }))
          ?.sort((a, b) => a.name.localeCompare(b.name, 'ko')),
      });
    });

    categories?.forEach(async (item) => {
      await indexedDB.addItem(KEYWORD_STORE, item);
    });
  } catch (error) {
    initStore();
  }

  localStorageUtil.save(wataUpdatedAtKey, dataUpdateAt, false);
};

export const fetchWatas = async (): Promise<WataType[]> => {
  await syncWataFromServer();

  const savedWatas = await indexedDB.getItems<WataType[]>(WATA_STORE);

  return savedWatas?.sort((a, b) => b.id - a.id);
};

export default fetchWatas;
