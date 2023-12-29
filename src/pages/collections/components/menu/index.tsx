import Button from '@components/button';
import ConfirmModal from '@components/modal/confirm';
import InputConfirmModal from '@components/modal/inputConfirm';
import { Text } from '@components/text';
import { CollectionMenuProps } from '@pages/collections/index.type';
import {
  CollectionType,
  DEFAULT_COLLECTIONS_KEY,
} from '@utils/collections/index.type';
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

      <InputConfirmModal
        title="컬렉션 추가"
        description="새로 만들 컬렉션의 이름을 입력해주세요."
        isOpen={isInputConfirmOpen}
        onClose={() => setIsInputConfirmOpen(false)}
        onConfirm={(input: string) => {
          try {
            addCollection(input);
            handleChange(collections.length);
          } catch (e) {
            // console.log(e);
          }

          setIsInputConfirmOpen(false);
        }}
      />

      <ConfirmModal
        title="컬렉션 삭제"
        description="컬렉션을 정말 삭제하시겠습니까? 컬렉션에 추가한 작품들까지 전부 삭제됩니다."
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
      />
    </div>
  );
}
