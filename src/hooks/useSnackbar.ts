import { useRecoilState } from 'recoil';
import { snackbarState } from 'src/stores/ui.atom';

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);

  const open = ({ message = '' }: { message: string }) => {
    setSnackbar({ ...snackbar, message, open: true });
  };

  return [open] as const;
};

export default useSnackbar;
