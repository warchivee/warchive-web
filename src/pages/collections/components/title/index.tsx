import Button from '@components/button';
import Input from '@components/input';
import { Title } from '@components/text';
import { CollectionTitleProps } from '@pages/collections/index.type';
import {
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
  const { collections, renameCollection } = useCollections();
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    if (isEditMode) {
      setInput(collections[selectIndex].title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectIndex, isEditMode]);

  return (
    <div className="header">
      {isEditMode ? (
        <Input
          value={input}
          type="text"
          border="underline"
          onChange={setInput}
          size="big"
          maxLength={TITLE_LIMIT_LENGTH}
        />
      ) : (
        <Title type="h1">{collections[selectIndex].title}</Title>
      )}

      {!isEditMode ? (
        <Title type="h2" color="light-violet">
          {collections[selectIndex].items.length}
        </Title>
      ) : null}

      {isEditMode && selectIndex !== DEFAULT_COLLECTIONS_KEY ? (
        <>
          <Button
            size="small"
            border="round"
            background="light-violet"
            labelColor="french-lilac"
            onClick={() => {
              renameCollection(selectIndex, input);
              handleEditMode(false);
              setInput('');
            }}
          >
            완료
          </Button>
          <Button
            size="small"
            border="round"
            background="light-violet"
            labelColor="french-lilac"
            onClick={() => {
              handleEditMode(false);
              setInput('');
            }}
          >
            취소
          </Button>
        </>
      ) : (
        selectIndex !== DEFAULT_COLLECTIONS_KEY && (
          <div className="edit">
            <Button
              icon="write"
              iconColor="light-violet"
              onClick={() => {
                handleEditMode(true);
              }}
            />
          </div>
        )
      )}
    </div>
  );
}
