import { useState } from 'react';
import AddCollectionsModal from '@components/UserComponents/modal/addCollectionItem';
import { WataType } from 'src/types/wata.type';
import { checkLogin } from 'src/services/auth.api';
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
              if (!checkLogin()) {
                openLoginModal({
                  title: '컬렉션에 추가하기',
                  message:
                    '컬렉션을 이용하려면 로그인이 필요해요.\n상단의 사람 모양 버튼을 클릭하여 로그인할 수 있어요.',
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
        title="컬렉션에 추가하기"
        wata={selectWata}
        isOpen={isOpenBookmarkModel}
        onClose={() => setIsOpenBookmarkModal(false)}
      />
    </>
  );
}
