import { Text } from '@components/CommonComponents/text';
import { WataType } from 'src/types/wata.type';
import useCollections from 'src/hooks/useCollections';
import Modal from '@components/CommonComponents/modal';
import { ModalProps } from '@components/CommonComponents/modal/index.type';
import { useEffect, useState } from 'react';
import { UpdateCollectionItemParam } from 'src/services/collection.api';

interface AddCollectionItemModalProps extends ModalProps {
  wata?: WataType;
}

export default function AddCollectionItemModal({
  wata,
  isOpen,
  onClose,
}: AddCollectionItemModalProps) {
  const { getCollections, updateCollectionItems } = useCollections();

  const [originalInfo, setOriginalInfo] = useState<boolean[]>([]);
  const [editInfo, setEditInfo] = useState<boolean[]>([]);

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="컬렉션에 추가하기"
      onConfirm={async () => {
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
      }}
      buttons={['confirm', 'cancel']}
    >
      <ul className="list">
        {wata &&
          getCollections()?.map(({ title, items }, index: number) => (
            <li key={title}>
              <input
                type="checkbox"
                name={`add-collection-modal-${index}`}
                id={`add-collection-modal-${index}`}
                checked={editInfo[index]}
                onChange={(event) => {
                  const info = [...editInfo];

                  info[index] = event.target.checked;

                  setEditInfo(info);
                }}
              />
              <label htmlFor={`add-collection-modal-${index}`}>
                <div className="name">
                  <Text>{title}</Text>
                </div>
                <div className="count">
                  <Text color="lavender">({items?.length ?? 0})</Text>
                </div>
              </label>

              {/* 버튼 들어가는 곳 */}
            </li>
          ))}
      </ul>
    </Modal>
  );
}
