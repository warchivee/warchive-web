export type ModalButtonType = 'confirm' | 'cancel';

export interface ModalProps {
  children?: React.ReactNode;
  title?: string;
  message?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (value?: string) => void;
  buttons?: ModalButtonType[];
  onAfterOpen?: () => void;
  size?: 'small' | 'big';
}
