import {
  COMMENT_LIMIT_LENGTH,
  TITLE_LIMIT_LENGTH,
} from 'src/types/collection.type';
import { useEffect, useState } from 'react';
import useCollection from 'src/hooks/useCollections';
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

export default function CollectionHeader() {
  const [isHovered, setIsHovered] = useState(false);
  const [editInfo, setEditInfo] = useState({ title: '', note: '' });

  const [isEditMode, setIsEditMode] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: '',
  });

  const { getCollection, getSelectCollectionIndex, updateCollection } =
    useCollection();

  const handleConfirm = async () => {
    try {
      setLoading(true);

      await updateCollection(editInfo);

      setIsEditMode(false);
    } catch (e) {
      if (e instanceof RecoverableError) {
        setError({ isError: true, message: e.message });
      } else {
        throw e;
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (getCollection()) {
      setLoading(false);
      setIsEditMode(false);
      setError({
        isError: false,
        message: '',
      });
      setEditInfo({ title: getCollection().title, note: getCollection().note });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSelectCollectionIndex()]);

  return !getCollection() ? (
    <div />
  ) : (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      gap={3}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isEditMode ? (
        <Stack
          onMouseEnter={() => setIsHovered(true)}
          onClick={() => {
            setIsEditMode(true);
            setIsHovered(false);
          }}
          sx={{
            cursor: 'pointer',
          }}
        >
          <Typography level="h3">{getCollection()?.title}</Typography>

          <Typography level="body-sm" textColor="text.tertiary">
            {!getCollection()?.note || getCollection()?.note === ''
              ? '코멘트를 입력하세요.'
              : getCollection()?.note}
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
                  {editInfo.title.length}/{TITLE_LIMIT_LENGTH}
                </Typography>
              }
              slotProps={{
                input: {
                  maxLength: TITLE_LIMIT_LENGTH,
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
                  {editInfo.note?.length ?? 0}/{COMMENT_LIMIT_LENGTH}
                </Typography>
              }
              slotProps={{
                textarea: {
                  maxLength: COMMENT_LIMIT_LENGTH,
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
