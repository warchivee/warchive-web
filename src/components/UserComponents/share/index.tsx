import Button from '@components/CommonComponents/button';
import SnsShareModal from '@components/UserComponents/snsShare';
import { useState } from 'react';

export default function ShareCollectionButtons() {
  const [openSnsShareModal, setOpenSnsShareModal] = useState<boolean>(false);
  return (
    <div className="sns">
      <Button
        icon="share"
        iconColor="black"
        background="light-gray"
        border="round"
        onClick={() => setOpenSnsShareModal(true)}
      >
        나만 보기 아까운 작품이 있다면?
      </Button>
      <SnsShareModal
        isOpen={openSnsShareModal}
        onClose={() => setOpenSnsShareModal(false)}
      />
    </div>
  );
}
