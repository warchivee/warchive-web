import Button from '@components/CommonComponents/button';
import Modal from '@components/CommonComponents/modal';
import AddCollectionModal from '@components/UserComponents/modal/addCollection';
import { Text } from '@components/CommonComponents/text';
import { CollectionMenuProps } from 'src/types/collections.type';
import {
  CollectionType,
  CollectionListType,
  DEFAULT_COLLECTIONS_KEY,
} from 'src/types/collection.type';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import useCollections from 'src/hooks/useCollections';

export default function CollectionMenu({
  selectIndex,
  handleChange,
}: CollectionMenuProps) {
  const { collectionLists, addCollection, removeCollection } = useCollections();
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [isInputConfirmOpen, setIsInputConfirmOpen] = useState<boolean>(false);

  return (
    <div className="menu">
      <ul>
        {collectionLists?.map(
          (collection: CollectionListType, index: number) => (
            <li
              className={classNames({
                active: collection.title === collectionLists[selectIndex].title,
              })}
              key={`bookmark-list-${collection.title}`}
              onClick={() => handleChange(index)}
              aria-hidden="true"
            >
              <Text color="white">{collection.title}</Text>
            </li>
          ),
        )}
      </ul>
      <div className="control">
        <Button
          icon="plus"
          iconColor="white"
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
            border="round"
            size="small"
            onClick={() => {
              setIsConfirmOpen(true);
            }}
          />
        )}
      </div>

      <AddCollectionModal
        isOpen={isInputConfirmOpen}
        onClose={() => setIsInputConfirmOpen(false)}
        onConfirm={(input?: string) => {
          try {
            addCollection(input || '');
            handleChange(collectionLists.length);
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
            removeCollection(collectionLists[selectIndex].id);
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
