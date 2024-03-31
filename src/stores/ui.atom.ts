import { atom } from 'recoil';

export const modalState = atom<{
  open: boolean;
  title: string;
  message: string;
  onConfirm?: () => void;
}>({
  key: 'modalState',
  default: { open: false, title: '', message: '' },
});

export const snackbarState = atom<{ open: boolean; message: string }>({
  key: 'snackbarState',
  default: { open: false, message: '' },
});
