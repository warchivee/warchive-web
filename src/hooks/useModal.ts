import { useRecoilState } from 'recoil';
import { modalState } from 'src/stores/ui.atom';

export const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const open = ({
    title = '',
    message = '',
    onConfirm,
    onCancel,
  }: {
    title: string;
    message: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }) => {
    setModal({ ...modal, title, message, onConfirm, onCancel, open: true });
  };

  return [open] as const;
};

export default useModal;
