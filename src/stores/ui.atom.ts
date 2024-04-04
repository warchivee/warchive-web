import { atom } from 'recoil';

export const modalState = atom<{
  open: boolean;
  title: string;
  message: string;
  loading: boolean;
  onConfirm?: () => void;
}>({
  key: 'modalState',
  default: { open: false, title: '', message: '', loading: false },
});

export const snackbarState = atom<{ open: boolean; message: string }>({
  key: 'snackbarState',
  default: { open: false, message: '' },
});
