import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { searchKeywordState, searchWataListState } from 'src/data/search.atom';
import { Text } from '@components/text';
import Input from '@components/input';
import usePagination from 'src/hooks/usePagination';
import Pagination from '@components/layout/pagination';
import { WataType } from '@utils/common.type';
import KeywordSearchBorad from './components/keywordSearchBoard';
import WataCard from './components/wataCard';

export default function Home() {
  const searchWatas = useRecoilValue(searchWataListState);
  const [searchKeywords, setSearchKeywords] =
    useRecoilState(searchKeywordState);
  const [pageSearchWatas, pageNo, maxPage, handlePageChange] = usePagination(
    searchWatas,
    20,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNo]);

  useEffect(() => {
    handlePageChange(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeywords]);

  return (
    <div className="page home">
      {/* 키워드 검색 보드 */}
      <KeywordSearchBorad />

      {/* 검색창 */}
      <div className="searchbar">
        <Input
          value={searchKeywords.searchInput}
          type="search"
          placeholder="제목/작가/감독명으로 검색"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchKeywords({
              ...searchKeywords,
              searchInput: e.target.value,
            });
          }}
        />
      </div>

      {/* 검색 결과 */}
      <Text size="big">검색 결과는 총 {searchWatas.length} 개 입니다.</Text>
      <div className="wata-list">
        {pageSearchWatas?.map((item: WataType) => (
          <WataCard key={`wata-${item.id}`} wata={item} />
        ))}
      </div>

      <Pagination
        currentPage={pageNo}
        onChange={handlePageChange}
        maxPage={maxPage}
      />
    </div>
  );
}
