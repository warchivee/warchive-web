import { useRecoilValue } from 'recoil';
import searchKeywordAtom from 'src/stores/searchKeyword.atom';
import { WataType } from 'src/types/wata.type';
import { useEffect, useState } from 'react';
import wataAtom from 'src/stores/wata.atom';
import { usePagination } from './usePagination';

const PAGE_SIZE = 18;

const useSearchWata = () => {
  const watas = useRecoilValue(wataAtom);

  const searchKeywords = useRecoilValue(searchKeywordAtom);
  const { searchInput, category, genres, platforms, keywords } = searchKeywords;

  const { pageNo, maxPage, handlePageChange, totalCount, handleTotalCount } =
    usePagination(0, PAGE_SIZE);

  const [searchWatas, setSearchWatas] = useState<WataType[]>([]);

  const getSearchWatas = async () => {
    const filterWatas = watas?.filter((wata: WataType) => {
      const pass = {
        searchInput: true,
        category: true,
        genres: true,
        platforms: true,
        keywords: true,
      };

      if (searchInput && searchInput?.replace(' ', '') !== '') {
        pass.searchInput =
          wata.title
            ?.replace(' ', '')
            ?.toLocaleLowerCase()
            .includes(searchInput?.replace(' ', '')?.toLocaleLowerCase()) ||
          wata.creators
            ?.replace(' ', '')
            ?.toLocaleLowerCase()
            .includes(searchInput?.replace(' ', '')?.toLocaleLowerCase());
      }

      if (category && category.id !== 0) {
        pass.category = wata.category.id === +category.id;
      }

      if (genres && genres.length !== 0) {
        pass.genres = genres?.some((g) => wata.genre.id === g.id);
      }

      if (platforms && platforms.length !== 0) {
        const platformIds = new Set(platforms?.map((p) => p.id));
        pass.platforms = wata.platforms?.some((wp) => platformIds.has(wp.id));
      }

      if (keywords && keywords.length !== 0) {
        const keywordIds = new Set(keywords?.map((p) => p.id));
        pass.keywords = wata.keywords?.some((wp) => keywordIds.has(wp.id));
      }

      return (
        pass.searchInput &&
        pass.category &&
        pass.genres &&
        pass.platforms &&
        pass.keywords
      );
    });

    const result = filterWatas.slice(
      (pageNo - 1) * PAGE_SIZE,
      pageNo * PAGE_SIZE,
    );

    handleTotalCount(filterWatas?.length);
    setSearchWatas(result);
  };

  useEffect(() => {
    getSearchWatas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo]);

  useEffect(() => {
    if (pageNo === 1) {
      getSearchWatas();
    }
    handlePageChange(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeywords]);

  return { searchWatas, maxPage, handlePageChange, pageNo, totalCount };
};

export default useSearchWata;