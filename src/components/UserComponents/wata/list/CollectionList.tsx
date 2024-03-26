import { useState } from 'react';
import AddCollectionsModal from '@components/UserComponents/modal/addCollectionItem';
import { WataIdType, WataType } from 'src/types/wata.type';
import WataCollectionCard from '../card/CollectionCard';
import { WataCardListProps } from '../index.type';
import { removeFromCollection } from 'src/atoms/collection.atom';

export default function WataCollectionList({
  watas = [],
  selectIndex,
}: WataCardListProps) {
  const [isOpenBookmarkModel, setIsOpenBookmarkModal] =
    useState<boolean>(false);
  const [selectWata, setSelectWata] = useState<WataType>();

  const deleteItem = (id: WataIdType) => {
    removeFromCollection(selectIndex, id);
    // console.log(
    //   `${selectIndex}번째, 작품 번호 ${id}번의 작품 제거 (기능 미구현)`,
    // );
  };

  return (
    <>
      <div className="wata-col-list">
        {watas?.map((wata: WataType) => (
          <WataCollectionCard
            key={`wata-${wata.id}`}
            wata={wata}
            handleCollection={() => {
              setSelectWata(wata);
              setIsOpenBookmarkModal(true);
            }}
            deleteItem={() => {
              deleteItem(wata.id);
            }}
          />
        ))}
      </div>

      <AddCollectionsModal
        wata={selectWata}
        isOpen={isOpenBookmarkModel}
        onClose={() => setIsOpenBookmarkModal(false)}
      />
    </>
  );
}
