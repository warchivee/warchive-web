import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import searchKeywordAtom from 'src/stores/searchKeyword.atom';
import WataCollectionList from '@components/UserComponents/collection/CollectionList';
import ShareCollectionButtons from '@components/UserComponents/share';
import useCollection from 'src/hooks/useCollections';
import { IconButton, Stack, Typography } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CollectionHeader from '../../components/UserComponents/collection/CollectionHeader';
import CollectionMenu from '../../components/UserComponents/menu';

export default function Collections() {
  const [searchKeywords, setSearchKeywords] = useRecoilState(searchKeywordAtom);

  const { getCollectionItems, isCollectionsEmpty } = useCollection();

  useEffect(() => {
    // 키워드 클릭 시 메인 페이지로 이동하며, 이전 카테고리 검색 기록이 남아있는 현상 수정
    setSearchKeywords({
      ...searchKeywords,
      category: {
        name: '전체',
        id: 0,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="collections">
      <Stack
        flexDirection="row"
        gap={3}
        width="100%"
        sx={{
          '@media (max-width: 600px)': {
            paddingLeft: '2rem',
          },
        }}
      >
        <CollectionMenu />
        <Stack paddingTop="1rem" marginTop="1rem" width="100%" gap={2}>
          {isCollectionsEmpty() ? (
            <Stack gap={2} alignItems="center">
              <Typography level="title-lg">컬렉션이 없어요.</Typography>
              <Typography>
                좌측의{' '}
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
            </Stack>
          ) : (
            <>
              <CollectionHeader />
              <ShareCollectionButtons />

              <WataCollectionList watas={getCollectionItems()} />
            </>
          )}
        </Stack>
      </Stack>
    </div>
  );
}
