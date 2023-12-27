import Button from '@components/button';
import { Text, Title } from '@components/text';
import { WataType } from '@utils/common.type';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { CollectionType } from 'src/data/collection.atom';
import useCollections from 'src/hooks/useCollections';

export default function AddCollectionsModal({
  wata,
  isOpen,
  onClose,
}: {
  wata?: WataType;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { collections, existCollectionItem, handleCollectionItems } =
    useCollections();

  const [commands, setCommands] = useState<boolean[]>([]);

  const initCommands = () => {
    const newCommands = [] as boolean[];

    collections.forEach((collection: CollectionType, index: number) => {
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
    <div className={classNames('modal', { close: !isOpen }, 'add-collection')}>
      <div className="content">
        <div className="header">
          <Title type="h2">컬렉션에 추가하기</Title>
          <Button icon="xmark" onClick={onClose} />
        </div>

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
                <Text>{collection.title}</Text>
                <Text color="lavender">({collection.items.length})</Text>
              </label>
            </li>
          ))}
        </ul>
        <div className="control">
          <Button
            onClick={() => {
              if (wata) {
                handleCollectionItems(commands, wata);
              }
              onClose();
            }}
            labelColor="blue-violet"
          >
            확인
          </Button>
          <Button onClick={() => onClose()}>취소</Button>
        </div>
      </div>
    </div>
  );
}
