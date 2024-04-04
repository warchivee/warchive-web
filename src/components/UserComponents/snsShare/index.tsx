import Button from '@components/CommonComponents/button';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Text } from '@components/CommonComponents/text';
import classNames from 'classnames';

import kakaotalk_logo from '@assets/logos/kakaotalk.png';
import twitter_logo from '@assets/logos/twitter.png';
import facebook_logo from '@assets/logos/facebook.png';
import ModalUtil from '@utils/modal.util';
import useCollection from 'src/hooks/useCollections';

interface SnsShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SnsShareModal({ isOpen, onClose }: SnsShareModalProps) {
  const { getCollection } = useCollection();

  const shareUrlBase = window.location.href;

  const imageSize = {
    width: '28px',
    height: '28px',
  };

  const showNotification = () => {
    ModalUtil.open({
      title: 'URL 링크 복사',
      message: '공유 페이지 url 링크가 복사되었습니다.',
    });
  };

  return (
    <div className={classNames('sns-share-modal', { close: !isOpen })}>
      <div className="arrow" />
      <div className="inner">
        <div className="header">
          <div className="title">
            <Text size="big">공유하기</Text>
          </div>
          <Button icon="xmark" iconColor="black" size="big" onClick={onClose} />
        </div>

        <div className="body">
          <button className="share-group" type="button">
            <img
              src={kakaotalk_logo}
              alt="카카오톡으로 공유하기"
              style={imageSize}
            />
            <Text size="small">카카오톡</Text>
          </button>

          <button
            className="share-group"
            onClick={() => {
              // 트위터 본문 내용 : 280자 제한
              const sendText = ' ';
              window.open(
                `https://twitter.com/intent/tweet?text=${sendText}&url=${shareUrlBase}/${getCollection()?.shared_id}`,
              );
            }}
            type="button"
          >
            <img src={twitter_logo} alt="트위터로 공유하기" style={imageSize} />
            <Text size="small">트위터</Text>
          </button>

          <button
            className="share-group"
            onClick={() => {
              window.open(
                `http://www.facebook.com/sharer/sharer.php?u=${shareUrlBase}/${getCollection()?.shared_id}`,
              );
            }}
            type="button"
          >
            <img
              src={facebook_logo}
              alt="페이스북으로 공유하기"
              style={imageSize}
            />
            <Text size="small">페이스북</Text>
          </button>

          <CopyToClipboard
            text={`${shareUrlBase}/${getCollection()?.shared_id}`}
            onCopy={() => showNotification()}
          >
            <button className="share-group" type="button">
              <Button
                background="light-gray"
                border="round"
                icon="link"
                iconColor="black"
              />
              <Text size="small">링크복사</Text>
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </div>

    // <Modal isOpen={isOpen} onClose={onClose} title="공유하기">
    //   <div className="buttons">
    //
    //     {/* <CopyToClipboard text={shareUrl} onCopy={() => onClose()}>
    //       <Button
    //         icon="link"
    //         background="selago"
    //         iconColor="purple"
    //         labelColor="ebony"
    //         border="round"
    //       >
    //         공유 URL 복사
    //       </Button>
    //     </CopyToClipboard> */}
    //     {/* <Button
    //       icon="twitter"
    //       background="selago"
    //       labelColor="ebony"
    //       border="round"
    //       onClick={() => {
    //         // 트위터 본문 내용 : 280자 제한
    //         const sendText = ' ';
    //         window.open(
    //           `https://twitter.com/intent/tweet?text=${sendText}&url=${shareUrl}`,
    //         );
    //       }}
    //     /> */}
    //     {/* <Button
    //       icon="facebook"
    //       background="selago"
    //       labelColor="ebony"
    //       border="round"
    //       onClick={() => {
    //         window.open(
    //           `http://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    //         );
    //       }}
    //     /> */}
    //   </div>
    // </Modal>
  );
}
