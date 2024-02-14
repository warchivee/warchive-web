import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { Text } from '@components/CommonComponents/text';
import Input from '@components/CommonComponents/input';
import usePagination from 'src/hooks/usePagination';
import Pagination from '@components/CommonComponents/pagination';
import WataCardList from '@components/UserComponents/wata/list';
import searchWataListSelector from 'src/atoms/searchWat.atom';
import searchKeywordAtom from 'src/atoms/search.atom';
import { WataType } from 'src/types/wata.type';
import KeywordSearchBorad from '../../components/UserComponents/keywordSearchBoard';

export default function UserHome() {
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
    <div className="home">
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
