import { WataType } from '@utils/common.type';
import { useState } from 'react';

import AddCollectionsModal from '@components/modal/addCollection';

import WataCard from '../card';
import { WataCardListProps } from '../index.type';

export default function WataCardList({ watas = [] }: WataCardListProps) {
  const [isOpenBookmarkModel, setIsOpenBookmarkModal] =
    useState<boolean>(false);
  const [selectWata, setSelectWata] = useState<WataType>();

  return (
    <>
      <div className="wata-list">
        {watas?.map((wata: WataType) => (
          <WataCard
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
