import Button from '@components/button';
import { Text, Title } from '@components/text';
import { getSharedCollectionShortUrl } from '@utils/urlShroter';
import classNames from 'classnames';
import useCollections from 'src/hooks/useCollections';
import CopyToClipboard from 'react-copy-to-clipboard';

export default function SnsShareModal({
  selectIndex,
  isOpen,
  onClose,
}: {
  selectIndex: number;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { collections } = useCollections();

  const makeUrl = () => getSharedCollectionShortUrl(collections[selectIndex]);

  return (
    <div className={classNames('modal', { close: !isOpen }, 'sns-share')}>
      <div className="content">
        <div className="header">
          <Title type="h2">SNS에 공유하기</Title>
          <Button icon="xmark" onClick={onClose} />
        </div>
        <div className="description">
          <Text color="gray">내 컬렉션을 공유해보세요.</Text>
        </div>

        <div className="buttons">
          <CopyToClipboard text={makeUrl()} onCopy={() => onClose()}>
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
              const sendUrl = makeUrl();
              const sendText = ' ';
              window.open(
                `https://twitter.com/intent/tweet?text=${sendText}&url=${sendUrl}`,
              );
            }}
          />
          <Button
            icon="facebook"
            background="selago"
            labelColor="ebony"
            border="round"
            onClick={() => {
              const shareUrl = makeUrl();
              window.open(
                `http://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
