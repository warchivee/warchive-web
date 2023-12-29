import Button from '@components/button';
import { Text, Title } from '@components/text';
import classNames from 'classnames';
import { ModalButtonType, ModalProps } from './index.type';

export default function Modal({
  children,
  title,
  message,
  isOpen,
  onClose,
  onConfirm = () => {},
  buttons = [],
}: ModalProps) {
  const renderButtons = () =>
    buttons.map((button: ModalButtonType, index: number) => {
      if (button === 'confirm') {
        return (
          <Button
            key={`modal-confirm-${index + 1}`}
            onClick={() => {
              onConfirm();
            }}
            labelColor="blue-violet"
          >
            확인
          </Button>
        );
      }

      return (
        <Button key={`modal-cancel-${index + 1}`} onClick={() => onClose()}>
          취소
        </Button>
      );
    });

  return (
    <div className={classNames('modal', { close: !isOpen })}>
      <div className="inner">
        <div className="header">
          <Title type="h2">{title}</Title>
          <Button icon="xmark" onClick={onClose} />
        </div>

        <div className="message">
          <Text color="gray">{message}</Text>
        </div>
        <div className="content">{children}</div>

        <div className="control">{renderButtons()}</div>
      </div>
    </div>
  );
}
