import Button from '@components/CommonComponents/button';
import Modal from '@components/CommonComponents/modal';
import AddCollectionModal from '@components/UserComponents/modal/addCollection';
import { Text } from '@components/CommonComponents/text';
import { CollectionType } from 'src/types/collection.type';
import classNames from 'classnames';
import { useState } from 'react';
import useCollection from 'src/hooks/useCollections';
import useModal from 'src/hooks/useModal';

export default function CollectionMenu() {
  const [isInputConfirmOpen, setIsInputConfirmOpen] = useState<boolean>(false);

  const [openMenu, setOpenMenu] = useState(false);

  const [openConfirmModal] = useModal();

  const {
    getCollections,
    getSelectCollectionIndex,
    selectCollection,
    deleteCollection,
  } = useCollection();

  const handleDelete = async () => {
    try {
      await deleteCollection();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="menu">
      <div className={openMenu ? 'pc show' : 'pc'}>
        <ul>
          {getCollections()?.map(
            (collection: CollectionType, index: number) => (
              <li
                className={classNames({
                  active: index === getSelectCollectionIndex(),
                })}
                key={`bookmark-list-${collection.id}`}
                onClick={() => selectCollection(index)}
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
          <Button
            icon="minus"
            iconColor="white"
            border="round"
            size="small"
            onClick={() => {
              openConfirmModal({
                title: '컬렉션 삭제하기',
                message:
                  '컬렉션을 정말 삭제하시겠습니까?\n컬렉션에 추가한 작품들까지 전부 삭제됩니다.',
                onConfirm: handleDelete,
              });
            }}
          />
        </div>
      </div>

      <div
        className="mobile"
        onClick={() => setOpenMenu(!openMenu)}
        aria-hidden
      >
        <Text color="light-gray">{openMenu ? '《　' : '　》'}</Text>
      </div>

      <AddCollectionModal
        isOpen={isInputConfirmOpen}
        onClose={() => setIsInputConfirmOpen(false)}
      />
    </div>
  );
}
