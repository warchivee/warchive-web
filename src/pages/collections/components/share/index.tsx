import Button from '@components/button';
import SnsShareModal from '@components/modal/snsShare';
import { CollectionShareButtonsProps } from '@pages/collections/index.type';
import { DEFAULT_COLLECTIONS_KEY } from 'src/types/collection.type';
import { useState } from 'react';

export default function ShareCollectionButtons({
  isEditMode,
  selectIndex = 0,
}: CollectionShareButtonsProps) {
  const [openSnsShareModal, setOpenSnsShareModal] = useState<boolean>(false);
  return (
    !(selectIndex === DEFAULT_COLLECTIONS_KEY) && (
      <div className="sns">
        {!isEditMode && (
          <>
            <Button
              align="reverse"
              icon="share-up"
              iconColor="black"
              background="light-gray"
              onClick={() => setOpenSnsShareModal(true)}
            >
              나만 보기 아까운 작품이 있다면?
            </Button>
            <SnsShareModal
              isOpen={openSnsShareModal}
              onClose={() => setOpenSnsShareModal(false)}
              selectIndex={selectIndex}
            />
          </>
        )}
      </div>
    )
  );
}
