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
import useCollections, {
  COLLECTION_ITEMS_LIMIT_COUNT,
} from 'src/hooks/useCollections';
import { ModalProps } from '@components/CommonComponents/modal/index.type';
import { useEffect, useState } from 'react';
import { UpdateCollectionItemParam } from 'src/services/collection.api';

interface AddCollectionItemModalProps extends ModalProps {
  wata?: WataType;
}

export default function AddCollectionItemModal({
  title,
  wata,
  isOpen,
  onClose,
}: AddCollectionItemModalProps) {
  const { getCollections, updateCollectionItems, isCollectionsEmpty } =
    useCollections();

  const [originalInfo, setOriginalInfo] = useState<boolean[]>([]);
  const [editInfo, setEditInfo] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (isCollectionsEmpty()) {
      onClose();
      return;
    }

    const updateItems: UpdateCollectionItemParam[] = [];

    setLoading(true);

    editInfo?.forEach((info, index) => {
      if (wata && info !== originalInfo[index]) {
        updateItems.push({
          wata_id: wata.id,
          collection_id: getCollections()[index].id,
          action: info ? 'ADD' : 'DELETE',
        });
      }
    });

    try {
      await updateCollectionItems(updateItems);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
    onClose();
  };

  const handleChecked = (index: number, value: boolean) => {
    const info = [...editInfo];

    info[index] = value;

    setEditInfo(info);
  };

  useEffect(() => {
    if (isOpen && wata) {
      const info =
        getCollections()?.map(({ items }) => items?.includes(wata.id)) ?? [];

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
        <List size="sm" sx={{ overflow: 'auto' }}>
          {isCollectionsEmpty() ? (
            <>
              <Typography level="body-sm">컬렉션이 없어요!</Typography>
              <Typography level="body-sm">
                컬렉션 메뉴에서 나의 여성서사 컬렉션을 만들어보세요.
              </Typography>
            </>
          ) : (
            wata &&
            editInfo.length === getCollections()?.length &&
            getCollections()?.map(
              ({ title: collectionTitle, items }, index: number) => (
                <ListItem
                  key={`collection-add-${index + 1}`}
                  sx={{ alignItems: 'flex-start' }}
                >
                  <Checkbox
                    sx={{ flex: 1 }}
                    disabled={
                      (getCollections()[index].items ?? []).length >=
                      COLLECTION_ITEMS_LIMIT_COUNT
                    }
                    size="sm"
                    onChange={(event) => {
                      if (loading) {
                        return;
                      }
                      handleChecked(index, event.target.checked);
                    }}
                    checked={
                      editInfo && editInfo[index] !== undefined
                        ? editInfo[index]
                        : false
                    }
                    label={collectionTitle}
                    variant="soft"
                    color="primary"
                  />
                  <Typography level="body-sm" textColor="primary.plainColor">
                    ({items?.length ?? 0})
                  </Typography>
                </ListItem>
              ),
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
          {!isCollectionsEmpty() && (
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
