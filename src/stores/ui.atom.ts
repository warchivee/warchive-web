import { atom } from 'recoil';

export const modalState = atom<{
  open: boolean;
  title: string;
  message: string;
  loading: boolean;
  confirmTitle?: string;
  cancelTitle?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}>({
  key: 'modalState',
  default: {
    open: false,
    title: '',
    message: '',
    loading: false,
    confirmTitle: '확인',
    cancelTitle: '취소',
  },
});

export const snackbarState = atom<{ open: boolean; message: string }>({
  key: 'snackbarState',
  default: { open: false, message: '' },
});
