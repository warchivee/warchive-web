import { useState } from 'react';
import AddCollectionsModal from '@components/UserComponents/modal/addCollectionItem';
import { WataType } from 'src/types/wata.type';
import { isLogin } from 'src/services/auth.api';
import useModal from 'src/hooks/useModal';
import WataCard from '../card';
import { WataCardListProps } from '../index.type';

export default function WataCardList({ watas = [] }: WataCardListProps) {
  const [isOpenBookmarkModel, setIsOpenBookmarkModal] =
    useState<boolean>(false);
  const [selectWata, setSelectWata] = useState<WataType>();

  const [openLoginModal] = useModal();

  return (
    <>
      <div className="wata-list">
        {watas?.map((wata: WataType) => (
          <WataCard
            key={`wata-${wata.id}`}
            wata={wata}
            handleBookmark={() => {
              if (!isLogin()) {
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

      <AddCollectionsModal
        wata={selectWata}
        isOpen={isOpenBookmarkModel}
        onClose={() => setIsOpenBookmarkModal(false)}
      />
    </>
  );
}
