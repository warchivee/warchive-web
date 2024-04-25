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
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function UserHome() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('s') ?? '';

  const { searchWatas, pageNo, maxPage, totalCount, handlePageChange } =
    useSearchWata();
  const { updateSearchInput, resetAllSearchKeywords } = useSearchKeywords();

  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    let timer: number;

    if (searchInput && searchInput?.length > 0) {
      timer = setTimeout(() => {
        updateSearchInput(searchInput);
      }, 200);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  useEffect(() => {
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
          value={searchInput}
          placeholder="제목/작가/감독명으로 검색"
          onChange={(e) => setSearchInput(e.target.value)}
          startDecorator={
            <FontAwesomeIcon
              style={{ color: '#590091' }}
              icon={faMagnifyingGlass}
            />
          }
          endDecorator={
            <IconButton
              onClick={() => {
                setSearchInput('');
              }}
            >
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
