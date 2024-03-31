import { SearchKeywordsKeyType } from 'src/types/serchKeyword.type';
import { useRecoilState } from 'recoil';
import searchKeywordAtom from 'src/stores/search.atom';
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

  const resetSearchKeywords = (selectCategory?: KeywordType) => {
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
