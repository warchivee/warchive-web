import { useEffect, useState } from 'react';

// components
import WataCollectionList from '@components/organism/collection/CollectionList';
import ShareCollectionButtons from '@components/organism/collection/ShareCollectionButtons';
import CollectionHeader from '@components/organism/collection/CollectionHeader';
import CollectionMenu from '@components/organism/collection/CollectionMenu';
import { PageLoader } from '@components/CommonComponents/loader';

// joy components
import { Box, IconButton, Stack, Typography } from '@mui/joy';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookBookmark,
  faBookOpen,
  faBookmark,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

// utils
import useSearchKeywords from 'src/hooks/useSearchKeywords';
import useCollection from 'src/hooks/useCollections';
import Empty from '@components/organism/Empty';
import {
  faFaceSurprise,
  faGrinWink,
} from '@fortawesome/free-regular-svg-icons';

export default function Collections() {
  const { resetAllSearchKeywords } = useSearchKeywords();

  const { refreshCollectionState, getCollectionItems, isCollectionsEmpty } =
    useCollection();

  const [loading, setLoading] = useState(false);

  const initCollectionData = async () => {
    setLoading(true);
    await refreshCollectionState();
    setLoading(false);
  };

  useEffect(() => {
    // 페이지 이동 시 검색 키워드 초기화
    resetAllSearchKeywords();

    initCollectionData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
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
        <CollectionMenu />

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
            {isCollectionsEmpty() ? (
              <Empty
                icon={faFaceSurprise}
                title="컬렉션이 없어요"
                content={
                  <Typography>
                    컬렉션 목록의{' '}
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
                    버튼을 눌러 내 여성서사 컬렉션을 만들어보세요.
                  </Typography>
                }
              />
            ) : (
              <>
                <CollectionHeader />
                {(getCollectionItems()?.length ?? 0) <= 0 ? (
                  <Empty
                    icon={faGrinWink}
                    title="좋아하는 작품을 추가해보세요"
                    content={
                      <Typography>
                        원하는 작품 카드의
                        <IconButton sx={{ cursor: 'text' }}>
                          <FontAwesomeIcon icon={faBookBookmark} />
                        </IconButton>
                        버튼을 눌러 내 컬렉션에 추가할 수 있습니다.
                      </Typography>
                    }
                  />
                ) : (
                  <>
                    <div style={{ marginBottom: '2rem' }}>
                      <ShareCollectionButtons />
                    </div>
                    <WataCollectionList watas={getCollectionItems()} />
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
