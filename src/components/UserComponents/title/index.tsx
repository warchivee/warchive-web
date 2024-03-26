import Button from '@components/CommonComponents/button';
import Input from '@components/CommonComponents/input';
import { Title } from '@components/CommonComponents/text';
import { CollectionTitleProps } from 'src/types/collections.type';
import {
  CollectionListType,
  DEFAULT_COLLECTIONS_KEY,
  TITLE_LIMIT_LENGTH,
} from 'src/types/collection.type';
import { useEffect, useState } from 'react';
import useCollections from 'src/hooks/useCollections';

export default function CollectionTitle({
  isEditMode,
  selectIndex,
  handleEditMode,
}: CollectionTitleProps) {
  const { collectionLists, renameCollection } = useCollections();

  const [isHovered, setIsHovered] = useState(false);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    if (isEditMode) {
      setInput(collectionLists[selectIndex].title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectIndex, isEditMode]);

  return (
    <div className="header" onMouseLeave={() => setIsHovered(false)}>
      {selectIndex == DEFAULT_COLLECTIONS_KEY ? (
        <div className="title-area">
          <Title type="h1">{collectionLists[selectIndex].title}</Title>
        </div>
      ) : null}

      {!isEditMode && selectIndex !== DEFAULT_COLLECTIONS_KEY ? (
        <div className="title-area" onMouseEnter={() => setIsHovered(true)}>
          <Title type="h1">{collectionLists[selectIndex].title}</Title>
        </div>
      ) : null}

      {isEditMode && selectIndex !== DEFAULT_COLLECTIONS_KEY ? (
        <div className="title-area">
          <Input
            value={input}
            type="text"
            border="underline"
            onChange={setInput}
            size="big"
            maxLength={TITLE_LIMIT_LENGTH}
          />
          <div className="buttons">
            <Button
              size="small"
              background="white"
              labelColor="gray"
              onClick={() => {
                handleEditMode(false);
                setInput('');
              }}
            >
              취소
            </Button>
            <Button
              size="small"
              background="white"
              labelColor="blue-violet"
              onClick={() => {
                renameCollection(selectIndex, input, true);
                handleEditMode(false);
                setInput('');
              }}
            >
              완료
            </Button>
          </div>
        </div>
      ) : null}

      {isHovered && (
        <div className="edit">
          <Button
            icon="write"
            iconColor="gray"
            onClick={() => {
              handleEditMode(true);
              setIsHovered(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
