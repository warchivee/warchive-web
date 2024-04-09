import { useRecoilState } from 'recoil';
import { modalState } from 'src/stores/ui.atom';

export const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const open = ({
    title = '',
    message = '',
    confirmTitle = '확인',
    cancelTitle = '취소',
    onConfirm,
    onCancel,
  }: {
    title: string;
    message: string;
    confirmTitle?: string;
    cancelTitle?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }) => {
    setModal({
      ...modal,
      title,
      message,
      onConfirm,
      onCancel,
      confirmTitle,
      cancelTitle,
      open: true,
    });
  };

  return [open] as const;
};

export default useModal;
