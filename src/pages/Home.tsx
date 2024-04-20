// components
import Pagination from '@components/CommonComponents/pagination';
import WataCardList from '@components/organism/wata/WataCardList';
import KeywordSearchBorad from '@components/organism/keywordSearch/KeywordSearchBorad';

// joy conponents
import { IconButton, Input, Stack, Typography } from '@mui/joy';

// utils
import useSearchKeywords from 'src/hooks/useSearchKeywords';
import useSearchWata from 'src/hooks/useSearchWata';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import CarouselBanner from '@components/organism/CarouselBanner';
import { useEffect } from 'react';

export default function UserHome() {
  const { searchWatas, pageNo, maxPage, totalCount, handlePageChange } =
    useSearchWata();
  const { searchKeywords, updateSearchInput, resetAllSearchKeywords } =
    useSearchKeywords();

  const handleInitInput = () => {
    updateSearchInput('');
  };

  useEffect(() => {
    // 페이지 이동 시 검색 키워드 초기화
    resetAllSearchKeywords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack gap="2rem">
      <KeywordSearchBorad />

      <CarouselBanner />

      <Stack
        width="100%"
        maxWidth="1000px"
        margin="0 auto"
        gap="2rem"
        alignItems="center"
        padding="10px"
      >
        <Input
          size="sm"
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
          endDecorator={
            <IconButton onClick={handleInitInput}>
              <FontAwesomeIcon icon={faXmark} />
            </IconButton>
          }
          sx={{
            color: 'black',
            borderWidth: '2px',
            borderRadius: '20px',
            borderColor: '#590091',
            width: '100%',
            maxWidth: '500px',
          }}
        />
        <Typography level="title-md" textAlign="center">
          검색 결과는 총 {totalCount}개 입니다.
        </Typography>

        <WataCardList watas={searchWatas} />

        <Pagination
          currentPage={pageNo}
          onChange={handlePageChange}
          maxPage={maxPage}
        />
      </Stack>
    </Stack>
  );
}
