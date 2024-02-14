import Input from '@components/CommonComponents/input';
import Modal from '@components/CommonComponents/modal';
import { ModalProps } from '@components/CommonComponents/modal/index.type';
import { useEffect, useState } from 'react';
import { TITLE_LIMIT_LENGTH } from 'src/types/collection.type';

export default function AddCollectionModal({
  isOpen,
  onConfirm = () => {},
  onClose,
}: ModalProps) {
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setInput('');
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      title="컬렉션 추가하기"
      message="새로 만들 컬렉션의 이름을 입력해주세요."
      onConfirm={() => onConfirm(input)}
      onClose={onClose}
      buttons={['confirm', 'cancel']}
    >
      <Input
        value={input}
        onChange={setInput}
        border="underline"
        maxLength={TITLE_LIMIT_LENGTH}
      />
    </Modal>
  );
}
