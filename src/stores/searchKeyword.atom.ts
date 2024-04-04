import { atom } from 'recoil';
import { SearchKeywordsType } from 'src/types/serchKeyword.type';

export const searchKeywordAtom = atom<SearchKeywordsType>({
  key: 'searchKeywordAtom',
  default: {
    searchInput: '',
    category: { id: 0, name: '전체' },
    genres: [],
    platforms: [],
    keywords: [],
  },
});

export default searchKeywordAtom;
