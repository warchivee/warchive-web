import { checkLogin } from 'src/services/auth.api';
import { getScrapbooksApi } from 'src/services/scrapbook.api';
import { ScrapbookType } from 'src/types/scrapbooks.type';
import IndexedDBUtil, { SCRAPBOOK_STORE } from './indexedDB.util';

export const scrapbookUpdatedAtKey = 'SCRAPBOOK_UPDATE_AT';

const indexedDB = IndexedDBUtil.getInstance();

const syncScrapbookFromServer = async () => {
  await indexedDB.clearStore(SCRAPBOOK_STORE);

  const datas = await getScrapbooksApi();

  try {
    datas?.forEach(async (item) => {
      await indexedDB.addItem(SCRAPBOOK_STORE, item);
    });
  } catch (error) {
    await indexedDB.clearStore(SCRAPBOOK_STORE);
  }
};

export const fetchScrapbooks = async (): Promise<ScrapbookType[]> => {
  if (!checkLogin()) {
    return [];
  }

  await syncScrapbookFromServer();

  const savedScrapbooks =
    await indexedDB.getItems<ScrapbookType[]>(SCRAPBOOK_STORE);

  return savedScrapbooks;
};

export default fetchScrapbooks;
