import Button from '@components/CommonComponents/button';
import Modal from '@components/CommonComponents/modal';
import AddCollectionModal from '@components/UserComponents/modal/addCollection';
import { Text } from '@components/CommonComponents/text';
import { CollectionType } from 'src/types/collection.type';
import classNames from 'classnames';
import { useState } from 'react';
import useCollection from 'src/hooks/useCollections';

export default function CollectionMenu() {
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [isInputConfirmOpen, setIsInputConfirmOpen] = useState<boolean>(false);

  const [openMenu, setOpenMenu] = useState(false);

  const {
    getCollections,
    getSelectCollectionIndex,
    selectCollection,
    addCollection,
    deleteCollection,
  } = useCollection();

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
                key={`bookmark-list-${collection.title}`}
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
              setIsConfirmOpen(true);
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
        onConfirm={async (value) => {
          try {
            if (value) {
              addCollection(value);
            }
          } catch (error) {
            console.error(error);
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
        onConfirm={async () => {
          try {
            deleteCollection();
          } catch (error) {
            console.error(error);
          }

          setIsConfirmOpen(false);
        }}
        buttons={['confirm', 'cancel']}
      />
    </div>
  );
}
