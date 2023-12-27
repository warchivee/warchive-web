import Button from '@components/button';
import { Text, Title } from '@components/text';
import classNames from 'classnames';

export default function ConfirmModal({
  title,
  description,
  isOpen,
  onConfirm,
  onClose,
}: {
  title: string;
  description: string;
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
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
        <div className="control">
          <Button
            onClick={() => {
              onConfirm();
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
