import Button from '@components/button';
import Input from '@components/input';
import { Title } from '@components/text';
import { CollectionTitleProps } from '@pages/collections/index.type';
import { useState } from 'react';
import { DEFAULT_COLLECTIONS_KEY } from 'src/data/collection.atom';
import useCollections from 'src/hooks/useCollections';

export default function CollectionTitle({
  isEditMode,
  selectIndex,
  handleEditMode,
}: CollectionTitleProps) {
  const { collections, renameCollection } = useCollections();
  const [input, setInput] = useState<string>('');

  return (
    <div className="header">
      {isEditMode ? (
        <Input
          value={input}
          type="text"
          border="underline"
          placeholder={collections[selectIndex].title}
          onChange={setInput}
          size="big"
        />
      ) : (
        <Title type="h1">{collections[selectIndex].title}</Title>
      )}

      {!isEditMode ? (
        <Title type="h2" color="lignt-violet">
          {collections[selectIndex].items.length}
        </Title>
      ) : null}

      {isEditMode && selectIndex !== DEFAULT_COLLECTIONS_KEY ? (
        <>
          <Button
            size="small"
            border="round"
            background="lignt-violet"
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
            background="lignt-violet"
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
              iconColor="lignt-violet"
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
