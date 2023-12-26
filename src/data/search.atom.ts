import {
  SearchKeywordType,
  ValueLabelType,
  WataType,
} from '@utils/common.type';
import { atom, selector } from 'recoil';
import { wataListState } from './wata.atom';

const hasIntersection = (
  searchKeywords: ValueLabelType[],
  wataKeywords: ValueLabelType[],
): boolean => {
  if (searchKeywords.length === 0) {
    return true;
  }

  const set1 = new Set(searchKeywords.map((item) => item.value));
  const set2 = new Set(wataKeywords.map((item) => item.value));

  let intersectionExists = false;

  set1.forEach((value) => {
    if (set2.has(value)) {
      intersectionExists = true;
      return false;
    }

    return false;
  });

  return intersectionExists;
};

export const searchKeywordState = atom<SearchKeywordType>({
  key: 'searchKeywordState',
  default: {
    searchInput: '',
    category: { label: '전체', value: 'category-전체' },
    genres: [],
    platforms: [],
    keywords: [],
  },
});

export const searchWataListState = selector<WataType[]>({
  key: 'searchWataListState',
  get: ({ get }) => {
    const searchKeywords = get(searchKeywordState);
    const watas = get(wataListState);

    const { searchInput, category, genres, platforms, keywords } =
      searchKeywords;

    return watas?.filter(
      (wata: WataType) =>
        (!searchInput ||
          wata.title.includes(searchInput) ||
          wata.creator.includes(searchInput)) &&
        (category.value === 'category-전체' ||
          wata.category.value === category.value) &&
        (genres.length === 0 ||
          genres?.some((genre) => wata.genre.value === genre.value)) &&
        hasIntersection(platforms, wata.platforms) &&
        hasIntersection(keywords, wata.keywords),
    );
  },
});
