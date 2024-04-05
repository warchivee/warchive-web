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
import useCollections from 'src/hooks/useCollections';
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
  const { getCollections, updateCollectionItems } = useCollections();

  const [originalInfo, setOriginalInfo] = useState<boolean[]>([]);
  const [editInfo, setEditInfo] = useState<boolean[]>([]);

  const handleConfirm = async () => {
    const updateItems: UpdateCollectionItemParam[] = [];

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

    onClose();
  };

  const handleChecked = (index: number, value: boolean) => {
    const info = [...editInfo];

    info[index] = value;

    setEditInfo(info);
  };

  useEffect(() => {
    if (isOpen && wata) {
      const info = getCollections()?.map(({ items }) =>
        items?.includes(wata.id),
      );

      setOriginalInfo(info);
      setEditInfo(info);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, wata]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog layout="center">
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography level="h4" fontWeight="lg">
          {title}
        </Typography>
        <List size="sm" sx={{ overflow: 'auto' }}>
          {wata &&
            editInfo?.length !== 0 &&
            getCollections()?.map(
              ({ title: collectionTitle, items }, index: number) => (
                <ListItem key={`collection-add-${index + 1}`}>
                  <Checkbox
                    disabled={
                      (getCollections()[index].items ?? []).length >= 50
                    }
                    size="sm"
                    onChange={(event) =>
                      handleChecked(index, event.target.checked)
                    }
                    checked={editInfo[index]}
                    label={collectionTitle}
                    variant="soft"
                    color="primary"
                  />
                  <Typography level="body-sm" textColor="primary.plainColor">
                    ({items?.length ?? 0})
                  </Typography>
                </ListItem>
              ),
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
          <Button variant="plain" color="neutral" onClick={onClose}>
            취소
          </Button>
          <Button variant="plain" color="primary" onClick={handleConfirm}>
            확인
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
}
