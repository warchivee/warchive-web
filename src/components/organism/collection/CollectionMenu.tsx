import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

// components
import AddCollectionModal from '@components/organism/collection/AddCollectionModal';
import { Text } from '@components/CommonComponents/text';

// joy components
import { IconButton, Typography } from '@mui/joy';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

// utils
import useCollection from 'src/hooks/useCollections';
import useModal from 'src/hooks/useModal';
import { CollectionType } from 'src/types/collections.type';
import { COLLECTIONS_LIMMIT_COUNT } from '@utils/consts/collections.const';

export default function CollectionMenu() {
  const [isInputConfirmOpen, setIsInputConfirmOpen] = useState<boolean>(false);

  const [openMenu, setOpenMenu] = useState(false);

  const [openConfirmModal] = useModal();
  const [openModal, setOpenModal] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

  const {
    isCollectionsEmpty,
    getCollections,
    getSelectCollectionIndex,
    selectCollection,
    deleteCollection,
  } = useCollection();

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
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
  }, [openModal, handleClickOutside]);

  return (
    <div className="collection-menu" style={{ zIndex: openMenu ? 2 : 0 }}>
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
            size="sm"
            variant="plain"
            sx={{
              border: '1px solid white',
              borderRadius: '20px',
              minHeight: '1.8rem',
              minWidth: '1.8rem',
              height: '1.8rem',
              width: '1.8rem',
            }}
            onClick={() => {
              if (getCollections()?.length >= COLLECTIONS_LIMMIT_COUNT) {
                openConfirmModal({
                  title: '스크랩북 생성 실패',
                  message: `스크랩북은 ${COLLECTIONS_LIMMIT_COUNT}개만 생성할 수 있습니다.`,
                });
                return;
              }

              setIsInputConfirmOpen(true);
              setOpenModal(true);
            }}
          >
            <FontAwesomeIcon style={{ color: 'white' }} icon={faPlus} />
          </IconButton>
          {!isCollectionsEmpty() && (
            <IconButton
              size="sm"
              sx={{
                border: '1px solid white',
                borderRadius: '20px',
                minHeight: '1.8rem',
                minWidth: '1.8rem',
                height: '1.8rem',
                width: '1.8rem',
              }}
              variant="plain"
              onClick={() => {
                if (isCollectionsEmpty()) {
                  return;
                }
                setOpenModal(true);
                openConfirmModal({
                  title: '스크랩북 삭제하기',
                  message:
                    '스크랩북을 정말 삭제하시겠습니까?\n스크랩북에 추가한 작품들까지 전부 삭제됩니다.',
                  onCancel: () => {
                    setOpenModal(false);
                  },
                  onConfirm: async () => {
                    await deleteCollection();
                    setOpenModal(false);
                  },
                });
              }}
            >
              <FontAwesomeIcon style={{ color: 'white' }} icon={faMinus} />
            </IconButton>
          )}
        </div>
      </div>

      <div
        className="mobile"
        onClick={() => setOpenMenu(!openMenu)}
        aria-hidden
      >
        <Typography textColor="white">{openMenu ? '《　' : '　》'}</Typography>
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
