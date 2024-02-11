import { WataType } from 'src/types/wata.type';
import { selector } from 'recoil';
import { ValueLabelType } from 'src/types/common.type';
import { allWataListSelector } from './wata.atom';
import { searchKeywordAtom } from './search.atom';

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

export const searchWataListSelector = selector<WataType[]>({
  key: 'searchWataListSelector',
  get: ({ get }) => {
    const searchKeywords = get(searchKeywordAtom);
    const watas = get(allWataListSelector);

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

export default searchWataListSelector;
