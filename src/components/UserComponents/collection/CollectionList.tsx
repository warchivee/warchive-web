import { useState } from 'react';
import { WataType } from 'src/types/wata.type';
import useCollection from 'src/hooks/useCollections';
import WataCollectionCard from '../wata/card/CollectionCard';
import AddCollectionItemModal from '../modal/addCollectionItem';

export default function WataCollectionList() {
  const [isOpenBookmarkModel, setIsOpenBookmarkModal] =
    useState<boolean>(false);
  const [selectWata, setSelectWata] = useState<WataType>();

  const { getCollectionItems } = useCollection();

  return (
    <>
      <div className="wata-col-list">
        {getCollectionItems()?.map((wata: WataType) => (
          <WataCollectionCard
            key={`wata-${wata.id}`}
            wata={wata}
            handleCollection={() => {
              setSelectWata(wata);
              setIsOpenBookmarkModal(true);
            }}
          />
        ))}
      </div>

      <AddCollectionItemModal
        wata={selectWata}
        isOpen={isOpenBookmarkModel}
        onClose={() => setIsOpenBookmarkModal(false)}
      />
    </>
  );
}
