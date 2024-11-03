import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';

import searchKeywordAtom from 'src/stores/searchKeyword.atom';
import { WataType } from 'src/types/wata.type';
import wataAtom from 'src/stores/wata.atom';
import { usePagination } from './usePagination';

const PAGE_SIZE = 12;

const useSearchWata = () => {
  const watas = useRecoilValue(wataAtom);

  const searchKeywords = useRecoilValue(searchKeywordAtom);
  const { searchInput, category, genres, platforms, keywords } = searchKeywords;

  const { pageNo, maxPage, handlePageChange, totalCount, handleTotalCount } =
    usePagination(0, PAGE_SIZE);

  const [searchAllWata, setSearchAllwata] = useState<WataType[]>([]);
  const [searchWatas, setSearchWatas] = useState<WataType[]>([]);

  const pageSearchWata = (allWatas: WataType[]) => {
    const result = allWatas.slice((pageNo - 1) * PAGE_SIZE, pageNo * PAGE_SIZE);

    setSearchWatas(result);
    handleTotalCount(allWatas?.length);
  };

  const getSearchWatas = async () => {
    const filterWatas = watas?.filter((wata: WataType) => {
      const pass = {
        searchInput: true,
        category: true,
        genres: true,
        platforms: true,
        keywords: true,
      };

      if (searchInput && searchInput?.replace(/\s/g, '') !== '') {
        pass.searchInput =
          wata.title
            ?.replace(/\s/g, '')
            ?.toLocaleLowerCase()
            .includes(searchInput?.replace(/\s/g, '')?.toLocaleLowerCase()) ||
          wata.creators
            ?.replace(/\s/g, '')
            ?.toLocaleLowerCase()
            .includes(searchInput?.replace(/\s/g, '')?.toLocaleLowerCase());
      }

      if (category && category.id !== 0) {
        pass.category = wata.category.id === +category.id;
      }

      if (genres && genres.length !== 0) {
        pass.genres = genres?.some((g) => wata.genre.id === g.id);
      }

      // category - platform 구조 변경으로 id가 아닌 name 으로 조회
      if (platforms && platforms.length !== 0) {
        const platformIds = new Set(platforms?.map((p) => p.name));
        pass.platforms = wata.platforms?.some((wp) => platformIds.has(wp.name));
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

    setSearchAllwata(filterWatas);
    pageSearchWata(filterWatas);
  };

  useEffect(() => {
    pageSearchWata(searchAllWata);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo]);

  useEffect(() => {
    getSearchWatas();

    if (pageNo !== 1) {
      handlePageChange(1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeywords]);

  return { searchWatas, maxPage, handlePageChange, pageNo, totalCount };
};

export default useSearchWata;
