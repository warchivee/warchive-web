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

export default function Scrapbooks() {
  const { refreshScrapbookState, getScrapbookItems, isScrapbooksEmpty } =
    useScrapbook();

  const [loading, setLoading] = useState(false);

  const initScrapbookData = async () => {
    setLoading(true);
    await refreshScrapbookState();
    setLoading(false);
  };

  useEffect(() => {
    initScrapbookData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        {loading ? (
          <Stack paddingTop="1rem" marginTop="1rem" width="100%" gap={2}>
            <PageLoader />
          </Stack>
        ) : (
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
                  <Typography>
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
                      <Typography>
                        원하는 작품 카드의
                        <IconButton sx={{ cursor: 'text' }}>
                          <FontAwesomeIcon icon={faBookBookmark} />
                        </IconButton>
                        버튼을 눌러 내 스크랩북에 추가할 수 있습니다.
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
        )}
      </Stack>
    </Box>
  );
}
