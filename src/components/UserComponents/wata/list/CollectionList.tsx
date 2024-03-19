import { useState } from 'react';
import AddCollectionsModal from '@components/UserComponents/modal/addCollectionItem';
import { WataType } from 'src/types/wata.type';
import WataCollectionCard from '../card/CollectionCard';
import { WataCardListProps } from '../index.type';

export default function WataCollectionList({ watas = [] }: WataCardListProps) {
  const [isOpenBookmarkModel, setIsOpenBookmarkModal] =
    useState<boolean>(false);
  const [selectWata, setSelectWata] = useState<WataType>();

  return (
    <>
      <div className="wata-col-list">
        {watas?.map((wata: WataType) => (
          <WataCollectionCard
            key={`wata-${wata.id}`}
            wata={wata}
            handleBookmark={() => {
              setSelectWata(wata);
              setIsOpenBookmarkModal(true);
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
