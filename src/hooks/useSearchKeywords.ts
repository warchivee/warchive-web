import { KeywordType, ValueLabelType } from '@utils/common.type';
import { useRecoilState } from 'recoil';
import { searchKeywordState } from 'src/data/search.atom';

const removeItem = (
  items: ValueLabelType[],
  item: ValueLabelType,
): ValueLabelType[] => items.filter((i) => i.value !== item.value);

const addItem = (
  items: ValueLabelType[],
  item: ValueLabelType,
): ValueLabelType[] => [...items, item];

/**
 * searchKeywords 를 조작하기 위한 hook
 */
export const useSearchKeywords = () => {
  const [searchKeywords, setSearchKeywords] =
    useRecoilState(searchKeywordState);

  const updateSearchKeywords = (type: KeywordType, keyword: ValueLabelType) => {
    const checked = searchKeywords[type].some(
      (searchKeyword) => searchKeyword.value === keyword.value,
    );

    const operation = checked ? removeItem : addItem;

    setSearchKeywords({
      ...searchKeywords,
      [type]: operation(searchKeywords[type], keyword),
    });
  };

  const resetSearchKeywords = (selectCategory?: ValueLabelType) => {
    setSearchKeywords({
      searchInput: '',
      category: selectCategory || searchKeywords.category,
      genres: [],
      platforms: [],
      keywords: [],
    });
  };

  const hasSelectedKeywords = (): boolean =>
    searchKeywords.genres.length !== 0 ||
    searchKeywords.platforms.length !== 0 ||
    searchKeywords.keywords.length !== 0;

  return {
    searchKeywords,
    updateSearchKeywords,
    resetSearchKeywords,
    hasSelectedKeywords,
  };
};

export default useSearchKeywords;
