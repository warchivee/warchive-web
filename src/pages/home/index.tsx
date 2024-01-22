import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { Text } from '@components/text';
import Input from '@components/input';
import usePagination from 'src/hooks/usePagination';
import Pagination from '@components/pagination';
import WataCardList from '@components/wata/list';
import searchWataListSelector from 'src/data/searchWat.atom';
import searchKeywordAtom from 'src/data/search.atom';
import { WataType } from 'src/types/wata.type';
import KeywordSearchBorad from './components/keywordSearchBoard';

export default function Home() {
  const PAGE_SIZE = 20;

  const searchWatas = useRecoilValue(searchWataListSelector);
  const [searchKeywords, setSearchKeywords] = useRecoilState(searchKeywordAtom);

  const [pageSearchWatas, setPageSearchWatas] = useState<WataType[]>([]);
  const [pageNo, maxPage, handlePageChange] = usePagination(
    searchWatas?.length,
    PAGE_SIZE,
  );

  useEffect(() => {
    const datas = searchWatas.slice(
      (pageNo - 1) * PAGE_SIZE,
      pageNo * PAGE_SIZE,
    );
    setPageSearchWatas(datas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchWatas, pageNo]);

  useEffect(() => {
    handlePageChange(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeywords]);

  return (
    <div className="page home">
      {/* 키워드 검색 보드 */}
      <KeywordSearchBorad />

      <div className="content">
        {/* 검색창 */}
        <div className="searchbar">
          <Input
            value={searchKeywords.searchInput}
            type="search"
            placeholder="제목/작가/감독명으로 검색"
            onChange={(value: string) => {
              setSearchKeywords({
                ...searchKeywords,
                searchInput: value,
              });
            }}
          />
        </div>

        {/* 검색 결과 */}
        <Text size="big">검색 결과는 총 {searchWatas.length} 개 입니다.</Text>

        <WataCardList watas={pageSearchWatas} />

        <Pagination
          currentPage={pageNo}
          onChange={handlePageChange}
          maxPage={maxPage}
        />
      </div>
    </div>
  );
}
