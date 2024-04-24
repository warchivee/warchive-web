import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Checkbox from '@mui/joy/Checkbox';

import { WataType } from 'src/types/wata.type';
import useScrapbooks from 'src/hooks/useScrapbooks';
import { ModalProps } from '@components/CommonComponents/modal/index.type';
import { useEffect, useState } from 'react';
import { UpdateScrapbookItemParam } from 'src/services/scrapbook.api';
import { SCRAPBOOK_ITEMS_LIMIT_COUNT } from '@utils/consts/scrapbooks.const';
import useSnackbar from 'src/hooks/useSnackbar';
import { AxiosError } from 'axios';

interface AddScrapbookItemModalProps extends ModalProps {
  wata?: WataType;
}

export default function AddScrapbookItemModal({
  title,
  wata,
  isOpen,
  onClose,
}: AddScrapbookItemModalProps) {
  const { getScrapbooks, updateScrapbookItems, isScrapbooksEmpty } =
    useScrapbooks();

  const [originalInfo, setOriginalInfo] = useState<boolean[]>([]);
  const [editInfo, setEditInfo] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(false);

  const [openSnackbar] = useSnackbar();

  const handleConfirm = async () => {
    if (isScrapbooksEmpty()) {
      onClose();
      return;
    }

    const updateItems: UpdateScrapbookItemParam[] = [];

    setLoading(true);

    editInfo?.forEach((info, index) => {
      if (wata && info !== originalInfo[index]) {
        updateItems.push({
          wata_id: wata.id,
          scrapbook_id: getScrapbooks()[index].id,
          action: info ? 'ADD' : 'DELETE',
        });
      }
    });

    try {
      if (updateItems && updateItems?.length > 0) {
        await updateScrapbookItems(updateItems);
      }

      setLoading(false);

      openSnackbar({
        message: `${wata?.title}을(를) 스크랩했습니다.`,
      });

      onClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        openSnackbar({
          message: error?.response?.data?.message,
        });
      }

      setLoading(false);
    }
  };

  const handleChecked = (index: number, value: boolean) => {
    const info = [...editInfo];

    info[index] = value;

    setEditInfo(info);
  };

  useEffect(() => {
    if (isOpen && wata) {
      const info =
        getScrapbooks()?.map(({ items }) => items?.includes(wata.id)) ?? [];

      setOriginalInfo(info);
      setEditInfo(info);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, wata]);

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        if (loading) {
          return;
        }
        setLoading(false);
        onClose();
      }}
    >
      <ModalDialog layout="center">
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography level="h4" fontWeight="lg">
          {title}
        </Typography>
        <List size="sm" sx={{ overflow: 'auto', gap: '0.4rem' }}>
          {isScrapbooksEmpty() ? (
            <>
              <Typography level="body-sm">스크랩북이 없어요!</Typography>
              <Typography level="body-sm">
                스크랩북 메뉴에서 나의 여성서사 스크랩북을 만들어보세요.
              </Typography>
            </>
          ) : (
            wata &&
            editInfo.length === getScrapbooks()?.length &&
            getScrapbooks()?.map(
              ({ title: scrapbookTitle, items }, index: number) => {
                const checked =
                  editInfo && editInfo[index] !== undefined
                    ? editInfo[index]
                    : false;

                // 삭제는 가능하도록 해야함.
                const disabled =
                  (getScrapbooks()[index].items ?? []).length >=
                    SCRAPBOOK_ITEMS_LIMIT_COUNT && !originalInfo[index];

                return (
                  <ListItem
                    key={`scrapbook-add-${index + 1}`}
                    sx={{ alignItems: 'flex-start' }}
                  >
                    <Checkbox
                      sx={{ flex: 1 }}
                      disabled={disabled}
                      size="sm"
                      onChange={(event) => {
                        if (loading) {
                          return;
                        }
                        handleChecked(index, event.target.checked);
                      }}
                      checked={checked}
                      label={scrapbookTitle}
                      variant="soft"
                      color="primary"
                    />
                    <Typography level="body-sm" textColor="primary.plainColor">
                      ({items?.length ?? 0})
                    </Typography>
                  </ListItem>
                );
              },
            )
          )}
        </List>

        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexDirection: { xs: 'row' },
            justifyContent: 'flex-end',
          }}
        >
          {!isScrapbooksEmpty() && (
            <Button
              variant="plain"
              color="neutral"
              onClick={() => {
                if (loading) {
                  return;
                }

                setLoading(false);
                onClose();
              }}
            >
              취소
            </Button>
          )}

          <Button
            variant="plain"
            color="primary"
            onClick={handleConfirm}
            loading={loading}
          >
            확인
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
}
