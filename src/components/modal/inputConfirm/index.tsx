import Button from '@components/button';
import Input from '@components/input';
import { Text, Title } from '@components/text';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

export default function InputConfirmModal({
  title,
  description,
  isOpen,
  onConfirm,
  onClose,
}: {
  title: string;
  description: string;
  isOpen: boolean;
  onConfirm: (input: string) => void;
  onClose: () => void;
}) {
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setInput('');
    }
  }, [isOpen]);

  return (
    <div className={classNames('modal', { close: !isOpen }, 'confirm')}>
      <div className="content">
        <div className="header">
          <Title type="h2">{title}</Title>
          <Button icon="xmark" onClick={onClose} />
        </div>
        <div className="description">
          <Text color="gray">{description}</Text>
        </div>
        <Input value={input} onChange={setInput} border="underline" />
        <div className="control">
          <Button
            onClick={() => {
              onConfirm(input);
            }}
            labelColor="blue-violet"
          >
            확인
          </Button>
          <Button onClick={() => onClose()}>취소</Button>
        </div>
      </div>
    </div>
  );
}
