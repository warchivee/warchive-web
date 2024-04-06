import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import searchKeywordAtom from 'src/stores/searchKeyword.atom';
import WataCollectionList from '@components/UserComponents/collection/CollectionList';
import ShareCollectionButtons from '@components/UserComponents/share';
import useCollection from 'src/hooks/useCollections';
import { Stack } from '@mui/joy';
import CollectionHeader from '../../components/UserComponents/collection/CollectionHeader';
import CollectionMenu from '../../components/UserComponents/menu';

export default function Collections() {
  const [searchKeywords, setSearchKeywords] = useRecoilState(searchKeywordAtom);

  const { getCollectionItems, getCollections } = useCollection();

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
          {getCollections() && getCollections()?.length > 0 && (
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
