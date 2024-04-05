import { useState } from 'react';
import { WataType } from 'src/types/wata.type';
import useModal from 'src/hooks/useModal';
import { checkLogin } from 'src/services/auth.api';
import WataCollectionCard from './CollectionCard';
import AddCollectionItemModal from '../modal/addCollectionItem';
import { WataCardListProps } from '../wata/index.type';

export default function WataCollectionList({ watas }: WataCardListProps) {
  const [isOpenBookmarkModel, setIsOpenBookmarkModal] =
    useState<boolean>(false);
  const [selectWata, setSelectWata] = useState<WataType>();

  const [openLoginModal] = useModal();

  return (
    <>
      <div className="wata-col-list">
        {watas?.map((wata: WataType) => (
          <WataCollectionCard
            key={`wata-${wata.id}`}
            wata={wata}
            handleCollection={() => {
              if (!checkLogin()) {
                openLoginModal({
                  title: '로그인 필요',
                  message: '로그인이 필요합니다.',
                });
                return;
              }

              setSelectWata(wata);
              setIsOpenBookmarkModal(true);
            }}
          />
        ))}
      </div>

      <AddCollectionItemModal
        title="컬렉션 관리"
        wata={selectWata}
        isOpen={isOpenBookmarkModel}
        onClose={() => setIsOpenBookmarkModal(false)}
      />
    </>
  );
}
