import { useEffect, useState } from 'react';
import useScrapbook from 'src/hooks/useScrapbooks';
import RecoverableError from 'src/types/error/RecoverableError';
import {
  Button,
  ButtonGroup,
  FormHelperText,
  IconButton,
  Input,
  Stack,
  Textarea,
  Typography,
} from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {
  SCRAPBOOK_COMMENT_LIMIT_LENGTH,
  SCRAPBOOK_TITLE_LIMIT_LENGTH,
} from '@utils/consts/scrapbooks.const';
import useSnackbar from 'src/hooks/useSnackbar';
import { AxiosError } from 'axios';

export default function ScrapbookHeader() {
  const [isHovered, setIsHovered] = useState(false);
  const [editInfo, setEditInfo] = useState({ title: '', note: '' });

  const [isEditMode, setIsEditMode] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: '',
  });

  const { getScrapbook, getSelectScrapbookIndex, updateScrapbook } =
    useScrapbook();

  const [openSnackbar] = useSnackbar();

  const handleConfirm = async () => {
    try {
      setLoading(true);

      await updateScrapbook(editInfo);

      setIsEditMode(false);
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

  useEffect(() => {
    if (getScrapbook()) {
      setLoading(false);
      setIsEditMode(false);
      setError({
        isError: false,
        message: '',
      });
      setEditInfo({ title: getScrapbook().title, note: getScrapbook().note });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSelectScrapbookIndex()]);

  return !getScrapbook() ? (
    <div />
  ) : (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      gap={3}
    >
      {!isEditMode ? (
        <Stack
          width="100%"
          onMouseLeave={() => setIsHovered(false)}
          onMouseEnter={() => setIsHovered(true)}
          onClick={() => {
            setIsEditMode(true);
            setIsHovered(false);
          }}
          sx={{
            cursor: 'pointer',
          }}
        >
          <Typography level="h3">{getScrapbook()?.title}</Typography>

          <Typography level="body-sm" textColor="text.tertiary">
            {!getScrapbook()?.note || getScrapbook()?.note === ''
              ? '코멘트를 입력하세요.'
              : getScrapbook()?.note}
          </Typography>
        </Stack>
      ) : null}

      {isEditMode ? (
        <Stack width="100%" alignItems="flex-end">
          <Stack sx={{ width: '100%', gap: '5px' }}>
            <Input
              fullWidth
              variant="soft"
              value={editInfo?.title ?? ''}
              onChange={(event) =>
                setEditInfo({ ...editInfo, title: event.target.value })
              }
              color="neutral"
              startDecorator={
                <Typography level="body-sm" textColor="tertiary">
                  이름
                </Typography>
              }
              endDecorator={
                <Typography level="body-sm" textColor="tertiary">
                  {editInfo.title.length}/{SCRAPBOOK_TITLE_LIMIT_LENGTH}
                </Typography>
              }
              slotProps={{
                input: {
                  maxLength: SCRAPBOOK_TITLE_LIMIT_LENGTH,
                },
              }}
            />

            <Textarea
              sx={{ width: '100%' }}
              variant="soft"
              maxRows={2}
              minRows={2}
              value={editInfo?.note ?? ''}
              onChange={(event) =>
                setEditInfo({ ...editInfo, note: event.target.value })
              }
              color="neutral"
              endDecorator={
                <Typography
                  level="body-sm"
                  textColor="tertiary"
                  sx={{ ml: 'auto' }}
                >
                  {editInfo.note?.length ?? 0}/{SCRAPBOOK_COMMENT_LIMIT_LENGTH}
                </Typography>
              }
              slotProps={{
                textarea: {
                  maxLength: SCRAPBOOK_COMMENT_LIMIT_LENGTH,
                },
              }}
            />
            <FormHelperText>{error?.isError && error?.message}</FormHelperText>
          </Stack>
          <ButtonGroup variant="plain" spacing={1}>
            <Button
              size="sm"
              variant="plain"
              color="neutral"
              onClick={() => {
                if (loading) {
                  return;
                }

                setIsEditMode(false);
              }}
            >
              취소
            </Button>
            <Button
              loading={loading}
              size="sm"
              variant="plain"
              color="primary"
              onClick={handleConfirm}
            >
              완료
            </Button>
          </ButtonGroup>
        </Stack>
      ) : null}

      {isHovered && (
        <IconButton
          onClick={() => {
            setIsEditMode(true);
            setIsHovered(false);
          }}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </IconButton>
      )}
    </Stack>
  );
}
