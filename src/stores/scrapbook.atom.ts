import fetchScrapbooks from '@utils/indexedDB/fetchScrapbookFromIndexedDB.util';
import { atom } from 'recoil';
import { ScrapbookType } from 'src/types/scrapbooks.type';

interface ScrapbookAtomType {
  selectedIndex: number;
  scrapbooks: ScrapbookType[];
}

const initScrapbookState = async () => {
  const scrapbooks = await fetchScrapbooks();

  return {
    selectedIndex: 0,
    scrapbooks: scrapbooks ?? [],
  };
};

export const scrapbookAtom = atom<ScrapbookAtomType>({
  key: 'scrapbookAtom',
  default: initScrapbookState(),
});

export default scrapbookAtom;
