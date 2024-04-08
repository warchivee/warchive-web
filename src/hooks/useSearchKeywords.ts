import { SearchKeywordsKeyType } from 'src/types/serchKeyword.type';
import { useRecoilState } from 'recoil';
import searchKeywordAtom from 'src/stores/searchKeyword.atom';
import { KeywordType } from 'src/types/wata.type';

const removeItem = (items: KeywordType[], item: KeywordType): KeywordType[] =>
  items.filter((i) => i.id !== item.id);

const addItem = (items: KeywordType[], item: KeywordType): KeywordType[] =>
  items?.concat(item);

/**
 * searchKeywords 를 조작하기 위한 hook
 */
export const useSearchKeywords = () => {
  const [searchKeywords, setSearchKeywords] = useRecoilState(searchKeywordAtom);

  const updateSearchInput = (value: string) => {
    setSearchKeywords({
      ...searchKeywords,
      searchInput: value,
    });
  };

  const includeKeyword = (type: SearchKeywordsKeyType, keyword: KeywordType) =>
    searchKeywords[type]?.some(
      (selectedBubble) => selectedBubble.id === keyword.id,
    );

  const updateSearchKeywords = (
    type: SearchKeywordsKeyType,
    keyword: KeywordType,
  ) => {
    const checked = searchKeywords[type].some(
      (searchKeyword) => searchKeyword.id === keyword.id,
    );

    const operation = checked ? removeItem : addItem;

    setSearchKeywords({
      ...searchKeywords,
      [type]: operation(searchKeywords[type], keyword),
    });
  };

  const selectCategory = (keyword: KeywordType) => {
    setSearchKeywords({
      searchInput: '',
      category: keyword,
      genres: [],
      platforms: [],
      keywords: [],
    });
  };

  const selectKeyword = (type: SearchKeywordsKeyType, keyword: KeywordType) => {
    setSearchKeywords({
      searchInput: '',
      category: searchKeywords.category,
      genres: type === 'genres' ? [keyword] : [],
      platforms: type === 'platforms' ? [keyword] : [],
      keywords: type === 'keywords' ? [keyword] : [],
    });
  };

  const resetSearchKeywords = () => {
    setSearchKeywords({
      searchInput: '',
      category: searchKeywords.category,
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
    selectCategory,
    selectKeyword,
    includeKeyword,
    updateSearchInput,
    updateSearchKeywords,
    resetSearchKeywords,
    hasSelectedKeywords,
  };
};

export default useSearchKeywords;
