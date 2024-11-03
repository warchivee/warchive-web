import { useEffect, useState } from 'react';

// joy component
import Box from '@mui/joy/Box';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';

// utils
import { ModalProps } from '@components/CommonComponents/modal/index.type';
import useScrapbook from 'src/hooks/useScrapbooks';
import RecoverableError from 'src/types/error/RecoverableError';
import { SCRAPBOOK_TITLE_LIMIT_LENGTH } from '@utils/consts/scrapbooks.const';
import useSnackbar from 'src/hooks/useSnackbar';
import { AxiosError } from 'axios';

export default function AddScrapbookModal({ isOpen, onClose }: ModalProps) {
  const [title, setTitle] = useState('');

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    isError: false,
    message: '',
  });

  const [openSnackbar] = useSnackbar();

  const { addScrapbook } = useScrapbook();

  const handleConfirm = async () => {
    setLoading(true);

    try {
      await addScrapbook(title);

      setError({ isError: false, message: '' });
      onClose();
    } catch (e) {
      if (e instanceof RecoverableError) {
        setError({ isError: true, message: e.message });
      } else if (error instanceof AxiosError) {
        openSnackbar({
          message: error?.response?.data?.message,
        });
      }
    }

    setLoading(false);
  };

  const handleClose = () => {
    if (loading) {
      return;
    }
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setError({
        isError: false,
        message: '',
      });
      setLoading(false);
    }
  }, [isOpen]);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ModalDialog layout="center">
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography level="h4" fontWeight="lg">
          스크랩북에 추가하기
        </Typography>

        <Typography level="body-sm" textColor="tertiary">
          새로 만들 스크랩북의 이름을 입력해주세요.
        </Typography>

        <FormControl>
          <Input
            variant="soft"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            color="neutral"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleConfirm();
              }
            }}
            endDecorator={
              <Typography level="body-sm" textColor="tertiary">
                {title.length}/{SCRAPBOOK_TITLE_LIMIT_LENGTH}
              </Typography>
            }
            slotProps={{
              input: {
                maxLength: SCRAPBOOK_TITLE_LIMIT_LENGTH,
              },
            }}
          />
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>

        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexDirection: { xs: 'row' },
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="plain" color="neutral" onClick={handleClose}>
            취소
          </Button>
          <Button
            loading={loading}
            variant="plain"
            color="primary"
            onClick={handleConfirm}
          >
            확인
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
}
