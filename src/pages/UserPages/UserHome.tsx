import { Text } from '@components/CommonComponents/text';
// import Input from '@components/CommonComponents/input';
import Pagination from '@components/CommonComponents/pagination';
import WataCardList from '@components/UserComponents/wata/list';
import useSearchKeywords from 'src/hooks/useSearchKeywords';
import useSearchWata from 'src/hooks/useSearchWata';
import { Input } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import KeywordSearchBorad from '../../components/UserComponents/keywordSearchBoard';

export default function UserHome() {
  const { searchWatas, pageNo, maxPage, totalCount, handlePageChange } =
    useSearchWata();
  const { searchKeywords, updateSearchInput } = useSearchKeywords();

  return (
    <div className="home">
      {/* 키워드 검색 보드 */}
      <KeywordSearchBorad />

      <div className="content">
        {/* 검색창 */}
        <div className="searchbar">
          <Input
            variant="outlined"
            color="primary"
            value={searchKeywords.searchInput}
            placeholder="제목/작가/감독명으로 검색"
            onChange={(e) => updateSearchInput(e.target.value)}
            startDecorator={
              <FontAwesomeIcon
                style={{ color: '#590091' }}
                icon={faMagnifyingGlass}
              />
            }
            sx={{
              color: 'black',
              borderWidth: '2px',
              borderRadius: '20px',
              borderColor: '#590091',
            }}
          />
        </div>

        {/* 검색 결과 */}
        <Text size="big">검색 결과는 총 {totalCount} 개 입니다.</Text>

        <WataCardList watas={searchWatas} />

        <Pagination
          currentPage={pageNo}
          onChange={handlePageChange}
          maxPage={maxPage}
        />
      </div>
    </div>
  );
}
