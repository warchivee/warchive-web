import Button from '@components/button';
import Modal from '@components/modal';
import AddCollectionModal from '@components/modal/addCollection';
import { Text } from '@components/text';
import { CollectionMenuProps } from '@pages/collections/index.type';
import {
  CollectionType,
  DEFAULT_COLLECTIONS_KEY,
} from 'src/types/collection.type';
import classNames from 'classnames';
import { useState } from 'react';
import useCollections from 'src/hooks/useCollections';

export default function CollectionMenu({
  selectIndex,
  isEditMode,
  handleChange,
}: CollectionMenuProps) {
  const { collections, addCollection, removeCollection } = useCollections();
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [isInputConfirmOpen, setIsInputConfirmOpen] = useState<boolean>(false);

  return (
    <div className="menu">
      <ul>
        {collections?.map((collection: CollectionType, index: number) => (
          <li
            className={classNames({
              active: collection.title === collections[selectIndex].title,
            })}
            key={`bookmark-list-${collection.title}`}
            onClick={() => handleChange(index)}
            aria-hidden="true"
          >
            <Text color="white">{collection.title}</Text>
          </li>
        ))}
      </ul>
      {!isEditMode ? (
        <div className="control">
          <Button
            icon="plus"
            iconColor="white"
            labelColor="white"
            border="round"
            size="small"
            onClick={() => {
              setIsInputConfirmOpen(true);
            }}
          />
          {selectIndex !== DEFAULT_COLLECTIONS_KEY && (
            <Button
              icon="minus"
              iconColor="white"
              labelColor="white"
              border="round"
              size="small"
              onClick={() => {
                setIsConfirmOpen(true);
              }}
            />
          )}
        </div>
      ) : null}

      <AddCollectionModal
        isOpen={isInputConfirmOpen}
        onClose={() => setIsInputConfirmOpen(false)}
        onConfirm={(input?: string) => {
          try {
            addCollection(input || '');
            handleChange(collections.length);
          } catch (e) {
            // console.log(e);
          }

          setIsInputConfirmOpen(false);
        }}
      />

      <Modal
        title="컬렉션 삭제하기"
        message="컬렉션을 정말 삭제하시겠습니까? 컬렉션에 추가한 작품들까지 전부 삭제됩니다."
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
        }}
        onConfirm={() => {
          try {
            removeCollection(selectIndex);
            handleChange(selectIndex - 1);
          } catch (e) {
            // console.log(e);
          }

          setIsConfirmOpen(false);
        }}
        buttons={['confirm', 'cancel']}
      />
    </div>
  );
}
