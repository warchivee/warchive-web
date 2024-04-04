import { ModalProps } from '@components/CommonComponents/modal/index.type';
import { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import Button from '@mui/joy/Button';
import { TITLE_LIMIT_LENGTH } from 'src/types/collection.type';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import useCollection from 'src/hooks/useCollections';
import RecoverableError from 'src/types/error/RecoverableError';

const regex = /^[\w\s가-힣ㄱ-ㅎㅏ-ㅣ\!\?\,\.\-\_\&\:\~]+$/g;

export default function AddCollectionModal({ isOpen, onClose }: ModalProps) {
  const [title, setTitle] = useState('');

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    isError: false,
    message: '',
  });

  const { addCollection } = useCollection();

  const handleConfirm = async () => {
    try {
      setLoading(true);

      await addCollection(title);

      setError({ isError: false, message: '' });
      onClose();
    } catch (e) {
      if (e instanceof RecoverableError) {
        setError({ isError: true, message: e.message });
      } else {
        console.error(e);
      }
    } finally {
      setLoading(false);
    }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog layout="center">
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography level="h4" fontWeight="lg">
          컬렉션 추가하기
        </Typography>

        <Typography level="body-sm" textColor="tertiary">
          새로 만들 컬렉션의 이름을 입력해주세요.
        </Typography>

        <FormControl>
          <Input
            variant="soft"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            color="neutral"
            endDecorator={
              <Typography level="body-sm" textColor="tertiary">
                {title.length}/{TITLE_LIMIT_LENGTH}
              </Typography>
            }
            slotProps={{
              input: {
                maxLength: TITLE_LIMIT_LENGTH,
              },
            }}
          />
          <FormHelperText>{error?.isError && error?.message}</FormHelperText>
        </FormControl>

        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexDirection: { xs: 'row' },
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="plain"
            color="neutral"
            onClick={() => {
              if (loading) {
                return;
              }

              onClose();
            }}
          >
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
