import { useEffect, useState } from 'react';

// components
import WataScrapbookList from '@components/organism/scrapbook/ScrapList';
import ShareScrapbookButtons from '@components/organism/scrapbook/ShareScrapbookButtons';
import ScrapbookHeader from '@components/organism/scrapbook/ScrapbookHeader';
import { PageLoader } from '@components/CommonComponents/loader';
import ScrapbookMenu from '@components/organism/scrapbook/ScrapbooksMenu';

// joy components
import { Box, IconButton, Stack, Typography } from '@mui/joy';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark, faPlus } from '@fortawesome/free-solid-svg-icons';

// utils
import useScrapbook from 'src/hooks/useScrapbooks';
import Empty from '@components/organism/Empty';
import {
  faFaceSurprise,
  faGrinWink,
} from '@fortawesome/free-regular-svg-icons';
import {
  SCRAPBOOKS_LIMMIT_COUNT,
  SCRAPBOOK_COMMENT_LIMIT_LENGTH,
} from '@utils/consts/scrapbooks.const';

export default function Scrapbooks() {
  const { getScrapbookItems, isScrapbooksEmpty } = useScrapbook();

  return (
    <Box marginBottom="3rem">
      <Stack
        flexDirection="row"
        gap={3}
        width="100%"
        maxWidth="1000px"
        margin="0 auto"
        sx={{
          '@media (max-width: 600px)': {
            paddingLeft: '2rem',
          },
        }}
      >
        <ScrapbookMenu />

        <Stack
          paddingTop="1rem"
          marginTop="1rem"
          width="100%"
          height="100%"
          gap={2}
        >
          {isScrapbooksEmpty() ? (
            <Empty
              icon={faFaceSurprise}
              title="스크랩북이 없어요"
              content={
                <Typography textAlign="center">
                  스크랩북 목록의{' '}
                  <IconButton
                    size="sm"
                    style={{
                      cursor: 'text',
                      border: '1px solid #A29EA5',
                      borderRadius: '20px',
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </IconButton>{' '}
                  버튼을 눌러 내 여성서사 스크랩북을 만들어보세요.
                  <br />
                  스크랩북은{' '}
                  <Typography sx={{ textDecoration: 'underline' }}>
                    {SCRAPBOOKS_LIMMIT_COUNT}개
                  </Typography>
                  까지 만들 수 있습니다.
                </Typography>
              }
            />
          ) : (
            <>
              <ScrapbookHeader />
              {(getScrapbookItems()?.length ?? 0) <= 0 ? (
                <Empty
                  icon={faGrinWink}
                  title="좋아하는 작품을 추가해보세요"
                  content={
                    <Typography textAlign="center">
                      원하는 작품 카드의
                      <IconButton sx={{ cursor: 'text' }}>
                        <FontAwesomeIcon icon={faBookBookmark} />
                      </IconButton>
                      버튼을 눌러 내 스크랩북에 추가해보세요.
                      <br />
                      스크랩북에는{' '}
                      <Typography sx={{ textDecoration: 'underline' }}>
                        {SCRAPBOOK_COMMENT_LIMIT_LENGTH}개
                      </Typography>
                      의 작품을 추가할 수 있습니다.
                    </Typography>
                  }
                />
              ) : (
                <>
                  <div style={{ marginBottom: '2rem' }}>
                    <ShareScrapbookButtons />
                  </div>
                  <WataScrapbookList watas={getScrapbookItems()} />
                </>
              )}
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
