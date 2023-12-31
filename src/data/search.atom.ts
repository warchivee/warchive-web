import { atom } from 'recoil';
import { SearchKeywordsType } from '@utils/searchKeywords/index.type';

export const searchKeywordAtom = atom<SearchKeywordsType>({
  key: 'searchKeywordAtom',
  default: {
    searchInput: '',
    category: { label: '전체', value: 'category-전체' },
    genres: [],
    platforms: [],
    keywords: [],
  },
});

export default searchKeywordAtom;
