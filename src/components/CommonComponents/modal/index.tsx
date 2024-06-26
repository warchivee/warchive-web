import { Text, Title } from '@components/CommonComponents/text';
import classNames from 'classnames';
import { useEffect } from 'react';
import { Button, IconButton } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ModalButtonType, ModalProps } from './index.type';

export default function Modal({
  children,
  title,
  message,
  isOpen,
  onClose,
  size = 'small',
  onAfterOpen = () => {},
  onConfirm = () => {},
  buttons = [],
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      onAfterOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const renderButtons = () =>
    buttons.map((button: ModalButtonType, index: number) => {
      if (button === 'confirm') {
        return (
          <Button
            key={`modal-confirm-${index + 1}`}
            onClick={() => {
              onConfirm();
            }}
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
      <div className={classNames('inner', { [`${size}`]: size })}>
        <div className="header">
          <Title type="h2">{title}</Title>
          <IconButton>
            <FontAwesomeIcon icon={faXmark} onClick={onClose} />
          </IconButton>
        </div>

        <div className="message">
          <Text color="gray">{message}</Text>
        </div>
        <div className="content">{children}</div>

        <div className="modal-control">{renderButtons()}</div>
      </div>
    </div>
  );
}
