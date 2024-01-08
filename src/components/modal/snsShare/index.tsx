import Button from '@components/button';
import { getSharedCollectionShortUrl } from '@utils/collections/shareUrlShroter';
import useCollections from 'src/hooks/useCollections';
import CopyToClipboard from 'react-copy-to-clipboard';
import Modal from '..';
import { ModalProps } from '../index.type';

interface SnsShareModalProps extends ModalProps {
  selectIndex: number;
}

export default function SnsShareModal({
  selectIndex,
  isOpen,
  onClose,
}: SnsShareModalProps) {
  const { collections } = useCollections();

  const shareUrl = getSharedCollectionShortUrl(collections[selectIndex]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="SNS에 공유하기"
      message="SNS에 내 컬렉션을 공유해보세요."
    >
      <div className="buttons">
        <CopyToClipboard text={shareUrl} onCopy={() => onClose()}>
          <Button
            icon="link"
            background="selago"
            iconColor="purple"
            labelColor="ebony"
            border="round"
          >
            공유 URL 복사
          </Button>
        </CopyToClipboard>
        <Button
          icon="twitter"
          background="selago"
          labelColor="ebony"
          border="round"
          onClick={() => {
            // 트위터 본문 내용 : 280자 제한
            const sendText = ' ';
            window.open(
              `https://twitter.com/intent/tweet?text=${sendText}&url=${shareUrl}`,
            );
          }}
        />
        <Button
          icon="facebook"
          background="selago"
          labelColor="ebony"
          border="round"
          onClick={() => {
            window.open(
              `http://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
            );
          }}
        />
      </div>
    </Modal>
  );
}
