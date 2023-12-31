import { useEffect, useState } from 'react';
import useBookmarkList from 'src/hooks/useCollections';
import WataCardList from '@components/wata/list';
import { useRecoilState, useRecoilValue } from 'recoil';
import wataListState from 'src/data/wata.atom';
import searchKeywordAtom from 'src/data/search.atom';
import { WataIdType, WataType } from '@utils/watas/index.type';
import CollectionMenu from './components/menu';
import CollectionTitle from './components/title';
import ShareCollectionButtons from './components/share';

export default function Collections() {
  const allWatas = useRecoilValue(wataListState);
  const [searchKeywords, setSearchKeywords] = useRecoilState(searchKeywordAtom);
  const { collections } = useBookmarkList();
  const [collectionIndex, setCollectionIndex] = useState<number>(0);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    setEditMode(false);
  }, [collectionIndex]);

  // 키워드 클릭 시 메인 페이지로 이동하며, 이전 카테고리 검색 기록이 남아있는 현상 수정
  useEffect(() => {
    setSearchKeywords({
      ...searchKeywords,
      category: {
        label: '전체',
        value: 'category-전체',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page collections">
      <CollectionMenu
        isEditMode={editMode}
        selectIndex={collectionIndex}
        handleChange={setCollectionIndex}
      />

      <div className="content">
        <CollectionTitle
          isEditMode={editMode}
          selectIndex={collectionIndex}
          handleEditMode={setEditMode}
        />
        <ShareCollectionButtons
          isEditMode={editMode}
          selectIndex={collectionIndex}
        />
        <WataCardList
          watas={allWatas.filter((wata: WataType) =>
            collections[collectionIndex].items.some(
              (storedWataId: WataIdType) => storedWataId === wata.id,
            ),
          )}
        />
      </div>
    </div>
  );
}
