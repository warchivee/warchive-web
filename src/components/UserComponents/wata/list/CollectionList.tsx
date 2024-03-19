import { useState } from 'react';
import AddCollectionsModal from '@components/UserComponents/modal/addCollectionItem';
import { WataType } from 'src/types/wata.type';
import WataCollectionCard from '../card/CollectionCard';
import { WataCardListProps } from '../index.type';

export default function WataCollectionList({ watas = [] }: WataCardListProps) {
  const [isOpenBookmarkModel, setIsOpenBookmarkModal] =
    useState<boolean>(false);
  const [selectWata, setSelectWata] = useState<WataType>();

  const removeFromCollection = (index: number) => {
    console.log(`작품 번호 ${index}번의 작품 제거 (기능 미구현)`);
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
            deleteCollection={() => {
              removeFromCollection(wata.id);
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
