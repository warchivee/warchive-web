import { useEffect, useState } from 'react';
import useBookmarkList from 'src/hooks/useCollections';
import WataCardCollectionList from '@components/UserComponents/wata/list/CollectionList';
import { useRecoilState, useRecoilValue } from 'recoil';
import wataListState from 'src/atoms/wata.atom';
import searchKeywordAtom from 'src/atoms/search.atom';
import { WataIdType, WataType } from 'src/types/wata.type';
import CollectionMenu from '../../components/UserComponents/menu';
import CollectionTitle from '../../components/UserComponents/title';
import CollectionComment from '@components/UserComponents/comment';
import ShareCollectionButtons from '../../components/UserComponents/share';

export default function Collections() {
  const { watas } = useRecoilValue(wataListState);
  const [searchKeywords, setSearchKeywords] = useRecoilState(searchKeywordAtom);
  const { collections } = useBookmarkList();
  const [collectionIndex, setCollectionIndex] = useState<number>(0);
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<boolean>(false);

  useEffect(() => {
    setEditTitle(false);
    setEditComment(false);
  }, [collectionIndex]);

  // 키워드 클릭 시 메인 페이지로 이동하며, 이전 카테고리 검색 기록이 남아있는 현상 수정
  useEffect(() => {
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
      <CollectionMenu
        selectIndex={collectionIndex}
        handleChange={setCollectionIndex}
      />

      {/* <div className="content">
        <CollectionTitle
          isEditMode={editTitle}
          selectIndex={collectionIndex}
          handleEditMode={setEditTitle}
        />
        <CollectionComment
          isEditMode={editComment}
          selectIndex={collectionIndex}
          handleEditMode={setEditComment}
        />
        <ShareCollectionButtons selectIndex={collectionIndex} />
        <WataCardCollectionList
          watas={watas.filter((wata: WataType) =>
            collections[collectionIndex].items.some(
              (storedWataId: WataIdType) => storedWataId === wata.id,
            ),
          )}
        />
      </div> */}
    </div>
  );
}
