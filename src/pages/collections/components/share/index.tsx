import Button from '@components/button';
import SnsShareModal from '@components/modal/snsShare';
import { CollectionShareButtonsProps } from '@pages/collections/index.type';
import { useState } from 'react';
import { DEFAULT_COLLECTIONS_KEY } from 'src/data/collection.atom';

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
              background="selago"
              icon="share"
              onClick={() => setOpenSnsShareModal(true)}
            >
              SNS에 공유하기
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
