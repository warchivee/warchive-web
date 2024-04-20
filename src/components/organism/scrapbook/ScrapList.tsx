import { useState } from 'react';
import { WataType } from 'src/types/wata.type';
import useModal from 'src/hooks/useModal';
import { checkLogin } from 'src/services/auth.api';
import WataScrapbookCard from './ScrapCard';
import AddScrapbookItemModal from './AddScrapbookItemModal';

export default function WataScrapbookList({ watas }: { watas: WataType[] }) {
  const [isOpenBookmarkModel, setIsOpenBookmarkModal] =
    useState<boolean>(false);
  const [selectWata, setSelectWata] = useState<WataType>();

  const [openLoginModal] = useModal();

  return (
    <>
      <div className="wata-col-list">
        {watas?.map((wata: WataType) => (
          <WataScrapbookCard
            key={`wata-${wata.id}`}
            wata={wata}
            handleScrapbook={() => {
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

      <AddScrapbookItemModal
        title="스크랩북 관리"
        wata={selectWata}
        isOpen={isOpenBookmarkModel}
        onClose={() => setIsOpenBookmarkModal(false)}
      />
    </>
  );
}
