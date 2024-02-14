import { Text } from '@components/CommonComponents/text';
import { CollectionType } from 'src/types/collection.type';
import { WataType } from 'src/types/wata.type';
import { useEffect, useState } from 'react';
import useCollections from 'src/hooks/useCollections';
import Modal from '@components/CommonComponents/modal';
import { ModalProps } from '@components/CommonComponents/modal/index.type';

interface AddCollectionItemModalProps extends ModalProps {
  wata?: WataType;
}

export default function AddCollectionItemModal({
  wata,
  isOpen,
  onClose,
}: AddCollectionItemModalProps) {
  const { collections, existCollectionItem, handleCollectionItems } =
    useCollections();

  const [commands, setCommands] = useState<boolean[]>([]);

  const initCommands = () => {
    const newCommands = [] as boolean[];

    collections.forEach((_, index: number) => {
      if (wata && existCollectionItem(index, wata)) {
        newCommands.push(true);
      } else {
        newCommands.push(false);
      }
    });

    setCommands(newCommands);
  };

  useEffect(() => {
    if (isOpen) {
      initCommands();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="컬렉션에 추가하기"
      onConfirm={() => {
        if (wata) {
          handleCollectionItems(commands, wata);
        }
        onClose();
      }}
      buttons={['confirm', 'cancel']}
    >
      <ul className="list">
        {collections.map((collection: CollectionType, index: number) => (
          <li key={collection.title}>
            <input
              type="checkbox"
              name={`add-collection-modal-${index}`}
              id={`add-collection-modal-${index}`}
              checked={commands[index]}
              onChange={() => {
                const newCommands = [...commands];
                newCommands[index] = !commands[index];
                setCommands(newCommands);
              }}
            />
            <label htmlFor={`add-collection-modal-${index}`}>
              <div className="name">
                <Text>{collection.title}</Text>
              </div>
              <div className="count">
                <Text color="lavender">({collection.items.length})</Text>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
