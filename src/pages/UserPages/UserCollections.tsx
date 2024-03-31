import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import searchKeywordAtom from 'src/stores/search.atom';
import Loader from '@components/CommonComponents/loader';
import WataCollectionList from '@components/UserComponents/collection/CollectionList';
import CollectionMenu from '../../components/UserComponents/menu';
import CollectionHeader from '../../components/UserComponents/collection/CollectionHeader';

export default function Collections() {
  const [loading, setLoading] = useState(false);

  const [searchKeywords, setSearchKeywords] = useRecoilState(searchKeywordAtom);

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
      {loading ? (
        <Loader />
      ) : (
        <>
          <CollectionMenu />
          <div className="content">
            <CollectionHeader />
            <WataCollectionList />
          </div>
        </>
      )}

      {/* <div className="content">
        <ShareCollectionButtons selectIndex={collectionIndex} />
        <WataCardCollectionList
          watas={watas.filter((wata: WataType) =>
            collections[collectionIndex].items.some(
              (storedWataId: WataIdType) => storedWataId === wata.id,
            ),
          )}
          selectIndex={collectionIndex}
        />
      </div> */}
    </div>
  );
}
