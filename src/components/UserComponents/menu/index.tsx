import AddCollectionModal from '@components/UserComponents/modal/addCollection';
import { Text } from '@components/CommonComponents/text';
import { CollectionType } from 'src/types/collection.type';
import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import useCollection from 'src/hooks/useCollections';
import useModal from 'src/hooks/useModal';
import { IconButton } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function CollectionMenu() {
  const [isInputConfirmOpen, setIsInputConfirmOpen] = useState<boolean>(false);

  const [openMenu, setOpenMenu] = useState(false);

  const [openConfirmModal] = useModal();
  const [openModal, setOpenModal] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

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

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      console.log(openModal);

      if (
        popupRef.current &&
        !popupRef?.current?.contains(event.target as Node) &&
        !openModal
      ) {
        setOpenMenu(false);
      }
    },
    [openModal, popupRef],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  return (
    <div className="menu">
      <div className={openMenu ? 'pc show' : 'pc'} ref={popupRef}>
        <ul>
          {getCollections()?.map(
            (collection: CollectionType, index: number) => (
              <li
                className={classNames({
                  active: index === getSelectCollectionIndex(),
                })}
                key={`bookmark-list-${collection.id}`}
                onClick={() => {
                  selectCollection(index);
                  setOpenMenu(!openMenu);
                }}
                aria-hidden="true"
              >
                <Text color="white">{collection.title}</Text>
              </li>
            ),
          )}
        </ul>
        <div className="control">
          <IconButton
            onClick={() => {
              setIsInputConfirmOpen(true);
              setOpenModal(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </IconButton>
          <IconButton
            onClick={() => {
              setOpenModal(true);
              openConfirmModal({
                title: '컬렉션 삭제하기',
                message:
                  '컬렉션을 정말 삭제하시겠습니까?\n컬렉션에 추가한 작품들까지 전부 삭제됩니다.',
                onCancel: () => {
                  setOpenModal(false);
                },
                onConfirm: () => {
                  handleDelete();
                  setOpenModal(false);
                },
              });
            }}
          >
            <FontAwesomeIcon icon={faMinus} />
          </IconButton>
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
        onClose={() => {
          setIsInputConfirmOpen(false);
          setOpenModal(false);
        }}
      />
    </div>
  );
}
